document.addEventListener('DOMContentLoaded', () => {
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

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
    });
  });

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

    // Hero Parallax effect
    if (heroScene) {
      gsap.to(heroScene, {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        rotateX: -10,
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

  function shuffleCards() {
    // Continuous: Removed hover check
    currentPositions.unshift(currentPositions.pop());

    cards.forEach((card, index) => {
      card.classList.remove('card-3d--pos-0', 'card-3d--pos-1', 'card-3d--pos-2');
      card.classList.add(`card-3d--pos-${currentPositions[index]}`);
    });
  }

  if (cards.length > 0) {
    setInterval(shuffleCards, 4000);
  }

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

  // ---- Modal System ----
  const modal = document.getElementById('cardModal');
  const modalData = document.getElementById('modalData');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const cardDetails = {
    'Infinite': {
      title: 'NBF Infinite Credit Card',
      subtitle: 'The Ultimate Lifestyle Card',
      body: 'Experience the pinnacle of banking with the NBF Infinite Credit Card. Designed for high-achievers who demand the best in lifestyle, travel, and security features.',
      perks: [
        { icon: 'plane', text: 'Unlimited Lounge Access' },
        { icon: 'shield-check', text: 'Multi-trip Travel Insurance' },
        { icon: 'clapperboard', text: '50% Off Cinema Tickets' },
        { icon: 'shopping-bag', text: '2% Unlimited Cashback' }
      ]
    },
    'Exclusive': {
      title: 'Platinum Exclusive',
      subtitle: 'Premium Everyday Banking',
      body: 'Elevate your daily spending with the Platinum Exclusive card. A perfect blend of reward points and premium merchant discounts tailored for your lifestyle.',
      perks: [
        { icon: 'coffee', text: 'BOGO Lifestyle Offers' },
        { icon: 'map-pin', text: 'Valet Parking Services' },
        { icon: 'landmark', text: 'No Annual Fees' },
        { icon: 'zap', text: 'Instant Approval' }
      ]
    },
    'Debit': {
      title: 'Platinum Debit Card',
      subtitle: 'Control Meets Perks',
      body: 'Get the freedom of a debit card with the perks of a credit card. Secure, fast, and accepted globally with exclusive online shopping protection.',
      perks: [
        { icon: 'wallet', text: 'High Daily Limits' },
        { icon: 'smartphone', text: 'Apple & Google Pay' },
        { icon: 'globe', text: 'Fee-Free Int. Spending' },
        { icon: 'lock', text: '3D Secure Protection' }
      ]
    }
  };

  function openModal(type) {
    console.log('Opening modal for:', type);
    const data = cardDetails[type];
    if (!data) return;

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
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }

  // Click listeners for cards
  document.querySelector('.card-3d--main').addEventListener('click', () => openModal('Infinite'));
  document.querySelector('.card-3d--side-1').addEventListener('click', () => openModal('Exclusive'));
  document.querySelector('.card-3d--side-2').addEventListener('click', () => openModal('Debit'));

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---- Gallery Scrub Animation ----
  if (window.gsap) {
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach((item) => {
      const img = item.querySelector('img');
      if (img) {
        gsap.fromTo(img, 
          { scale: 1.3, y: -40 },
          { 
            scale: 1, 
            y: 0,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    });

    // ---- Gallery Bento Grid Scroll Animation ----
    const galleryElement = document.querySelector("#gallery-8");
    if (galleryElement && window.Flip) {
      let flipCtx;
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");

      const createGalleryTween = () => {
        flipCtx && flipCtx.revert();
        galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
          galleryElement.classList.add("gallery--final");
          const flipState = Flip.getState(galleryItems);
          galleryElement.classList.remove("gallery--final");

          const flip = Flip.to(flipState, {
            simple: true,
            ease: "expoScale(1, 5)"
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: galleryElement,
              start: "center center",
              end: "+=100%",
              scrub: true,
              pin: galleryElement.parentNode
            }
          });
          tl.add(flip);
          return () => gsap.set(galleryItems, { clearProps: "all" });
        });
      };

      createGalleryTween();
      window.addEventListener("resize", createGalleryTween);

      // Animate the gallery header separately
      gsap.from(".gallery__header", {
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }
  }

  // ---- Initialize Lucide Icons (at end, after all DOM setup) ----
  function initIcons() {
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  // Try immediately, then retry after short delay in case CDN is slow
  initIcons();
  if (!document.querySelector('[data-lucide] svg')) {
    setTimeout(initIcons, 500);
    setTimeout(initIcons, 1500);
  }
});
