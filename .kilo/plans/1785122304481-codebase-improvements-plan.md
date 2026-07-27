# Codebase Improvements Plan

## Goal

Implement all recommendations from the code review to achieve 100% coverage across performance, accessibility, testing, type safety, security, and code organization improvements.

---

## 1. Performance Optimization

### 1.1 Particle Canvas Optimization
- **File**: `src/components/Hero.tsx` (lines 82-139)
- Reduce particle count from 38 to a configurable, lower default (e.g., 24) for low-end devices
- Implement `requestIdleCallback` fallback for the animation loop when page is not visible
- Add a `useEffect` cleanup that pauses animation when the Hero section is not in viewport (IntersectionObserver)
- Cap frame rate to 30fps on devices with `navigator.hardwareConcurrency <= 2`

### 1.2 Lazy Loading Non-Critical Components
- Lazy-load the tech marquee section in Hero (wrap in `React.lazy` or conditional render after main content paints)
- Lazy-load the `Shell` component (already in a `lazy` + `Suspense` wrapper — verify it works correctly)
- Add `loading="lazy"` to the canvas element if applicable

### 1.3 Bundle Size Monitoring
- Add `vite-bundle-analyzer` as a devDependency
- Create a `pnpm build:analyze` script that runs `vite build` with the analyzer plugin
- Set a warning threshold of 150KB gzipped for the main bundle

---

## 2. Accessibility Improvements

### 2.1 Alt Text and ARIA
- Add `role="img"` and `aria-label` to the canvas particle background in Hero
- Ensure all SVG icons have `aria-hidden="true"` where they are decorative, and `aria-label` where they are interactive
- Add `alt` attribute to the favicon and all static images in `public/`

### 2.2 Keyboard Navigation
- Implement focus trapping in the mobile dropdown menu (Navbar) when it is open
- Add `onKeyDown` handler for Escape key to close the mobile menu and the command palette
- Ensure all interactive elements have visible focus indicators (review `:focus-visible` styles across all components)
- Add a "Skip to main content" link at the top of the page

### 2.3 Screen Reader Support
- Add `aria-live="polite"` region for dynamic content updates (e.g., role typewriter, stats counters)
- Ensure the command palette (`CommandPalette.tsx`) manages focus correctly (focus first input on open, restore focus on close)
- Audit all `aria-expanded`, `aria-current`, and `aria-label` usages for correctness

### 2.4 Reduced Motion Preference
- Verify `prefers-reduced-motion` media query works correctly across all animations (already in `index.css` lines 536-541)
- Ensure the Framer Motion `useReducedMotion` hook is used consistently in all animated components

---

## 3. Testing

### 3.1 Unit Tests
- **`src/components/Navbar.test.tsx`**: Test scroll behavior, theme toggle, mobile menu open/close, keyboard interactions, and active section highlighting
- **`src/components/Hero.test.tsx`**: Test typewriter effect, particle canvas initialization, reduced motion handling, and stats pill rendering
- **`src/components/CommandPalette.test.tsx`**: Test open/close behavior, keyboard navigation, and command execution
- **`src/lib/github.test.ts`**: Test `useGitHubStats` hook and `formatCachedAgo` utility
- **`src/lib/terminalCommands.test.ts`**: Test command parsing and execution logic

### 3.2 E2E Tests
- **`src/test/e2e/navigation.spec.ts`**: Test full navigation flow (desktop + mobile), theme switching, and command palette
- **`src/test/e2e/accessibility.spec.ts`**: Run axe-core audit on each page and critical component

### 3.3 Contrast Checker Tests
- **`scripts/check-contrast.test.cjs`**: Unit tests for `srgbToLinear`, `luminance`, `hexToRgb`, `contrastRatio`, and `expandRgba` functions
- Add test cases for edge values (pure black, pure white, invalid hex)

### 3.4 Test Configuration
- Update `vitest` config in `package.json` to include coverage thresholds (minimum 80% branch coverage)
- Add `@testing-library/react` queries for all interactive elements in existing tests

---

## 4. Type Safety

