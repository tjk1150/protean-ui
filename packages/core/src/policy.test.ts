import { describe, expect, it } from 'vitest'
import {
  appFirst,
  asPolicy,
  decideNavigation,
  decideOverlay,
  decidePrimaryAction,
  definePolicy,
  explain,
  resolveTraits,
  type OverlayPresentation,
  type OverlayRole,
  type Traits
} from './index.js'
import { env } from './traits.test.js'

function traitsOf(width: number, input: 'touch' | 'pointer'): Traits {
  return resolveTraits(
    env({ width, coarsePointer: input === 'touch', canHover: input === 'pointer' })
  )
}

const policy = asPolicy(appFirst)

describe('appFirst overlay policy', () => {
  const cases: ReadonlyArray<[number, 'touch' | 'pointer', OverlayRole, OverlayPresentation]> = [
    [375, 'touch', 'confirmation', 'sheet'],
    [375, 'touch', 'form', 'fullscreen'],
    [375, 'touch', 'contextual', 'sheet'],
    [375, 'pointer', 'confirmation', 'modal'],
    [375, 'pointer', 'form', 'modal'],
    [375, 'pointer', 'contextual', 'popover'],
    [768, 'touch', 'confirmation', 'modal'],
    [768, 'touch', 'contextual', 'popover'],
    [1280, 'pointer', 'form', 'modal'],
    [1280, 'touch', 'contextual', 'popover']
  ]

  it.each(cases)('width %i + %s + %s -> %s', (width, input, role, expected) => {
    expect(decideOverlay(policy, traitsOf(width, input), role).presentation).toBe(expected)
  })
})

describe('appFirst navigation and primary action policy', () => {
  it('maps navigation across the matrix', () => {
    expect(decideNavigation(policy, traitsOf(375, 'touch')).presentation).toBe('bar')
    expect(decideNavigation(policy, traitsOf(375, 'pointer')).presentation).toBe('drawer')
    expect(decideNavigation(policy, traitsOf(768, 'touch')).presentation).toBe('rail')
    expect(decideNavigation(policy, traitsOf(1280, 'pointer')).presentation).toBe('sidebar')
  })

  it('maps primary action across the matrix', () => {
    expect(decidePrimaryAction(policy, traitsOf(375, 'touch')).presentation).toBe('action-bar')
    expect(decidePrimaryAction(policy, traitsOf(375, 'pointer')).presentation).toBe('sticky-footer')
    expect(decidePrimaryAction(policy, traitsOf(768, 'touch')).presentation).toBe('inline')
    expect(decidePrimaryAction(policy, traitsOf(1280, 'pointer')).presentation).toBe('inline')
  })
})

describe('definePolicy', () => {
  it('reports pack as the source without project overrides', () => {
    const decision = decideOverlay(policy, traitsOf(375, 'touch'), 'form')
    expect(decision.source).toBe('pack')
    expect(decision.policyName).toBe('app-first')
  })

  it('reports policy as the source when an override changes the outcome', () => {
    const custom = definePolicy({
      extends: appFirst,
      name: 'acme',
      overlay: ({ traits, role, defaults }) =>
        role === 'form' && traits.size === 'compact' ? 'sheet' : defaults()
    })
    const changed = decideOverlay(custom, traitsOf(375, 'touch'), 'form')
    expect(changed.presentation).toBe('sheet')
    expect(changed.source).toBe('policy')
  })

  it('reports pack as the source when an override delegates to defaults', () => {
    const custom = definePolicy({
      extends: appFirst,
      overlay: ({ defaults }) => defaults()
    })
    const decision = decideOverlay(custom, traitsOf(1280, 'pointer'), 'contextual')
    expect(decision.presentation).toBe('popover')
    expect(decision.source).toBe('pack')
  })
})

describe('instance overrides', () => {
  it('forces a fixed presentation', () => {
    const decision = decideOverlay(policy, traitsOf(1280, 'pointer'), 'form', 'sheet')
    expect(decision.presentation).toBe('sheet')
    expect(decision.source).toBe('instance')
  })

  it('applies a size-scoped override only for the matching size class', () => {
    const override = { compact: 'fullscreen' } as const
    expect(decideOverlay(policy, traitsOf(375, 'pointer'), 'confirmation', override).presentation).toBe('fullscreen')
    expect(decideOverlay(policy, traitsOf(1280, 'pointer'), 'confirmation', override).presentation).toBe('modal')
    expect(decideOverlay(policy, traitsOf(1280, 'pointer'), 'confirmation', override).source).toBe('pack')
  })
})

describe('explain', () => {
  it('renders a readable decision trace', () => {
    const decision = decideOverlay(policy, traitsOf(375, 'touch'), 'form')
    expect(explain(decision)).toBe(
      'overlay(form) -> fullscreen [pack:app-first] size=compact input=touch'
    )
  })
})
