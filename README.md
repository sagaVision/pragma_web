# PRAGMA — Consultoria Linguística Premium

Site de marketing institucional da PRAGMA, consultoria linguística premium que transforma conhecimento em comunicação real para profissionais do cenário global.

## Stack atual

- Nuxt 3 com geração estática para Netlify.
- Gerenciador de pacotes: `pnpm`.
- Comando de build: `pnpm generate`.
- Diretório publicado no Netlify: `.output/public`.
- Rotas principais: `/`, `/privacidade`, `/produtos` e `/produtos/:slug`.
- Produtos e links de checkout Hotmart ficam em `data/products.ts`.

---

## 🎯 Objetivo do Site

Converter visitantes em leads qualificados através de:
- Formulários de solicitação de contato
- Cliques no WhatsApp (botão flutuante + CTAs)
- Entrada nos programas: PRAGMA Fluency Path, grupos e mentorias

---

## ✅ Funcionalidades Implementadas

### Estrutura de Seções
1. **Hero Section** — Headline de impacto emocional + 2 CTAs principais
2. **Seção de Dor / Identificação** — 4 pain cards com ícones + citação de fechamento
3. **Soluções PRAGMA** — 3 pilares (Inglês para Carreira, Fluency Path, Espanhol)
4. **Método PRAGMA** — 4 etapas + mock visual de jornada do aluno
5. **Transformação** — Antes vs. Depois em cards paralelos
6. **Prova Social** — 3 depoimentos com destaque no central
7. **CTA Final** — Headline emocional + botão WhatsApp + opções de contato
8. **Footer** — Navegação, contato, institucional

### Funcionalidades Técnicas
- ✅ Navbar com scroll inteligente (transparente → sólido)
- ✅ Menu mobile responsivo (hamburger)
- ✅ Scroll reveal com Intersection Observer
- ✅ Animação de barra de progresso (Jornada do Aluno)
- ✅ Efeito 3D sutil nos cards ao hover (desktop)
- ✅ Cursor glow no desktop
- ✅ Smooth scroll para âncoras
- ✅ WhatsApp floating button com animação ping
- ✅ Highlight de link ativo na navbar
- ✅ Fechamento de menu com Escape / clique externo
- ✅ Página de Política de Privacidade (LGPD)

---

## 📁 Estrutura de Arquivos

```
/
├── pages/                  → Rotas Nuxt (`/`, `/privacidade`, `/produtos`)
├── data/products.ts        → Catálogo estático e links de checkout Hotmart
├── plugins/                → Interações client-side migradas para Nuxt
├── css/style.css           → Estilos globais, tokens e responsivo
├── public/_redirects       → Redirects Netlify para URLs antigas
└── netlify.toml            → Build estático para Netlify
```

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| `--black` | `#0a0a0a` |
| `--charcoal` | `#141414` |
| `--off-white` | `#f5f2ed` |
| `--gold` | `#b99b5a` |
| `--gold-light` | `#d4b878` |
| Font Serif | Cormorant Garamond |
| Font Sans | Inter |

---

## 🔗 Links do Site (Rotas)

| Rota | Descrição |
|------|-----------|
| `/` | Página principal |
| `/#hero` | Seção Hero |
| `/#dor` | Seção de identificação |
| `/#solucoes` | Soluções PRAGMA |
| `/#metodo` | Método PRAGMA |
| `/#transformacao` | Antes e Depois |
| `/#depoimentos` | Prova Social |
| `/#contato` | CTA final + contato |
| `/privacidade` | Política de Privacidade |

---

## 🔧 Configurações Necessárias (Personalização)

### WhatsApp
Número atual usado nos CTAs:
```
https://wa.me/55041998023799
```

### Instagram
Perfil atual:
```
https://instagram.com/cacaupragma
```

### E-mail
E-mail atual: `pragmaco.consultoria@gmail.com`.

---

## 🚀 Próximos Passos Sugeridos

1. **Formulário de Lead Capture** — Integrar formulário com API (ex: EmailJS, Formspree) para capturar leads diretamente do site
2. **Checkout Hotmart** — Substituir placeholders `SEU_CHECKOUT_*` em `data/products.ts`
3. **Termos de Uso** — Criar rota Nuxt para termos
4. **Google Analytics / Meta Pixel** — Adicionar rastreamento de conversões
5. **Blog / Conteúdo** — Seção de artigos sobre comunicação e idiomas
6. **Depoimentos em Vídeo** — Substituir depoimentos textuais por vídeos
7. **Formulário de Agendamento** — Integrar Calendly ou similar para "Agendar conversa"
8. **SEO** — Adicionar Open Graph tags, Schema.org, sitemap.xml
9. **Favicon** — Criar favicon personalizado com a letra P dourada
10. **Animação de entrada** — Considerar GSAP para animações mais elaboradas

---

## 📦 Dependências (CDN)

| Biblioteca | Versão | Uso |
|------------|--------|-----|
| Cormorant Garamond | Google Fonts | Tipografia serifada |
| Inter | Google Fonts | Tipografia sans-serif |
| Font Awesome Free | 6.4.0 | Ícones |

> Nenhuma dependência JavaScript de terceiros — 100% vanilla JS.

---

*Feito com propósito e precisão.*