### 4.1 Strict Types for NAV Array
- **File**: `src/components/Navbar.tsx` (lines 3-9)
- Define `NavItem` interface: `{ id: string; label: string; icon?: string }`
- Type the `NAV` constant as `readonly NavItem[]`
- Ensure `paletteRef` prop type is non-nullable where used: `React.RefObject<{ open: () => void }>`

### 4.2 Component Prop Typing
- Audit all components for `any` type usage and replace with explicit interfaces
- Ensure `React.FC` or plain function components are used consistently (pick one convention)
- Add generic props for reusable components (e.g., `ButtonProps`, `LinkProps`)

### 4.3 Type Guards
- Add type guards for runtime data validation in `useGitHubStats` and `formatCachedAgo`
- Use `zod` or `valibot` for parsing external data (GitHub API responses)

---

## 5. Environment Variables

### 5.1 Documentation
- **File**: `.env.example`
- Add documented entries for all required environment variables with descriptions and example values
- Include `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_GITHUB_TOKEN`, and any other public-facing vars

### 5.2 Build-Time Validation
- Create a `scripts/validate-env.cjs` script that checks for required env vars at build time
- Add `pnpm validate-env` to the `check` pipeline before build
- Fail the build with a clear error message listing missing variables

### 5.3 Runtime Safety
- In `src/lib/github.ts`, add safe fallback when `import.meta.env` variables are missing
- Log a warning (not error) in development when optional env vars are absent
- Ensure no secrets are exposed in the client bundle (review all `import.meta.env.*` usage)

---

## 6. Responsiveness

### 6.1 Mobile Navigation Testing
- Test the bottom dock navigation on viewports 320px, 375px, 414px, and 768px
- Ensure touch targets are minimum 44x44px (already implemented — verify)
- Verify the mobile dropdown menu closes on navigation or outside tap

### 6.2 Bento Grid
- Test the bento grid container queries at breakpoints: 400px, 640px, 768px, 1024px
- Ensure all grid areas render correctly in single-column layout on mobile
- Add `@container (max-width: 400px)` breakpoint if needed for very small screens

### 6.3 Responsive Images
- Add `srcSet` or `sizes` attributes to any `<img>` elements
- Ensure the `manifest.json` icons cover all required sizes for PWA

---

## 7. Security

### 7.1 XSS Prevention
- Review `WebhookTrace.tsx` for any `dangerouslySetInnerHTML` or unsanitized dynamic content
- Sanitize all user-generated or API-sourced content before rendering with `DOMPurify` or equivalent
- Ensure all external links have `rel="noopener noreferrer"` (already present — audit all instances)

### 7.2 Content Security Policy
- Add a `Content-Security-Policy` meta tag or HTTP header configuration
- Configure `vercel.json` with appropriate CSP headers
- Whitelist only necessary domains for scripts, styles, and connections

### 7.3 Credential Exposure Audit
- Search entire codebase for any hardcoded secrets, API keys, or tokens
- Ensure `.env.local` is in `.gitignore` (verify)
- Add a pre-commit hook check (or CI step) that scans for accidental secret commits

---

## 8. Animation Optimization

### 8.1 CSS-Transitions Over JS Animations
- Where possible, replace Framer Motion animations with CSS transitions for simple opacity/transform changes
- Keep Framer Motion for complex layout animations (stagger, viewport-based triggers)
- Add `will-change` hints to animated elements for GPU acceleration

### 8.2 Framer Motion Optimization
- Ensure all `motion` components have `memo()` wrappers where they don't need to re-render on parent state changes
- Review `layout` prop usage and replace with explicit `AnimatePresence` where needed
- Use `useReducedMotion` consistently across all animated components

---

## 9. Code Organization

### 9.1 CSS Modularization
- Split `src/index.css` into:
  - `src/styles/tokens.css` — all CSS custom properties and design tokens
  - `src/styles/base.css` — reset, typography, base styles
  - `src/styles/components.css` — component-specific styles (glow-card, bento-grid, status-pulse, etc.)
  - `src/styles/utilities.css` — utility classes, scrollbar, animations
