import type { NextConfig } from 'next'

/* The 2026-09 information-architecture reshuffle. Old routes keep working -
   external links (launch posts, search results) land on the new homes. */
const movedRoutes: ReadonlyArray<readonly [string, string]> = [
  ['/concepts/design-principles', '/concepts/pattern-adaptation'],
  ['/concepts/traits-and-policy', '/guides/customize-decisions'],
  ['/concepts/ssr', '/advanced/server-rendering'],
  ['/concepts/composition', '/guides/composition'],
  ['/concepts/coverage', '/about/scope'],
  ['/concepts/accessibility', '/guides/accessibility'],
  ['/concepts/quality', '/about/status'],
  ['/components/screen', '/layout/screen'],
  ['/components/actions', '/layout/actions'],
  ['/components/supporting-pane', '/layout/supporting-pane'],
  ['/components/boundary', '/advanced/container-boundary'],
  ['/why', '/about/why'],
]

const nextConfig: NextConfig = {
  transpilePackages: ['@protean-ui/react', '@protean-ui/core'],
  async redirects() {
    return movedRoutes.map(([from, to]) => ({
      source: `/:lang(ko|en)${from}`,
      destination: `/:lang${to}`,
      permanent: false,
    }))
  },
}

export default nextConfig
