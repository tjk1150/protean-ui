import { describe, expect, it } from 'vitest'
import { resolveSizeWithHysteresis } from './index.js'

describe('resolveSizeWithHysteresis', () => {
  it('uses plain classification when there is no previous size', () => {
    expect(resolveSizeWithHysteresis(605, undefined)).toBe('medium')
    expect(resolveSizeWithHysteresis(599, undefined)).toBe('compact')
  })

  it('keeps compact inside the deadband above the medium threshold', () => {
    expect(resolveSizeWithHysteresis(600, 'compact')).toBe('compact')
    expect(resolveSizeWithHysteresis(615, 'compact')).toBe('compact')
    expect(resolveSizeWithHysteresis(616, 'compact')).toBe('medium')
  })

  it('keeps medium inside the deadband below the medium threshold', () => {
    expect(resolveSizeWithHysteresis(599, 'medium')).toBe('medium')
    expect(resolveSizeWithHysteresis(584, 'medium')).toBe('medium')
    expect(resolveSizeWithHysteresis(583, 'medium')).toBe('compact')
  })

  it('keeps medium inside the deadband above the expanded threshold', () => {
    expect(resolveSizeWithHysteresis(855, 'medium')).toBe('medium')
    expect(resolveSizeWithHysteresis(856, 'medium')).toBe('expanded')
  })

  it('keeps expanded inside the deadband below the expanded threshold', () => {
    expect(resolveSizeWithHysteresis(824, 'expanded')).toBe('expanded')
    expect(resolveSizeWithHysteresis(823, 'expanded')).toBe('medium')
  })

  it('jumps two classes when the width leaves the zone entirely', () => {
    expect(resolveSizeWithHysteresis(1200, 'compact')).toBe('expanded')
    expect(resolveSizeWithHysteresis(320, 'expanded')).toBe('compact')
  })

  it('honors a custom deadband', () => {
    expect(resolveSizeWithHysteresis(640, 'compact', undefined, 50)).toBe('compact')
    expect(resolveSizeWithHysteresis(651, 'compact', undefined, 50)).toBe('medium')
  })
})
