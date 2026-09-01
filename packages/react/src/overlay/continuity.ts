/* Live-continuity focus bookkeeping. The content host outlives presentation
   swaps, so it is the right place to remember which element inside it held
   focus - and to put focus back the moment the host lands in the incoming
   popup's attaching commit. */

export const focusableSelector = 'input, select, textarea, button, a[href], [tabindex]'

const lastFocused = new WeakMap<HTMLElement, HTMLElement>()

export function trackFocus(host: HTMLElement): void {
  host.addEventListener('focusin', (event) => {
    if (event.target instanceof HTMLElement) lastFocused.set(host, event.target)
  })
}

export function restoreFocus(host: HTMLElement): void {
  if (host.contains(document.activeElement)) return
  const previous = lastFocused.get(host)
  const target =
    previous && previous.isConnected && host.contains(previous)
      ? previous
      : host.querySelector<HTMLElement>(focusableSelector)
  target?.focus()
}
