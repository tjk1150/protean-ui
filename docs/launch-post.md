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
component trees per overlay, wired by a width check, at every call site. Written by hand,
that recipe is 55 lines. The Protean version is 15:

```tsx
<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>
```

Same primitives underneath. The difference is who owns the decision.

To be fair: if fewer lines were the whole point, a wrapper like Credenza gets your call
sites just as short. The difference is the quality and scope of the decision, not the
line count. A wrapper keyed to width 768 cannot tell a narrow mouse-driven window from a
phone, leaves the SSR first-paint problem where it was, and covers one dialog. Protean
decides on two axes (size x input), makes SSR structurally unable to be wrong, and drives
ten roles - overlay, select, menu, navigation, screen skeleton, primary action, tooltip,
list-detail, action row, supporting pane - through one policy. (Credenza, for the record, has been dormant since November 2025 and was never
published to npm.)

## The gap

The web solved layout adaptation years ago: media queries, flexbox, container queries.
What it never solved is pattern adaptation - a popover becoming a bottom sheet, a sidebar
becoming a bottom tab bar, an inline button becoming a fixed action bar. Those swaps
change the DOM, the event model, the focus management, and the ARIA wiring. CSS cannot
express them, so every application expresses them by hand.

That is also the precise scope of "no breakpoints": Protean erases the branches that
choose a pattern (`isMobile ? <A/> : <B/>`). Layout tweaks like `md:flex-row` are a
problem CSS already solves well, and they stay CSS's job.

The design systems that solved this internally welded the solution to their brand. React
Spectrum switches Popover to Tray on mobile, but the trigger is a hard-coded
`window.screen.width <= 700`, and Spectrum 2 shipped without reimplementing it. SAP UI5
sniffs the user agent. The unstyled libraries - Radix, Base UI, React Aria Components -
deliberately leave the decision to you. When I surveyed the ecosystem before writing any
code, "automatic adaptation x style-agnostic x open source" was an empty intersection.

## What Android already proved

Android apps come out acceptable-looking even from average developers, and the reason is
structure, not taste: `WindowSizeClass` buckets the screen, `NavigationSuiteScaffold`
switches bar, rail, and drawer on its own, patterns exist as components. The platform
owns the decisions. Attempts to port that to the web wholesale - design-system bundles -
failed repeatedly on brand lock-in. What remains is unbundling: behavior (focus, ARIA)
is already solved by the headless libraries, the visual language must stay each team's
own, and the pattern-decision layer in between is the one that is still empty and still
universalizable. Protean is that layer. (The full argument: https://protean-ui-jintaes-projects.vercel.app/en/why)

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
- The viewport is not the only frame of reference. Inside a `ProteanBoundary` the size
  class is measured from that panel, and the sheet rises from the panel's own bottom
  edge - a dialog in a 420px side panel presents the compact way on a 1440px monitor.
  No other adaptive system on the web has this axis.
- One install is a whole app. Base UI installs alongside as a peer, so every
  non-adaptive component - form controls, tabs, toast, and the rest - is imported
  directly from it. No second UI library, and removing Protean leaves a plain Base UI
  app.

## SSR cannot be wrong, by construction

One architecture rule governs everything: a decision the server could get wrong must be
expressible in CSS, or deferred to interaction time.

- Overlays decide when they open. The served HTML contains the trigger and zero overlay
  markup - nothing to flash, mismatch, or shift. When you want the opposite trade, opt
  into `continuity="live"`: the overlay re-decides mid-open and swaps in place, with the
  content DOM, typed state, and focus preserved.
- Navigation chrome is one `nav > ul` tree whose bottom-bar, drawer, rail, and sidebar
  states are media-query CSS. The same DOM is served to everyone; measured cumulative
  layout shift is 0, and the navigation lays out correctly with JavaScript disabled.

## Receipts

Numbers from the repository, not projections:

- 73% less application code at the overlay call site (55 lines to 15 - measured against
  the hand-written recipe, not against wrapper libraries).
- Bundle: 7.0KB gzip for react with all ten roles, 1.2KB for core (excluding Base
  UI). One role via its public subpath (`@protean-ui/react/dialog`) is 3.0KB, and that
  tree-shakeability is enforced by the release gate as a contract.
- 229 library tests. The default policy is verified as an exhaustive 63-cell decision
  table, alongside boundary-value, state-transition, and negative suites; a release gate
  (`pnpm gate`) blocks every publish - a wrong decision cell is a blocked release, not a
  statistic.
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

- Pre-alpha. Ten roles exist today: Dialog, Select, Menu, Navigation, Screen,
  PrimaryAction, Tooltip, ListDetail, Actions, SupportingPane. React 18+; Next.js App Router and Vite are
  both first-class targets.
- Behavior is delegated to Base UI - focus traps, listbox semantics, drawer gestures.
  Protean refuses to reimplement solved problems; it owns only the decision, the wiring,
  and continuity across presentation switches.
- The default policy is not taste. It encodes documented platform convention (Material
  window size classes, HIG overlay patterns), and every default has a three-level escape
  hatch: instance, trait, policy.
- Style is not imposed, but not abandoned either: a reference stylesheet ships
  (`@protean-ui/css`), and teams that want only the vocabulary can import `tokens.css`
  alone. Values hang off the presentation, never the viewport - a sheet rounds only its
  top corners and a fullscreen surface has none because the role changed, not because a
  media query fired. Everything sits in `@layer`, so your CSS always wins.
- Known gaps, stated plainly: the default policy branches on input only at compact
  size - we refuse to ship speculative rules unvalidated on real devices, so
  tablet-touch differentiation waits for data (the virtual keyboard is likewise
  collected as a trait but not consulted yet). Chrome inside containers stays a CSS
  container-query concern. The sheet-mode Select pins its positioner with CSS until an
  unanchored option exists upstream. The tablet rail and bar-overflow cells are
  verified in jsdom and the iOS Simulator (real WebKit - iPhone 16 Pro, iPad Pro);
  physical hardware is still pending.

The name: protean - readily assuming different forms. The academic lineage is UI
plasticity (Thevenin and Coutaz, 1999). The kill-criteria verdict that gated this project
is in the repository, data included.

- Install: `npm install protean-ui` (pre-alpha)
- Repository: https://github.com/tjk1150/protean-ui
- Docs and live demo: https://protean-ui-jintaes-projects.vercel.app
- Why this exists: https://protean-ui-jintaes-projects.vercel.app/en/why - Design principles: https://protean-ui-jintaes-projects.vercel.app/en/concepts/design-principles
- Phase 0 verdict: https://github.com/tjk1150/protean-ui/blob/main/docs/phase-0-verdict.md
