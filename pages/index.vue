<script setup lang="ts">
import legacyHtml from '../legacy/index.html?raw'
import { products } from '../data/products'

const productCards = products.map(product => `
  <article class="product-card reveal">
    <div class="product-icon"><i class="${product.icon}"></i></div>
    <p class="product-eyebrow">${product.eyebrow}</p>
    <h3>${product.title}</h3>
    <p>${product.summary}</p>
    <ul>
      ${product.benefits.map(benefit => `<li><i class="fas fa-check"></i>${benefit}</li>`).join('')}
    </ul>
    <a href="/produtos/${product.slug}" class="solution-link">Ver produto <i class="fas fa-arrow-right"></i></a>
  </article>
`).join('')

const productsSection = `
  <section class="products-section" id="produtos">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">Produtos PRAGMA</p>
        <h2 class="section-title">Escolha sua próxima<br /><em>jornada de comunicação.</em></h2>
        <p class="section-desc">Programas estáticos com compra externa via Hotmart. A página de cada produto apresenta os detalhes antes do checkout.</p>
      </div>
      <div class="products-grid">
        ${productCards}
      </div>
    </div>
  </section>
`

const pageHtml = legacyHtml
  .match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1]
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/privacidade\.html/g, '/privacidade')
  .replace(/termos\.html/g, '#contato')
  .replace('<li><a href="#depoimentos">Depoimentos</a></li>', '<li><a href="#depoimentos">Depoimentos</a></li><li><a href="#produtos">Produtos</a></li>')
  .replace('<!-- ========== CTA FINAL ========== -->', `${productsSection}\n\n      <!-- ========== CTA FINAL ========== -->`) ?? ''

useSeoMeta({
  title: 'PRAGMA — Consultoria Linguística Premium',
  description: 'A PRAGMA transforma conhecimento em comunicação real para profissionais que querem se posicionar com confiança no cenário global.',
  ogTitle: 'PRAGMA — Consultoria Linguística Premium',
  ogDescription: 'Consultoria linguística premium para destravar sua comunicação em inglês e espanhol.',
})
</script>

<template>
  <div v-html="pageHtml" />
</template>
