# Protean UI

> Headless adaptive UI runtime for React. Declare what your UI means; the runtime decides how it presents in the current environment.

**Status: pre-alpha.** Phase 0 spike in progress. Nothing here is published or stable yet.

## The idea

Web apps still encode environment-to-presentation decisions by hand at every call site:

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");
return isMobile ? <BottomSheet /> : <Popover />;
```

CSS solved layout adaptation (media queries, container queries). Pattern adaptation - Popover vs BottomSheet, Sidebar vs BottomNav, inline button vs fixed action bar - is still manual branching in application code.

Protean moves that decision into a policy runtime:

```tsx
<Dialog role="form">...</Dialog>       // popover, sheet, modal, or fullscreen -
<Navigation>...</Navigation>           // bar, rail, or sidebar -
<PrimaryAction>Buy</PrimaryAction>     // decided by traits (size x input), not by you
```

Goal: **no breakpoints in application code.** Breakpoints do not disappear - they move into one named, inspectable, overridable policy layer (`protean.config.ts`) that lives in your repo.

## Principles

- Not a component library. Behavior and a11y are delegated to proven headless primitives (Base UI by default, adapters for yours); visuals are yours. Protean owns only the decision, the wiring, and continuity across presentation switches.
- Parametric adaptation (density, radius, hit targets) runs in CSS. Structural adaptation (pattern swaps) runs in JS, under an SSR invariant: a decision the server can get wrong must be expressible in CSS, or deferred to interaction time.
- Accessibility is a contract: the accessible tree stays isomorphic across presentations.

## Why "protean"

Protean: readily assuming different forms. The academic lineage of this idea is "UI plasticity" (Thevenin & Coutaz, 1999): interfaces that adapt to their context of use while preserving usability.

## License

MIT
