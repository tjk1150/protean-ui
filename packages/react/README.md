# @protean-ui/react

Semantic adaptive components for React. Declare what a piece of UI *means*
(`<Dialog.Root role="form">`, `<Navigation.Root>`, `<PrimaryAction.Root>`)
and a policy runtime decides how it presents in the current environment:
popover, sheet, modal, or fullscreen; tab bar, drawer, rail, or sidebar;
action bar, sticky footer, or inline.

- Decisions come from traits (size class x input modality), not `isMobile`.
- Server-safe by construction: overlays decide at open time (zero SSR markup),
  chrome morphs one DOM tree with CSS (no hydration mismatch, no CLS).
- Style-agnostic: components stamp `data-scope` / `data-part` /
  `data-presentation`; bring your own CSS or import the reference stylesheet.
- Behavior (focus, dismissal, ARIA) is delegated to
  [Base UI](https://base-ui.com).

```tsx
import { Dialog } from '@protean-ui/react'
import '@protean-ui/react/reference.css'

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>
// phone: fullscreen. desktop: centered modal. app code: zero breakpoints.
```

Status: pre-alpha. APIs move without notice.

Documentation and demos: https://github.com/tjk1150/protean-ui
