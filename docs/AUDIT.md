# AUDIT

Single source of truth for factual claims in Sprints 12–15.
Every line below traces directly to a command run in this sprint.

---

## Tech Stack

**Command run:**
```
$ find src -type f | sort
src/App.tsx
src/components/AboutExpertise.tsx
src/components/CommandPalette.tsx
src/components/Contact.tsx
src/components/Footer.tsx
src/components/Hero.tsx
src/components/Navbar.tsx
src/components/Projects.tsx
src/components/Shell.tsx
src/components/StatusWidget.tsx
src/components/WebhookTrace.tsx
src/data/profile.ts
src/data/projects.ts
src/index.css
src/lib/github.ts
src/lib/terminalCommands.ts
src/main.tsx
src/pages/ProjectCaseStudy.tsx
src/vite-env.d.ts
```

```
$ cat package.json | grep -A100 '"dependencies"'
  "dependencies": {
    "@vercel/node": "^5.6.15",
    "cmdk": "^1.1.1",
    "framer-motion": "^12.42.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.18.1",
    "stripe": "^17.7.0"
  },
  "devDependencies": {
    "@axe-core/cli": "^4.12.1",
    "@eslint/js": "^9.9.1",
    "@types/node": "^26.1.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

Declared runtime dependencies:
- `@vercel/node` ^5.6.15
- `cmdk` ^1.1.1
- `framer-motion` ^12.42.2
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-router-dom` ^7.18.1
- `stripe` ^17.7.0

Declared dev dependencies:
- `@axe-core/cli` ^4.12.1
- `@eslint/js` ^9.9.1
- `@types/node` ^26.1.1
- `@types/react` ^18.3.5
- `@types/react-dom` ^18.3.0
- `@vitejs/plugin-react` ^4.3.1
- `autoprefixer` ^10.4.18
- `eslint` ^9.9.1
- `eslint-plugin-react-hooks` ^5.1.0-rc.0
- `eslint-plugin-react-refresh` ^0.4.11
- `globals` ^15.9.0
- `postcss` ^8.4.35
- `tailwindcss` ^3.4.1
- `typescript` ^5.5.3
- `typescript-eslint` ^8.3.0
- `vite` ^5.4.2

---

## Test Coverage

**Command run:**
```
$ grep -n '"test"' package.json
(no output)
```

**Finding:** No automated tests currently in this repo.

There is no `test` script in `package.json`, no test runner dependency is
declared, and no test files were discovered in the source tree. Coverage
percentage is therefore undefined, not zero.

---

## Known Limitations

**Command run:**
```
$ grep -rn "TODO\|FIXME\|XXX" src/
(no output)
```

```
$ pnpm build 2>&1 | grep -i "warning"
(no output)
```

**Finding:** No `TODO`, `FIXME`, or `XXX` markers found in `src/`.
No build warnings were emitted during the most recent `pnpm build`.

Known limitations are currently limited to the honest absence of an
automated test suite, as stated in the Test Coverage section above.
