# Phase 0 verdict: Go

Recorded 2026-08-31, ahead of the 2026-09-14 deadline. Both spikes were completed and all
three kill criteria were measured against a live Next.js 16 App Router app. The criteria
were fixed before the spikes began and were not modified.

## The rule

If the Overlay spike could not clearly beat the manual shadcn-style recipe on lines of
code, SSR correctness, and accessibility parity, the runtime would be abandoned and the
project would pivot to a recipes-and-hooks collection.

## Measurements

### 1. Lines of code (target: 50%+ reduction per call site) - PASS

Both implementations use the same primitives underneath (Base UI Dialog and Drawer), so
the comparison isolates the cost of owning the decision.

| Implementation | LOC | File |
| --- | --- | --- |
| Manual responsive dialog (useMediaQuery + two trees) | 55 | `apps/demo/app/delete-demo/manual-dialog.tsx` |
| `<Dialog.Root role="form">` | 15 | `apps/demo/app/delete-demo/protean-dialog.tsx` |

Reduction: 73%.

### 2. SSR correctness (target: zero wrong-presentation flash) - PASS

Two mechanisms, one invariant: a decision the server could get wrong must be expressible
in CSS, or deferred to interaction time.

- Overlays are decided at open time. The served HTML of `/ssr-proof` contains the trigger
  and zero overlay markup (`grep -c 'data-part="popup"'` returns 0). There is nothing to
  flash, mismatch, or shift.
- Navigation is one `nav > ul` tree whose bar / drawer / rail / sidebar states are pure
  media-query CSS. The served HTML of `/navigation-spike` contains all five items and
  `aria-current` with JavaScript disabled. Measured cumulative layout shift: 0. The jsdom
  suite asserts the list markup is byte-identical across presentation changes.

Verified live in a browser: the same `<Dialog.Root role="form">` rendered a centered modal
at 1280px with a fine pointer and a fullscreen sheet at 375px under touch emulation, both
with `role="dialog"`; a sub-600px window with a fine pointer produced a drawer-style
navigation while the dialog stayed a modal - the width-only manual recipe flips to the
touch sheet in that same window.

### 3. Accessibility (target: axe serious+ = 0, parity with the manual recipe) - PASS with a note

axe-core 4 measurements:

| State | Violations |
| --- | --- |
| `/navigation-spike` as bottom bar (touch emulation) | 0 |
| `/navigation-spike` as drawer (narrow window, fine pointer) | 0 |
| Fullscreen form dialog open (touch emulation) | 0 |
| Modal open | 1 serious (`aria-hidden-focus`), 3 nodes |
| Modal open, manual recipe (baseline) | 1 serious (`aria-hidden-focus`), 4 nodes |

The flagged nodes are Base UI internals in both columns: focus-guard sentinels
(`data-base-ui-focus-guard`, the standard focus-trap technique that axe is known to flag)
and the inert-marked background. Protean adds zero violations beyond its backend and
flags one node fewer than the baseline. Read strictly, "serious = 0" fails for both
implementations equally; read as the comparison it was written to be, parity holds.
Recorded as-is rather than silently reinterpreting the criterion.

## Findings that shaped the library

- An environment store that only updates under subscription serves stale traits to
  interaction-time decisions. `getTraits()` now recomputes on every read with referential
  stability; a regression test pins this.
- Compound components built with `Object.assign(Component, { Part })` lose their static
  properties across the React Server Components boundary. The public API is now
  parts-namespaced (`Dialog.Root`, `Navigation.Root`), the same pattern Base UI ships for
  the same reason.
- The `data-scope` attribute belongs on the scope root only; parts carry `data-part`.
  Stamping scope on parts lets root-level CSS leak onto every part.
- Turbopack does not resolve `.js` extension imports to `.ts` sources under
  `transpilePackages`; package-internal imports are extensionless.

## Known limits of the measurement

- The medium-width fine-pointer cell (rail) and hybrid input devices were exercised in
  jsdom and by policy unit tests, not in a live browser.
- Focus behavior was verified by inspection (focus moves into the popup, returns to the
  trigger, Escape closes); a scripted keyboard walkthrough is Phase 1 work.
- The keyboard-avoidance and safe-area behavior of PrimaryAction is not yet implemented
  and therefore unmeasured.

## Decision

The runtime earns its existence: one semantic declaration replaced a 55-line hand-rolled
branch, first paint cannot be wrong by construction for both overlay and navigation
chrome, and accessibility matches the recipe it replaces. Phase 1 proceeds: `Screen`,
`PrimaryAction`, then the toss-clone app-first showcase.
