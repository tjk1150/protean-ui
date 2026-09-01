import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

class ResizeObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

/* Base UI sequences mount and focus work through requestAnimationFrame.
   Running callbacks synchronously keeps that work inside the same act()
   pass, so assertions are deterministic and never leak across tests
   (the same shim the real-app scenario suite uses). */
globalThis.requestAnimationFrame = ((callback: FrameRequestCallback): number => {
  callback(performance.now())
  return 0
}) as typeof requestAnimationFrame
globalThis.cancelAnimationFrame = () => {}
