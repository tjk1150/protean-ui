import { describe, expect, it } from 'vitest'
import {
  appFirst,
  asPolicy,
  decideHint,
  decideNavigation,
  decideOverlay,
  decidePrimaryAction,
  type ActionPresentation,
  type HintPresentation,
  type InputProfile,
  type NavigationPresentation,
  type OverlayPresentation,
  type OverlayRole,
  type SizeClass,
  type Traits
} from './index'

/* ISO/IEC/IEEE 29119-4 decision-table test: the app-first pack, exhaustively.
   Every (inputs -> expected presentation) row below IS the documented default
   policy; any pack edit must consciously edit this table. */

const policy = asPolicy(appFirst)

function traits(size: SizeClass, input: InputProfile): Traits {
  return {
    size,
    input,
    hover: input === 'pointer' || input === 'hybrid',
    reducedMotion: false,
    virtualKeyboard: false
  }
}

const SIZES: readonly SizeClass[] = ['compact', 'medium', 'expanded']
const INPUTS: readonly InputProfile[] = ['touch', 'pointer', 'hybrid']

const OVERLAY_TABLE: Record<OverlayRole, Record<SizeClass, Record<InputProfile, OverlayPresentation>>> = {
  contextual: {
    compact: { touch: 'sheet', pointer: 'popover', hybrid: 'popover' },
    medium: { touch: 'popover', pointer: 'popover', hybrid: 'popover' },
    expanded: { touch: 'popover', pointer: 'popover', hybrid: 'popover' }
  },
  form: {
    compact: { touch: 'fullscreen', pointer: 'modal', hybrid: 'modal' },
    medium: { touch: 'modal', pointer: 'modal', hybrid: 'modal' },
    expanded: { touch: 'modal', pointer: 'modal', hybrid: 'modal' }
  },
  confirmation: {
    compact: { touch: 'sheet', pointer: 'modal', hybrid: 'modal' },
    medium: { touch: 'modal', pointer: 'modal', hybrid: 'modal' },
    expanded: { touch: 'modal', pointer: 'modal', hybrid: 'modal' }
  }
}

const NAVIGATION_TABLE: Record<SizeClass, Record<InputProfile, NavigationPresentation>> = {
  compact: { touch: 'bar', pointer: 'drawer', hybrid: 'drawer' },
  medium: { touch: 'rail', pointer: 'rail', hybrid: 'rail' },
  expanded: { touch: 'sidebar', pointer: 'sidebar', hybrid: 'sidebar' }
}

/* Hints hang off hover capability: touch has no hover, so the tooltip
   pattern itself cannot fire there - it becomes a tap-opened popover. */
const HINT_TABLE: Record<SizeClass, Record<InputProfile, HintPresentation>> = {
  compact: { touch: 'popover', pointer: 'tooltip', hybrid: 'tooltip' },
  medium: { touch: 'popover', pointer: 'tooltip', hybrid: 'tooltip' },
  expanded: { touch: 'popover', pointer: 'tooltip', hybrid: 'tooltip' }
}

const ACTION_TABLE: Record<SizeClass, Record<InputProfile, ActionPresentation>> = {
  compact: { touch: 'action-bar', pointer: 'sticky-footer', hybrid: 'sticky-footer' },
  medium: { touch: 'inline', pointer: 'inline', hybrid: 'inline' },
  expanded: { touch: 'inline', pointer: 'inline', hybrid: 'inline' }
}

describe('app-first pack decision table', () => {
  for (const role of Object.keys(OVERLAY_TABLE) as OverlayRole[]) {
    for (const size of SIZES) {
      for (const input of INPUTS) {
        const expected = OVERLAY_TABLE[role][size][input]
        it(`overlay(${role}) ${size} x ${input} -> ${expected}`, () => {
          expect(decideOverlay(policy, traits(size, input), role).presentation).toBe(expected)
        })
      }
    }
  }

  for (const size of SIZES) {
    for (const input of INPUTS) {
      it(`navigation ${size} x ${input} -> ${NAVIGATION_TABLE[size][input]}`, () => {
        expect(decideNavigation(policy, traits(size, input)).presentation).toBe(
          NAVIGATION_TABLE[size][input]
        )
      })
      it(`primaryAction ${size} x ${input} -> ${ACTION_TABLE[size][input]}`, () => {
        expect(decidePrimaryAction(policy, traits(size, input)).presentation).toBe(
          ACTION_TABLE[size][input]
        )
      })
      it(`hint ${size} x ${input} -> ${HINT_TABLE[size][input]}`, () => {
        expect(decideHint(policy, traits(size, input)).presentation).toBe(
          HINT_TABLE[size][input]
        )
      })
    }
  }

  it('covers the full cartesian space', () => {
    const overlayCells = 3 * SIZES.length * INPUTS.length
    const chromeCells = 2 * SIZES.length * INPUTS.length
    const hintCells = SIZES.length * INPUTS.length
    expect(overlayCells + chromeCells + hintCells).toBe(54)
  })

  it('hint honors an instance override', () => {
    const decision = decideHint(policy, traits('expanded', 'pointer'), 'popover')
    expect(decision.presentation).toBe('popover')
    expect(decision.source).toBe('instance')
  })

  it('an empty instance override object falls through to the policy', () => {
    const decision = decideOverlay(policy, traits('expanded', 'pointer'), 'form', {})
    expect(decision.presentation).toBe('modal')
    expect(decision.source).toBe('pack')
  })
})
