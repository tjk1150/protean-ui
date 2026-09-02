# Changelog

All four packages (`protean-ui`, `@protean-ui/react`, `@protean-ui/core`, `@protean-ui/css`) are versioned and released together. Pre-alpha: APIs move without notice until 0.1.0.

## 0.1.0-alpha.9 - 2026-09-02

- **One official entry point: `@protean-ui/react`.** Docs and READMEs previously
  mixed `npm install protean-ui` with `import ... from '@protean-ui/react'` -
  structurally inevitable, since the umbrella carries neither `reference.css`
  nor the per-role subpaths. Everything now teaches the scoped package, where
  install, imports, the stylesheet, and `@protean-ui/react/dialog`-style
  subpaths share one name. The `protean-ui` umbrella remains published as a
  short alias and its README points here.
- The npm READMEs now carry the same 30-second first screen as GitHub: the
  hand-coupled `isMobile` + `rowHeight` branch versus a bare `Select`, and the
  outcome table including "a narrow window is not a phone".
- No runtime changes.

## 0.1.0-alpha.8 - 2026-09-02

- **Density** - the sixth policy domain, and the first geometry semantic:
  `compact | comfortable | touch`. Protean never computes pixels; it decides
  which profile applies (touch input reads touch, a precise pointer reads
  comfortable, and the denser compact is reachable only by explicit choice) and
  tokens carry the values. The automatic path is pure CSS - the pointer default
  lives in a `(pointer: coarse)` media query in `tokens.css`, zero JavaScript.
- `<ProteanProvider density>` carries a user's density setting (the Gmail-style
  option) as an instance override; `useDensityProfile()` exposes the decision.
- **Portaled surfaces stamp their own `data-density`** (dialog, menu, select,
  tooltip popups) - ancestor-based selectors can never reach a portal, so the
  components carry the profile themselves, exactly like `data-presentation`.
- New tokens `--protean-target` (32/40/48) and `--protean-row` (28/36/44)
  respond to the profile; sheet popups force touch metrics whatever the profile
  (a sheet is a thumb surface). This also fixes a real defect: the reference
  chrome previously served touch-sized 44px targets to every environment -
  desktop menus now sit desktop-dense.
- Honest boundary, stated in the docs: app-wide density keyed only to screen or
  pointer needs three lines of CSS, not Protean. Protean owns the decision when
  the inputs are things CSS cannot see - a user setting, the pattern decision,
  container context.
- Decision table grows to 72 cells; the density demo (`/density-spike`)
  compares the Protean wiring against an honest hand-rolled implementation side
  by side.

## 0.1.0-alpha.7 - 2026-09-02

- **Controlled open state everywhere.** `Menu.Root`, `Select.Root`, `Tooltip.Root`, and `SupportingPane.Root` now accept `open` / `defaultOpen` / `onOpenChange`, matching Dialog - wire any openable surface to routing, analytics, or an external close. Decisions still happen at open time, controlled or not; a hint opened via a controlled prop appears only after hydration (the mount gate is unchanged).
- First release published from CI via npm trusted publishing (OIDC) - no npm tokens exist anymore.

## 0.1.0-alpha.6 - 2026-09-02

- **SupportingPane** (tenth role): supporting content beside the main content where there is room; on compact it collapses behind a toggle and rises as a non-modal bottom sheet - same DOM, morphed by CSS, markup identical on server and client. The author chooses the compact meaning (`compact="sheet" | "stacked"`), never the environment. Completes Material's canonical layouts alongside ListDetail (feed stays a CSS grid concern).
- New docs page "Is it enough?" - the coverage map: one install brings the adaptation layer and, via the Base UI peer, the entire behavior layer. No second UI library.
- Subpath `@protean-ui/react/supporting-pane` (13 public subpaths total).

## 0.1.0-alpha.5 - 2026-09-02

