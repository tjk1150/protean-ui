# protean-ui

Adaptive UI runtime for React: declare what the UI means, let a policy decide
how it presents in the current environment.

This is the umbrella package; it re-exports
[`@protean-ui/react`](https://www.npmjs.com/package/@protean-ui/react).
For the reference stylesheet, import it from the react package directly:

```tsx
import { Dialog, Navigation, Screen } from 'protean-ui'
import '@protean-ui/react/reference.css'
```

Status: pre-alpha. APIs move without notice.

Documentation and demos: https://github.com/tjk1150/protean-ui
