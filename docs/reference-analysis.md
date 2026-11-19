# Agrumea reference analysis

Source inspected: https://www.agrumeafarm.it/en on November 19, 2026. This report distinguishes public-source evidence from creative adaptation. Browser automation was unavailable during this inspection, so no current rendered screenshot or visual interaction test is claimed.

## Verified visual system

The public HTML and embedded styles define warm cream `#fdf3eb`, vivid orange `#e94e1b`, burgundy `#762530`, and yellow `#f39200`. Display typography uses IvyMode; supporting type uses IvyStyle Sans, with serif and sans system fallbacks. This is an elegant Mediterranean pantry identity rather than the acid-green, condensed-type treatment of SweetTape.

The homepage is a viewport-height product stage (`.jar-slider`), not a conventional headline-and-card hero. Its accessible H1 is visually hidden. An organic orange SVG rises from the bottom, with oversized circular lettering behind the products. A diagonal product track is rotated 10 degrees, positioned at 55% of the viewport, with individual jars approximately 200 × 320px. A fixed header exposes language selection and an animated menu label. A small scroll prompt anchors the bottom. Ten jar products link to individual pantry routes.

Mobile styles move the track to 45%, size jars to 24.33vw × 39.13vw, enlarge the backdrop to 120vw, and reduce the circular artwork to 72% of its parent. Tablet has a 43% track position. Desktop parallax is deliberately restrained: backdrop offsets up to approximately 14px horizontally and 10px vertically, with smaller offsets on the circular badge.

The navigation lists Home, Pantry, Production, Experience, About, Contacts, and Shop. These are separate routes. The homepage server-rendered markup does not substantiate a long sequence of editorial sections; any such sections in SOLMORA are an adaptation, not a claim of exact reference structure.

## Verified technology and motion

Public files inspected:

- `/_nuxt/B5Ey9qla.js`: Nuxt/Vue runtime, GSAP, ScrollTrigger, Lenis, custom text reveal logic, menu and transition code.
- `/_nuxt/fKmsXwpK.js`: homepage product-stage controller, Three.js-style `WebGLRenderer`, texture loading, scene geometry, requestAnimationFrame, pointer and wheel event handlers.
- `/_nuxt/CmsHomePage.CpbPGEL3.css`: stage layout and responsive rules.
- `/images/home/back-slider-home.svg` and `/images/home/circle-text-en.svg`: organic backdrop and circular lettering artwork.

The jar presentation combines a base photograph with a separately rendered cylindrical label. Renderer settings include alpha and antialiasing. Label configuration includes cylinder top 0.27, bottom 0.87, width 0.885, curvature 3 and front rotation 182 degrees. Product movement is a custom frame loop with spring-like value/velocity state. The track handles dragging, wheel input, speed-dependent transforms and pointer parallax. The badge rotation is tied to track position, with different desktop and mobile coefficients; it is not merely a generic endless CSS spinner.

Text reveal defaults are explicit: characters move 108% over 0.95 seconds with 0.02-second stagger; lines move 112% over 0.55 seconds with 0.08-second stagger. Clipping wrappers conceal text before reveal. Menu labels contain duplicate character layers for rolling transitions. Page transitions define an orange cover sweep, approximately 0.9-second cover, 975ms lift and 1.8-second total choreography. Reduced-motion overrides set transition durations to zero.

## SOLMORA adaptation priorities

Preserve the warm cream/orange/burgundy palette, premium serif typography, generous negative space and product-first composition. Build an immediately moving diagonal jar ribbon, pointer-driven depth, a large readable rotating seal and an orange organic backdrop. Dragging and wheel interaction should affect the ribbon perceptibly; clicking a jar should open meaningful product details. Use clipping-based type entrances and rolling menu labels instead of importing LUMA's bouncing condensed headline.

Use original SOLMORA branding and packaging. The reference's named products, photographs, logo and custom SVG artwork should not be represented as original SOLMORA assets. Approximating the label illusion with layered original artwork is a valid implementation tradeoff if a full WebGL cylinder is not implemented; document that distinction. Keep reduced-motion controls, keyboard operation, touch dragging and a readable static fallback.

## Visual direction review after first implementation

The initial desktop capture (`/tmp/solmora-browser-qa/desktop.png`) is functionally plausible but materially below the reference's art direction. Five issues require revision: the jars read as empty translucent plastic rather than dense artisanal preserves; the ribbon does not establish a coherent diagonal; thin, widely spaced seal lettering loses visual presence; the central caption competes with the active jar; and the product modal substitutes a generic citrus icon for the actual product. These are visual-quality failures, not test failures.

The black-mulberry reference product route (`/en/dispensa/gelsi_neri`) establishes a much richer product journey. Its public CSS places a huge uppercase orange serif product name across 95% of the viewport at approximately 48% height, behind a centered jar. Scroll progress moves, rotates and scales the jar while the title falls; category and origin occupy opposing lower corners. Below this stage, centered sensory copy and ingredients lead to a three-column ruled information area for tips, weights and shelf life, then a photographic gallery and other products.

Revision priorities: create convincing original product material with dense filling, meaningful glass highlights and dark metal lids; simplify the home stage around a consistent diagonal; increase the circular seal's display presence; move product captions away from the active silhouette; replace the generic modal with an editorial product page or full-screen scrollable product view. Apricot must never be represented by the same citrus illustration used for lemon. A final review must judge rendered composition, materials, scale, typography and product specificity in addition to interaction correctness.
