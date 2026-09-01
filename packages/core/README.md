# @protean-ui/core

The framework-agnostic half of Protean UI: a trait model (size class x input
modality, with hysteresis) and a pure, serializable policy engine that maps
`(role, traits)` to a presentation decision.

- `resolveTraits(environment)` turns raw signals into a vocabulary:
  `compact | medium | expanded` x `touch | pointer | hybrid`.
- `definePolicy({ extends: appFirst, ... })` layers project rules over a base
  pack, with `defaults()` delegation and per-decision source tracing.
- `decideOverlay / decideNavigation / decidePrimaryAction` return plain
  `Decision` values; `explain(decision)` renders the reasoning as one line.

No React, no DOM. React bindings live in `@protean-ui/react`.

Status: pre-alpha. APIs move without notice.

Documentation and demos: https://github.com/tjk1150/protean-ui
