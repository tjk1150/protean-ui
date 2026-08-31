import { Navigation } from '@protean-ui/react'
import Link from 'next/link'
import './navigation.css'
import { NavReadout } from './readout'

function Glyph({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NavigationSpikePage() {
  return (
    <div className="nav-shell">
      <Navigation aria-label="Primary">
        <Navigation.Item href="/navigation-spike" current icon={<Glyph path="M3 9.5 10 3l7 6.5V17h-5v-4H8v4H3z" />}>
          Home
        </Navigation.Item>
        <Navigation.Item href="#orders" icon={<Glyph path="M4 5h12l-1 11H5zM7 5a3 3 0 0 1 6 0" />}>
          Orders
        </Navigation.Item>
        <Navigation.Item href="#growth" icon={<Glyph path="M3 16l4-6 3 3 4-7 3 4" />}>
          Growth
        </Navigation.Item>
        <Navigation.Item href="#friends" icon={<Glyph path="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm6 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2.5 16a4.5 4.5 0 0 1 9 0m1-4a4.5 4.5 0 0 1 5 4" />}>
          Friends
        </Navigation.Item>
        <Navigation.Item href="#settings" icon={<Glyph path="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2v2m0 12v2M2 10h2m12 0h2M4.3 4.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4M5.7 14.3l-1.4 1.4" />}>
          Settings
        </Navigation.Item>
      </Navigation>
      <main>
        <p>
          <Link href="/">Back</Link>
        </p>
        <h1>Navigation spike</h1>
        <p className="lede">
          One semantic declaration, one DOM tree: <code>nav &gt; ul</code> with five items. The
          bottom tab bar, the drawer, the rail, and the sidebar are four CSS states of that
          same tree.
        </p>
        <p>
          Current decision: <NavReadout />
        </p>
        <ul>
          <li>compact x touch: bottom tab bar with safe-area padding</li>
          <li>compact x fine pointer: header strip with a drawer toggle - a narrow desktop window is not a phone</li>
          <li>medium: navigation rail</li>
          <li>expanded: sidebar</li>
        </ul>
        <p className="hint">
          Because the default policy is expressed as media queries over the same DOM, the
          server cannot render it wrong: there is no hydration mismatch, no flash, and no
          layout shift by construction. Disable JavaScript and the navigation still lays out
          correctly. <code>aria-current</code> and the list semantics never change across
          presentations.
        </p>
      </main>
    </div>
  )
}
