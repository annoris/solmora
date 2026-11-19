'use strict';

(() => {
  const PRODUCTS = [
    {
      slug: 'golden-orange',
      image: 'orange',
      width: 1217,
      height: 1292,
      en: {
        name: 'Golden orange',
        subtitle: 'Bright peel. Slow mornings. Pure sunshine.',
        type: 'ORCHARD MARMALADE',
        cardType: 'MARMALADE',
        cardTagline: 'Our sunny side.',
        ariaLabel: 'Discover golden orange marmalade',
        cardAlt: 'Studio photograph of a glass jar of Solmora Golden orange marmalade',
        dialogAlt: 'Golden orange preserve jar',
        description:
          'The sunny one. An imagined orange marmalade with a bright citrus edge, soft shreds of peel, and a beautifully bittersweet finish.',
        notes: 'Bright citrus · Fine peel · A bittersweet finish',
        pairing:
          'Spread generously over warm sourdough, swirl into yogurt, or share with a buttery pastry.',
        ingredients:
          'An original concept pairing of orange pulp, peel, sugar, and lemon juice.',
        collection: 'THE SOLMORA COLLECTION',
        perspective:
          '240 g concept jar. This is a fictional product presentation, with no sales or nutritional claims.'
      },
      es: {
        name: 'Naranja dorada',
        subtitle: 'Piel luminosa. Mañanas lentas. Sol en frasco.',
        type: 'MERMELADA DE HUERTO',
        cardType: 'MERMELADA',
        cardTagline: 'Nuestro lado más soleado.',
        ariaLabel: 'Descubrir mermelada de naranja dorada',
        cardAlt: 'Fotografía de estudio de un frasco de mermelada de Naranja dorada Solmora',
        dialogAlt: 'Frasco de mermelada de Naranja dorada',
        description:
          'La más luminosa. Una mermelada de naranja imaginada con un toque cítrico vibrante, tiras suaves de piel y un final agridulce equilibrado.',
        notes: 'Cítrico vibrante · Piel fina · Final agridulce',
        pairing:
          'Unta con generosidad sobre pan de masa madre tibio, mezcla con yogur o acompaña un hojaldre recién horneado.',
        ingredients:
          'Combinación conceptual original de pulpa de naranja, piel, azúcar y zumo de limón.',
        collection: 'LA COLECCIÓN SOLMORA',
        perspective:
          'Frasco conceptual de 240 g. Presentación ficticia de producto, sin ventas ni declaraciones nutricionales.'
      }
    },
    {
      slug: 'lemon-vanilla',
      image: 'lemon',
      width: 1176,
      height: 1338,
      en: {
        name: 'Lemon & vanilla',
        subtitle: 'A softer kind of zing.',
        type: 'ORCHARD PRESERVE',
        cardType: 'PRESERVE',
        cardTagline: 'A softer kind of zing.',
        ariaLabel: 'Discover lemon and vanilla preserve',
        cardAlt: 'Studio photograph of a glass jar of Solmora Lemon and vanilla preserve',
        dialogAlt: 'Lemon and vanilla preserve jar',
        description:
          'Sharp meets soft. A playful concept pairing of vibrant lemon and mellow vanilla, made for mornings that could use a little lift.',
        notes: 'Fresh lemon · Soft vanilla · A gentle citrus lift',
        pairing:
          'Spoon over ricotta, tuck into a sponge cake, or make your breakfast toast a little more interesting.',
        ingredients:
          'An original concept pairing of lemon pulp, fine peel, vanilla, and sugar.',
        collection: 'THE SOLMORA COLLECTION',
        perspective:
          '240 g concept jar. This is a fictional product presentation, with no sales or nutritional claims.'
      },
      es: {
        name: 'Limón y vainilla',
        subtitle: 'Un chispeo más suave.',
        type: 'CONFITURA DE HUERTO',
        cardType: 'CONFITURA',
        cardTagline: 'Un chispeo más suave.',
        ariaLabel: 'Descubrir confitura de limón y vainilla',
        cardAlt: 'Fotografía de estudio de un frasco de confitura de Limón y vainilla Solmora',
        dialogAlt: 'Frasco de confitura de Limón y vainilla',
        description:
          'Lo ácido se vuelve suave. Una mezcla alegre de limón vibrante y vainilla cálida, pensada para mañanas que piden un poco de luz.',
        notes: 'Limón fresco · Vainilla suave · Toque cítrico delicado',
        pairing:
          'Sirve sobre requesón fresco, rellena un bizcocho casero o dale un giro distinto a tu tostada del desayuno.',
        ingredients:
          'Combinación conceptual original de pulpa de limón, piel fina, vainilla y azúcar.',
        collection: 'LA COLECCIÓN SOLMORA',
        perspective:
          'Frasco conceptual de 240 g. Presentación ficticia de producto, sin ventas ni declaraciones nutricionales.'
      }
    },
    {
      slug: 'wild-fig',
      image: 'fig',
      width: 1184,
      height: 1328,
      en: {
        name: 'Wild fig',
        subtitle: 'Deeply, deliciously mellow.',
        type: 'ORCHARD PRESERVE',
        cardType: 'PRESERVE',
        cardTagline: 'Deeply, deliciously mellow.',
        ariaLabel: 'Discover wild fig preserve',
        cardAlt: 'Studio photograph of a glass jar of Solmora Wild fig preserve',
        dialogAlt: 'Wild fig preserve jar',
        description:
          'An ode to late-summer afternoons. Rich, mellow fig with a gentle sweetness and the spirit of an unhurried Mediterranean table.',
        notes: 'Late-summer fruit · Soft seeds · Mellow sweetness',
        pairing:
          'Try with a favorite cheese, toasted walnuts, and friends who never say no to one more story.',
        ingredients:
          'An original concept pairing of ripe figs, sugar, and a little lemon juice.',
        collection: 'THE SOLMORA COLLECTION',
        perspective:
          '240 g concept jar. This is a fictional product presentation, with no sales or nutritional claims.'
      },
      es: {
        name: 'Higo silvestre',
        subtitle: 'Profundo, meloso y sereno.',
        type: 'CONFITURA DE HUERTO',
        cardType: 'CONFITURA',
        cardTagline: 'Profundo, meloso y sereno.',
        ariaLabel: 'Descubrir confitura de higo silvestre',
        cardAlt: 'Fotografía de estudio de un frasco de confitura de Higo silvestre Solmora',
        dialogAlt: 'Frasco de confitura de Higo silvestre',
        description:
          'Una oda a las tardes de finales de verano. Higo maduro y meloso, de dulzor sereno, con el espíritu de una sobremesa mediterránea sin prisa.',
        notes: 'Fruta de fin de verano · Semillas finas · Dulzor meloso',
        pairing:
          'Pruébalo con tu queso favorito, nueces tostadas y buena compañía que siempre alarga la conversación.',
        ingredients:
          'Combinación conceptual original de higos maduros, azúcar y un toque de zumo de limón.',
        collection: 'LA COLECCIÓN SOLMORA',
        perspective:
          'Frasco conceptual de 240 g. Presentación ficticia de producto, sin ventas ni declaraciones nutricionales.'
      }
    },
    {
      slug: 'blood-orange',
      image: 'blood-orange',
      width: 1199,
      height: 1312,
      en: {
        name: 'Blood orange',
        subtitle: 'A beautiful little bittersweet.',
        type: 'ORCHARD MARMALADE',
        cardType: 'MARMALADE',
        cardTagline: 'A beautiful little bittersweet.',
        ariaLabel: 'Discover blood orange marmalade',
        cardAlt: 'Studio photograph of a glass jar of Solmora Blood orange marmalade',
        dialogAlt: 'Blood orange preserve jar',
        description:
          'The bold one. Deep citrus character and a lively bittersweet twist, imagined for anyone who likes a little personality in their pantry.',
        notes: 'Deep citrus · Ruby fruit · A lively bitter edge',
        pairing:
          'Layer into a dark chocolate tart, serve with a fresh scone, or brighten a simple slice of toast.',
        ingredients:
          'An original concept pairing of blood orange pulp, peel, sugar, and lemon juice.',
        collection: 'THE SOLMORA COLLECTION',
        perspective:
          '240 g concept jar. This is a fictional product presentation, with no sales or nutritional claims.'
      },
      es: {
        name: 'Naranja sanguina',
        subtitle: 'Un hermoso punto agridulce.',
        type: 'MERMELADA DE HUERTO',
        cardType: 'MERMELADA',
        cardTagline: 'Un hermoso punto agridulce.',
        ariaLabel: 'Descubrir mermelada de naranja sanguina',
        cardAlt: 'Fotografía de estudio de un frasco de mermelada de Naranja sanguina Solmora',
        dialogAlt: 'Frasco de mermelada de Naranja sanguina',
        description:
          'La de carácter intenso. Cítrico profundo y un vivo giro agridulce, pensada para quienes disfrutan de sabores con personalidad en la despensa.',
        notes: 'Cítrico profundo · Fruta rubí · Amargor vivaz',
        pairing:
          'Extiende sobre una tarta de chocolate negro, sirve con bollitos tibios o despierta una simple rebanada de pan.',
        ingredients:
          'Combinación conceptual original de pulpa de naranja sanguina, piel, azúcar y zumo de limón.',
        collection: 'LA COLECCIÓN SOLMORA',
        perspective:
          'Frasco conceptual de 240 g. Presentación ficticia de producto, sin ventas ni declaraciones nutricionales.'
      }
    },
    {
      slug: 'apricot-rosemary',
      image: 'apricot',
      width: 1199,
      height: 1312,
      en: {
        name: 'Apricot & rosemary',
        subtitle: 'Summer, with a wild streak.',
        type: 'ORCHARD PRESERVE',
        cardType: 'PRESERVE',
        cardTagline: 'Summer, with a wild streak.',
        ariaLabel: 'Discover apricot and rosemary preserve',
        cardAlt: 'Studio photograph of a glass jar of Solmora Apricot and rosemary preserve',
        dialogAlt: 'Apricot and rosemary preserve jar',
        description:
          'A little golden, a little unexpected. Soft apricot and the fragrant idea of rosemary come together in this orchard-inspired concept.',
        notes: 'Golden fruit · Fragrant herbs · A sun-warmed finish',
        pairing:
          'Spoon onto a warm croissant, pair with creamy cheese, or finish an easy summer dessert.',
        ingredients:
          'An original concept pairing of apricot, rosemary, sugar, and lemon juice.',
        collection: 'THE SOLMORA COLLECTION',
        perspective:
          '240 g concept jar. This is a fictional product presentation, with no sales or nutritional claims.'
      },
      es: {
        name: 'Albaricoque y romero',
        subtitle: 'Verano con un punto silvestre.',
        type: 'CONFITURA DE HUERTO',
        cardType: 'CONFITURA',
        cardTagline: 'Verano con un punto silvestre.',
        ariaLabel: 'Descubrir confitura de albaricoque y romero',
        cardAlt: 'Fotografía de estudio de un frasco de confitura de Albaricoque y romero Solmora',
        dialogAlt: 'Frasco de confitura de Albaricoque y romero',
        description:
          'Un punto dorado, un giro inesperado. Albaricoque suave y el aroma fragante del romero se unen en este concepto inspirado en el huerto.',
        notes: 'Fruta dorada · Hierbas aromáticas · Final cálido al sol',
        pairing:
          'Sirve sobre un cruasán tibio, acompaña con queso cremoso o corona un postre sencillo de verano.',
        ingredients:
          'Combinación conceptual original de albaricoque, romero, azúcar y zumo de limón.',
        collection: 'LA COLECCIÓN SOLMORA',
        perspective:
          'Frasco conceptual de 240 g. Presentación ficticia de producto, sin ventas ni declaraciones nutricionales.'
      }
    }
  ];

  const UI_COPY = {
    en: {
      docTitle: 'Solmora — A little sun, preserved.',
      langButtonLabel: 'EN',
      langButtonAria: 'Switch language to Spanish',
      menuWordOpen: 'close',
      menuWordClosed: 'menu',
      sealText: 'A LITTLE SUN, PRESERVED. · THE ORCHARD COLLECTION. · ',
      dialogCloseAria: 'Close product details',
      privacyCloseAria: 'Close privacy information',
      prevAria: 'Previous preserve',
      nextAria: 'Next preserve',
      skip: 'Skip to content',
      brandAria: 'Solmora home',
      brandTag: 'ORCHARD & PANTRY',
      navHome: 'Home',
      navPantry: 'The pantry',
      navOrchard: 'Our orchard',
      navRituals: 'Little rituals',
      navContact: 'Say hello',
      tagline: 'A little sun, preserved.',
      taglineUpper: 'A LITTLE SUN, PRESERVED.',
      heroHeading: 'Solmora: orchard marmalades and Mediterranean preserves',
      orbitAria: 'Explore the preserves',
      heroExplore: 'EXPLORE THE COLLECTION',
      prev: 'prev',
      next: 'next',
      scrollPrompt: 'Scroll to discover',
      pantryEyebrow: 'A PANTRY FULL OF POSSIBILITIES',
      pantryTitle: 'Good things.<br><em>In good time.</em>',
      pantryP1:
        'Some things are too good to rush. A ripe piece of fruit. A long breakfast. That last spoonful, straight from the jar.',
      pantryP2:
        'Meet our little collection of orchard-inspired marmalades and preserves. Five bright personalities. Endless delicious possibilities.',
      orchardCaption: 'A sunlit vision of the Mediterranean. Original concept imagery.',
      orchardEyebrow: 'THE SPIRIT OF THE ORCHARD',
      orchardTitle: 'A slower<br>kind of<br><em>beautiful.</em>',
      orchardP1:
        'There’s a rhythm to an orchard. A season for growing. A moment for picking. A quiet kind of magic in letting nature take its time.',
      orchardP2:
        'Solmora is a fictional pantry built around that feeling: thoughtful ingredients, generous tables, and the pleasure of something simple, made special.',
      orchardLink: 'Find your little ritual',
      marqueeAria: 'A little sun, preserved',
      marqueePhrase: 'A little sun, preserved. ✳ ',
      ritualsEyebrow: 'THE EVERYDAY, A LITTLE SWEETER',
      ritualsTitle: 'Make room<br>for <em>the good.</em>',
      ritual1Eyebrow: 'THE SLOW MORNING',
      ritual1Title: 'Toast. Coffee.<br>Absolutely no hurry.',
      ritual1Body:
        'Golden orange, warm sourdough, a sunny spot by the window. A very good place to start.',
      ritual2Eyebrow: 'THE LONG TABLE',
      ritual2Title: 'A little more.<br>For everyone.',
      ritual2Body:
        'Wild fig, a favorite cheese, and friends who stay for one more story. Leave the good stuff out.',
      contactEyebrow: 'GOOD THINGS START WITH A HELLO',
      contactTitle: 'Shall we share<br><em>some sunshine?</em>',
      contactButton: 'Say hello',
      contactNoticeEyebrow: 'CONCEPT NOTE',
      contactMessage:
        'Hello, sunshine! Solmora is an independent concept project. This demo doesn’t send messages or take orders.',
      footerCopy: 'Solmora. A concept, thoughtfully made.',
      privacyBtn: 'Privacy & cookies',
      footerNote: 'No store. Just a little inspiration.',
      dialogClose: 'back to the pantry',
      dialogNavAria: 'Browse preserves',
      detailScroll: 'Made for slow discovery',
      detailNotesLabel: 'THE FLAVOR NOTES',
      detailRitualLabel: 'A LITTLE RITUAL',
      detailRitualHeading: 'Good company.',
      detailRecipeLabel: 'THE CONCEPT RECIPE',
      detailRecipeHeading: 'Simply imagined.',
      detailPerspectiveLabel: 'A LITTLE PERSPECTIVE',
      detailPerspectiveHeading: 'Just for inspiration.',
      detailRelatedLabel: 'ANOTHER SPOONFUL OF SUNSHINE?',
      detailRelatedHeading: 'Meet the rest<br>of the orchard.',
      privacyClose: 'close',
      privacyEyebrow: 'THE SIMPLE VERSION',
      privacyTitle: 'Your privacy.',
      privacyP1:
        'This concept website uses no analytics, advertising, tracking cookies, or forms that send personal information. Its interactions run in your browser.',
      privacyP2:
        'Fonts are loaded from Google Fonts. Your browser contacts that service to display them; system fonts are used if the service is unavailable.',
      privacyP3:
        'No purchases, subscriptions, or account registrations are offered.',
      orchardImgAlt: 'Sunlit Mediterranean orange orchard in warm afternoon light',
      breakfastImgAlt:
        'Orange marmalade on warm sourdough toast with espresso in soft morning light',
      cheeseboardImgAlt:
        'Artisan cheeses, fresh cut figs, crackers, walnuts and fig preserve on a rustic wooden board'
    },
    es: {
      docTitle: 'Solmora — Un poco de sol, en conserva.',
      langButtonLabel: 'ES',
      langButtonAria: 'Switch language to English',
      menuWordOpen: 'cerrar',
      menuWordClosed: 'menú',
      sealText: 'UN POCO DE SOL, EN CONSERVA. · COLECCIÓN DEL HUERTO. · ',
      dialogCloseAria: 'Cerrar detalles del producto',
      privacyCloseAria: 'Cerrar información de privacidad',
      prevAria: 'Conserva anterior',
      nextAria: 'Siguiente conserva',
      skip: 'Saltar al contenido',
      brandAria: 'Inicio de Solmora',
      brandTag: 'HUERTO Y DESPENSA',
      navHome: 'Inicio',
      navPantry: 'La despensa',
      navOrchard: 'Nuestro huerto',
      navRituals: 'Pequeños rituales',
      navContact: 'Saludar',
      tagline: 'Un poco de sol, en conserva.',
      taglineUpper: 'UN POCO DE SOL, EN CONSERVA.',
      heroHeading: 'Solmora: mermeladas de huerto y conservas mediterráneas',
      orbitAria: 'Explorar las conservas',
      heroExplore: 'EXPLORA LA COLECCIÓN',
      prev: 'ant.',
      next: 'sig.',
      scrollPrompt: 'Desliza para descubrir',
      pantryEyebrow: 'UNA DESPENSA LLENA DE POSIBILIDADES',
      pantryTitle: 'Cosas buenas.<br><em>A su debido tiempo.</em>',
      pantryP1:
        'Hay placeres que no admiten prisa. Una fruta en su punto. Un desayuno largo. Esa última cucharada, directa del frasco.',
      pantryP2:
        'Conoce nuestra pequeña colección de mermeladas y confituras inspiradas en el huerto. Cinco personalidades luminosas y mil formas de disfrutarlas.',
      orchardCaption: 'Una visión soleada del Mediterráneo. Imágenes conceptuales originales.',
      orchardEyebrow: 'EL ESPÍRITU DEL HUERTO',
      orchardTitle: 'Una belleza<br>más serena,<br><em>sin prisa.</em>',
      orchardP1:
        'Todo huerto tiene su propio ritmo. Una estación para crecer. Un instante para recoger. Una magia tranquila en dejar que la naturaleza marque el tiempo.',
      orchardP2:
        'Solmora es una despensa ficticia nacida de esa sensación: ingredientes cuidados, mesas generosas y el gusto por lo sencillo hecho especial.',
      orchardLink: 'Encuentra tu pequeño ritual',
      marqueeAria: 'Un poco de sol, en conserva',
      marqueePhrase: 'Un poco de sol, en conserva. ✳ ',
      ritualsEyebrow: 'LO COTIDIANO, UN POCO MÁS DULCE',
      ritualsTitle: 'Haz sitio<br>para <em>lo bueno.</em>',
      ritual1Eyebrow: 'LA MAÑANA LENTA',
      ritual1Title: 'Tostada. Café.<br>Cero prisa.',
      ritual1Body:
        'Naranja dorada, pan de masa madre tibio y un rincón soleado junto a la ventana. Un gran comienzo.',
      ritual2Eyebrow: 'LA MESA LARGA',
      ritual2Title: 'Un poco más.<br>Para todos.',
      ritual2Body:
        'Higo silvestre, un buen queso y amigos que se quedan una historia más. Deja lo bueno en la mesa.',
      contactEyebrow: 'LAS BUENAS HISTORIAS EMPIEZAN CON UN HOLA',
      contactTitle: '¿Compartimos<br><em>un poco de sol?</em>',
      contactButton: 'Di hola',
      contactNoticeEyebrow: 'NOTA CONCEPTUAL',
      contactMessage:
        '¡Hola, rayo de sol! Solmora es un proyecto conceptual independiente. Esta demo no envía mensajes ni acepta pedidos.',
      footerCopy: 'Solmora. Un concepto creado con calma.',
      privacyBtn: 'Privacidad y cookies',
      footerNote: 'Sin tienda. Solo un poco de inspiración.',
      dialogClose: 'volver a la despensa',
      dialogNavAria: 'Recorrer conservas',
      detailScroll: 'Hecho para descubrir despacio',
      detailNotesLabel: 'NOTAS DE SABOR',
      detailRitualLabel: 'UN PEQUEÑO RITUAL',
      detailRitualHeading: 'Buena compañía.',
      detailRecipeLabel: 'LA RECETA CONCEPTUAL',
      detailRecipeHeading: 'Imaginada con calma.',
      detailPerspectiveLabel: 'UNA PEQUEÑA NOTA',
      detailPerspectiveHeading: 'Solo inspiración.',
      detailRelatedLabel: '¿OTRA CUCHARADA DE SOL?',
      detailRelatedHeading: 'Descubre el resto<br>del huerto.',
      privacyClose: 'cerrar',
      privacyEyebrow: 'LA VERSIÓN SENCILLA',
      privacyTitle: 'Tu privacidad.',
      privacyP1:
        'Este sitio conceptual no utiliza analítica, publicidad, cookies de seguimiento ni formularios que envíen datos personales. Todas sus interacciones suceden en tu navegador.',
      privacyP2:
        'Las tipografías se cargan desde Google Fonts. Tu navegador consulta ese servicio para mostrarlas; si no está disponible, se usan fuentes del sistema.',
      privacyP3:
        'No se ofrecen compras, suscripciones ni registros de cuentas.',
      orchardImgAlt: 'Naranjal mediterráneo iluminado por la luz cálida de la tarde',
      breakfastImgAlt:
        'Mermelada de naranja sobre pan tostado de masa madre junto a un espresso bajo luz suave de mañana',
      cheeseboardImgAlt:
        'Quesos artesanos, higos frescos cortados, galletas saladas, nueces y confitura de higo sobre tabla de madera rústica'
    }
  };

  let currentLang = 'en';
  let activeHeroIndex = 0;
  let activeDialogIndex = 0;
  let lastFocusedElement = null;

  const normalizeIndex = index => ((index % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length;

  const yearNode = document.getElementById('year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const mainNode = document.getElementById('main');
  const menu = document.getElementById('site-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const sealText = document.getElementById('seal-text');
  const productTitle = document.getElementById('product-title');
  const productSubtitle = document.getElementById('product-subtitle');
  const orbitPrev = document.getElementById('orbit-prev');
  const orbitNext = document.getElementById('orbit-next');

  const productDialog = document.getElementById('product-dialog');
  const privacyDialog = document.getElementById('privacy-dialog');
  const detailHero = productDialog?.querySelector('.detail-hero');
  const dialogPrev = document.getElementById('dialog-prev');
  const dialogNext = document.getElementById('dialog-next');
  const dialogRelatedButtons = [...document.querySelectorAll('[data-detail-product]')];

  const contactButton = document.getElementById('contact-button');
  const contactMessage = document.getElementById('contact-message');
  const privacyButton = document.getElementById('privacy-button');

  const updateHeroCopy = index => {
    activeHeroIndex = normalizeIndex(index);
    const copy = PRODUCTS[activeHeroIndex][currentLang];
    if (productTitle) productTitle.textContent = copy.name;
    if (productSubtitle) productSubtitle.textContent = copy.subtitle;
  };

  const renderProductDialog = index => {
    activeDialogIndex = normalizeIndex(index);
    const product = PRODUCTS[activeDialogIndex];
    const copy = product[currentLang];

    const titleEl = document.getElementById('dialog-title');
    const typeEl = document.getElementById('dialog-type');
    const collectionEl = document.getElementById('dialog-collection');
    const descriptionEl = document.getElementById('dialog-description');
    const notesEl = document.getElementById('dialog-notes');
    const pairingEl = document.getElementById('dialog-pairing');
    const ingredientsEl = document.getElementById('dialog-ingredients');
    const perspectiveEl = document.getElementById('dialog-perspective');
    const fruitEl = document.getElementById('dialog-fruit');

    if (titleEl) titleEl.textContent = copy.name;
    if (typeEl) typeEl.textContent = copy.type;
    if (collectionEl) collectionEl.textContent = copy.collection;
    if (descriptionEl) descriptionEl.textContent = copy.description;
    if (notesEl) notesEl.textContent = copy.notes;
    if (pairingEl) pairingEl.textContent = copy.pairing;
    if (ingredientsEl) ingredientsEl.textContent = copy.ingredients;
    if (perspectiveEl) perspectiveEl.textContent = copy.perspective;

    if (fruitEl) {
      fruitEl.src = `assets/images/jar-${product.image}.png`;
      fruitEl.alt = copy.dialogAlt;
      fruitEl.width = product.width;
      fruitEl.height = product.height;
    }

    dialogRelatedButtons.forEach(button => {
      const btnIndex = Number(button.dataset.detailProduct);
      const isCurrent = btnIndex === activeDialogIndex;
      button.classList.toggle('is-active', isCurrent);
      if (isCurrent) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  };

  const openProduct = (index, options = {}) => {
    if (!productDialog) return;
    const { updateHash = true } = options;
    const normalized = normalizeIndex(index);
    const product = PRODUCTS[normalized];

    renderProductDialog(normalized);

    if (updateHash && location.hash !== `#product=${product.slug}`) {
      history.replaceState(null, '', `#product=${product.slug}`);
    }

    if (!productDialog.open) {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      productDialog.showModal();
    }

    productDialog.scrollTop = 0;
    detailHero?.style.setProperty('--detail-shift', '0px');
  };

  const applyLanguage = lang => {
    currentLang = lang === 'es' ? 'es' : 'en';
    const copy = UI_COPY[currentLang];

    document.documentElement.lang = currentLang;
    document.title = copy.docTitle;

    if (langToggle) {
      langToggle.textContent = copy.langButtonLabel;
      langToggle.setAttribute('aria-label', copy.langButtonAria);
    }

    if (menuToggle) {
      const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      const menuWord = menuToggle.querySelector('.menu-word');
      if (menuWord) menuWord.textContent = isMenuOpen ? copy.menuWordOpen : copy.menuWordClosed;
    }

    if (sealText) sealText.textContent = copy.sealText;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key && copy[key] !== undefined) el.textContent = copy[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (key && copy[key] !== undefined) el.innerHTML = copy[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (key && copy[key] !== undefined) el.setAttribute('aria-label', copy[key]);
    });

    orbitPrev?.setAttribute('aria-label', copy.prevAria);
    orbitNext?.setAttribute('aria-label', copy.nextAria);
    dialogPrev?.setAttribute('aria-label', copy.prevAria);
    dialogNext?.setAttribute('aria-label', copy.nextAria);

    productDialog?.querySelector('.dialog-close')?.setAttribute('aria-label', copy.dialogCloseAria);
    privacyDialog?.querySelector('.dialog-close')?.setAttribute('aria-label', copy.privacyCloseAria);

    document.querySelectorAll('.jar-item').forEach(button => {
      const idx = normalizeIndex(Number(button.dataset.product));
      button.setAttribute('aria-label', PRODUCTS[idx][currentLang].ariaLabel);
    });

    document.querySelectorAll('.product-card').forEach(card => {
      const idx = normalizeIndex(Number(card.dataset.openProduct));
      const pCopy = PRODUCTS[idx][currentLang];
      const img = card.querySelector('img');
      const typeEl = card.querySelector('.card-type');
      const titleEl = card.querySelector('strong');
      const taglineEl = card.querySelector(':scope > span:last-child');
      if (img) img.alt = pCopy.cardAlt;
      if (typeEl) typeEl.textContent = pCopy.cardType;
      if (titleEl) titleEl.textContent = pCopy.name;
      if (taglineEl) taglineEl.textContent = pCopy.cardTagline;
    });

    dialogRelatedButtons.forEach(button => {
      const idx = normalizeIndex(Number(button.dataset.detailProduct));
      const label = button.querySelector('span');
      if (label) label.textContent = PRODUCTS[idx][currentLang].name;
    });

    const orchardImg = document.querySelector('.orchard-art img');
    const breakfastImg = document.querySelector('.ritual-art.breakfast img');
    const gatheringImg = document.querySelector('.ritual-art.gathering img');
    if (orchardImg) orchardImg.alt = copy.orchardImgAlt;
    if (breakfastImg) breakfastImg.alt = copy.breakfastImgAlt;
    if (gatheringImg) gatheringImg.alt = copy.cheeseboardImgAlt;

    updateHeroCopy(activeHeroIndex);
    if (productDialog?.open) {
      renderProductDialog(activeDialogIndex);
    }

    document.dispatchEvent(new CustomEvent('solmora:langchange', { detail: { lang: currentLang } }));
  };

  /* Menu open/close and focus management */
  const setMenu = open => {
    if (!menu || !menuToggle || !mainNode) return;
    const copy = UI_COPY[currentLang];
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    const word = menuToggle.querySelector('.menu-word');
    if (word) word.textContent = open ? copy.menuWordOpen : copy.menuWordClosed;
    document.body.classList.toggle('menu-open', open);
    mainNode.inert = open;
    if (open) menu.focus({ preventScroll: true });
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenu(false);
      const target = document.querySelector(link.getAttribute('href'));
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
    });
  });

  document.addEventListener('keydown', event => {
    if (menu && !menu.hidden) {
      if (event.key === 'Escape') {
        setMenu(false);
        menuToggle?.focus();
      } else if (event.key === 'Tab') {
        const stops = [langToggle, menuToggle, ...menu.querySelectorAll('a')].filter(Boolean);
        if (document.activeElement === menu) {
          event.preventDefault();
          const targetStop = event.shiftKey ? menuToggle : menu.querySelector('a');
          targetStop?.focus();
          return;
        }
        const index = stops.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          stops.at(-1)?.focus();
        } else if (!event.shiftKey && (index === stops.length - 1 || index === -1)) {
          event.preventDefault();
          stops[0]?.focus();
        }
      }
      return;
    }

    if (productDialog?.open && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        openProduct(activeDialogIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        openProduct(activeDialogIndex + 1);
      }
    }
  });

  langToggle?.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'es' : 'en');
  });

  /* Orbit events */
  document.addEventListener('productchange', event => {
    updateHeroCopy(event.detail.index);
  });

  document.addEventListener('productactivate', event => {
    openProduct(event.detail.index);
  });

  document.querySelectorAll('.jar-item').forEach(button => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-current') === 'true') {
        openProduct(Number(button.dataset.product));
      }
    });
  });

  document.querySelectorAll('[data-open-product]').forEach(button => {
    button.addEventListener('click', () => openProduct(Number(button.dataset.openProduct)));
  });

  dialogRelatedButtons.forEach(button => {
    button.addEventListener('click', () => openProduct(Number(button.dataset.detailProduct)));
  });

  dialogPrev?.addEventListener('click', () => openProduct(activeDialogIndex - 1));
  dialogNext?.addEventListener('click', () => openProduct(activeDialogIndex + 1));

  /* Dialog close, focus restore, and backdrop click */
  document.querySelectorAll('dialog').forEach(modal => {
    modal.querySelector('.dialog-close')?.addEventListener('click', () => modal.close());

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        const rect = modal.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          modal.close();
        }
      }
    });

    modal.addEventListener('close', () => {
      if (modal === productDialog) {
        if (location.hash.startsWith('#product=')) {
          history.replaceState(null, '', location.pathname + location.search);
        }
        detailHero?.style.setProperty('--detail-shift', '0px');
      }
      if (lastFocusedElement && lastFocusedElement.isConnected) {
        lastFocusedElement.focus({ preventScroll: true });
      }
      lastFocusedElement = null;
    });
  });

  privacyButton?.addEventListener('click', () => {
    if (!privacyDialog) return;
    if (!privacyDialog.open) {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      privacyDialog.showModal();
    }
  });

  contactButton?.addEventListener('click', () => {
    if (!contactMessage) return;
    const isHidden = contactMessage.hidden;
    contactMessage.hidden = !isHidden;
    contactButton.setAttribute('aria-expanded', String(isHidden));
  });

  /* Subtle scroll-linked parallax inside fullscreen product dialog */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let detailParallaxFrame = 0;

  const syncDetailParallax = () => {
    detailParallaxFrame = 0;
    if (!detailHero || !productDialog) return;
    if (reducedMotion.matches || !productDialog.open) {
      detailHero.style.setProperty('--detail-shift', '0px');
      return;
    }
    const shift = Math.min(90, productDialog.scrollTop * 0.16);
    detailHero.style.setProperty('--detail-shift', `${shift.toFixed(2)}px`);
  };

  productDialog?.addEventListener(
    'scroll',
    () => {
      if (!detailParallaxFrame) {
        detailParallaxFrame = requestAnimationFrame(syncDetailParallax);
      }
    },
    { passive: true }
  );

  reducedMotion.addEventListener('change', syncDetailParallax);

  /* Deep linking via #product=<slug> */
  const getProductIndexFromHash = () => {
    const match = location.hash.match(/^#product=([a-z0-9-]+)$/i);
    if (!match) return -1;
    const slug = match[1].toLowerCase();
    return PRODUCTS.findIndex(item => item.slug === slug);
  };

  const syncProductFromHash = () => {
    const index = getProductIndexFromHash();
    if (index >= 0) {
      openProduct(index, { updateHash: false });
    } else if (productDialog?.open) {
      productDialog.close();
    }
  };

  window.addEventListener('hashchange', syncProductFromHash);
  window.addEventListener('popstate', syncProductFromHash);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncProductFromHash, { once: true });
  } else {
    syncProductFromHash();
  }
})();
