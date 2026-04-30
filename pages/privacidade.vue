<script setup lang="ts">
import legacyHtml from '../privacidade.html?raw'

const pageHtml = legacyHtml
  .match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1]
  .replace(/index\.html/g, '/')
  .replace('contato@pragma.com.br', 'pragmaco.consultoria@gmail.com') ?? ''

useSeoMeta({
  title: 'Política de Privacidade — PRAGMA',
  description: 'Política de Privacidade da PRAGMA Consultoria Linguística.',
})
</script>

<template>
  <div v-html="pageHtml" />
</template>
