<script setup lang="ts">
import { products } from '../../data/products'

useSeoMeta({
  title: 'Produtos PRAGMA | Consultoria Linguística',
  description: 'Conheça os produtos da PRAGMA para destravar sua comunicação em inglês e espanhol.',
  ogTitle: 'Produtos PRAGMA',
  ogDescription: 'Programas de comunicação linguística com checkout externo via Hotmart.',
})
</script>

<template>
  <header class="nav-wrapper scrolled" id="navbar">
    <nav class="nav-inner">
      <NuxtLink to="/" class="nav-logo">PRAGMA</NuxtLink>
      <ul class="nav-links static-nav">
        <li><NuxtLink to="/">Início</NuxtLink></li>
        <li><NuxtLink to="/privacidade">Privacidade</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <main class="product-page">
    <section class="products-hero">
      <div class="container">
        <p class="section-label">Produtos PRAGMA</p>
        <h1 class="section-title">Jornadas para transformar conhecimento em comunicação real.</h1>
        <p class="section-desc">Escolha o programa mais alinhado ao seu momento. A compra acontece no checkout seguro da Hotmart.</p>
      </div>
    </section>

    <section class="products-section products-section--catalog">
      <div class="container">
        <div class="products-grid">
          <article v-for="product in products" :key="product.slug" class="product-card visible">
            <div class="product-icon"><i :class="product.icon"></i></div>
            <p class="product-eyebrow">{{ product.eyebrow }}</p>
            <h2>{{ product.title }}</h2>
            <p>{{ product.summary }}</p>
            <ul>
              <li v-for="benefit in product.benefits" :key="benefit">
                <i class="fas fa-check"></i>{{ benefit }}
              </li>
            </ul>
            <NuxtLink :to="`/produtos/${product.slug}`" class="solution-link">
              Ver detalhes <i class="fas fa-arrow-right"></i>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
