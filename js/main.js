/* =========================================================
   PRAGMA — Consultoria Linguística Premium
   JavaScript Principal — Interatividade e Animações
   ========================================================= */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. NAVBAR — scroll behavior + mobile toggle
  -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll: adiciona classe .scrolled
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // executa no load

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar ao clicar em link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fechar ao clicar fora (overlay)
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* --------------------------------------------------
     2. SCROLL REVEAL — Intersection Observer
  -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Pequeno delay escalonado para grupos de cards
          const parent = entry.target.closest('.solutions-grid, .testimonials-grid, .pain-cards, .method-steps');
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.reveal'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 90);
          } else {
            entry.target.classList.add('visible');
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
     3. PROGRESS BAR — anima ao entrar na view
  -------------------------------------------------- */
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0%';

    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              progressFill.style.width = targetWidth;
            }, 400);
            progressObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    progressObserver.observe(progressFill.closest('.method-mock'));
  }

  /* --------------------------------------------------
     4. SMOOTH SCROLL — links âncora internos
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------
     5. ACTIVE NAV LINK — highlight baseado em scroll
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = '#' + section.id;
      navItems.forEach(link => {
        if (link.getAttribute('href') === id) {
          if (scrollY >= top && scrollY < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* --------------------------------------------------
     6. HERO — efeito parallax sutil
  -------------------------------------------------- */
  const heroBgPattern = document.querySelector('.hero-bg-pattern');
  if (heroBgPattern) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBgPattern.style.transform = `translateY(${y * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* --------------------------------------------------
     7. NUMBER COUNTER ANIMATION (para futuras stats)
  -------------------------------------------------- */
  function animateCounter(el, target, duration = 1800) {
    const start = 0;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = start + (target - start) * eased;
      el.textContent = isFloat ? value.toFixed(1) : Math.round(value);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseFloat(entry.target.dataset.counter);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* --------------------------------------------------
     8. TYPING EFFECT (hero headline — opcional)
  -------------------------------------------------- */
  // Descomente para ativar o efeito de digitação na headline
  /*
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    const text = heroHeadline.textContent.trim();
    heroHeadline.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        heroHeadline.textContent += text[i];
        i++;
        setTimeout(type, 28);
      }
    }
    setTimeout(type, 800);
  }
  */

  /* --------------------------------------------------
     9. SOLUTION CARDS — delay de animação escalonado
  -------------------------------------------------- */
  document.querySelectorAll('.solution-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
  });

  document.querySelectorAll('.method-step').forEach((step, i) => {
    step.style.setProperty('--i', i);
  });

  /* --------------------------------------------------
     10. CURSOR GLOW SUTIL (apenas desktop)
  -------------------------------------------------- */
  if (window.matchMedia('(min-width: 1024px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(185,155,90,0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: transform 0.1s linear;
      will-change: transform;
    `;
    document.body.appendChild(glow);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateGlow() {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* --------------------------------------------------
     11. TESTIMONIAL CARDS — hover 3D sutil
  -------------------------------------------------- */
  if (window.matchMedia('(min-width: 768px)').matches) {
    document.querySelectorAll('.testimonial-card, .solution-card, .pain-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `
          perspective(800px)
          rotateY(${x * 5}deg)
          rotateX(${-y * 5}deg)
          translateY(-6px)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  /* --------------------------------------------------
     12. PAGE LOAD — remover flash de invisibilidade
  -------------------------------------------------- */
  document.documentElement.style.opacity = '0';
  document.documentElement.style.transition = 'opacity 0.3s ease';

  window.addEventListener('load', () => {
    document.documentElement.style.opacity = '1';
    // Forçar visibilidade dos elementos above-the-fold
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      });
    }, 100);
  });

  /* --------------------------------------------------
     13. WHATSAPP FLOAT — pulse animation
  -------------------------------------------------- */
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    // Adiciona um ping visual a cada 5 segundos
    setInterval(() => {
      waFloat.style.boxShadow = '0 8px 28px rgba(37,211,102,0.4), 0 0 0 8px rgba(37,211,102,0.15)';
      setTimeout(() => {
        waFloat.style.boxShadow = '0 8px 28px rgba(37,211,102,0.4)';
      }, 600);
    }, 5000);
  }

  /* --------------------------------------------------
     14. ESCAPE KEY — fecha menu mobile
  -------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

})();
