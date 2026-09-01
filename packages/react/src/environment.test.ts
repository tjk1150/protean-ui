import { describe, expect, it, vi } from 'vitest'
import { createEnvironmentStore } from './environment'
import { installEnvironment } from './test/environment-mock'

describe('createEnvironmentStore', () => {
  it('reads the current environment', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const store = createEnvironmentStore()
    expect(store.getTraits()).toMatchObject({ size: 'expanded', input: 'pointer', hover: true })
  })

  it('reflects environment changes on read even without subscribers (regression)', () => {
    const env = installEnvironment({ width: 1280 })
    const store = createEnvironmentStore()
    env.set({ width: 375, coarse: true, hover: false })
    expect(store.getTraits()).toMatchObject({ size: 'compact', input: 'touch' })
  })

  it('keeps referential stability while the environment is unchanged', () => {
    installEnvironment({ width: 1280 })
    const store = createEnvironmentStore()
    expect(store.getTraits()).toBe(store.getTraits())
  })

  it('notifies subscribers only when traits actually change', () => {
    const env = installEnvironment({ width: 1280 })
    const store = createEnvironmentStore()
    const listener = vi.fn()
    store.subscribe(listener)

    env.set({ width: 1200 })
    expect(listener).not.toHaveBeenCalled()

    env.set({ width: 375 })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('applies hysteresis across the size boundary', () => {
    const env = installEnvironment({ width: 620 })
    const store = createEnvironmentStore()
    expect(store.getTraits().size).toBe('medium')

    env.set({ width: 590 })
    expect(store.getTraits().size).toBe('medium')

    env.set({ width: 583 })
    expect(store.getTraits().size).toBe('compact')
  })

  it('reports the virtual keyboard hidden by default', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    const store = createEnvironmentStore()
    expect(store.getTraits().virtualKeyboard).toBe(false)
  })

  it('reports the virtual keyboard when the visual viewport shrinks past the threshold', () => {
    const env = installEnvironment({ width: 375, height: 800, coarse: true, hover: false })
    const store = createEnvironmentStore()

    env.set({ vvHeight: 440 })
    expect(store.getTraits().virtualKeyboard).toBe(true)

    env.set({ vvHeight: null })
    expect(store.getTraits().virtualKeyboard).toBe(false)
  })

  it('ignores viewport differences under the threshold', () => {
    const env = installEnvironment({ width: 375, height: 800, coarse: true, hover: false })
    const store = createEnvironmentStore()

    env.set({ vvHeight: 700 })
    expect(store.getTraits().virtualKeyboard).toBe(false)
  })

  it('does not mistake pinch zoom for the keyboard', () => {
    const env = installEnvironment({ width: 375, height: 800, coarse: true, hover: false })
    const store = createEnvironmentStore()

    env.set({ vvHeight: 400, vvScale: 2 })
    expect(store.getTraits().virtualKeyboard).toBe(false)
  })

  it('notifies subscribers when the keyboard appears', () => {
    const env = installEnvironment({ width: 375, height: 800, coarse: true, hover: false })
    const store = createEnvironmentStore()
    const listener = vi.fn()
    store.subscribe(listener)

    env.set({ vvHeight: 440 })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('applies the keyboard threshold exclusively at the boundary (BVA)', () => {
    const env = installEnvironment({ width: 375, height: 800, coarse: true, hover: false })
    const store = createEnvironmentStore()

    env.set({ vvHeight: 650 })
    expect(store.getTraits().virtualKeyboard).toBe(false)

    env.set({ vvHeight: 649 })
    expect(store.getTraits().virtualKeyboard).toBe(true)
  })

  it('degrades gracefully when the platform has no visualViewport', () => {
    const env = installEnvironment({ width: 1280 })
    Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => undefined })
    const store = createEnvironmentStore()
    const listener = vi.fn()
    store.subscribe(listener)

    expect(store.getTraits().virtualKeyboard).toBe(false)
    env.set({ width: 375, coarse: true, hover: false })
    expect(listener).toHaveBeenCalledTimes(1)
    expect(store.getTraits().size).toBe('compact')
  })
})
