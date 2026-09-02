# protean-ui

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
being your code. Ten roles work this way - Dialog, Select, Menu, Navigation,
Screen, PrimaryAction, Tooltip, ListDetail, Actions, SupportingPane - and Base
UI ships alongside as a peer, so the non-adaptive components are already there
to import.

This package is a short alias. The one official entry point is
[`@protean-ui/react`](https://www.npmjs.com/package/@protean-ui/react) -
install that, and every name (imports, `reference.css`, per-role subpaths)
matches. This umbrella only re-exports it.

Status: pre-alpha. APIs move without notice.

Documentation and live demos: https://protean-ui-jintaes-projects.vercel.app -
repository: https://github.com/tjk1150/protean-ui
