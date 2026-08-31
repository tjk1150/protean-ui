import type { PolicyPack } from './policy.js'
import type { Traits } from './traits.js'

function isTouchFirst(traits: Traits): boolean {
  return traits.input === 'touch'
}

export const appFirst: PolicyPack = {
  name: 'app-first',
  overlay: ({ traits, role }) => {
    const compactTouch = traits.size === 'compact' && isTouchFirst(traits)
    if (role === 'contextual') return compactTouch ? 'sheet' : 'popover'
    if (role === 'form') return compactTouch ? 'fullscreen' : 'modal'
    return compactTouch ? 'sheet' : 'modal'
  },
  navigation: ({ traits }) => {
    if (traits.size === 'compact') return isTouchFirst(traits) ? 'bar' : 'drawer'
    return traits.size === 'medium' ? 'rail' : 'sidebar'
  },
  primaryAction: ({ traits }) => {
    if (traits.size === 'compact') return isTouchFirst(traits) ? 'action-bar' : 'sticky-footer'
    return 'inline'
  }
}
