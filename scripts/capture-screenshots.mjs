import http from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs', 'screenshots');
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};

function assert(condition, message) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

async function startStaticServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url || '/', 'http://127.0.0.1').pathname);
      const target = resolve(rootDir, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
      if (target !== rootDir && !target.startsWith(rootDir + sep)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      const data = await readFile(target);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[extname(target)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  return { server, port, baseUrl: `http://127.0.0.1:${port}/` };
}

async function launchChrome(executablePath, userDataDir) {
  await stat(executablePath);

  const args = [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-extensions',
    '--mute-audio',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ];

  const proc = spawn(executablePath, args, { stdio: ['ignore', 'ignore', 'pipe'] });

  const browserWsUrl = await new Promise((resolveWs, rejectWs) => {
    let stderr = '';
    const timer = setTimeout(() => {
      rejectWs(new Error(`Timed out waiting for Chrome DevTools endpoint.\n${stderr}`));
    }, 15000);

    const onData = chunk => {
      stderr += chunk.toString('utf8');
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        proc.stderr.off('data', onData);
        proc.off('exit', onExit);
        resolveWs(match[1]);
      }
    };

    const onExit = (code, signal) => {
      clearTimeout(timer);
      rejectWs(new Error(`Chrome exited before DevTools started (code=${code}, signal=${signal}).\n${stderr}`));
    };

    proc.stderr.on('data', onData);
    proc.once('exit', onExit);
  });

  return { proc, browserWsUrl };
}

async function getPageWsUrl(browserWsUrl) {
  const port = new URL(browserWsUrl).port;
  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  if (!listRes.ok) throw new Error(`Failed to query Chrome targets: HTTP ${listRes.status}`);
  const targets = await listRes.json();
  const existing = targets.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  if (existing) return existing.webSocketDebuggerUrl;

  let createRes = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (createRes.status === 405) {
    createRes = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`);
  }
  if (!createRes.ok) throw new Error(`Failed to create Chrome target: HTTP ${createRes.status}`);
  const created = await createRes.json();
  if (!created.webSocketDebuggerUrl) throw new Error('Chrome target missing webSocketDebuggerUrl.');
  return created.webSocketDebuggerUrl;
}

async function createCdpClient(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    const onOpen = () => {
      ws.removeEventListener('error', onError);
      resolveOpen();
    };
    const onError = event => {
      ws.removeEventListener('open', onOpen);
      rejectOpen(new Error(`CDP WebSocket error: ${event.message || 'connection failed'}`));
    };
    ws.addEventListener('open', onOpen, { once: true });
    ws.addEventListener('error', onError, { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  ws.addEventListener('message', event => {
    const payload = JSON.parse(typeof event.data === 'string' ? event.data : event.data.toString('utf8'));
    if (payload.id !== undefined) {
      const entry = pending.get(payload.id);
      if (!entry) return;
      pending.delete(payload.id);
      if (payload.error) entry.reject(new Error(`CDP ${entry.method}: ${payload.error.message}`));
      else entry.resolve(payload.result ?? {});
      return;
    }
    if (payload.method) {
      const handlers = listeners.get(payload.method);
      if (handlers) {
        for (const handler of [...handlers]) handler(payload.params ?? {});
      }
    }
  });

  ws.addEventListener('close', () => {
    for (const { reject, method } of pending.values()) {
      reject(new Error(`CDP connection closed while awaiting ${method}`));
    }
    pending.clear();
  });

  return {
    send(method, params = {}) {
      const id = nextId++;
      return new Promise((resolveCmd, rejectCmd) => {
        pending.set(id, { resolve: resolveCmd, reject: rejectCmd, method });
        ws.send(JSON.stringify({ id, method, params }));
      });
    },
    on(method, handler) {
      if (!listeners.has(method)) listeners.set(method, new Set());
      listeners.get(method).add(handler);
      return () => listeners.get(method)?.delete(handler);
    },
    once(method, timeoutMs = 15000) {
      return new Promise((resolveOnce, rejectOnce) => {
        const timer = setTimeout(() => {
          off();
          rejectOnce(new Error(`Timed out waiting for CDP event ${method}`));
        }, timeoutMs);
        const off = this.on(method, params => {
          clearTimeout(timer);
          off();
          resolveOnce(params);
        });
      });
    },
    close() {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    },
  };
}

async function run() {
  await mkdir(outDir, { recursive: true });
  const userDataDir = await mkdtemp(join(tmpdir(), 'solmora-chrome-'));
  const { server, baseUrl } = await startStaticServer(root);

  let chromeProc = null;
  let cdp = null;

  try {
    const launched = await launchChrome(chromePath, userDataDir);
    chromeProc = launched.proc;
    const pageWsUrl = await getPageWsUrl(launched.browserWsUrl);
    cdp = await createCdpClient(pageWsUrl);

    const pageErrors = [];
    cdp.on('Runtime.exceptionThrown', ({ exceptionDetails }) => {
      const desc = exceptionDetails?.exception?.description || exceptionDetails?.text || 'Uncaught exception';
      pageErrors.push(`Runtime.exceptionThrown: ${desc}`);
    });
    cdp.on('Runtime.consoleAPICalled', ({ type, args }) => {
      if (type !== 'error') return;
      const text = (args || []).map(arg => arg.value ?? arg.description ?? arg.type).join(' ');
      pageErrors.push(`console.error: ${text}`);
    });

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true });

    const evaluate = async expression => {
      const res = await cdp.send('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (res.exceptionDetails) {
        const msg = res.exceptionDetails.exception?.description || res.exceptionDetails.text || 'Evaluation failed';
        throw new Error(`Page evaluation error: ${msg}`);
      }
      return res.result?.value;
    };

    const waitForFontsAndImages = async () => {
      await evaluate(`(async () => {
        if (document.readyState !== 'complete') {
          await new Promise(r => window.addEventListener('load', r, { once: true }));
        }
        await document.fonts.ready;
        const imgs = [...document.querySelectorAll('img')].filter(img => {
          const style = getComputedStyle(img);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          const rect = img.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return false;
          return img.loading !== 'lazy' || (rect.bottom > -250 && rect.top < window.innerHeight + 250);
        });
        await Promise.all(imgs.map(img => {
          if (img.complete) {
            if (img.naturalWidth === 0) throw new Error('Broken image: ' + img.src);
            return img.decode().catch(() => {});
          }
          return new Promise((resolveImg, rejectImg) => {
            const onDone = () => img.decode().catch(() => {}).finally(resolveImg);
            img.addEventListener('load', onDone, { once: true });
            img.addEventListener('error', () => rejectImg(new Error('Failed to load image: ' + img.src)), { once: true });
          });
        }));
      })()`);
    };

    const navigateAndWait = async url => {
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url });
      await loaded;
      await waitForFontsAndImages();
    };

    const reloadClean = async () => {
      await evaluate(`history.replaceState(null, '', '/')`);
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.reload', { ignoreCache: false });
      await loaded;
      await waitForFontsAndImages();
    };

    const capture = async filename => {
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const target = join(outDir, filename);
      await writeFile(target, Buffer.from(data, 'base64'));
      console.log(`Captured ${filename}`);
    };

    const setDesktop = () =>
      cdp.send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });

    await setDesktop();
    await navigateAndWait(baseUrl);

    // 1. Hero orbit
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await delay(1400);
    await waitForFontsAndImages();
    await capture('01-hero-orbit.png');

    // 2. Pantry collection
    await evaluate(`document.querySelector('#pantry').scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await delay(1200);
    await waitForFontsAndImages();
    await capture('02-pantry-collection.png');

    // 3. Orchard editorial
    await evaluate(`document.querySelector('#orchard').scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await delay(1200);
    await waitForFontsAndImages();
    await capture('03-orchard-editorial.png');

    // 4. Rituals editorial
    await evaluate(`document.querySelector('#rituals').scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await delay(1200);
    await waitForFontsAndImages();
    await capture('04-rituals-editorial.png');

    // 5. Contact footer
    await evaluate(`document.querySelector('#contact').scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await delay(1200);
    await waitForFontsAndImages();
    await capture('05-contact-footer.png');

    // 6. Product detail modal (Wild fig)
    await evaluate(`document.querySelector('[data-open-product="2"]').click()`);
    await delay(1100);
    await waitForFontsAndImages();
    const detailState = await evaluate(`(() => ({
      open: Boolean(document.getElementById('product-dialog')?.open),
      hash: window.location.hash,
      title: document.getElementById('dialog-title')?.textContent?.trim() || '',
    }))()`);
    assert(detailState.open, '#product-dialog did not open on clicking [data-open-product="2"]');
    assert(
      detailState.hash === '#product=wild-fig',
      `Expected hash "#product=wild-fig", got "${detailState.hash}"`,
    );
    await capture('06-product-detail.png');

    // Smoke check: Escape closes #product-dialog
    await cdp.send('Input.dispatchKeyEvent', {
      type: 'rawKeyDown',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 27,
      nativeVirtualKeyCode: 27,
    });
    await cdp.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 27,
      nativeVirtualKeyCode: 27,
    });
    await delay(200);
    const closedOnEsc = await evaluate(`!document.getElementById('product-dialog')?.open`);
    assert(closedOnEsc, '#product-dialog did not close on Escape key');

    // 7. Fullscreen navigation drawer
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await evaluate(`document.querySelector('#menu-toggle').click()`);
    await delay(500);
    const menuOpen = await evaluate(`document.getElementById('site-menu')?.hidden === false`);
    assert(menuOpen, '#site-menu did not open on clicking #menu-toggle');
    await capture('07-navigation-menu.png');

    // 8. Mobile responsive
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    await reloadClean();
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await delay(1200);
    await waitForFontsAndImages();
    const menuClosedOnMobile = await evaluate(`document.getElementById('site-menu')?.hidden === true`);
    assert(menuClosedOnMobile, '#site-menu should be closed after mobile reload');
    await capture('08-mobile-responsive.png');

    // Smoke check: language toggle EN <-> ES
    const langFlow = await evaluate(`(() => {
      const btn = document.getElementById('lang-toggle');
      if (!btn) return { missing: true };
      const initial = document.documentElement.lang;
      btn.click();
      const afterFirst = document.documentElement.lang;
      btn.click();
      const afterSecond = document.documentElement.lang;
      return { missing: false, initial, afterFirst, afterSecond };
    })()`);
    assert(!langFlow.missing, '#lang-toggle button was not found in DOM');
    assert(langFlow.initial === 'en', `Expected initial <html lang> to be "en", got "${langFlow.initial}"`);
    assert(langFlow.afterFirst === 'es', `Expected <html lang> after first toggle to be "es", got "${langFlow.afterFirst}"`);
    assert(langFlow.afterSecond === 'en', `Expected <html lang> after second toggle to be "en", got "${langFlow.afterSecond}"`);

    assert(pageErrors.length === 0, `Page errors detected:\n${pageErrors.join('\n')}`);
    console.log('OK: Captured 8 screenshots into docs/screenshots/ and passed all CDP smoke checks.');
  } finally {
    cdp?.close();
    if (chromeProc && chromeProc.exitCode === null) {
      chromeProc.kill('SIGTERM');
      await delay(300);
      if (chromeProc.exitCode === null) chromeProc.kill('SIGKILL');
    }
    await rm(userDataDir, { recursive: true, force: true });
    server.closeAllConnections?.();
    server.close();
  }
}

run().catch(error => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
