# Quality assurance

This project's QA follows the frame: **ISO/IEC 25010** defines what quality means,
**ISO/IEC/IEEE 29119** defines how we test for it, and the release gate below defines
what passing means for this library. Test suites are traceable to named 29119-4
design techniques; the gate is checked before every npm publish.

## Quality model (ISO/IEC 25010 -> protean-ui)

| Characteristic | What it means here | Where it is verified |
|---|---|---|
| Functional suitability | Decisions match the documented policy, exactly | `packs.decision-table.test.ts` - the full 54-cell cartesian table |
| Interaction capability | The accessible tree stays isomorphic across presentations; focus/ARIA props pass through | Dialog/Select/Navigation suites; axe runs on demo states |
| Compatibility | Presentations render correctly across engines and devices | Compatibility matrix below |
| Reliability | SSR invariant (no hydration-mismatch class), decisions pinned while open, graceful fallbacks | ssr-proof curl checks; `qa.transitions.test.tsx`; no-visualViewport and zero-width-boundary tests |
| Performance efficiency | The decision layer stays feather-weight; no redundant renders | Bundle budget in the gate; referential-stability store tests |
| Maintainability | The decision layer is pure and testable without a DOM | `@protean-ui/core` has no React/DOM dependency; 92 node tests |
| Flexibility | Every default has a three-level escape hatch | Instance/policy/pack override tests, `defaults()` delegation tests |
| Security | No network, no secrets, no dangerous HTML injection surface | Code review; the library renders only consumer-provided content |
| Safety | Not applicable to a UI presentation library | - |

## Test design techniques (ISO/IEC/IEEE 29119-4)

| Technique | Applied to | Suite |
|---|---|---|
| Decision table | The app-first pack, exhaustively: 3 overlay roles x 3 sizes x 3 inputs, plus navigation, primary action, and hint (54 cells) | `core/src/packs.decision-table.test.ts` |
| Boundary value analysis | Size thresholds (599/600, 839/840); hysteresis transitions in both directions (583/584, 615/616, 823/824, 855/856); virtual-keyboard threshold (649/650 at 800px); bar capacity (5 vs 6 items, degenerate capacity 1) | `traits.test.ts`, `hysteresis.test.ts`, `environment.test.ts`, `Navigation.test.tsx`, `qa.transitions.test.tsx` |
| Equivalence partitioning | Input profiles (touch / pointer / hybrid), size classes, overlay roles | throughout; partitions enumerated in the decision table |
| State transition | Overlay lifecycle (closed -> open pins the decision -> close -> reopen re-decides); drawer and overflow panels reset when their presentation leaves | `qa.transitions.test.tsx`, `Navigation.test.tsx`, `Dialog.test.tsx` |
| Negative / exception | Double-click on triggers, controlled values missing from items, empty override objects, unmeasurable boundaries, platforms without visualViewport | `qa.transitions.test.tsx`, `boundary.test.tsx`, `environment.test.ts` |
| Scenario | A production-grade mobile-only app migration as the end-to-end basis: 24 screens, 5 overlay migrations, desktop shell | the toss-clone suite (699 tests, external repo) |

## Compatibility matrix (manual, per release)

Cells: bar + overflow panel, drawer, rail, sidebar, sheet, modal, popover, fullscreen,
searchable select, container boundary.

| Surface | Status |
|---|---|
| Chrome desktop (1280/834/599 widths) | verified each release |
| Safari iOS - iPhone (real WebKit, simulator) | verified (16 Pro) |
| Safari iPadOS - tablet rail (simulator) | verified (iPad Pro 11) |
| Safari macOS, Firefox desktop | spot-checked; full pass pending |
| Android Chrome, physical hardware | pending - stated in the roadmap |

## Release exit criteria (quality gate)

Every machine-checkable criterion below runs as one command - `pnpm gate`
(`scripts/gate.mjs`) - which exits non-zero on any failure and prints the manual
criteria as a checklist. CI runs the same gate on every push and pull request
(`.github/workflows/ci.yml`; the external scenario suite is skipped there).
A publish to npm requires all of:

- Critical or major defects open: **0**
- Library suites: **100% pass** (core + react), typecheck clean across the workspace
- Decision table: **100% of cells asserted** (a policy edit must consciously edit the table)
- Scenario suite: toss-clone **699/699**
- axe on demo states: **0 critical or serious** introduced by protean (shared-backend focus-guard sentinels are documented and equal to the manual baseline)
- SSR: **zero overlay markup** in server HTML (curl), navigation CLS **0**
- Bundle budgets: react all-roles **<= 8KB gzip**; one role via its public subpath (`@protean-ui/react/dialog` style) **<= 3.5KB gzip** tree-shaken - a consumer of one role never pays for the others; core **<= 2KB gzip**
- Docs: every shipped prop documented in Korean and English; the honesty sections (README roadmap, design-principles, launch post known-gaps) match reality
- Compatibility: matrix above with **0 critical** on Chrome, iOS Safari, iPadOS

The gate intentionally has no "95% pass rate" style thresholds: a failing decision
cell or an SSR regression is a blocked release, not a statistic.
