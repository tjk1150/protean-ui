# @protean-ui/react

Declare what your UI means. Protean decides how it presents - and how dense -
in the user's current environment.

The component every responsive React app ends up writing:

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile
  ? <BottomSheet rowHeight={44} />   // touch sizing, coupled by hand
  : <Popover rowHeight={36} />;      // pointer density, coupled by hand
```

The same thing with Protean:

```tsx
import { Select } from '@protean-ui/react'
import '@protean-ui/react/reference.css'

<Select.Root aria-label="Billing cycle" items={cycles}>
  <Select.Trigger />
  <Select.Content />
</Select.Root>
```

| Environment | What the user gets |
| --- | --- |
| desktop + mouse | anchored popover, desktop-dense rows |
| phone + touch | bottom sheet, touch-sized rows |
| narrow window + mouse | still a popover - a narrow window is not a phone |

You write the intent. The environment branch and the density coupling stop
being your code - and there is no `isMobile` left to keep two trees in sync.

Ten roles work this way - Dialog, Select, Menu, Navigation, Screen,
PrimaryAction, Tooltip, ListDetail, Actions, SupportingPane - plus
`ProteanBoundary` for container-scoped decisions. Behavior (focus, dismissal,
ARIA) is delegated to [Base UI](https://base-ui.com), which installs alongside
as a peer, so the non-adaptive components are already there to import. No
second UI library.

- Server-safe by construction: overlays decide at open time (zero SSR markup);
  chrome morphs one DOM tree with CSS (no hydration mismatch, CLS 0).
- Style-agnostic: components stamp `data-scope` / `data-part` /
  `data-presentation` / `data-density`; bring your own CSS or import the
  reference stylesheet.
- Per-role subpaths keep bundles small: `@protean-ui/react/dialog` and friends,
  with tree-shakeability enforced by the release gate.

Status: pre-alpha. APIs move without notice.

Documentation and live demos: https://protean-ui-jintaes-projects.vercel.app -
repository: https://github.com/tjk1150/protean-ui