- Update `index.html` or `main.tsx` to import the split files in correct order

### 9.2 Feature-Based Directory Structure
- Reorganize `src/components/` into feature groups:
  - `src/components/layout/` — Navbar, Footer, Shell, Hero
  - `src/components/sections/` — AboutExpertise, Projects, Contact, WebhookTrace
  - `src/components/ui/` — StatusWidget, CommandPalette (reusable widgets)
  - `src/components/shared/` — Reusable primitives (buttons, badges, cards)
- Update all import paths accordingly

### 9.3 Naming Conventions
- Enforce BEM-like naming for component CSS classes (e.g., `navbar__link`, `hero__canvas`)
- Use consistent file naming: `PascalCase` for components, `camelCase` for utilities, `kebab-case` for CSS

---

## 10. Internationalization Preparation

### 10.1 i18n Setup
- Install `react-i18next` and `i18next` as dependencies
- Create `src/locales/en.json` with all current English strings extracted from components
- Wrap the app in an `I18nextProvider` in `main.tsx`
- Use `useTranslation` hook in all components that contain hardcoded English text

### 10.2 Date/Number Formatting
- Replace any hardcoded date/number formatting with `Intl.DateTimeFormat` and `Intl.NumberFormat`
- Ensure the theme toggle and nav labels are translatable

---

## 11. SEO

### 11.1 Meta Tags
- Add proper `<meta>` tags in `index.html`: description, keywords, author, Open Graph, Twitter Card
- Implement dynamic `<title>` updates per route using `react-router-dom`'s `useNavigationType` or a `Meta` component

### 11.2 Server-Side Rendering
- Evaluate whether Next.js or Vite SSR is needed for the public-facing routes
- At minimum, ensure `index.html` has server-rendered content for the critical above-the-fold section
- Add `robots.txt` and `sitemap.xml` generation

---

## 12. Consistency & Linting

### 12.1 ESLint Rules
- Add `eslint-plugin-react-perf` for performance linting rules
- Enable `react/jsx-no-literals` to enforce translatable strings
- Add `no-console` rule with `console.warn` and `console.error` allowed in development only
- Enforce consistent `camelCase` for all variable and function names

### 12.2 Prettier
- Add `prettier` as a devDependency
- Create `.prettierrc` matching the team's style
- Add `format` script to `package.json`
- Add pre-commit hook for formatting via husky + lint-staged

---

## 13. Documentation

### 13.1 README Enhancement
- **File**: `README.md`
- Add setup instructions with all required environment variables
- Add a `Contributing` section with commit conventions and PR process
- Add a `Performance` section with Lighthouse scores and budget targets
- Add a `Testing` section with commands for running, coverage, and e2e tests

### 13.2 Component Documentation
- Add JSDoc comments to all non-trivial functions and component files
- Document the design token system in a `docs/TOKENS.md` file
- Document the CSS architecture (BEM, custom properties, naming conventions)

### 13.3 ADR Updates
- Update `docs/adr/` if any architectural decisions are made during this implementation (e.g., i18n library choice, CSS organization approach)

---

## Implementation Order

1. **Type safety and ESLint/Prettier setup** — foundation for all other changes
2. **Environment variables** — needed before any API-dependent work
3. **CSS modularization and code organization** — refactor first, then build on clean structure
4. **Accessibility** — can be done in parallel with code organization
5. **Performance optimizations** — after structure is clean
6. **Security** — audit and fix any XSS/CSP issues
7. **Testing** — write tests after components are stable
8. **SEO and i18n preparation** — final polish
9. **Documentation** — last step, reflects the final state

---

## Validation

- Run `pnpm run check` (lint → typecheck → test → build) after each phase
- Run `pnpm test:coverage` to verify 80%+ branch coverage after testing phase
- Run `pnpm build:analyze` to verify bundle size budget
- Run `pnpm lint` and `pnpm typecheck` to ensure no warnings or errors
- Run axe-core audit (`@axe-core/cli`) on the built site after accessibility phase
- Verify all contrast pairings pass `pnpm run check-contrast` after token changes