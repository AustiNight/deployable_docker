# Deployable Docker

“Moldable clay” starter for rapidly prototyping React + Vite + Tailwind websites inside an instantly bootable Docker container. It ships a seeded content model, client-side persistence (IndexedDB with localStorage fallback), shadcn/ui components, Lucide icons, template switching, and a dashboard that lets non-technical stakeholders reshape copy, layout, and theme tokens in minutes.

## Feature Highlights

- **Full-stack ready scaffold** – React 18, Vite, TypeScript, Tailwind, shadcn/ui, React Router, Lucide icons.
- **Client-side persistence helpers** – `usePersistedState`, IndexedDB utilities, reset hooks, and `zustand` stores.
- **Seeded content & templates** – restaurant, portfolio, and marketplace variants with themed assets and fixtures.
- **Content dashboard** – live editing of navigation, hero, CTA, features, contact data, layout toggles, and theme tokens.
- **Theme system** – preset gallery, palette/accent/font controls, CSS variable sync, and Web Animations API reveal hooks.
- **CLI generators** – `npm run generate:page` and `npm run generate:component` scaffolding commands.
- **Docker-first workflow** – development target and production preview baked into the `Dockerfile` and `docker-compose.yml`.
- **CI-ready** – npm scripts for `lint`, `typecheck`, `build`, plus a GitHub Actions skeleton under `.github/workflows/ci.yml`.

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# typecheck + build
npm run typecheck
npm run build
```

Navigate to <http://localhost:5175>. The seeded navigation exposes **Home**, **About Us**, **Contact Us**, **Sign Up**, and **Login**. Use `admin@moldableclay.dev / moldable` (or password `demo`) to access the dashboard.

### Docker Workflow

```bash
# start dev server inside Docker (hot reload via bind mount)
docker compose up --build

# production-like preview image
docker build --target preview -t moldable-preview .
docker run -p 4175:4175 moldable-preview
```

### CLI Generators

```bash
# scaffold a new page component (writes src/pages/ServicesPage.tsx)
npm run generate:page -- Services

# scaffold a reusable component (writes src/components/foo/Bar.tsx)
npm run generate:component -- Bar foo

# export seeded fixtures (default template to stdout)
npm exec tsx scripts/generate-fixture.ts default > fixtures/default.json
```

## Content Model & Persistence

- `src/state/content-store.ts` – zustand-powered store with auto-persist and template application helpers.
- `src/state/persistence` – `IndexedDB` + localStorage dual persistence, reset utilities, and a `usePersistedState` hook.
- `src/data/fixtures.ts` – default “Moldable Clay” seed.
- `src/data/templates.ts` – industry-specific presets (restaurant, creative portfolio, marketplace) and metadata.
- `src/hooks/use-apply-theme.ts` – syncs theme tokens to CSS variables for Tailwind consumption.

## Dashboard Overview

Once logged in, the **Dashboard** tab set provides:

- **Content** – navigation manager, hero editor, feature block editor, page copy controls (About, CTA, Contact, Sign Up).
- **Appearance** – layout toggles (hero animation, sections on/off) and theme token switcher (palette, accent, radius, font).
- **Templates** – apply prebuilt fixtures in one click; theme + content swap instantly in the preview.
- **Utilities** – export current content as JSON, restore defaults, or clear IndexedDB/localStorage.

## Repo Structure

```
src/
  components/      shadcn/ui extensions, layout primitives, dashboard editors, forms, sections
  data/            fixtures, templates, theme tokens, icon mapping
  hooks/           reusable hooks (theme sync, animation)
  pages/           router targets (Home, About, Contact, SignUp, Login, Dashboard, NotFound)
  state/           zustand stores, persistence helpers, auth mock
  styles/          Tailwind entrypoint with CSS variables
  utils/           animation helpers, class merging
```

## Continuous Integration

- `npm run lint` – ESLint (TS-aware, React hooks, accessibility, import ordering).
- `npm run typecheck` – project-wide TypeScript check (no emit).
- `npm run build` – production bundle via Vite.
- `.github/workflows/ci.yml` – CI skeleton running the three commands above (enable in repo settings after first push).

## Publishing

1. Create an empty GitHub repository (no README or license).
2. Add the remote locally and push the generated history.
3. Optional: enable the provided CI workflow and GitHub Pages (Vite build outputs to `dist/`).

```powershell
git init
git add .
git commit -m "Bootstrap moldable clay scaffold"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Next Ideas

- Harden lint rules (import order auto-fix, Tailwind helper tidy-ups) and integrate Prettier formatting.
- Layer on Storybook/Ladle for component previews and snapshotting alt templates.
- Add e2e smoke tests (Playwright/Cypress) to verify navigation, dashboard edits, and persistence resets.
- Wire up deployment automation to GitHub Pages, Netlify, or container registries.