- **Trigger `render` prop** on `Dialog.Trigger` and `Menu.Trigger` (Base UI convention): compose the trigger's behavior, aria wiring, and refs onto another element - a styled host button or a `Tooltip.Trigger`. Exactly one button reaches the DOM.
- `Tooltip.Trigger` passes every button prop through (`onClick` composes with the toggletip open; `disabled` lands natively and locks the hint with it) and is now `forwardRef`, making it the canonical render target on React 18 and 19 alike.
- Nested `ProteanBoundary` contract pinned by test: the nearest boundary wins, for both the decision and containment.
- New docs page "Using them together": the full assembly, why composition cannot tangle, and the four spots that deserve care.

## 0.1.0-alpha.4 - 2026-09-02

- **Actions** (ninth role): a row of actions where the author marks what may step aside (`secondary`); compact collapses those behind a More toggle and expands them in place as full-width rows. Environment-independent markup, proven by an outerHTML-equality test.
- Subpath `@protean-ui/react/actions`.

## 0.1.0-alpha.3 - 2026-09-02

- **Menu** (sixth role): action menus via the contextual overlay decision - anchored dropdown or bottom sheet, `destructive` items stamped `data-variant="danger"`.
- **Tooltip** (seventh role) and the **hint** policy domain: a classic tooltip where hover exists, a tap-opened toggletip where it does not. Mount-gated so server and first paint agree on a plain button.
- **ListDetail** (eighth role) and the **listDetail** policy domain: two panes or one screen, router-agnostic (`detailActive` is app state), both panels in the same DOM with CSS visibility.
- **Per-role public subpaths** (`@protean-ui/react/dialog` and friends) with tree-shakeability enforced by the release gate as a contract; `/*#__PURE__*/` annotations.
- `--protean-danger` global token (replacing a `light-dark()` usage that was inert without `color-scheme`).

## 0.1.0-alpha.2 - 2026-09-01

- **@protean-ui/css** first published: `tokens.css` (the presentation-scoped token contract - shape, density, motion per presentation, zero media queries) and `reference.css` (the full reference stylesheet, `@layer protean`, chrome gated behind `.protean-defaults`). `@protean-ui/react/reference.css` remains as an import shim.
- **Portal-to-boundary**: modal, fullscreen, and sheet presentations (Select sheets included) portal into the nearest `ProteanBoundary` and are stamped `data-contained` - the sheet rises from the panel's own bottom edge. Anchored popovers deliberately stay at the document level.
- **Transition continuity** (`continuity="live"` on Dialog): the overlay re-decides mid-open and swaps presentation in place with content DOM, typed state, and focus preserved, via portal reparenting into a persistent content host.

## 0.1.0-alpha.1 - 2026-09-01

- **ProteanBoundary**: container-scoped overlay decisions - a dialog inside a 420px panel presents the compact way on any monitor. Overlays measure the boundary the moment they open; unmeasurable boundaries fall back to the viewport.
- **Searchable Select** (`searchable` prop): the backend swaps to Base UI Combobox with proper combobox semantics, filtering, and an empty state, in both popover and sheet presentations.
- `virtualKeyboard` trait collected from `visualViewport` (not yet consulted by the default policy - stated honestly).
- Standards-based QA: ISO/IEC 25010 + 29119-4 test design (exhaustive decision table, boundary-value, state-transition, negative suites) and the `pnpm gate` release gate with machine-checked bundle budgets.

## 0.1.0-alpha.0 - 2026-09-01

Initial release. Five roles - Dialog (form, confirmation, contextual), Select, Navigation (bar, drawer, rail, sidebar as media-CSS states of one DOM tree), Screen, PrimaryAction - on the four-layer pipeline: traits (size x input) -> pure policy -> React components delegating behavior to Base UI -> data-attribute presentation stamps. SSR invariant from day one: overlays decide at open (zero server markup), chrome is CSS states. Policy packs with three-level overrides (instance, trait, policy) and `explain()`.
