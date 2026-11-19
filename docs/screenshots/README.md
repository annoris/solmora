# SOLMORA Screenshot Suite

This directory contains the 8 automated live-rendered screenshots of **SOLMORA — Mediterranean Orchard Preserves**, captured over headless Google Chrome DevTools Protocol (CDP) by [`scripts/capture-screenshots.mjs`](../../scripts/capture-screenshots.mjs).

## Captured Screenshots

| File | Viewport | Pixel Size | Captured State & Selector | Visual Focus |
| :--- | :--- | :--- | :--- | :--- |
| [`01-hero-orbit.png`](01-hero-orbit.png) | `1440×900` (`@1x`) | `1440×900` | `#home` at scroll `y = 0` | Fullscreen cream stage, `solmora` botanical header, inclined `.jar-orbit`, curved `.orbit-seal`, burgundy `.hero-shape`, `.hero-product`, `.orbit-controls`, and `SCROLL TO DISCOVER`. |
| [`02-pantry-collection.png`](02-pantry-collection.png) | `1440×900` (`@1x`) | `1440×900` | `#pantry` scrolled into view | Eyebrow, botanical asterisk (`✳`), two-tone *"Good things. In good time."* display headline, two-column intro, and top row of `.pantry-grid` studio jars. |
| [`03-orchard-editorial.png`](03-orchard-editorial.png) | `1440×900` (`@1x`) | `1440×900` | `#orchard` scrolled into view | Warm sand `#f3e5d6` section pairing the tilted arched Mediterranean grove photograph (`orchard-editorial.png`) with *"A slower kind of beautiful."* editorial copy. |
| [`04-rituals-editorial.png`](04-rituals-editorial.png) | `1440×900` (`@1x`) | `1440×900` | `#rituals` scrolled into view | *"Make room for the good."* heading above staggered sourdough breakfast (`breakfast-editorial.png`) and oak cheeseboard (`cheeseboard-editorial.png`) photography. |
| [`05-contact-footer.png`](05-contact-footer.png) | `1440×900` (`@1x`) | `1440×900` | `#contact` scrolled into view | Full-bleed `#762530` wine band featuring *"Shall we share some sunshine?"*, circular `Say hello` trigger, hairline divider, oversized `solmora` footer wordmark, and section links. |
| [`06-product-detail.png`](06-product-detail.png) | `1440×900` (`@1x`) | `1440×900` | `#product-dialog` open (`[data-open-product="2"]`, `#product=wild-fig`) | Fullscreen *Wild fig* modal showing uppercase `#e94e1b` display title, complete unclipped tilted jar (`240 g`), category/collection metadata, `Made for slow discovery`, `prev — next`, and `back to the pantry ×`. |
| [`07-navigation-menu.png`](07-navigation-menu.png) | `1440×900` (`@1x`) | `1440×900` | `#site-menu` open (`#menu-toggle` clicked) | Fullscreen `#762530` navigation drawer with crisp cream links (`Home`, `The pantry`, `Our orchard`, `Little rituals`, `Say hello`), inverted header (`CLOSE`), and bottom tagline. |
| [`08-mobile-responsive.png`](08-mobile-responsive.png) | `390×844` (`@2x`) | `780×1688` | Mobile reload at scroll `y = 0` | Compact mobile header, centered `Golden orange` jar, wider burgundy dome housing high-contrast cream `.hero-product` & `.orbit-controls`, and zero horizontal overflow. |

## Automated Smoke Checks During Capture

Running the screenshot script also asserts live DOM & runtime behavior:

1. **Modal & Deep-Link Flow:** Clicking `[data-open-product="2"]` opens `#product-dialog` and sets `window.location.hash` to `#product=wild-fig`.
2. **Keyboard Dismissal:** Dispatching `Escape` closes `#product-dialog`.
3. **Drawer & Mobile Reset:** Clicking `#menu-toggle` reveals `#site-menu`, and reloading in the `390×844` mobile viewport resets `#site-menu` to `hidden`.
4. **Zero Runtime Errors:** Asserts zero `Runtime.exceptionThrown` or `console.error` events across the entire session.

## Regenerating Screenshots

Ensure **Node.js 18+** and **Google Chrome** are installed (override the Chrome binary path via `CHROME_PATH` if not at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`):

```bash
npm run screenshots
```
