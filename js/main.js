document.addEventListener('DOMContentLoaded', () => {
  // ---- GSAP Setup ----
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger, Flip);
  }

  // ---- Scroll Progress & Nav effects ----
  const nav = document.getElementById('nav');
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  function handleScroll() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';

    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--open');
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--open');
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Hero element refs ----
  const heroScene = document.querySelector('.hero__scene');
  const heroVisual = document.querySelector('.hero__visual');

  // ---- GSAP Animations (ScrollTrigger) ----
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('gsap-loaded');

    // Global Section Reveal
    ScrollTrigger.batch(".reveal", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          overwrite: true
        });
      },
      once: true
    });

    // Hero Parallax effect (Isolated on Visual container)
    if (heroVisual) {
      gsap.to(heroVisual, {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        opacity: 0.5
      });
    }

    // Background Blobs Floating
    gsap.to(".bg-blob--1", {
      x: "10%",
      y: "10%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".bg-blob--2", {
      x: "-15%",
      y: "-10%",
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });

    // Bento Grid Staggered Entry
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitCards.length > 0) {
      gsap.from(benefitCards, {
        scrollTrigger: {
          trigger: ".benefits__grid",
          start: "top 85%"
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }

    // Product Cards Reveal
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
      gsap.from(productCards, {
        scrollTrigger: {
          trigger: ".products__grid",
          start: "top 85%"
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }

  // ---- Hero 3D Card Tilt (Camera Follow) ----
  if (heroVisual && heroScene) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * -30;
      const tiltY = (x - 0.5) * 30;

      gsap.to(heroScene, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      gsap.to(heroScene, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }

  // ---- Card Position Shuffling ----
  const cards = document.querySelectorAll('.card-3d');
  let currentPositions = [0, 1, 2];
  let shuffleInterval = null;
  const isMobile = () => window.innerWidth <= 768;

  function shuffleCards() {
    if (modalState.shufflePaused) return;
    currentPositions.unshift(currentPositions.pop());

    cards.forEach((card, index) => {
      card.classList.remove('card-3d--pos-0', 'card-3d--pos-1', 'card-3d--pos-2');
      card.classList.add(`card-3d--pos-${currentPositions[index]}`);
    });
  }

  function startShuffle() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    if (!isMobile() && cards.length > 0) {
      shuffleInterval = setInterval(shuffleCards, 4000);
    }
  }

  startShuffle();

  // ---- Mobile Card Slider ----
  let sliderIndex = 0;
  let autoSlideInterval = null;

  function updateSlider() {
    cards.forEach((card, i) => {
      card.classList.remove('card-3d--slide-active');
      if (i === sliderIndex) {
        card.classList.add('card-3d--slide-active');
      }
    });
    // Update dots
    document.querySelectorAll('.card-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('card-slider__dot--active', i === sliderIndex);
    });
  }

  function nextSlide() {
    sliderIndex = (sliderIndex + 1) % cards.length;
    updateSlider();
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    if (isMobile()) {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }
  }

  // Create slider dots
  if (heroVisual && cards.length > 0) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'card-slider__dots';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'card-slider__dot' + (i === 0 ? ' card-slider__dot--active' : '');
      dot.setAttribute('aria-label', `Card ${i + 1}`);
      dot.addEventListener('click', () => {
        sliderIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
    heroVisual.appendChild(dotsContainer);
  }

  function initMobileSlider() {
    if (isMobile()) {
      cards.forEach(card => card.classList.remove('card-3d--pos-0', 'card-3d--pos-1', 'card-3d--pos-2'));
      updateSlider();
      startAutoSlide();
    } else {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      cards.forEach(card => card.classList.remove('card-3d--slide-active'));
      cards.forEach((card, index) => {
        card.classList.remove('card-3d--pos-0', 'card-3d--pos-1', 'card-3d--pos-2');
        card.classList.add(`card-3d--pos-${currentPositions[index]}`);
      });
    }
  }

  initMobileSlider();

  // Touch swipe support for slider
  let touchStartX = 0;
  if (heroVisual) {
    heroVisual.addEventListener('touchstart', (e) => {
      if (!isMobile()) return;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    heroVisual.addEventListener('touchend', (e) => {
      if (!isMobile()) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          sliderIndex = (sliderIndex + 1) % cards.length;
        } else {
          sliderIndex = (sliderIndex - 1 + cards.length) % cards.length;
        }
        updateSlider();
      }
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    initMobileSlider();
    startShuffle();
  });

  // ---- GSAP Spotlight Effect ----
  const benefitsSection = document.querySelector('.benefits');
  if (benefitsSection) {
    benefitsSection.addEventListener('mousemove', (e) => {
      const rect = benefitsSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(benefitsSection, {
        '--spotlight-x': `${x}%`,
        '--spotlight-y': `${y}%`,
        '--spotlight-opacity': 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    benefitsSection.addEventListener('mouseleave', () => {
      gsap.to(benefitsSection, {
        '--spotlight-opacity': 0,
        duration: 0.8
      });
    });
  }

  // ---- Modal System (3D Card Fly Animation) ----
  const modal = document.getElementById('cardModal');
  const modalData = document.getElementById('modalData');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCardSlot = document.getElementById('modalCardSlot');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const modalState = {
    isOpen: false,
    isAnimating: false,
    currentType: null,
    originalCard: null,
    flyingClone: null,
    shufflePaused: false,
    openTimeline: null
  };

  const cardMap = [
    { selector: '.card-3d--main',   type: 'IslamicInfinite' },
    { selector: '.card-3d--side-1', type: 'IslamicPlatinum' },
    { selector: '.card-3d--side-2', type: 'IslamicClassic' }
  ];

  const cardDetails = {
    'IslamicInfinite': {
      title: 'NBF Islamic Infinite Credit Card',
      subtitle: 'Our Most Prestigious Card',
      body: 'Our most prestigious card, for those who seek exceptional benefits, enhanced flexibility, and world-class service.',
      perks: [
        { icon: 'gift', text: 'Earn rewards on every purchase' },
        { icon: 'utensils', text: '10% cashback on all dining' },
        { icon: 'plane', text: 'Airport lounge access' },
        { icon: 'headphones', text: '24/7 Concierge' }
      ]
    },
    'IslamicPlatinum': {
      title: 'NBF Islamic Platinum Debit Card',
      subtitle: 'Your Gateway to Premium Service',
      body: 'Your gateway to premium service, exclusive benefits and worldwide acceptance with added convenience.',
      perks: [
        { icon: 'landmark', text: 'Free ATM withdrawals across the UAE' },
        { icon: 'crown', text: 'Exclusive platinum rewards & privileges' },
        { icon: 'globe', text: 'Accepted at millions of locations worldwide' }
      ]
    },
    'IslamicClassic': {
      title: 'NBF Islamic Classic Debit Card',
      subtitle: 'Your Key to Effortless Spending',
      body: 'Your key to effortless spending, accepted at millions of locations worldwide and backed by trusted security.',
      perks: [
        { icon: 'landmark', text: 'Free ATM withdrawals across the UAE' },
        { icon: 'shield-check', text: 'Secure chip and contactless payments' },
        { icon: 'users', text: 'Free supplementary cards for family members' }
      ]
    }
  };

  function injectModalContent(data) {
    modalData.innerHTML = `
      <div class="modal__header">
        <span class="modal__subtitle">${data.subtitle}</span>
        <h2 class="modal__title">${data.title}</h2>
      </div>
      <p class="modal__body">${data.body}</p>
      <div class="modal__perks">
        ${data.perks.map(perk => `
          <div class="modal__perk">
            <i data-lucide="${perk.icon}"></i>
            <span>${perk.text}</span>
          </div>
        `).join('')}
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  function createClone(cardEl) {
    const rect = cardEl.getBoundingClientRect();
    const clone = document.createElement('div');
    clone.className = 'card-fly-clone';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.backgroundImage = getComputedStyle(cardEl).backgroundImage;
    clone.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
    document.body.appendChild(clone);
    return { clone, rect };
  }

  function getModalTargetRect() {
    const targetWidth = Math.min(380, window.innerWidth * 0.85);
    const targetHeight = targetWidth * (214 / 340);
    modalCardSlot.style.height = targetHeight + 'px';

    // Temporarily show modal to read layout
    const prevVisibility = modal.style.visibility;
    const prevOpacity = modal.style.opacity;
    modal.style.visibility = 'visible';
    modal.style.opacity = '0';

    const slotRect = modalCardSlot.getBoundingClientRect();

    modal.style.visibility = prevVisibility;
    modal.style.opacity = prevOpacity;

    return { left: slotRect.left, top: slotRect.top, width: targetWidth, height: targetHeight };
  }

  function openModal(type) {
    if (modalState.isAnimating || modalState.isOpen) return;
    const data = cardDetails[type];
    if (!data) return;

    modalState.isAnimating = true;
    modalState.currentType = type;
    modalState.shufflePaused = true;

    const cardEntry = cardMap.find(c => c.type === type);
    const cardEl = document.querySelector(cardEntry.selector);
    modalState.originalCard = cardEl;

    injectModalContent(data);
    const targetRect = getModalTargetRect();
    const { clone, rect: sourceRect } = createClone(cardEl);
    modalState.flyingClone = clone;
    cardEl.classList.add('card-3d--hidden');

    // Reduced motion fallback
    if (prefersReducedMotion) {
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.classList.add('modal--open');
      document.body.style.overflow = 'hidden';
      modalState.isAnimating = false;
      modalState.isOpen = true;
      return;
    }

    const modalContent = document.querySelector('.modal__content');
    const contentElements = modalData.querySelectorAll(':scope > *');

    // Calculate scale factors (GPU-friendly, no layout reflow)
    const scaleX = targetRect.width / sourceRect.width;
    const scaleY = targetRect.height / sourceRect.height;

    const tl = gsap.timeline({
      onComplete: () => {
        modalState.isAnimating = false;
        modalState.isOpen = true;
      }
    });
    modalState.openTimeline = tl;

    // Phase 1: Show modal container + backdrop
    tl.set(modal, { opacity: 0, visibility: 'visible' });
    tl.to(modal, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);
    modal.classList.add('modal--open');

    // Phase 2: Clone flies to modal card slot (GPU: translate3d + scale only)
    tl.to(clone, {
      borderRadius: '16px',
      x: targetRect.left,
      y: targetRect.top,
      scaleX: scaleX,
      scaleY: scaleY,
      duration: 0.6,
      ease: 'power3.inOut'
    }, 0.05);

    // Phase 3: Glass card slides up
    gsap.set(modalContent, { opacity: 0, y: 30, scale: 0.95 });
    tl.to(modalContent, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.35);

    // Phase 4: Text content staggered fade-in
    gsap.set(contentElements, { opacity: 0, y: 20 });
    tl.to(contentElements, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.5);

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalState.isAnimating && !modalState.isOpen) return;
    if (!modalState.isOpen) return;

    // Kill any in-progress open animation
    if (modalState.openTimeline) {
      modalState.openTimeline.kill();
      modalState.openTimeline = null;
    }

    modalState.isAnimating = true;

    const cardEl = modalState.originalCard;
    const clone = modalState.flyingClone;
    const modalContent = document.querySelector('.modal__content');

    // Reduced motion fallback
    if (prefersReducedMotion) {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      modal.classList.remove('modal--open');
      document.body.style.overflow = '';
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      cardEl.classList.remove('card-3d--hidden');
      modalState.flyingClone = null;
      modalState.isAnimating = false;
      modalState.isOpen = false;
      modalState.shufflePaused = false;
      gsap.set(modalContent, { clearProps: 'all' });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
        modalState.flyingClone = null;
        modalState.isAnimating = false;
        modalState.isOpen = false;
        modalState.currentType = null;
        modalState.originalCard = null;
        modalState.shufflePaused = false;

        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        modal.classList.remove('modal--open');
        cardEl.classList.remove('card-3d--hidden');
        gsap.set(modalContent, { clearProps: 'all' });
        document.body.style.overflow = '';
      }
    });

    // Card scales down slightly + fades
    tl.to(clone, {
      opacity: 0,
      scale: 0.85,
      y: '+=40',
      duration: 0.5,
      ease: 'power3.in'
    }, 0);

    // Glass content slides down + fades
    tl.to(modalContent, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.45,
      ease: 'power2.in'
    }, 0.05);

    // Backdrop fades with slight delay
    tl.to(modal, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.15);
  }

  // Card click listeners
  if (heroScene) {
    heroScene.addEventListener('click', () => {
      // Desktop: find the front card (pos-0)
      const frontCard = document.querySelector('.card-3d--pos-0');
      if (frontCard) {
        const selector = frontCard.classList.contains('card-3d--main') ? '.card-3d--main'
          : frontCard.classList.contains('card-3d--side-1') ? '.card-3d--side-1'
          : '.card-3d--side-2';
        const entry = cardMap.find(c => c.selector === selector);
        if (entry) openModal(entry.type);
      }
    });
  }

  // Mobile: click active slider card
  if (heroVisual) {
    heroVisual.addEventListener('click', (e) => {
      if (!isMobile()) return;
      if (e.target.closest('.card-slider__dots')) return;
      const activeCard = cards[sliderIndex];
      if (!activeCard) return;
      const selector = activeCard.classList.contains('card-3d--main') ? '.card-3d--main'
        : activeCard.classList.contains('card-3d--side-1') ? '.card-3d--side-1'
        : '.card-3d--side-2';
      const entry = cardMap.find(c => c.selector === selector);
      if (entry) openModal(entry.type);
    });
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Reposition flying clone on resize
  window.addEventListener('resize', () => {
    if (modalState.isOpen && modalState.flyingClone && !modalState.isAnimating) {
      const cardEl = modalState.originalCard;
      const sourceRect = cardEl.getBoundingClientRect();
      const targetRect = getModalTargetRect();
      const scaleX = targetRect.width / sourceRect.width;
      const scaleY = targetRect.height / sourceRect.height;
      gsap.to(modalState.flyingClone, {
        x: targetRect.left,
        y: targetRect.top,
        scaleX: scaleX,
        scaleY: scaleY,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });

  // ---- FAQ Cursor Tracking ----
  const faqSection = document.querySelector('.faq');
  const faqPreview = document.getElementById('faqPreview');
  const faqPreviewIcon = document.getElementById('faqPreviewIcon');

  if (faqSection && faqPreview) {
    const movePreview = gsap.quickTo(faqPreview, "x", {duration: 0.35, ease: "power3"}),
          movePreviewY = gsap.quickTo(faqPreview, "y", {duration: 0.35, ease: "power3"});

    faqSection.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) return;
      movePreview(e.clientX + 32);
      movePreviewY(e.clientY);
    });

    document.querySelectorAll('.faq__item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 1024) return;
        const iconName = item.getAttribute('data-icon');
        if (iconName) {
          faqPreviewIcon.innerHTML = `<i data-lucide="${iconName}"></i>`;
          if (window.lucide) lucide.createIcons();
          gsap.to(faqPreview, { opacity: 1, scale: 1, duration: 0.3 });
        }
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(faqPreview, { opacity: 0, scale: 0.8, duration: 0.3 });
      });
    });
  }

  // ---- Advanced Gallery (Flip Switch) ----
  const galleryElement = document.querySelector("#gallery-8");
  if (galleryElement && window.Flip) {
    let flipCtx;
    const galleryItems = galleryElement.querySelectorAll(".gallery__item");
    const galleryOverlays = galleryElement.querySelectorAll(".gallery__overlay");

    const createGalleryTween = () => {
      // Revert previous context if it exists
      flipCtx && flipCtx.revert();
      galleryElement.classList.remove("gallery--final");

      flipCtx = gsap.context(() => {
        // Capture initial state
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "none"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".gallery-wrap",
            start: "center center",
            end: "+=200%",
            scrub: 1.5,
            pin: window.innerWidth > 768, // Only pin on tablet/desktop
            anticipatePin: 1,
            invalidateOnRefresh: true,
            enabled: window.innerWidth > 768 // Disable entire scroll effect on mobile
          }
        });

        // Phase 1: Grid expands
        tl.add(flip);

        // Phase 2: Fade in overlay titles
        tl.fromTo(galleryOverlays, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5
        }, "+=0.1");

        return () => gsap.set(galleryItems, { clearProps: "all" });
      });
    };

    createGalleryTween();
    window.addEventListener("resize", createGalleryTween);
  }

  // ---- Initialize Lucide Icons ----
  function initIcons() {
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }
  initIcons();

  // ---- Theme Switcher Logic ----
  const themeOptions = document.querySelectorAll('.theme-switcher__option');
  const logoImg = document.querySelector('.nav__logo-img');
  const footerLogoImg = document.querySelector('.footer__logo-img');
  
  const LOGOS = {
    neon: 'assets/logos/nbf-ajyal-logo-themed.png',
    original: 'assets/logos/currnet_nbfajyal_logo.png'
  };

  const VANTA_COLORS = {
    neon: 0x00E676,
    original: 0x632D8E
  };

  function setTheme(theme) {
    if (theme === 'original') {
      document.body.classList.add('theme-original');
    } else {
      document.body.classList.remove('theme-original');
    }

    // Update UI
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === theme);
    });

    // Update Vanta
    if (window.vantaBackground) {
      window.vantaBackground.setOptions({
        color: VANTA_COLORS[theme]
      });
    }

    // Update Logos
    if (logoImg) logoImg.src = LOGOS[theme];
    if (footerLogoImg) footerLogoImg.src = LOGOS[theme];

    // Persist
    localStorage.setItem('nbf-theme', theme);
  }

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      setTheme(option.dataset.theme);
    });
  });

  // Load persisted theme
  const savedTheme = localStorage.getItem('nbf-theme') || 'original';
  setTheme(savedTheme);
});
