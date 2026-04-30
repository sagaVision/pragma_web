# AGENTS.md

## Project Shape
- This is now a Nuxt 3 static site generated for Netlify; use pnpm, run `pnpm generate`, and publish `.output/public`.
- Current routes are `/`, `/privacidade`, `/produtos`, and `/produtos/:slug`.
- The landing and privacy pages still import legacy root HTML (`index.html`, `privacidade.html`) as raw content during the first migration phase.
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
- `js/main.js` is legacy and should not be loaded by Nuxt pages; migrate behavior into Vue/client plugins instead.
- Scroll reveal depends on adding `.reveal` in HTML and `.visible` being toggled by `IntersectionObserver`.

## Known Mismatches To Avoid
- `README.md` still mentions placeholder contact data, but `index.html` currently uses WhatsApp `55041998023799`, Instagram `@cacaupragma`, and `pragmaco.consultoria@gmail.com`.
- `privacidade.html` still contains `contato@pragma.com.br`, but the Nuxt `/privacidade` route replaces it with `pragmaco.consultoria@gmail.com` at render time.
- `README.md` and the footer reference `termos.html`, but that file does not exist.
- The footer links to `#sobre`, but no `id="sobre"` section exists in `index.html`.
