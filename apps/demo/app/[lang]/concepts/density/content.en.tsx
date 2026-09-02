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

      <h2>Why shape is not a separate decision</h2>
      <p>
        We evaluated a shape domain as the next geometry axis, and the verdict is{' '}
        <strong>we are not building one</strong>. The reason is simple: shape is
        already decided. Popovers are 12px, modals 14px, sheets round only their top
        corners, fullscreen has none - a token ({`--protean-shape`}) keyed to{' '}
        <code>data-presentation</code> covers all eleven surfaces with nothing
        missing.
      </p>
      <p>
        The contrast with density is the criterion. Density varied{' '}
        <strong>within the same presentation</strong> - input modality and a user
        setting split the value. Multiple inputs make a decision, and a decision
        earned a domain. Shape has exactly one input: the presentation. One input is
        not a decision, it is a lookup table, and lookup tables live in CSS. The
        remaining axis of variation is brand, and that is a one-line token rebind:
      </p>
      <pre><code>{`[data-presentation='modal'] { --protean-shape: 20px; }`}</code></pre>
      <p>
        Pattern-shape coupling is already free - shape keys off the presentation
        stamp, so when Protean changes the pattern the shape follows atomically, and
        the portal problem is solved by the same stamp. A shape domain would add
        surface while adding no capability. The principle at the top of this page
        applies to Protean itself: what CSS and tokens already solve does not get
        forced into a feature.
      </p>

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
