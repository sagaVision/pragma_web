# PRAGMA — Consultoria Linguística Premium

Site institucional da PRAGMA, gerado como site estático Nuxt 3 para Netlify.

## Stack

- Nuxt 3 + Vue 3 com geração estática.
- Gerenciador de pacotes: `pnpm`.
- Deploy: Netlify publica `.output/public` gerado por `pnpm generate`.
- Estilos globais e tokens: `css/style.css`.
- Interações client-side: `plugins/site-interactions.client.ts`.

## Comandos

```bash
pnpm install
pnpm dev
pnpm generate
pnpm preview
```

Use `pnpm generate` antes de alterações sensíveis a deploy.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page |
| `/privacidade` | Política de Privacidade |
| `/produtos` | Catálogo de produtos |
| `/produtos/:slug` | Página individual de produto |

Redirects de compatibilidade ficam em `public/_redirects`:

```txt
/index.html / 301
/privacidade.html /privacidade 301
```

## Estrutura

```txt
pages/                         Rotas Nuxt
pages/produtos/[slug].vue      Página individual de produto
data/products.ts               Catálogo estático e links Hotmart
plugins/site-interactions.client.ts
css/style.css                  CSS global, tokens e responsivo
public/_redirects              Redirects Netlify
netlify.toml                   Configuração de build Netlify
dev-dogma-v0.21.md             Princípios de desenvolvimento do projeto
```

## Produtos

Os produtos são estáticos e ficam em `data/products.ts`.

Cada item define:

- `slug`
- textos comerciais
- benefícios e itens inclusos
- metadata SEO
- `checkoutUrl`

Antes de publicar vendas, substituir os placeholders Hotmart:

```txt
SEU_CHECKOUT_INGLES_CARREIRA
SEU_CHECKOUT_FLUENCY_PATH
SEU_CHECKOUT_ESPANHOL_VIDA
```

## Design

Tokens principais em `css/style.css`:

| Token | Valor |
|-------|-------|
| `--black` | `#0a0a0a` |
| `--charcoal` | `#141414` |
| `--off-white` | `#f5f2ed` |
| `--gold` | `#b99b5a` |
| `--gold-light` | `#d4b878` |
| `--font-serif` | Cormorant Garamond |
| `--font-sans` | Inter |

CDNs mantidos no `nuxt.config.ts`:

- Google Fonts: Cormorant Garamond e Inter.
- Font Awesome Free 6.4.0.

## Conteúdo Atual

- WhatsApp: `55041998023799`
- Instagram: `https://instagram.com/cacaupragma`
- E-mail: `pragmaco.consultoria@gmail.com`

## Pendências Conhecidas

- Criar página real de Termos de Uso; por enquanto o footer aponta para `#contato`.
- Substituir os links placeholder de checkout Hotmart em `data/products.ts`.
- Definir escopo antes de iniciar internacionalização (`pt`, `es`, `en`).
