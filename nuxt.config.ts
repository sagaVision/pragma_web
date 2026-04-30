import { products } from './data/products'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/privacidade', '/produtos', ...products.map(product => `/produtos/${product.slug}`)],
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
        },
      ],
    },
  },
  css: ['~/css/style.css'],
})
