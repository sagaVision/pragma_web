export default defineNuxtPlugin((nuxtApp) => {
  let cleanups: Array<() => void> = []

  function cleanup() {
    cleanups.forEach(fn => fn())
    cleanups = []
    document.body.style.overflow = ''
  }

  function on(target: EventTarget, event: string, listener: EventListener, options?: AddEventListenerOptions) {
    target.addEventListener(event, listener, options)
    cleanups.push(() => target.removeEventListener(event, listener, options))
  }

  function init() {
    cleanup()

    const navbar = document.getElementById('navbar')
    const navToggle = document.getElementById('navToggle')
    const navLinks = document.getElementById('navLinks')

    if (navbar) {
      const forceScrolled = navbar.classList.contains('scrolled')
      const handleNavScroll = () => {
        navbar.classList.toggle('scrolled', forceScrolled || window.scrollY > 60)
      }
      on(window, 'scroll', handleNavScroll, { passive: true })
      handleNavScroll()
    }

    if (navToggle && navLinks) {
      const closeMenu = () => {
        navLinks.classList.remove('open')
        navToggle.classList.remove('open')
        document.body.style.overflow = ''
      }

      on(navToggle, 'click', () => {
        const isOpen = navLinks.classList.toggle('open')
        navToggle.classList.toggle('open', isOpen)
        document.body.style.overflow = isOpen ? 'hidden' : ''
      })

      navLinks.querySelectorAll('a').forEach(link => on(link, 'click', closeMenu))

      on(document, 'click', (event) => {
        const target = event.target as Node
        if (navLinks.classList.contains('open') && !navLinks.contains(target) && !navToggle.contains(target)) {
          closeMenu()
        }
      })

      on(document, 'keydown', (event) => {
        if ((event as KeyboardEvent).key === 'Escape') closeMenu()
      })
    }

    const revealElements = document.querySelectorAll('.reveal')
    if ('IntersectionObserver' in window && revealElements.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const parent = entry.target.closest('.solutions-grid, .testimonials-grid, .pain-cards, .method-steps, .products-grid')
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.reveal'))
            window.setTimeout(() => entry.target.classList.add('visible'), siblings.indexOf(entry.target) * 90)
          } else {
            entry.target.classList.add('visible')
          }
          revealObserver.unobserve(entry.target)
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

      revealElements.forEach(el => revealObserver.observe(el))
      cleanups.push(() => revealObserver.disconnect())
    } else {
      revealElements.forEach(el => el.classList.add('visible'))
    }

    const progressFill = document.querySelector<HTMLElement>('.progress-fill')
    if (progressFill && 'IntersectionObserver' in window) {
      const targetWidth = progressFill.style.width
      progressFill.style.width = '0%'
      const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          window.setTimeout(() => { progressFill.style.width = targetWidth }, 400)
          progressObserver.disconnect()
        })
      }, { threshold: 0.5 })
      const mock = progressFill.closest('.method-mock')
      if (mock) progressObserver.observe(mock)
      cleanups.push(() => progressObserver.disconnect())
    }

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      on(anchor, 'click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href') || '')
        if (!target) return
        event.preventDefault()
        const navH = navbar?.offsetHeight || 80
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navH - 12
        window.scrollTo({ top: targetTop, behavior: 'smooth' })
      })
    })

    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const navItems = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
    if (sections.length && navItems.length) {
      const setActiveNav = () => {
        const scrollY = window.scrollY + 120
        sections.forEach(section => {
          const id = `#${section.id}`
          const active = scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight
          navItems.forEach(link => {
            if (link.getAttribute('href') === id) link.classList.toggle('active', active)
          })
        })
      }
      on(window, 'scroll', setActiveNav, { passive: true })
      setActiveNav()
    }

    const heroBgPattern = document.querySelector<HTMLElement>('.hero-bg-pattern')
    if (heroBgPattern) {
      on(window, 'scroll', () => {
        if (window.scrollY < window.innerHeight) heroBgPattern.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }, { passive: true })
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      document.querySelectorAll<HTMLElement>('.testimonial-card, .solution-card, .pain-card, .product-card').forEach(card => {
        on(card, 'mousemove', (event) => {
          const mouse = event as MouseEvent
          const rect = card.getBoundingClientRect()
          const x = (mouse.clientX - rect.left) / rect.width - 0.5
          const y = (mouse.clientY - rect.top) / rect.height - 0.5
          card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`
        })
        on(card, 'mouseleave', () => { card.style.transform = '' })
      })
    }

    const waFloat = document.querySelector<HTMLElement>('.whatsapp-float')
    if (waFloat) {
      const interval = window.setInterval(() => {
        waFloat.style.boxShadow = '0 8px 28px rgba(37,211,102,0.4), 0 0 0 8px rgba(37,211,102,0.15)'
        window.setTimeout(() => { waFloat.style.boxShadow = '0 8px 28px rgba(37,211,102,0.4)' }, 600)
      }, 5000)
      cleanups.push(() => window.clearInterval(interval))
    }
  }

  nuxtApp.hook('page:finish', () => window.setTimeout(init, 0))
})
