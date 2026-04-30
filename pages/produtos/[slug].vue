<script setup lang="ts">
import { getProductBySlug, products } from '../../data/products'

const route = useRoute()
const product = getProductBySlug(String(route.params.slug))

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
}

useSeoMeta({
  title: product.seoTitle,
  description: product.seoDescription,
  ogTitle: product.seoTitle,
  ogDescription: product.seoDescription,
})

definePageMeta({
  validate(route) {
    return products.some(product => product.slug === route.params.slug)
  },
})
</script>

<template>
  <header class="nav-wrapper scrolled" id="navbar">
    <nav class="nav-inner">
      <NuxtLink to="/" class="nav-logo">PRAGMA</NuxtLink>
      <ul class="nav-links static-nav">
        <li><NuxtLink to="/produtos">Produtos</NuxtLink></li>
        <li><NuxtLink to="/">Início</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <main class="product-detail-page">
    <section class="product-detail-hero">
      <div class="container product-detail-grid">
        <div>
          <p class="section-label">{{ product.eyebrow }}</p>
          <h1 class="section-title">{{ product.title }}</h1>
          <p class="product-detail-summary">{{ product.description }}</p>
          <div class="product-detail-actions">
            <a :href="product.checkoutUrl" target="_blank" rel="noopener" class="btn btn-primary btn-large">
              Comprar pela Hotmart
            </a>
            <NuxtLink to="/produtos" class="btn btn-secondary">Ver outros produtos</NuxtLink>
          </div>
        </div>

        <aside class="product-detail-card">
          <div class="product-icon"><i :class="product.icon"></i></div>
          <h2>Para quem é</h2>
          <p>{{ product.audience }}</p>
        </aside>
      </div>
    </section>

    <section class="product-detail-content">
      <div class="container product-info-grid">
        <article class="product-info-card">
          <h2>Benefícios</h2>
          <ul>
            <li v-for="benefit in product.benefits" :key="benefit">
              <i class="fas fa-check"></i>{{ benefit }}
            </li>
          </ul>
        </article>

        <article class="product-info-card">
          <h2>O que inclui</h2>
          <ul>
            <li v-for="item in product.includes" :key="item">
              <i class="fas fa-check"></i>{{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>
