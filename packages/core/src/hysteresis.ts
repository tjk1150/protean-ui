import { defaultThresholds, type SizeClass, type TraitThresholds } from './traits.js'

export const defaultDeadband = 16

export function resolveSizeWithHysteresis(
  width: number,
  previous: SizeClass | undefined,
  thresholds: TraitThresholds = defaultThresholds,
  deadband: number = defaultDeadband
): SizeClass {
  const raw = classify(width, thresholds)
  if (previous === undefined || raw === previous) return raw

  const [min, max] = zoneOf(previous, thresholds, deadband)
  return width >= min && width < max ? previous : raw
}

function classify(width: number, thresholds: TraitThresholds): SizeClass {
  return width < thresholds.medium
    ? 'compact'
    : width < thresholds.expanded
      ? 'medium'
      : 'expanded'
}

function zoneOf(
  size: SizeClass,
  thresholds: TraitThresholds,
  deadband: number
): readonly [number, number] {
  switch (size) {
    case 'compact':
      return [Number.NEGATIVE_INFINITY, thresholds.medium + deadband]
    case 'medium':
      return [thresholds.medium - deadband, thresholds.expanded + deadband]
    case 'expanded':
      return [thresholds.expanded - deadband, Number.POSITIVE_INFINITY]
  }
}
