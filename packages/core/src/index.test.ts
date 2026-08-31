import { describe, expect, it } from 'vitest'
import { defaultThresholds, resolveTraits, type EnvironmentSnapshot } from './index.js'

function env(overrides: Partial<EnvironmentSnapshot>): EnvironmentSnapshot {
  return {
    width: 1280,
    height: 800,
    coarsePointer: false,
    canHover: true,
    reducedMotion: false,
    virtualKeyboardVisible: false,
    ...overrides
  }
}

describe('resolveTraits', () => {
  it('classifies size below 600 as compact', () => {
    expect(resolveTraits(env({ width: 599 })).size).toBe('compact')
  })

  it('classifies 600 to 839 as medium', () => {
    expect(resolveTraits(env({ width: 600 })).size).toBe('medium')
    expect(resolveTraits(env({ width: 839 })).size).toBe('medium')
  })

  it('classifies 840 and above as expanded', () => {
    expect(resolveTraits(env({ width: 840 })).size).toBe('expanded')
  })

  it('classifies coarse pointer without hover as touch', () => {
    const traits = resolveTraits(env({ coarsePointer: true, canHover: false }))
    expect(traits.input).toBe('touch')
  })

  it('classifies fine pointer as pointer regardless of width', () => {
    const traits = resolveTraits(env({ width: 375, coarsePointer: false, canHover: true }))
    expect(traits.size).toBe('compact')
    expect(traits.input).toBe('pointer')
  })

  it('classifies coarse pointer with hover as hybrid', () => {
    const traits = resolveTraits(env({ coarsePointer: true, canHover: true }))
    expect(traits.input).toBe('hybrid')
  })

  it('accepts custom thresholds', () => {
    const traits = resolveTraits(env({ width: 700 }), { medium: 720, expanded: 1200 })
    expect(traits.size).toBe('compact')
  })

  it('exposes M3-aligned defaults', () => {
    expect(defaultThresholds).toEqual({ medium: 600, expanded: 840 })
  })
})
