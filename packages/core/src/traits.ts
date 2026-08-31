export type SizeClass = 'compact' | 'medium' | 'expanded'

export type InputProfile = 'touch' | 'pointer' | 'hybrid'

export interface Traits {
  readonly size: SizeClass
  readonly input: InputProfile
  readonly hover: boolean
  readonly reducedMotion: boolean
  readonly virtualKeyboard: boolean
}

export interface EnvironmentSnapshot {
  readonly width: number
  readonly height: number
  readonly coarsePointer: boolean
  readonly canHover: boolean
  readonly reducedMotion: boolean
  readonly virtualKeyboardVisible: boolean
}

export interface TraitThresholds {
  readonly medium: number
  readonly expanded: number
}

export const defaultThresholds: TraitThresholds = {
  medium: 600,
  expanded: 840
}

export function resolveTraits(
  env: EnvironmentSnapshot,
  thresholds: TraitThresholds = defaultThresholds
): Traits {
  const size: SizeClass =
    env.width < thresholds.medium
      ? 'compact'
      : env.width < thresholds.expanded
        ? 'medium'
        : 'expanded'

  const input: InputProfile = env.coarsePointer
    ? env.canHover
      ? 'hybrid'
      : 'touch'
    : 'pointer'

  return {
    size,
    input,
    hover: env.canHover,
    reducedMotion: env.reducedMotion,
    virtualKeyboard: env.virtualKeyboardVisible
  }
}
