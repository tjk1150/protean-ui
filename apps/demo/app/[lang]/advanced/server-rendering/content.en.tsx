import Link from 'next/link'

export default function SsrPage() {
  return (
    <div className="doc">
      <h1>The server does not know the browser yet</h1>
      <p className="lede">
        During server rendering, Protean cannot directly know the user&apos;s
        viewport size, input mode, hover capability, reduced-motion preference,
        virtual-keyboard state, or container widths.{' '}
        <strong>The goal is not to make the server guess the browser more
        accurately - it is to design the UI so the server does not need to know
        every client condition.</strong>
      </p>

      <h2>Three SSR strategies</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>UI type</th><th>Strategy</th></tr>
          </thead>
          <tbody>
            <tr><td>Always-visible layout</td><td>Keep one DOM structure; CSS handles the first layout.</td></tr>
            <tr><td>Interaction-opened overlay</td><td>Make the adaptive decision when the interaction opens.</td></tr>
            <tr><td>Tooltip</td><td>Render the trigger first; enable the hint after mount.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        This mental model matters more than memorizing the fallback trait
        values.
      </p>

      <h2>1. Always-visible UI keeps one DOM tree</h2>
      <p>
        Navigation, ListDetail, and PrimaryAction - plus the CSS-centered
        Screen, Actions, and SupportingPane - do not need separate server and
        client trees for common responsive layout changes. The markup stays
        stable; CSS handles the first physical layout. The browser applies
        media queries while painting the server-rendered HTML, so{' '}
        <strong>CSS owns the first physical layout</strong> without a server
        viewport guess - and without{' '}
        <code>isMobile ? &lt;MobileNavigation /&gt; :
        &lt;DesktopNavigation /&gt;</code>.
      </p>
      <h3>Navigation shows the distinction clearly</h3>
      <p>
        The server-side decision snapshot may initially stamp one presentation
        value - for example{' '}
        <code>&lt;nav data-presentation=&quot;bar&quot;&gt;</code> from the
        default fallback - while wide-screen reference CSS already lays the
        same stable structure out in its wide form. Decision data and physical
        CSS expression are separate layers, and they reconcile after hydration.
        Do not expect the initial stamp to equal the browser&apos;s actual
        classification at every pre-hydration instant - the layout is what CSS
        painted, and that is the part users see.
      </p>

      <h2>2. Overlays decide when they open</h2>
      <p>
        Dialog, Select, and Menu normally start closed, so they do not need
        their final presentation during the initial server render:
      </p>
      <pre><code>{`server render      → closed structure only
user opens it      → read current browser traits
                   → choose the presentation`}</code></pre>
      <p>
        The server never needs to know whether a future Dialog should be a
        modal, sheet, fullscreen surface, or popover. You can verify the
        closed-overlay invariant on the deployed site yourself:
      </p>
      <pre><code>{`curl -s <this site>/ssr-proof | grep -c 'data-part="popup"'
# result: 0  (zero overlay popups in the server HTML)`}</code></pre>
      <p>
        When an overlay opens, the default continuity is{' '}
        <code>pinned</code> - the result holds for that open session and is
        re-decided on the next open. <code>continuity=&quot;live&quot;</code>{' '}
        is a deliberate choice where supported, re-resolving when subscribed
        environment traits change (a Boundary-width-only change is not part of
        that subscription - see{' '}
        <Link href="/en/advanced/container-boundary">Containers</Link>).
        Details live on <Link href="/en/components/dialog">Dialog</Link>.
      </p>
      <h3>Initially open overlays need more care</h3>
      <p>
        An initially open overlay (<code>defaultOpen</code> or a controlled{' '}
        <code>open</code>) makes its initial decision from the trait snapshot
        available at initialization - and the server&apos;s snapshot can differ
        from the browser&apos;s real environment. In practice the popup renders
        through a portal and is not emitted into the normal server HTML, so
        the surface appears in the browser from the real environment. If an
        overlay must begin open and its form matters from the first paint,
        prefer one of:
      </p>
      <ol>
        <li>an explicit <code>presentation</code> - the most reliable,</li>
        <li>a reliable <code>ssrTraits</code> snapshot,</li>
        <li>opening the interaction after hydration instead.</li>
      </ol>

      <h2>ssrTraits is a fallback, not device detection</h2>
      <pre><code>{`import { defaultSsrTraits, ProteanProvider } from "@protean-ui/react";

<ProteanProvider
  ssrTraits={{
    ...defaultSsrTraits,
    size: "expanded",
    input: "pointer",
    hover: true,
  }}
>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        <code>ssrTraits</code> is a <strong>complete</strong>{' '}
        <code>Traits</code> object, not a partial patch - spread{' '}
        <code>defaultSsrTraits</code> and change only what you know. The
        default snapshot, exported as <code>defaultSsrTraits</code>, is:
      </p>
      <pre><code>{`{
  size: "compact",
  input: "touch",
  hover: false,
  reducedMotion: false,
  virtualKeyboard: false,
}`}</code></pre>
      <p>
        These values are a deterministic fallback, not a claim about the actual
        device. Use custom values when the server genuinely has reliable
        information - do not reconstruct fragile user-agent detection just to
        populate them. A bad guess can be worse than relying on the stable-DOM
        and interaction-time strategies. Once running in the browser, Protean
        reads the real environment; the component strategies are designed so
        that transition does not require duplicate responsive trees.
      </p>

      <h2>3. Tooltip uses progressive enhancement</h2>
      <pre><code>{`server              → native trigger button, no Tooltip content
first client render → same
after mount         → read real hover capability
                    → choose tooltip or popover`}</code></pre>
      <p>
        Tooltip does not ask the server to guess hover capability. Even{' '}
        <code>&lt;Tooltip.Root defaultOpen&gt;</code> does not make Tooltip
        content appear in server HTML - the hint backend is enabled only after
        mount. Because of this, critical information must not exist only inside
        Tooltip content; the trigger needs its own accessible meaning. See{' '}
        <Link href="/en/components/tooltip">Tooltip</Link> and{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>

      <h2>What /ssr-proof proves - and what it does not</h2>
      <p>
        The release gate checks the deployed server HTML for the closed-overlay
        invariant: the trigger is present and popup content is absent. That is
        exactly what it proves. It does not prove every hydration path, every
        browser, every initially-open state, or zero hydration warnings across
        the package - the current verification level lives in{' '}
        <Link href="/en/about/status">Quality and support</Link>.
      </p>

      <h2>Boundary width is not an SSR trait</h2>
      <p>
        The server cannot know the width of an arbitrary client-side
        container. Do not encode panel widths into <code>ssrTraits</code> - it
        describes the base environment snapshot, not container measurements.
        Container layout belongs to CSS container queries, and Boundary-aware
        overlay decisions read the actual width when the interaction happens.
      </p>

      <h2>Next.js and use client</h2>
      <p>
        Protean&apos;s interactive modules declare their own client boundaries
        internally. Using a Protean component does <strong>not</strong> mean
        your entire Next.js tree must become one giant Client Component - keep
        Server Component pages for content, and put interactive Protean UI
        inside the small client boundaries that actually need it.
      </p>

      <h2>Recommended SSR strategy</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Situation</th><th>Preferred strategy</th></tr></thead>
          <tbody>
            <tr><td>Page / grid / navigation layout</td><td>Stable DOM + CSS</td></tr>
            <tr><td>Dialog / Select / Menu starts closed</td><td>Decide when opened</td></tr>
            <tr><td>Overlay must start open</td><td>Explicit <code>presentation</code> or reliable <code>ssrTraits</code></td></tr>
            <tr><td>Tooltip</td><td>Progressive enhancement after mount</td></tr>
            <tr><td>Container-specific layout</td><td>CSS container queries</td></tr>
            <tr><td>Boundary-specific overlay decision</td><td>Read the actual Boundary width when available</td></tr>
          </tbody>
        </table>
      </div>
      <p>And avoid rebuilding device detection in application code:</p>
      <pre><code>{`const isMobile =
  typeof window !== "undefined" && window.innerWidth < 600;

return isMobile ? <MobileDialog /> : <DesktopDialog />;`}</code></pre>
      <p>
        That reintroduces separate responsive trees, hydration-sensitive
        branching, and duplicated interaction logic - exactly what the three
        strategies above avoid. Next:{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>
    </div>
  )
}
