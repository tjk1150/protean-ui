'use client'

import {
  appFirst,
  asPolicy,
  defaultThresholds,
  type Policy,
  type PolicyPack,
  type TraitThresholds,
  type Traits
} from '@protean-ui/core'
import * as React from 'react'
import { createEnvironmentStore, type EnvironmentStore } from './environment'
import { defaultOverlayComponents, type OverlayComponents } from './overlay/defaults'

export const defaultSsrTraits: Traits = {
  size: 'compact',
  input: 'touch',
  hover: false,
  reducedMotion: false,
  virtualKeyboard: false
}

export interface ProteanContextValue {
  readonly policy: Policy
  readonly components: OverlayComponents
  readonly store: EnvironmentStore | null
  readonly ssrTraits: Traits
}

const ProteanContext = React.createContext<ProteanContextValue | null>(null)

export interface ProteanProviderProps {
  readonly policy?: Policy | PolicyPack
  readonly ssrTraits?: Traits
  readonly thresholds?: TraitThresholds
  readonly components?: Partial<OverlayComponents>
  readonly children: React.ReactNode
}

function normalizePolicy(policy: Policy | PolicyPack): Policy {
  return 'resolveOverlay' in policy ? policy : asPolicy(policy)
}

export function ProteanProvider({
  policy = appFirst,
  ssrTraits = defaultSsrTraits,
  thresholds = defaultThresholds,
  components,
  children
}: ProteanProviderProps): React.JSX.Element {
  const [store] = React.useState<EnvironmentStore | null>(() =>
    typeof window === 'undefined' ? null : createEnvironmentStore(thresholds)
  )

  const value = React.useMemo<ProteanContextValue>(
    () => ({
      policy: normalizePolicy(policy),
      components: { ...defaultOverlayComponents, ...components },
      store,
      ssrTraits
    }),
    [policy, components, store, ssrTraits]
  )

  return <ProteanContext.Provider value={value}>{children}</ProteanContext.Provider>
}

const defaultPolicy = asPolicy(appFirst)
let defaultStore: EnvironmentStore | null = null

function defaultContextValue(): ProteanContextValue {
  if (typeof window !== 'undefined' && !defaultStore) {
    defaultStore = createEnvironmentStore()
  }
  return {
    policy: defaultPolicy,
    components: defaultOverlayComponents,
    store: defaultStore,
    ssrTraits: defaultSsrTraits
  }
}

export function useProteanContext(): ProteanContextValue {
  return React.useContext(ProteanContext) ?? defaultContextValue()
}

export function usePolicy(): Policy {
  return useProteanContext().policy
}

const noopSubscribe = (): (() => void) => () => {}

export function useTraits(): Traits {
  const { store, ssrTraits } = useProteanContext()
  return React.useSyncExternalStore(
    store ? store.subscribe : noopSubscribe,
    store ? store.getTraits : () => ssrTraits,
    () => ssrTraits
  )
}

export function useReadTraits(): () => Traits {
  const { store, ssrTraits } = useProteanContext()
  return React.useCallback(() => (store ? store.getTraits() : ssrTraits), [store, ssrTraits])
}
