# Protean UI

[![ci](https://github.com/tjk1150/protean-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/tjk1150/protean-ui/actions/workflows/ci.yml)

> Declare what your UI means. Protean decides how it presents - and how dense - in the user's current environment.

The component every responsive React app ends up writing:

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile
  ? <BottomSheet rowHeight={44} />   // touch sizing, coupled by hand
  : <Popover rowHeight={36} />;      // pointer density, coupled by hand
```

The same thing with Protean:

```tsx
<Select.Root aria-label="Billing cycle" items={cycles}>
  <Select.Trigger />
  <Select.Content />
</Select.Root>
```

| Environment | What the user gets |
|---|---|
| desktop + mouse | anchored popover, desktop-dense rows |
| phone + touch | bottom sheet, touch-sized rows |
| narrow window + mouse | still a popover - a narrow window is not a phone |

You write the intent. The environment branch and the density coupling stop being your code - and there is no `isMobile` left to keep two trees in sync.

**Status: pre-alpha.** APIs move without notice.

```
npm install @protean-ui/react
```

One install is a whole app: Base UI ships alongside as a dependency, so the non-adaptive components - form controls, tabs, toast, and the rest - are already there to import. No second UI library.

## The idea

CSS solved layout adaptation (media queries, container queries). Pattern adaptation - Popover vs BottomSheet, Sidebar vs BottomNav, inline button vs fixed action bar - is still manual branching in application code, because those swaps change the DOM, the focus management, and the ARIA wiring.

Protean moves that decision into a policy runtime. Every role works the way Select does above: `Dialog.Root role="form"` opens as a popover, sheet, modal, or fullscreen; `Navigation.Root` presents as a bar, drawer, rail, or sidebar; ten roles in all, driven by one policy reading the environment (size x input) so you never do.

Goal: **no breakpoints in application code** - precisely, no pattern-choosing branches (`isMobile ? <A/> : <B/>`). Layout tweaks like `md:flex-row` are a problem CSS already solves and stay CSS's job. The pattern breakpoints do not disappear - they move into one named, inspectable, overridable policy layer (`protean.config.ts`) that lives in your repo.

## Principles

- Not a component library. Behavior and a11y are delegated to proven headless primitives (Base UI today); visuals are yours. Protean owns only the decision, the wiring, and continuity across presentation switches.
- Values follow the presentation, never the viewport. The token contract (`@protean-ui/css/tokens.css`) sets shape, density, and motion per presentation, and the reference stylesheet consumes it - a radius changes only when the role changes - a sheet rounds its top corners, a fullscreen surface has none - and sits in `@layer` so your CSS always wins.
- SSR invariant: a decision the server can get wrong must be expressible in CSS, or deferred to interaction time. Overlays decide at open (zero SSR markup); chrome is one DOM tree whose presentations are CSS states (CLS 0, works without JavaScript).
- Accessibility is a contract: the accessible tree stays isomorphic across presentations.
- Decisions are values: traced to their source (instance, policy, or pack), explainable (`explain()` prints `overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`), unit-testable without rendering, stamped on the DOM.

## One install, a whole app

`npm install @protean-ui/react` brings the adaptation layer and the entire behavior layer: Base UI installs alongside as a dependency, so every non-adaptive component an app needs - form controls, tabs, accordion, toast, and the rest - is already there to `import` directly. No second UI library required, and no new ecosystem coupling: Protean is one layer on top of the substrate you would use anyway, and removing it leaves a plain Base UI app. The full map lives in the docs ("Is it enough?").

## Packages

| Package | What it is |
|---|---|
| `protean-ui` | umbrella, re-exports `@protean-ui/react` |
| `@protean-ui/react` | the semantic role components plus the environment store and provider; ships `reference.css` |
| `@protean-ui/core` | framework-agnostic traits and policy engine (no React, no DOM) |
| `@protean-ui/css` | the presentation-scoped token contract (`tokens.css`) and the reference stylesheet (`reference.css`) |

## Honest roadmap

Stated plainly, in the order we intend to close them:

- **Tablet-touch differentiation.** The default policy branches on input only at compact size today - we refuse to ship speculative rules unvalidated on real devices, so medium and expanded treat touch and mouse alike until we have data.
- **Container-scoped chrome.** Overlay decisions and geometry are container-scoped today (`ProteanBoundary` - a dialog in a 420px panel presents the compact way on any monitor, its sheet rising from the panel's own bottom edge); navigation and screen chrome inside containers stays a CSS-container-query concern.
- **An unanchored sheet option upstream** (the current sheet pins the floating-ui positioner with CSS).
- **Device and end-to-end testing.** The bar-overflow and tablet-rail cells are verified in jsdom and in the iOS Simulator (real WebKit, iPhone 16 Pro and iPad Pro); physical hardware and automated e2e remain.

## Quality

Testing follows ISO/IEC 25010 (what quality means) and ISO/IEC/IEEE 29119-4-derived
test design: the default policy is verified as an exhaustive 72-cell decision table,
thresholds and hysteresis by boundary value analysis, lifecycles by state-transition
tests, and odd user behavior by negative tests - 245 library tests plus a 699-test
real-app scenario suite. The release gate is documented in [docs/qa.md](docs/qa.md).

The project passed its own kill criteria before continuing
([Phase 0 verdict](docs/phase-0-verdict.md)), and the real test was a migration:
a production-grade 24-screen app moved onto Protean with all 699 of its tests
staying green and a net 152 lines of application code removed.

## Why "protean"

Protean: readily assuming different forms. The academic lineage of this idea is "UI plasticity" (Thevenin & Coutaz, 1999): interfaces that adapt to their context of use while preserving usability.

## License

MIT
