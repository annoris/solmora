import { access, readFile, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'index.html');
const html = await readFile(indexPath, 'utf8');

const CORE_PNG_ASSETS = [
  'jar-orange.png',
  'jar-lemon.png',
  'jar-fig.png',
  'jar-blood-orange.png',
  'jar-apricot.png',
  'orchard-editorial.png',
  'breakfast-editorial.png',
  'cheeseboard-editorial.png',
];

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const seenIds = new Set();
const duplicateIds = [];
for (const id of ids) {
  if (seenIds.has(id)) duplicateIds.push(id);
  seenIds.add(id);
}
if (duplicateIds.length) {
  throw new Error(`Duplicate HTML IDs found: ${[...new Set(duplicateIds)].join(', ')}`);
}

let resources = 0;

function isExternalOrSpecial(ref) {
  return !ref || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(ref);
}

async function checkReference(ref, from, { allowHtmlAnchors = false } = {}) {
  const trimmed = ref.trim();
  if (isExternalOrSpecial(trimmed)) return false;
  if (trimmed.startsWith('#')) {
    if (allowHtmlAnchors && !seenIds.has(trimmed.slice(1))) {
      throw new Error(`Missing anchor in ${from}: ${trimmed}`);
    }
    return false;
  }
  const rawPath = trimmed.split(/[?#]/)[0];
  if (!rawPath) return false;
  let cleanPath = rawPath;
  try {
    cleanPath = decodeURIComponent(rawPath);
  } catch {
    // Keep raw path if not valid percent-encoding.
  }
  const target = resolve(
    cleanPath.startsWith('/') ? root : dirname(from),
    cleanPath.replace(/^\/+/, ''),
  );
  await access(target);
  return true;
}

for (const [, ref] of html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
  if (await checkReference(ref, indexPath, { allowHtmlAnchors: true })) resources++;
}

for (const [metaTag] of html.matchAll(/<meta\b[^>]*>/gi)) {
  const attr = name => metaTag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1];
  const key = (attr('property') || attr('name') || '').toLowerCase();
  if (key === 'og:image' || key === 'twitter:image') {
    const content = attr('content');
    if (content && await checkReference(content, indexPath)) resources++;
  }
}

async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(entryPath));
    else result.push(entryPath);
  }
  return result;
}

let scripts = 0;
for (const filePath of await walk(root)) {
  const ext = extname(filePath);
  if (ext === '.js' || ext === '.mjs') {
    execFileSync(process.execPath, ['--check', filePath], { stdio: 'inherit' });
    scripts++;
  }
  if (ext === '.css') {
    const css = await readFile(filePath, 'utf8');
    for (const [, ref] of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/gi)) {
      if (await checkReference(ref, filePath)) resources++;
    }
  }
}

for (const assetName of CORE_PNG_ASSETS) {
  const assetPath = join(root, 'assets', 'images', assetName);
  let info;
  try {
    info = await stat(assetPath);
  } catch {
    throw new Error(`Missing required PNG asset: assets/images/${assetName}`);
  }
  if (!info.isFile() || info.size <= 0) {
    throw new Error(`Core PNG asset is empty or invalid: assets/images/${assetName}`);
  }
}

let readmeImages = 0;
const readmePath = join(root, 'README.md');
let readme = null;
try {
  readme = await readFile(readmePath, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (readme !== null) {
  const prose = readme
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '');

  for (const match of prose.matchAll(/!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/g)) {
    const ref = match[1] || match[2];
    if (await checkReference(ref, readmePath)) readmeImages++;
  }

  for (const match of prose.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    if (await checkReference(match[1], readmePath)) readmeImages++;
  }
}

console.log(
  `OK: ${resources} local resource references, HTML anchors, ${CORE_PNG_ASSETS.length} core PNG assets, ${readmeImages} README image references, and ${scripts} JavaScript files verified.`,
);
