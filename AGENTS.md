# AGENTS.md

## Project Shape
- This is now a Nuxt 3 static site generated for Netlify; use pnpm, run `pnpm generate`, and publish `.output/public`.
- Current routes are `/`, `/privacidade`, `/produtos`, and `/produtos/:slug`.
- Landing and privacy pages are Vue templates; do not reintroduce raw HTML imports or `v-html` for page content.
- Shared styling still lives in `css/style.css`; client-only behavior is in `plugins/site-interactions.client.ts`.

## Local Verification
- Run `pnpm install` once, then `pnpm dev` for local Nuxt development.
- Run `pnpm generate` before deploy-sensitive changes; Netlify uses this command via `netlify.toml`.
- Check `/`, `/privacidade`, `/produtos`, and each product route after content/layout changes.

## Implementation Notes
- Keep external checkout links in `data/products.ts`; replace the `SEU_CHECKOUT_*` Hotmart placeholders before launch.
- Treat `dev-dogma-v0.21.md` as the project development principles; consult it before making architectural or style decisions.
- Keep current CDNs in Nuxt head: Google Fonts and Font Awesome Free 6.4.0.
- Preserve Portuguese Brazil copy and `lang="pt-BR"` unless the task explicitly asks for localization changes.
- Design tokens are CSS custom properties in `:root` in `css/style.css`; prefer extending those over hard-coded colors/fonts.
- `js/main.js` is legacy and should not be loaded by Nuxt pages; behavior belongs in Vue/client plugins instead.
- Scroll reveal depends on adding `.reveal` in HTML and `.visible` being toggled by `IntersectionObserver`.

## Known Mismatches To Avoid
- `README.md` and the footer reference `termos.html`, but that file does not exist.
- The Nuxt footer currently routes "Termos de Uso" to `#contato` until a real terms page exists.
