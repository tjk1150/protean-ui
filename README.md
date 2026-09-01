# Protean UI

> Headless adaptive UI runtime for React. Declare what your UI means; the runtime decides how it presents in the current environment.

**Status: pre-alpha.** Phase 0 passed its kill criteria ([verdict](docs/phase-0-verdict.md)). Five roles are implemented (Dialog, Select, Navigation, Screen, PrimaryAction), proven against a 699-test production-grade app migration. APIs move without notice.

```
npm install protean-ui
```

## The idea

Web apps still encode environment-to-presentation decisions by hand at every call site:

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");
return isMobile ? <BottomSheet /> : <Popover />;
```

CSS solved layout adaptation (media queries, container queries). Pattern adaptation - Popover vs BottomSheet, Sidebar vs BottomNav, inline button vs fixed action bar - is still manual branching in application code.

Protean moves that decision into a policy runtime:

```tsx
<Dialog.Root role="form">...</Dialog.Root>   // popover, sheet, modal, or fullscreen -
<Navigation.Root>...</Navigation.Root>       // bar, drawer, rail, or sidebar -
<PrimaryAction.Root>Buy</PrimaryAction.Root> // decided by traits (size x input), not by you
```

Goal: **no breakpoints in application code** - precisely, no pattern-choosing branches (`isMobile ? <A/> : <B/>`). Layout tweaks like `md:flex-row` are a problem CSS already solves and stay CSS's job. The pattern breakpoints do not disappear - they move into one named, inspectable, overridable policy layer (`protean.config.ts`) that lives in your repo.

## Principles

- Not a component library. Behavior and a11y are delegated to proven headless primitives (Base UI today); visuals are yours. Protean owns only the decision, the wiring, and continuity across presentation switches.
- Values follow the presentation, never the viewport. The bundled reference stylesheet (`@protean-ui/react/reference.css`) changes a radius only when the role changes - a sheet rounds its top corners, a fullscreen surface has none - and sits in `@layer` so your CSS always wins.
- SSR invariant: a decision the server can get wrong must be expressible in CSS, or deferred to interaction time. Overlays decide at open (zero SSR markup); chrome is one DOM tree whose presentations are CSS states (CLS 0, works without JavaScript).
- Accessibility is a contract: the accessible tree stays isomorphic across presentations.
- Decisions are values: traced to their source (instance, policy, or pack), explainable (`explain()` prints `overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`), unit-testable without rendering, stamped on the DOM.

## Packages

| Package | What it is |
|---|---|
| `protean-ui` | umbrella, re-exports `@protean-ui/react` |
| `@protean-ui/react` | the five semantic components plus the environment store and provider; ships `reference.css` |
| `@protean-ui/core` | framework-agnostic traits and policy engine (no React, no DOM) |

## Honest roadmap

Stated plainly, in the order we intend to close them:

- **Tablet-touch differentiation.** The default policy branches on input only at compact size today - we refuse to ship speculative rules unvalidated on real devices, so medium and expanded treat touch and mouse alike until we have data.
- **Container-boundary geometry.** Overlay decisions are container-scoped today (`ProteanBoundary` - a dialog in a 420px panel presents the compact way on any monitor), but the sheet still slides from the viewport edge; portal-to-boundary geometry and container-scoped chrome (via CSS container queries) remain.
- **Presentation-scoped token package.** The reference stylesheet demonstrates the token contract (`--protean-shape` set per presentation); a standalone themable package comes after the API settles.
- **An unanchored sheet option upstream** (the current sheet pins the floating-ui positioner with CSS).
- **Device and end-to-end testing.** The bar-overflow and tablet-rail cells are verified in jsdom and in the iOS Simulator (real WebKit, iPhone 16 Pro and iPad Pro); physical hardware and automated e2e remain.

## Quality

Testing follows ISO/IEC 25010 (what quality means) and ISO/IEC/IEEE 29119-4-derived
test design: the default policy is verified as an exhaustive 45-cell decision table,
thresholds and hysteresis by boundary value analysis, lifecycles by state-transition
tests, and odd user behavior by negative tests - 149 library tests plus a 699-test
real-app scenario suite. The release gate is documented in [docs/qa.md](docs/qa.md).

## Why "protean"

Protean: readily assuming different forms. The academic lineage of this idea is "UI plasticity" (Thevenin & Coutaz, 1999): interfaces that adapt to their context of use while preserving usability.

## License

MIT
