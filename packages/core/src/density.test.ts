import { describe, expect, it } from 'vitest'
import { appFirst, asPolicy, decideDensity, definePolicy, explain } from './index'

const policy = asPolicy(appFirst)
const traits = (input: 'touch' | 'pointer' | 'hybrid') => ({
  size: 'expanded' as const,
  input,
  hover: input !== 'touch',
  reducedMotion: false,
  virtualKeyboard: false
})

describe('density (spike)', () => {
  it('reads touch as touch and pointer as comfortable', () => {
    expect(decideDensity(policy, traits('touch')).presentation).toBe('touch')
    expect(decideDensity(policy, traits('pointer')).presentation).toBe('comfortable')
  })

  it('never guesses compact - it takes an explicit choice', () => {
    expect(decideDensity(policy, traits('hybrid')).presentation).not.toBe('compact')
    expect(decideDensity(policy, traits('pointer'), 'compact').presentation).toBe('compact')
    expect(decideDensity(policy, traits('pointer'), 'compact').source).toBe('instance')
  })

  it('is a pack rule like any other domain, and explains itself', () => {
    const dense = definePolicy({
      extends: appFirst,
      density: ({ traits, defaults }) => (traits.input === 'pointer' ? 'compact' : defaults())
    })
    const decision = decideDensity(dense, traits('pointer'))
    expect(decision.presentation).toBe('compact')
    expect(explain(decision)).toContain('density')
  })
})
