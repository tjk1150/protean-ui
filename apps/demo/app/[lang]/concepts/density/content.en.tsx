import Link from 'next/link'

export default function DensityPage() {
  return (
    <div className="doc">
      <h1>Density</h1>
      <p className="lede">
        The same UI should sit snug for a mouse and spread out for a finger. Protean
        handles this as a three-step <strong>density profile</strong> - compact ·
        comfortable · touch. It never computes pixels: it{' '}
        <strong>decides which density to use</strong>; tokens carry the values and CSS
        does the rendering.
      </p>

      <div className="callout">
        <strong>First, when you do not need Protean.</strong> If all you want is
        app-wide density keyed to screen size or pointer type, three lines of CSS are
        the right answer:
        <pre><code>{`:root { --target: 40px; }
@media (pointer: coarse) { :root { --target: 48px; } }`}</code></pre>
        CSS renders exceptionally well. What Protean owns is choosing a density from
        inputs CSS cannot see - a user setting, the pattern decision, container
        context.
      </div>

      <h2>How density is decided</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Input</th><th>Result</th><th>Decided by</th></tr></thead>
          <tbody>
            <tr><td>a precise pointer</td><td>comfortable</td><td>a CSS media query - zero JavaScript</td></tr>
            <tr><td>touch</td><td>touch</td><td>a CSS media query - zero JavaScript</td></tr>
            <tr><td>opened as a sheet</td><td>always touch</td><td>pattern coupling - a sheet is a thumb surface whatever the profile</td></tr>
            <tr><td>a user setting</td><td>overrides everything</td><td><code>&lt;ProteanProvider density=&quot;compact&quot;&gt;</code></td></tr>
            <tr><td>compact</td><td>only by explicit choice</td><td>the default rule never guesses</td></tr>
          </tbody>
        </table>
      </div>

      <h2>The user density setting - the headline use case</h2>
      <p>
        Like Gmail&apos;s default/comfortable/compact, density is a user option in real
        products. A media query cannot read app state, so this is where Protean&apos;s
        job starts:
      </p>
      <pre><code>{`const [density, setDensity] = useState()   // the user's setting

<ProteanProvider density={density}>
  <div data-density={density}>             {/* one stamp for static content */}
    <App />
  </div>
</ProteanProvider>`}</code></pre>
      <p>
        Popups (dialog, menu, select, tooltip) are portaled, so ancestor stamps never
        reach them - <strong>the components stamp <code>data-density</code> on their own
        popups</strong>, the same contract as <code>data-presentation</code>. Nothing
        for you to wire.
      </p>

      <h2>Tokens respond</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Token</th><th>compact</th><th>comfortable</th><th>touch</th></tr></thead>
          <tbody>
            <tr><td><code>--protean-target</code> (tap target)</td><td>32px</td><td>40px</td><td>48px</td></tr>
            <tr><td><code>--protean-row</code> (row height)</td><td>28px</td><td>36px</td><td>44px</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The reference chrome&apos;s menu rows, select rows, and action buttons consume
        these - so menus sit desktop-dense under a mouse and spread out for touch.
        Consume the same tokens in your own components and the whole app moves as one.
      </p>

      <h2>Policy sets the endpoints; CSS travels between them</h2>
      <p>
        Where a value should vary continuously, let Protean hand CSS the meaningful
        endpoints and let the browser interpolate by container width - no
        measurement, no re-render:
      </p>
      <pre><code>{`.my-panel {
  padding: clamp(8px, 3cqi, var(--protean-target));
}`}</code></pre>

      <h2>Why steps, not proportional scaling?</h2>
      <p>
        &quot;The card shrank 20%, shrink the radius 20%&quot; produces values no designer
        ever chose (25.6px). Material&apos;s shape and density systems are discrete
        steps too. When a small screen feels off, the honest fix is a{' '}
        <strong>pattern change</strong> (card to list row) or a{' '}
        <strong>density step</strong> - and those two decisions are exactly
        Protean&apos;s job.
      </p>

      <p>
        Compare the two implementations (Protean vs hand-rolled) side by side in the{' '}
        <Link href="/density-spike">density demo</Link>. The reasoning is one{' '}
        <code>explain()</code> away: <code>density -&gt; compact [instance]</code>.
      </p>
    </div>
  )
}
