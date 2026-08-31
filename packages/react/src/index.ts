export * from '@protean-ui/core'

export { createEnvironmentStore, type EnvironmentStore } from './environment'
export {
  ProteanProvider,
  defaultSsrTraits,
  usePolicy,
  useReadTraits,
  useTraits,
  type ProteanProviderProps
} from './provider'
export * as Dialog from './overlay/index.parts'
export type {
  DialogCloseProps,
  DialogContentProps,
  DialogProps,
  DialogTriggerProps
} from './overlay/Dialog'
export { defaultOverlayComponents, type OverlayComponents } from './overlay/defaults'
export type { OverlayPresentationProps } from './overlay/types'
export * as Navigation from './navigation/index.parts'
export type { NavigationItemProps, NavigationProps } from './navigation/Navigation'
export * as Screen from './screen/index.parts'
export type { ScreenSlotProps } from './screen/Screen'
export * as PrimaryAction from './primary-action/index.parts'
export type { PrimaryActionProps } from './primary-action/PrimaryAction'
export * as Select from './select/index.parts'
export type {
  SelectContentProps,
  SelectItemProps,
  SelectOption,
  SelectRootProps,
  SelectTriggerProps
} from './select/Select'
