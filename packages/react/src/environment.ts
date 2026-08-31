'use client'

import {
  defaultDeadband,
  defaultThresholds,
  resolveSizeWithHysteresis,
  resolveTraits,
  type TraitThresholds,
  type Traits
} from '@protean-ui/core'

export interface EnvironmentStore {
  readonly subscribe: (listener: () => void) => () => void
  readonly getTraits: () => Traits
}

function traitsEqual(a: Traits, b: Traits): boolean {
  return (
    a.size === b.size &&
    a.input === b.input &&
    a.hover === b.hover &&
    a.reducedMotion === b.reducedMotion &&
    a.virtualKeyboard === b.virtualKeyboard
  )
}

export function createEnvironmentStore(
  thresholds: TraitThresholds = defaultThresholds,
  deadband: number = defaultDeadband
): EnvironmentStore {
  const queries = {
    coarse: window.matchMedia('(pointer: coarse)'),
    hover: window.matchMedia('(hover: hover)'),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
  }

  function read(previous?: Traits): Traits {
    const base = resolveTraits(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        coarsePointer: queries.coarse.matches,
        canHover: queries.hover.matches,
        reducedMotion: queries.reducedMotion.matches,
        virtualKeyboardVisible: false
      },
      thresholds
    )
    const size = resolveSizeWithHysteresis(window.innerWidth, previous?.size, thresholds, deadband)
    return size === base.size ? base : { ...base, size }
  }

  let traits = read()
  const listeners = new Set<() => void>()

  function currentTraits(): Traits {
    const next = read(traits)
    if (!traitsEqual(next, traits)) traits = next
    return traits
  }

  function update(): void {
    const previous = traits
    if (currentTraits() === previous) return
    for (const listener of listeners) listener()
  }

  function attach(): () => void {
    const mediaQueries = Object.values(queries)
    window.addEventListener('resize', update)
    for (const query of mediaQueries) query.addEventListener('change', update)
    return () => {
      window.removeEventListener('resize', update)
      for (const query of mediaQueries) query.removeEventListener('change', update)
    }
  }

  let detach: (() => void) | null = null

  return {
    subscribe: (listener) => {
      if (listeners.size === 0) detach = attach()
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && detach) {
          detach()
          detach = null
        }
      }
    },
    getTraits: currentTraits
  }
}
