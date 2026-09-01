# Protean UI: no breakpoints in application code

Every React codebase I have seen contains some version of this component:

```tsx
const isDesktop = useMediaQuery("(min-width: 768px)");
return isDesktop ? (
  <Dialog>...</Dialog>   // centered modal
) : (
  <Drawer>...</Drawer>   // bottom sheet
);
```

The shadcn docs teach it as a recipe. Credenza packages it. Every team maintains two
component trees per overlay, wired by a width check, at every call site. In our reference
implementation that is 55 lines. The Protean version is 15:

```tsx
<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>
```

Same primitives underneath. The difference is who owns the decision.

## The gap

The web solved layout adaptation years ago: media queries, flexbox, container queries.
What it never solved is pattern adaptation - a popover becoming a bottom sheet, a sidebar
becoming a bottom tab bar, an inline button becoming a fixed action bar. Those swaps
change the DOM, the event model, the focus management, and the ARIA wiring. CSS cannot
express them, so every application expresses them by hand.

The design systems that solved this internally welded the solution to their brand. React
Spectrum switches Popover to Tray on mobile, but the trigger is a hard-coded
`window.screen.width <= 700`, and Spectrum 2 shipped without reimplementing it. SAP UI5
sniffs the user agent. The unstyled libraries - Radix, Base UI, React Aria Components -
deliberately leave the decision to you. When I surveyed the ecosystem before writing any
code, "automatic adaptation x style-agnostic x open source" was an empty intersection.

## What Protean is

A headless adaptation policy runtime. Radix and Base UI give you the patterns; Protean
decides which pattern, when.

- You declare meaning: `<Dialog.Root role="form">`, `<Navigation.Root>`,
  `<PrimaryAction.Root>`.
- A pure policy function maps environment traits - size class x input modality - to a
  presentation. Width is a proxy, not the real variable: a narrow desktop window with a
  mouse is not a phone, so it gets a small modal, not a thumb-oriented sheet.
- The policy lives in your repository (`protean.config.ts`), the way your Tailwind config
  does. Overrides speak trait language (`presentation={{ compact: "fullscreen" }}`),
  never pixels. Every decision is stamped on the DOM as `data-presentation` and is
  explainable: `explain()` prints
  `overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`.

## SSR cannot be wrong, by construction

One architecture rule governs everything: a decision the server could get wrong must be
expressible in CSS, or deferred to interaction time.

- Overlays decide when they open. The served HTML contains the trigger and zero overlay
  markup. There is nothing to flash, mismatch, or shift.
- Navigation chrome is one `nav > ul` tree whose bottom-bar, drawer, rail, and sidebar
  states are media-query CSS. The same DOM is served to everyone; measured cumulative
  layout shift is 0, and the navigation lays out correctly with JavaScript disabled.

## Receipts

Numbers from the repository, not projections:

- 73% less application code at the overlay call site (55 lines to 15, same primitives).
- axe: zero violations on the navigation and fullscreen states; on the open modal, one
  fewer flagged node than the manual recipe it replaces (the remainder are the focus-guard
  sentinels of the shared backend, present in both implementations).
- Then the real test. We migrated a production-grade clone of a Toss gamification
  mini-app: 24 screens, 699 tests, five hand-rolled bottom sheets, mobile-only by design.
  All five overlays collapsed into the one semantic component (net -152 lines of
  application code), and a roughly 50-line shell component gave the mobile-only app a
  desktop layout - persistent sidebar, viewport-centered modals, live shell swap on
  window resize. All 699 tests stayed green, and the mobile experience is exactly what it
  was.

## Honest edges

- Pre-alpha. Five roles exist today: Dialog, Select, Navigation, Screen, PrimaryAction.
  React 18+; Next.js App Router and Vite are both first-class targets.
- Behavior is delegated to Base UI - focus traps, listbox semantics, drawer gestures.
  Protean refuses to reimplement solved problems; it owns only the decision, the wiring,
  and continuity across presentation switches.
- The default policy is not taste. It encodes documented platform convention (Material
  window size classes, HIG overlay patterns), and every default has a three-level escape
  hatch: instance, trait, policy.
- Known gaps: the tablet rail cell is exercised in jsdom but not yet on devices; the
  sheet-mode Select pins its positioner with CSS until an unanchored option exists
  upstream; registry-style distribution comes after the API settles.

The name: protean - readily assuming different forms. The academic lineage is UI
plasticity (Thevenin and Coutaz, 1999). The kill-criteria verdict that gated this project
is in the repository, data included.

- Repository: https://github.com/tjk1150/protean-ui
- Live demo: [LIVE_DEMO_URL]
- Phase 0 verdict: https://github.com/tjk1150/protean-ui/blob/main/docs/phase-0-verdict.md
