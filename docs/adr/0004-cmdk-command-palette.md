# ADR 0004: Command palette built with cmdk

## Context

A keyboard-driven command palette was needed for jump-to-section, external links, copy email, theme toggle, and webhook demo trigger. Building all keyboard navigation, filtering, and accessibility behavior from scratch would be repeated work.

## Decision

Use the `cmdk` library for the command palette UI and keyboard behavior.

## Alternatives Considered

- Custom `<dialog>` + input + manual arrow-key navigation.
- Downshift / React Aria `Combobox`.
- A headless UI library like Radix UI primitives.

## Consequences

- `cmdk` handles filtering, arrow-key navigation, and Enter selection out of the box.
- The palette is lazy-loaded via `React.lazy`, so it does not block the main bundle on initial page load.
- Additional dependency (~18 KB gzipped) is added to the client bundle.

## Verification

`src/components/CommandPalette.tsx:2` contains `import { Command } from "cmdk";`.
