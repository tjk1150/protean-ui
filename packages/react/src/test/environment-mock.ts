interface EnvironmentState {
  width: number
  height: number
  coarse: boolean
  hover: boolean
  reducedMotion: boolean
  /** Visual viewport height; null tracks the window height (no keyboard). */
  vvHeight: number | null
  vvScale: number
}

export interface EnvironmentControls {
  readonly set: (next: Partial<EnvironmentState>) => void
}

type ChangeListener = (event: { matches: boolean }) => void

export function installEnvironment(
  initial: Partial<EnvironmentState> = {}
): EnvironmentControls {
  const state: EnvironmentState = {
    width: 1280,
    height: 800,
    coarse: false,
    hover: true,
    reducedMotion: false,
    vvHeight: null,
    vvScale: 1,
    ...initial
  }
  const listeners = new Map<string, Set<ChangeListener>>()
  const viewportListeners = new Set<() => void>()

  function matchesFor(query: string): boolean {
    if (query.includes('pointer: coarse')) return state.coarse
    if (query.includes('hover: hover')) return state.hover
    if (query.includes('prefers-reduced-motion')) return state.reducedMotion
    const minWidth = /min-width:\s*(\d+)/.exec(query)
    if (minWidth?.[1]) return state.width >= Number(minWidth[1])
    return false
  }

  function listenersFor(query: string): Set<ChangeListener> {
    let set = listeners.get(query)
    if (!set) {
      set = new Set()
      listeners.set(query, set)
    }
    return set
  }

  window.matchMedia = ((query: string) =>
    ({
      media: query,
      get matches() {
        return matchesFor(query)
      },
      addEventListener: (_type: string, callback: ChangeListener) => {
        listenersFor(query).add(callback)
      },
      removeEventListener: (_type: string, callback: ChangeListener) => {
        listenersFor(query).delete(callback)
      },
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false
    }) as unknown as MediaQueryList) as typeof window.matchMedia

  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    get: () => state.width
  })
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    get: () => state.height
  })

  const visualViewport = {
    get height() {
      return state.vvHeight ?? state.height
    },
    get offsetTop() {
      return 0
    },
    get scale() {
      return state.vvScale
    },
    addEventListener: (_type: string, callback: () => void) => {
      viewportListeners.add(callback)
    },
    removeEventListener: (_type: string, callback: () => void) => {
      viewportListeners.delete(callback)
    }
  }
  Object.defineProperty(window, 'visualViewport', {
    configurable: true,
    get: () => visualViewport
  })

  return {
    set(next) {
      Object.assign(state, next)
      for (const [query, set] of listeners) {
        for (const callback of set) callback({ matches: matchesFor(query) })
      }
      for (const callback of viewportListeners) callback()
      window.dispatchEvent(new Event('resize'))
    }
  }
}
