import Link from 'next/link'

export default function PatternAdaptationPage() {
  return (
    <div className="doc">
      <h1>Use the pattern that fits the situation</h1>
      <p className="lede">
        The same feature does not always belong in the same UI pattern. A Select
        can be a dropdown in one environment and a sheet in another. A Dialog
        can be a modal, a sheet, or fullscreen while still representing the same
        task. Pattern adaptation is the decision between those patterns.
      </p>

      <h2>Width alone is not enough</h2>
      <p>
        A narrow viewport does not necessarily mean &quot;mobile.&quot; Consider
        the same Select in four environments:
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>Desktop + pointer</td><td>Dropdown</td></tr>
            <tr><td>Small + touch</td><td>Bottom sheet</td></tr>
            <tr><td>Tablet + touch</td><td>Dropdown with touch density</td></tr>
            <tr><td>Narrow window + pointer</td><td>Dropdown</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The last two rows are the important ones. A touch tablet can have plenty
        of space while still benefiting from larger targets. A narrow desktop
        window can have very little space while still being operated with a
        precise pointer. So Protean does not reduce the problem to &quot;small
        width → mobile UI.&quot; It combines the signals that matter to the role
        being adapted. <strong>Narrow does not always mean mobile.</strong>
      </p>

      <h2>The feature keeps its meaning</h2>
      <p>
        The application declares what the UI is for. For a Dialog, that meaning
        is expressed with <code>role</code>:
      </p>
      <pre><code>{`<Dialog.Root role="confirmation">
  ...
</Dialog.Root>`}</code></pre>
      <p>
        The environment can change the presentation without changing the task
        itself. With the default policy:
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Dialog role</th><th>compact + touch</th><th>otherwise</th></tr>
          </thead>
          <tbody>
            <tr><td><code>confirmation</code></td><td>Sheet</td><td>Modal</td></tr>
            <tr><td><code>form</code></td><td>Fullscreen</td><td>Modal</td></tr>
            <tr><td><code>contextual</code></td><td>Sheet</td><td>Popover</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A confirmation stays a confirmation. A form stays a form. Protean
        changes <strong>how that role is presented</strong>, not what the
        application means.
      </p>

      <h2>The application does not branch between two implementations</h2>
      <p>
        Without a shared adaptive layer, this decision often ends up at the call
        site:
      </p>
      <pre><code>{`return isMobile
  ? <MobileSheet />
  : <DesktopPopover />;`}</code></pre>
      <p>
        Now the application owns two implementations of the same feature - and
        keeps their state, events, focus behavior, dismissal, and accessibility
        wiring in sync. With Protean, the call site describes the feature
        instead:
      </p>
      <pre><code>{`<Dialog.Root role="contextual">
  ...
</Dialog.Root>`}</code></pre>
      <p>The presentation is selected elsewhere.</p>

      <h2>Protean chooses the pattern. CSS expresses it.</h2>
      <p>
        This is the responsibility boundary. Protean decides between semantic
        results such as <code>popover</code>, <code>sheet</code>,{' '}
        <code>modal</code>, and <code>fullscreen</code>. CSS still owns the
        actual visual expression - dimensions, spacing, grid and flex layout,
        colors, borders, shape, animation. CSS is the right tool for layout and
        visual expression. Protean handles the separate question of{' '}
        <strong>which interaction pattern should be active</strong>.
      </p>

      <h2>The selected result is visible in the DOM</h2>
      <p>
        When a presentation is selected, Protean exposes it through{' '}
        <code>data-presentation</code>:
      </p>
      <pre><code>{`<div data-presentation="sheet">
  ...
</div>`}</code></pre>
      <p>That gives CSS a stable result to style:</p>
      <pre><code>{`[data-presentation="sheet"] {
  /* sheet-specific expression */
}`}</code></pre>
      <p>
        The application does not need another <code>isMobile</code> branch just
        to style the selected pattern.
      </p>

      <h2>Overlays decide when they open</h2>
      <p>
        Dialog, Select, and Menu normally do not need to decide their
        presentation while they are closed. When the user opens one, Protean
        reads the current environment and chooses the result.
      </p>
      <pre><code>{`closed → no presentation decision needed
open   → read the current environment
       → choose the presentation`}</code></pre>
      <p>
        The default behavior then{' '}
        <strong>pins that result while the overlay stays open</strong>. If the
        window changes halfway through a form, the UI does not suddenly switch
        from a modal to fullscreen underneath the user. Close it and open it
        again, and Protean evaluates the current environment again. The detailed
        server-rendering consequences are covered in{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link>.
      </p>

      <h2>Always-visible UI uses a different strategy</h2>
      <p>
        Navigation cannot wait for a click before it appears - it is part of the
        page from the first render. Protean therefore keeps one stable
        Navigation structure and exposes the selected presentation as data,
        while the reference stylesheet uses CSS to express the actual layout for
        the current environment.
      </p>
      <pre><code>{`React    → one Navigation tree
Protean  → presentation meaning
CSS      → actual layout`}</code></pre>
      <p>
        Protean does not render a separate mobile Navigation tree and desktop
        Navigation tree. Overlays and always-visible chrome simply have
        different timing needs - the full strategy is on the{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link> page.
      </p>

      <h2>Pattern and density are separate decisions</h2>
      <p>
        Pattern adaptation answers: <em>which interaction pattern should this
        feature use?</em> Density answers: <em>how much space should the
        controls inside that UI use?</em> A tablet with touch input can keep the
        Select as a dropdown while using touch-friendly row and target sizes:
      </p>
      <pre><code>{`Pattern → dropdown
Density → touch`}</code></pre>
      <p>
        That is why Protean does not collapse every adaptive behavior into a
        single &quot;mobile mode.&quot; Next:{' '}
        <Link href="/en/concepts/density">Density</Link>.
      </p>
    </div>
  )
}
