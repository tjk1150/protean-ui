import type { SizeClass, Traits } from './traits'

export type OverlayRole = 'confirmation' | 'form' | 'contextual'
export type OverlayPresentation = 'popover' | 'sheet' | 'modal' | 'fullscreen'
export type NavigationPresentation = 'bar' | 'rail' | 'sidebar' | 'drawer'
export type ActionPresentation = 'action-bar' | 'sticky-footer' | 'inline'
export type HintPresentation = 'tooltip' | 'popover'
export type DensityProfile = 'compact' | 'comfortable' | 'touch'
export type ListDetailPresentation = 'stack' | 'panes'

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

export interface HintQuery {
  readonly traits: Traits
}

export interface DensityQuery {
  readonly traits: Traits
}

export interface ListDetailQuery {
  readonly traits: Traits
}

export interface PolicyPack {
  readonly name: string
  readonly overlay: (query: OverlayQuery) => OverlayPresentation
  readonly navigation: (query: NavigationQuery) => NavigationPresentation
  readonly primaryAction: (query: ActionQuery) => ActionPresentation
  /* Optional so older packs stay valid; the built-in default keys off hover
     capability - touch has no hover, so the tooltip pattern cannot fire. */
  readonly hint?: (query: HintQuery) => HintPresentation
  readonly density?: (query: DensityQuery) => DensityProfile
  readonly listDetail?: (query: ListDetailQuery) => ListDetailPresentation
}

const defaultHint = ({ traits }: HintQuery): HintPresentation =>
  traits.hover ? 'tooltip' : 'popover'

/* Touch spreads out; a pointer is precise, so it reads comfortable. The
   denser 'compact' profile is reachable only by explicit choice (a user
   setting, a pack rule) - no speculative default. */
const defaultDensity = ({ traits }: DensityQuery): DensityProfile =>
  traits.input === 'touch' ? 'touch' : 'comfortable'

const defaultListDetail = ({ traits }: ListDetailQuery): ListDetailPresentation =>
  traits.size === 'compact' ? 'stack' : 'panes'

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
  readonly hint?: (query: WithDefaults<HintQuery, HintPresentation>) => HintPresentation
  readonly density?: (query: WithDefaults<DensityQuery, DensityProfile>) => DensityProfile
  readonly listDetail?: (
    query: WithDefaults<ListDetailQuery, ListDetailPresentation>
  ) => ListDetailPresentation
}

export type DecisionSource = 'instance' | 'policy' | 'pack'

export type DecisionDomain = 'overlay' | 'navigation' | 'primaryAction' | 'hint' | 'listDetail' | 'density'

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
  readonly resolveHint: (query: HintQuery) => Resolved<HintPresentation>
  readonly resolveDensity: (query: DensityQuery) => Resolved<DensityProfile>
  readonly resolveListDetail: (query: ListDetailQuery) => Resolved<ListDetailPresentation>
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
    resolvePrimaryAction: makeResolver(pack.primaryAction, undefined),
    resolveHint: makeResolver(pack.hint ?? defaultHint, undefined),
    resolveDensity: makeResolver(pack.density ?? defaultDensity, undefined),
    resolveListDetail: makeResolver(pack.listDetail ?? defaultListDetail, undefined)
  }
}

export function definePolicy(definition: PolicyDefinition): Policy {
  const pack = definition.extends
  return {
    name: definition.name ?? pack.name,
    resolveOverlay: makeResolver(pack.overlay, definition.overlay),
    resolveNavigation: makeResolver(pack.navigation, definition.navigation),
    resolvePrimaryAction: makeResolver(pack.primaryAction, definition.primaryAction),
    resolveHint: makeResolver(pack.hint ?? defaultHint, definition.hint),
    resolveDensity: makeResolver(pack.density ?? defaultDensity, definition.density),
    resolveListDetail: makeResolver(pack.listDetail ?? defaultListDetail, definition.listDetail)
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

export function decideHint(
  policy: Policy,
  traits: Traits,
  instance?: InstanceOverride<HintPresentation>
): Decision<HintPresentation> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'hint' }
  }
  const { presentation, source } = policy.resolveHint({ traits })
  return { presentation, source, policyName: policy.name, traits, domain: 'hint' }
}

export function decideDensity(
  policy: Policy,
  traits: Traits,
  instance?: InstanceOverride<DensityProfile>
): Decision<DensityProfile> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'density' }
  }
  const { presentation, source } = policy.resolveDensity({ traits })
  return { presentation, source, policyName: policy.name, traits, domain: 'density' }
}

export function decideListDetail(
  policy: Policy,
  traits: Traits,
  instance?: InstanceOverride<ListDetailPresentation>
): Decision<ListDetailPresentation> {
  const forced = resolveInstance(instance, traits.size)
  if (forced !== undefined) {
    return { presentation: forced, source: 'instance', policyName: policy.name, traits, domain: 'listDetail' }
  }
  const { presentation, source } = policy.resolveListDetail({ traits })
  return { presentation, source, policyName: policy.name, traits, domain: 'listDetail' }
}

export function explain(decision: Decision<string>): string {
  const target = decision.role ? `${decision.domain}(${decision.role})` : decision.domain
  const { traits } = decision
  return `${target} -> ${decision.presentation} [${decision.source}:${decision.policyName}] size=${traits.size} input=${traits.input}`
}
