export * from '@protean-ui/core'

export { createEnvironmentStore, type EnvironmentStore } from './environment.js'
export {
  ProteanProvider,
  defaultSsrTraits,
  useReadTraits,
  useTraits,
  type ProteanProviderProps
} from './provider.js'
export {
  Dialog,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogProps,
  type DialogTriggerProps
} from './overlay/Dialog.js'
export { defaultOverlayComponents, type OverlayComponents } from './overlay/defaults.js'
export type { OverlayPresentationProps } from './overlay/types.js'
