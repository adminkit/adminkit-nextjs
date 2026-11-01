# AdminKit for Next.js

Free, MIT-licensed Next.js admin template based on Bootstrap 5.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: static export into `out/`; `npm start` serves it
- `npm run lint`: ESLint, Prettier, `tsc` and the stats check; must pass
- `npm test`: Playwright smoke and axe tests on `out/` (build first; `npm run test:install` once)
- `npm run format`: Prettier write
- `npm run stats`: regenerate `src/data/stats.json` and the README counts

## Layout

- Next.js 16 App Router, React 19, strict TypeScript, `output: "export"`: mock data, no server runtime. `BASE_PATH` sets a base path.
- Routes are `src/app/(dashboard)/<name>` (sidebar layout) or `src/app/(auth)/<name>` (centered layout); `/` is the dashboard. Every page is listed in `src/data/pages.json` and exports `metadata = pageMetadata("/<name>")`.
- Structure: `src/app` holds only `page.tsx`/`layout.tsx`; `src/layouts` the dashboard and auth layouts; `src/components` the shared parts (`bootstrap`, `plugins`, `navbar`, `sidebar`, `ui`) and, under `pages/<section>/<page>/`, what only one page uses; `src/mocks` demo data; `src/data` app data (pages, navigation, stats).
- `src/components/bootstrap` replaces Bootstrap's JavaScript with React components on Bootstrap's markup (`Alert`, `Dropdown`, `Modal`, `Offcanvas`); `src/components/plugins` wraps the plugins; `src/scss` is AdminKit's Sass, with the plugin overrides in `5-vendor`.
- `src/lib/head-scripts.ts` runs in `<head>` before the first paint (color mode, the hidden state of the cards that fade in); it is a self-contained function.

## Rules

- Only CSS custom properties get a prefix: `--ak-*`, like Bootstrap's `--bs-*`. Classes, Sass variables, functions, mixins and data attributes never do.
- Pages are server components; `"use client"` goes on the smallest component that needs state, effects or the browser. Never query or change the DOM React renders; keep it in state.
- No Bootstrap JavaScript, no react-bootstrap, no Tailwind. Browser-only plugins load in `useEffect` with `import()` or `next/dynamic` with `ssr: false` and show a `Skeleton` until they draw.
- Light and dark mode: `data-bs-theme` on `<html>`. Change the mode only through `useColorMode` (`src/lib/config.ts`). Colors that follow the mode use custom properties (`var(--bs-body-color)`, `var(--ak-surface-bg)`); dark-only overrides go in `@include color-mode(dark) { ... }` at the end of the partial. Check both modes.
- Charts and maps read colors from the `theme` argument: `<ChartJs config={(theme) => ...} />`, `<VectorMap options={(theme) => ...} />`.
- Icons are `lucide-react` components with the classes of the markup (`<CircleCheckBig className="align-middle" />`). Images are `<img>` with `width`, `height` and `src={asset("/img/...")}`, so the base path applies.
- Counts come from `src/data/stats.json`, and AdminKit PRO's from `src/data/editions/pro.json` (a snapshot); a page description writes them as `{icons.lucide}`. Never type a count by hand. A new dependency goes in `src/data/plugins.json`, as a plugin or in `notPlugins`, or lint fails.
- Motion: write transitions with `@include transition(...)`; under reduced motion nothing moves (a fade is fine). Cards inside `.reveal-cards` and `.reveal` elements fade in on scroll without extra code (`PageEffects`, `data-revealed`).
- Layout shift stays 0: reserve the final size of anything a script draws, give images `width` and `height`.
- Accessibility: WCAG 2.2 AA in both modes, no console errors or hydration warnings (`npm test`). Text colors come from `readable($color, $background)`, text on a fill from `text-on($background)`. Icon-only buttons get an `aria-label`; card titles are `h2.card-title`.

## Conventions

- Conventional Commits, see `CONTRIBUTING.md`; lefthook enforces them.
- A PR that changes behaviour adds a short, user-facing line under `Unreleased` in `CHANGELOG.md`, like "Add pricing page (/pages-pricing)" or "Upgrade dependencies".

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
