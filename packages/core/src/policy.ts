import type { SizeClass, Traits } from './traits'

export type OverlayRole = 'confirmation' | 'form' | 'contextual'
export type OverlayPresentation = 'popover' | 'sheet' | 'modal' | 'fullscreen'
export type NavigationPresentation = 'bar' | 'rail' | 'sidebar' | 'drawer'
export type ActionPresentation = 'action-bar' | 'sticky-footer' | 'inline'

export interface OverlayQuery {
  readonly traits: Traits
  readonly role: OverlayRole
}

export interface NavigationQuery {
  readonly traits: Traits
}

export interface ActionQuery {
  readonly traits: Traits
}

export interface PolicyPack {
  readonly name: string
  readonly overlay: (query: OverlayQuery) => OverlayPresentation
  readonly navigation: (query: NavigationQuery) => NavigationPresentation
  readonly primaryAction: (query: ActionQuery) => ActionPresentation
}

type WithDefaults<Q, P> = Q & { readonly defaults: () => P }

export interface PolicyDefinition {
  readonly extends: PolicyPack
  readonly name?: string
  readonly overlay?: (query: WithDefaults<OverlayQuery, OverlayPresentation>) => OverlayPresentation
  readonly navigation?: (
    query: WithDefaults<NavigationQuery, NavigationPresentation>
  ) => NavigationPresentation
  readonly primaryAction?: (
    query: WithDefaults<ActionQuery, ActionPresentation>
  ) => ActionPresentation
}

export type DecisionSource = 'instance' | 'policy' | 'pack'

export type DecisionDomain = 'overlay' | 'navigation' | 'primaryAction'

export interface Decision<P extends string> {
  readonly presentation: P
  readonly source: DecisionSource
  readonly policyName: string
  readonly traits: Traits
  readonly domain: DecisionDomain
  readonly role?: OverlayRole
}

export type InstanceOverride<P extends string> = P | Partial<Readonly<Record<SizeClass, P>>>

interface Resolved<P extends string> {
  readonly presentation: P
  readonly source: 'policy' | 'pack'
}

export interface Policy {
  readonly name: string
  readonly resolveOverlay: (query: OverlayQuery) => Resolved<OverlayPresentation>
  readonly resolveNavigation: (query: NavigationQuery) => Resolved<NavigationPresentation>
  readonly resolvePrimaryAction: (query: ActionQuery) => Resolved<ActionPresentation>
}

function makeResolver<Q, P extends string>(
  packFn: (query: Q) => P,
  override: ((query: WithDefaults<Q, P>) => P) | undefined
): (query: Q) => Resolved<P> {
  if (!override) {
    return (query) => ({ presentation: packFn(query), source: 'pack' })
  }
  return (query) => {
    let delegated: P | undefined
    const presentation = override({
      ...query,
      defaults: () => {
        delegated = packFn(query)
        return delegated
      }
    })
    const source = delegated !== undefined && presentation === delegated ? 'pack' : 'policy'
    return { presentation, source }
  }
}

export function asPolicy(pack: PolicyPack): Policy {
  return {
    name: pack.name,
    resolveOverlay: makeResolver(pack.overlay, undefined),
    resolveNavigation: makeResolver(pack.navigation, undefined),
    resolvePrimaryAction: makeResolver(pack.primaryAction, undefined)
  }
}

export function definePolicy(definition: PolicyDefinition): Policy {
  const pack = definition.extends
  return {
    name: definition.name ?? pack.name,
    resolveOverlay: makeResolver(pack.overlay, definition.overlay),
    resolveNavigation: makeResolver(pack.navigation, definition.navigation),
    resolvePrimaryAction: makeResolver(pack.primaryAction, definition.primaryAction)
  }
}

function resolveInstance<P extends string>(
  override: InstanceOverride<P> | undefined,
  size: SizeClass
): P | undefined {
  if (override === undefined) return undefined
  if (typeof override === 'string') return override
  return override[size]
}

export function decideOverlay(
  policy: Policy,
  traits: Traits,
  role: OverlayRole,
  instance?: InstanceOverride<OverlayPresentation>
): Decision<OverlayPresentation> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'overlay', role }
  }
  const { presentation, source } = policy.resolveOverlay({ traits, role })
  return { presentation, source, policyName: policy.name, traits, domain: 'overlay', role }
}

export function decideNavigation(
  policy: Policy,
  traits: Traits,
  instance?: InstanceOverride<NavigationPresentation>
): Decision<NavigationPresentation> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'navigation' }
  }
  const { presentation, source } = policy.resolveNavigation({ traits })
  return { presentation, source, policyName: policy.name, traits, domain: 'navigation' }
}

export function decidePrimaryAction(
  policy: Policy,
  traits: Traits,
  instance?: InstanceOverride<ActionPresentation>
): Decision<ActionPresentation> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'primaryAction' }
  }
  const { presentation, source } = policy.resolvePrimaryAction({ traits })
  return { presentation, source, policyName: policy.name, traits, domain: 'primaryAction' }
}

export function explain(decision: Decision<string>): string {
  const target = decision.role ? `${decision.domain}(${decision.role})` : decision.domain
  const { traits } = decision
  return `${target} -> ${decision.presentation} [${decision.source}:${decision.policyName}] size=${traits.size} input=${traits.input}`
}
