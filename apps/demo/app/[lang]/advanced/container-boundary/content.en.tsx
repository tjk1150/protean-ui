import Link from 'next/link'

export default function BoundaryPage() {
  return (
    <div className="doc">
      <h1>Adapt an overlay to a container</h1>
      <p className="lede">
        Sometimes an adaptive UI lives inside a region whose width matters more
        than the browser viewport - split panes, embedded editors, resizable
        workspaces, dashboard panels. Use <code>ProteanBoundary</code> when an
        overlay inside that region should make its size-dependent decision from
        the container width.{' '}
        <strong>A boundary changes size, not the entire device
        environment.</strong>
      </p>
      <pre><code>{`import { ProteanBoundary } from "@protean-ui/react";

<ProteanBoundary className="editor-panel">
  <EditorPanel />
</ProteanBoundary>`}</code></pre>
      <div className="callout">
        See the <Link href="/boundary-demo">container boundary demo</Link>: the
        same dialog is a modal on the page and gets a compact decision inside a
        420px panel - what it looks like is still up to the rules (the
        demo&apos;s sheet is a custom rule; the default policy keeps a pointer
        form modal even at compact).
      </div>

      <h2>What a Boundary changes</h2>
      <p>Inside a Boundary, supported consumers read:</p>
      <pre><code>{`size                              → from Boundary width
input · hover · reducedMotion ·
virtualKeyboard                   → viewport / device environment`}</code></pre>
      <p>Conceptually the read is <code>&#123; ...viewportTraits, size: boundarySize &#125;</code>.</p>
      <p>
        A narrow container is not a phone. With a wide browser, a mouse, and a
        420px panel, the Boundary read is{' '}
        <code>size=compact, input=pointer, hover=true</code> - which can
        produce a different result than <code>compact + touch</code>. This is
        intentional: a narrow desktop panel should not automatically become a
        touch device.
      </p>

      <h2>Which components currently use Boundary size?</h2>
      <p>
        Current Boundary-aware adaptive consumers are exactly{' '}
        <strong>Dialog, Select, and Menu</strong> - the overlays that decide
        when they open. Wrapping anything else does not change its decision:
      </p>
      <ul>
        <li>
          <code>Navigation</code>, <code>ListDetail</code>,{' '}
          <code>PrimaryAction</code>, and <code>Tooltip</code> do not use
          Boundary width for their adaptive decisions. Wrapping a Navigation in
          a Boundary does <strong>not</strong> make it choose bar/drawer/rail/
          sidebar from the panel width.
        </li>
        <li>
          <code>Screen</code>, <code>Actions</code>, and{' '}
          <code>SupportingPane</code> remain CSS-centered layout helpers.
        </li>
      </ul>

      <h2>Use CSS container queries for layout</h2>
      <p>
        If the question is &quot;how should this layout rearrange inside a
        420px panel?&quot;, use container queries:
      </p>
      <pre><code>{`.workspace-panel {
  container-type: inline-size;
}

@container (width < 30rem) {
  .workspace-toolbar {
    /* container-specific layout */
  }
}`}</code></pre>
      <pre><code>{`ProteanBoundary        → supported semantic overlay decisions
CSS container queries  → container layout`}</code></pre>
      <p>
        <code>ProteanBoundary</code> does <strong>not</strong> add{' '}
        <code>container-type</code> to its element - if your CSS needs
        container queries, configure the container yourself. The two are not
        automatically synchronized, but they can be used on the same region.
      </p>

      <h2>Contained overlays</h2>
      <p>
        For supported presentations, the nearest Boundary also becomes the
        containing region - the surface belongs to the panel instead of
        covering the entire page:
      </p>
      <pre><code>{`Dialog modal / fullscreen / sheet → contained in the Boundary
Select / Menu sheet               → contained in the Boundary
anchored popovers                 → stay at the document level`}</code></pre>
      <p>
        Containment depends on the <strong>selected presentation</strong>.
        Anchored popovers position against their trigger and stay at the
        document level so a narrow container cannot clip them. Tooltip is
        unaffected entirely - its decision remains based on hover capability.
        Contained surfaces expose <code>data-contained</code> for styling; the
        hook details live in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Nearest Boundary wins</h2>
      <pre><code>{`<ProteanBoundary>          {/* workspace */}
  <ProteanBoundary>        {/* inner panel */}
    <Dialog.Root>...</Dialog.Root>   ← uses the inner Boundary
  </ProteanBoundary>
</ProteanBoundary>`}</code></pre>
      <p>
        The nearest Boundary supplies both the size measurement and the
        contained region - widths are never combined across ancestors. This is
        a test-fixed contract.
      </p>

      <h2>Thresholds, measurement, and timing</h2>
      <ul>
        <li>
          <strong>Same size vocabulary.</strong> Boundary width is classified
          into compact / medium / expanded using the current runtime
          thresholds (default 600 / 840). Custom Provider thresholds apply
          here too - though, as always, they do not rewrite your CSS media or
          container queries.
        </li>
        <li>
          <strong>No Boundary hysteresis.</strong> The viewport environment
          uses a deadband near thresholds; Boundary classification does not -
          it resolves directly from the observed width at interaction time.
        </li>
        <li>
          <strong>Zero-width fallback.</strong> If the Boundary cannot be
          measured (width <code>&lt;= 0</code>, e.g. hidden or not yet laid
          out), the decision falls back to the base viewport size rather than
          treating the panel as compact.
        </li>
        <li>
          <strong>No ResizeObserver.</strong> Boundary does not continuously
          observe its width. Overlays read the current width when they open; a
          pinned overlay keeps its result and re-measures on the next open.
        </li>
        <li>
          <strong>Live continuity limitation.</strong> A Boundary-width-only
          change is not part of the trait subscription, so resizing the panel
          does not by itself re-resolve an open{' '}
          <code>continuity=&quot;live&quot;</code> Dialog. A newly opened
          interaction reads the current width.
        </li>
        <li>
          <strong>The server cannot know the width.</strong> Before a real
          Boundary width exists, the system falls back through the normal base
          environment path. Do not feed container widths into{' '}
          <code>ssrTraits</code> - that prop is a viewport fallback. See{' '}
          <Link href="/en/advanced/server-rendering">Server rendering</Link>.
        </li>
      </ul>

      <h2>A practical example</h2>
      <pre><code>{`browser width       → expanded
input               → pointer
editor panel width  → compact (inside a Boundary)`}</code></pre>
      <p>
        A contextual Menu inside the panel reads{' '}
        <code>size=compact, input=pointer</code> - and the default Menu policy
        still chooses a <strong>popover</strong>, because compact pointer is
        not compact touch. A Dialog form in the same panel makes its
        size-dependent decision from the panel width. This is exactly why the
        Boundary changes size only.
      </p>

      <h2>ProteanBoundary</h2>
      <p>
        The API is intentionally small: it renders a{' '}
        <code>&lt;div data-scope=&quot;boundary&quot;&gt;</code>, accepts
        standard div attributes, and derives its width from the rendered
        region. There is no <code>width</code>, <code>size</code>,{' '}
        <code>thresholds</code>, or observation-mode prop. The reference
        stylesheet gives the element <code>position: relative</code> so
        contained overlays can use it as their region - keep that in mind if
        your CSS changes its positioning.
      </p>

      <h2>When to use it - and when not to</h2>
      <p>
        Use a Boundary when an embedded region has a meaningfully different
        width <em>and</em> Dialog / Select / Menu should make size-dependent
        decisions from that region. Do not reach for it when the problem is
        grid columns, toolbar wrapping, spacing, or navigation layout - those
        are CSS and container-query problems. And do not use it to manufacture
        touch, hover, or reduced-motion states for a container: those traits
        remain part of the actual environment.
      </p>
    </div>
  )
}
