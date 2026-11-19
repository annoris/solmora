/* SOLMORA motion: inclined draggable pantry orbit, scroll parallax, and ink headline reveals. */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const orbit = document.querySelector('.jar-orbit');
  const items = orbit ? [...orbit.querySelectorAll('.jar-item')] : [];
  const hero = orbit?.closest('section') || document.querySelector('.hero');
  const seal = document.querySelector('.orbit-seal');
  const shape = document.querySelector('.hero-shape');

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const wrap = (value, length) => ((value + length / 2) % length + length) % length - length / 2;

  let position = 0;
  let target = 0;
  let speed = 0;
  let dragging = false;
  let pointerId;
  let dragStart = 0;
  let dragPosition = 0;
  let lastX = 0;
  let lastDragTime = 0;
  let px = 0;
  let py = 0;
  let smoothX = 0;
  let smoothY = 0;
  let previous = performance.now();
  let pausedUntil = 0;
  let activeProduct = -1;
  let frame;
  let viewportVisible = true;
  let width = innerWidth;
  let spacing = width / 4;
  let hovered = null;
  let hasDragged = false;
  let pressedItem = null;

  const resize = () => {
    width = hero?.clientWidth || innerWidth;
    spacing = width / (width <= 700 ? 1.9 : 3.7);
    orbit?.style.setProperty('--jar-width', `${clamp(width <= 700 ? width * 0.48 : width * 0.225, 170, 350)}px`);
  };

  const announce = () => {
    if (!items.length) return;
    const nearest = ((Math.round(position) % items.length) + items.length) % items.length;
    const raw = items[nearest].dataset.product;
    const index = Number.isFinite(Number(raw)) ? Number(raw) : nearest % Math.max(1, items.length / 2);

    if (activeProduct !== index) {
      activeProduct = index;
      document.dispatchEvent(new CustomEvent('productchange', { detail: { index } }));
      items.forEach((item, itemIndex) => {
        item.classList.toggle('is-current', itemIndex === nearest);
        item.setAttribute('aria-current', itemIndex === nearest ? 'true' : 'false');
      });
    }
  };

  const draw = now => {
    const dt = Math.min(0.035, Math.max(0.001, (now - previous) / 1000));
    previous = now;
    const moving = !reduced.matches && viewportVisible && !document.hidden;

    if (!dragging && moving) {
      if (now > pausedUntil) target += 0.105 * dt;
      const acceleration = (target - position) * 52 - speed * 11;
      speed += acceleration * dt;
      position += speed * dt;
    } else if (reduced.matches) {
      position = target;
      speed = 0;
    }

    smoothX += ((moving ? px : 0) - smoothX) * Math.min(1, dt * 4);
    smoothY += ((moving ? py : 0) - smoothY) * Math.min(1, dt * 4);

    items.forEach((item, index) => {
      const distance = wrap(index - position, items.length);
      const x = distance * spacing;
      const focus = Math.exp(-distance * distance * 0.4);
      const y = x * 0.16;
      const scale = 0.66 + focus * 0.48;
      const hover = item === hovered && moving ? 1 : 0;
      const rotation = Math.sin(distance * 0.8 + index * 0.28) * 13 - clamp(speed * 4, -7, 7);

      item.style.transform =
        `translate(-50%, -50%) translate3d(${x + smoothX * focus * 18}px,${y + smoothY * focus * 12 - hover * 14}px,0) ` +
        `rotate(${rotation}deg) scale(${scale + hover * 0.04})`;
      item.style.opacity = '1';
      item.style.zIndex = String(Math.round(focus * 20) + 2);
      item.style.filter = 'none';
      item.style.setProperty('--jar-turn', `${smoothX * 12 + hover * 14 - clamp(speed * 12, -20, 20)}deg`);
    });

    if (seal) {
      seal.style.transform = `translate(-50%, -50%) rotate(${-position * 9}deg)`;
    }

    if (shape) {
      shape.style.setProperty('--shape-x', `${smoothX * -14}px`);
      shape.style.setProperty('--shape-y', `${Math.max(0, smoothY * -10)}px`);
    }

    announce();
    frame = requestAnimationFrame(draw);
  };

  if (orbit && items.length) {
    resize();
    orbit.classList.add('is-orbit-ready');
    hero?.classList.add('is-motion-ready');

    const step = direction => {
      target = Math.round(position) + direction;
      pausedUntil = performance.now() + 4200;
      if (reduced.matches) position = target;
    };

    document.querySelector('#orbit-prev')?.addEventListener('click', () => step(-1));
    document.querySelector('#orbit-next')?.addEventListener('click', () => step(1));

    orbit.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        step(event.key === 'ArrowRight' ? 1 : -1);
      }
    });

    orbit.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('a,button:not(.jar-item)')) return;
      dragging = true;
      hasDragged = false;
      pointerId = event.pointerId;
      pressedItem = event.target.closest('.jar-item');
      dragStart = lastX = event.clientX;
      dragPosition = position;
      lastDragTime = performance.now();
      speed = 0;
      orbit.classList.add('is-dragging');
      orbit.setPointerCapture(event.pointerId);
    });

    orbit.addEventListener('pointermove', event => {
      if (!dragging || event.pointerId !== pointerId) return;
      const now = performance.now();
      const displacement = event.clientX - dragStart;
      if (Math.abs(displacement) > 6) hasDragged = true;
      speed = -(event.clientX - lastX) / spacing / Math.max(0.008, (now - lastDragTime) / 1000);
      target = position = dragPosition - displacement / spacing;
      lastX = event.clientX;
      lastDragTime = now;
    });

    const release = () => {
      if (!dragging) return;
      dragging = false;
      target = position + clamp(speed * 0.16, -1.4, 1.4);

      if (!hasDragged && pressedItem) {
        target = position + wrap(items.indexOf(pressedItem) - position, items.length);
        if (pressedItem.getAttribute('aria-current') === 'true') {
          document.dispatchEvent(
            new CustomEvent('productactivate', {
              detail: { index: Number(pressedItem.dataset.product) }
            })
          );
        }
      }

      pressedItem = null;
      if (reduced.matches) target = Math.round(target);
      pausedUntil = performance.now() + 1500;
      orbit.classList.remove('is-dragging');
    };

    orbit.addEventListener('pointerup', release);
    orbit.addEventListener('pointercancel', release);

    orbit.addEventListener(
      'click',
      event => {
        if (hasDragged) {
          event.preventDefault();
          event.stopPropagation();
          hasDragged = false;
          return;
        }
        const item = event.target.closest('.jar-item');
        if (!item) return;
        const index = items.indexOf(item);
        target = position + wrap(index - position, items.length);
        pausedUntil = performance.now() + 4200;
      },
      true
    );

    orbit.addEventListener(
      'wheel',
      event => {
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) && !event.shiftKey) return;
        event.preventDefault();
        target += clamp(((event.deltaX || event.deltaY) / spacing) * 0.65, -0.7, 0.7);
        pausedUntil = performance.now() + 1400;
      },
      { passive: false }
    );

    items.forEach(item => {
      item.addEventListener('pointerenter', () => {
        hovered = item;
        pausedUntil = performance.now() + 1000;
      });
      item.addEventListener('pointerleave', () => {
        if (hovered === item) hovered = null;
      });
    });

    hero?.addEventListener(
      'pointermove',
      event => {
        if (event.pointerType === 'touch') return;
        const rect = hero.getBoundingClientRect();
        px = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        py = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      },
      { passive: true }
    );

    hero?.addEventListener('pointerleave', () => {
      px = 0;
      py = 0;
      hovered = null;
    });

    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(entries => {
        viewportVisible = entries[0].isIntersecting;
      }).observe(hero);
    }

    addEventListener('resize', resize, { passive: true });
    frame = requestAnimationFrame(draw);
  }

  /* Vertical scroll parallax for [data-parallax] elements such as .orchard-art */
  const parallaxElements = [...document.querySelectorAll('[data-parallax]')];
  let parallaxTicking = false;

  const updateParallax = () => {
    parallaxTicking = false;
    if (!parallaxElements.length) return;

    if (reduced.matches) {
      parallaxElements.forEach(el => el.style.setProperty('--parallax-y', '0px'));
      return;
    }

    const viewportHeight = innerHeight || 800;
    parallaxElements.forEach(el => {
      const speedRatio = Number(el.dataset.parallax) || 0.08;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - viewportHeight / 2) * -speedRatio;
      el.style.setProperty('--parallax-y', `${clamp(offset, -48, 48).toFixed(2)}px`);
    });
  };

  const scheduleParallax = () => {
    if (!parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(updateParallax);
    }
  };

  if (parallaxElements.length) {
    updateParallax();
    addEventListener('scroll', scheduleParallax, { passive: true });
    addEventListener('resize', scheduleParallax, { passive: true });
  }

  /* Clipped-character ink reveals for display headings */
  const buildInkReveal = element => {
    if (!/^H[1-4]$/.test(element.tagName)) return;
    if (element.querySelector('.ink-mask')) return;

    const wasRevealed = element.classList.contains('is-revealed');
    const copy = element.cloneNode(true);
    copy.querySelectorAll('br').forEach(br => br.replaceWith(' '));
    element.setAttribute('aria-label', copy.textContent.trim());

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let index = 0;
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent
        .split(/(\s+)/)
        .filter(Boolean)
        .forEach(word => {
          if (/^\s+$/.test(word)) {
            fragment.append(document.createTextNode(word));
            return;
          }
          const mask = document.createElement('span');
          mask.className = 'ink-mask';
          mask.setAttribute('aria-hidden', 'true');
          [...word].forEach(letter => {
            const char = document.createElement('span');
            char.className = 'ink-char';
            char.textContent = letter;
            char.style.setProperty('--ink-delay', `${index++ * 20}ms`);
            mask.append(char);
          });
          fragment.append(mask);
        });
      node.replaceWith(fragment);
    });

    element.classList.add('ink-reveal');
    if (wasRevealed || reduced.matches) {
      element.classList.add('is-revealed');
    }
  };

  const reveals = [...document.querySelectorAll('[data-reveal]')];
  reveals.forEach(buildInkReveal);

  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('has-motion');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-revealed'));
  }

  document.addEventListener('solmora:langchange', () => {
    reveals.forEach(buildInkReveal);
  });

  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      reveals.forEach(element => element.classList.add('is-revealed'));
      position = target;
      speed = 0;
    }
    px = 0;
    py = 0;
    updateParallax();
  });

  addEventListener('pagehide', () => cancelAnimationFrame(frame));
})();
