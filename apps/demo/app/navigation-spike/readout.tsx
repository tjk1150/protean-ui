'use client'

import { decideNavigation, explain, usePolicy, useTraits } from '@protean-ui/react'

export function NavReadout() {
  const policy = usePolicy()
  const traits = useTraits()
  return <code className="traits-chip">{explain(decideNavigation(policy, traits))}</code>
}
