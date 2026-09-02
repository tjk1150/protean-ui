import Link from 'next/link'

export default function SsrPage() {
  return (
    <div className="doc">
      <h1>Server rendering</h1>
      <p className="lede">
        The server does not know the viewport or the pointer. Most adaptive systems try
        to guess better; Protean restructures the problem so the guess barely matters.
      </p>

      <h2>The invariant</h2>
      <div className="callout">
        A decision the server could get wrong must be expressible in CSS, or deferred to
        interaction time. A component that can satisfy neither does not ship.
      </div>

      <h2>Overlays: decided at interaction time</h2>
      <p>
        A closed dialog renders nothing. The presentation - sheet, modal, fullscreen,
        popover - is chosen the moment the user opens it, from live client traits. The
        served HTML contains the trigger and zero overlay markup, so there is nothing to
        flash, nothing to mismatch, and nothing to shift. Verify it on this site:
      </p>
      <pre><code>{`curl -s [this-site]/ssr-proof | grep -c 'data-part="popup"'
# 0`}</code></pre>

      <h2>Chrome: same DOM, morphed by CSS</h2>
      <p>
        Navigation and screen scaffolding must exist at first paint, so they follow the
        other branch: one DOM tree whose presentations are media-query CSS states. The
        bottom bar, drawer, rail, and sidebar in the{' '}
        <Link href="/navigation-spike">navigation spike</Link> are four CSS states of the
        same <code>nav &gt; ul</code>. The same HTML is served to every client - measured
        cumulative layout shift is 0, and the first layout is correct even before JavaScript arrives - interactions such as opening the drawer do need JavaScript.
      </p>
      <p>
        The JavaScript <code>data-presentation</code> stamp is informational and drives
        custom policies; the default policy never needs it for first paint.
      </p>

      <h2>What about JS-read traits?</h2>
      <p>
        Components that read traits in JavaScript (this docs shell hides its sidebar on
        compact, for example) follow the documented React contract:{' '}
        <code>useSyncExternalStore</code> renders the server snapshot during hydration -
        no mismatch - then corrects to the measured environment. The default server
        snapshot is compact-touch, configurable via <code>ProteanProvider ssrTraits</code>{' '}
        (fed from a cookie or user-agent hint if you choose). Static pages need no hints
        at all, which keeps them cacheable.
      </p>

      <h2>Why not sniff harder?</h2>
      <p>
        User-agent hints are Chromium-only (Safari and Firefox have formally declined
        them), user-agent strings misclassify tablets, and device-variant HTML fragments
        your CDN cache. The invariant sidesteps the entire arms race: for the default
        policy there is no server guess to get wrong.
      </p>
    </div>
  )
}
