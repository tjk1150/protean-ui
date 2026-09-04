import Link from 'next/link'

export default function DensityPage() {
  return (
    <div className="doc">
      <h1>Density changes how much space the same UI uses</h1>
      <p className="lede">
        Pattern adaptation chooses <strong>which UI pattern</strong> to use.
        Density chooses <strong>how much space the controls inside that UI
        should use</strong>. A Select can stay a dropdown in both environments -
        dense rows for a desktop pointer, touch-sized rows on a tablet. The
        pattern stays the same; the spacing changes because the input
        environment is different.
      </p>

      <h2>Three density profiles</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Density</th><th>Row</th><th>Target</th><th>Use it for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>compact</code></td><td>28px</td><td>32px</td><td>Precise pointer input and information density - dense menus, tables, desktop-style interfaces.</td></tr>
            <tr><td><code>comfortable</code></td><td>36px</td><td>40px</td><td>The middle profile - more breathing room without touch-sized targets.</td></tr>
            <tr><td><code>touch</code></td><td>44px</td><td>48px</td><td>Coarse input. The point is not that the viewport is &quot;mobile&quot; - it is that the interaction benefits from larger targets.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>row</code> is the visual row size and <code>target</code> is the
        interaction target size. They are separate tokens because the visible
        row and the hit area do not always need to be identical.
      </p>

      <h2>Pattern and density are independent</h2>
      <p>
        A pattern decision answers: <em>should this be a dropdown or a
        sheet?</em> A density decision answers: <em>how large should the rows
        and targets inside it be?</em> The combinations are real:
      </p>
      <pre><code>{`Dropdown + compact
Dropdown + touch
Sheet + comfortable
Sheet + touch`}</code></pre>
      <p>
        A large touch tablet can use{' '}
        <code>pattern: dropdown, density: touch</code> at the same time. Protean
        does not collapse all of this into a single &quot;mobile&quot; state.
      </p>

      <h2>Density can come from the environment</h2>
      <p>Protean can choose a density automatically from the current input environment:</p>
      <pre><code>{`precise pointer   → comfortable
touch-first input → touch`}</code></pre>
      <p>
        This is not device detection. Protean responds to interaction
        characteristics - it does not identify an iPhone, a tablet, or a desktop
        model.
      </p>

      <h2>Users can choose a density too</h2>
      <p>
        A product may let the user choose how dense the interface should feel.
        An explicit density overrides the automatic result:
      </p>
      <pre><code>{`<ProteanProvider density="comfortable">
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        The important implementation detail:{' '}
        <strong><code>ProteanProvider</code> does not render a DOM
        wrapper.</strong> It does not automatically produce{' '}
        <code>&lt;div data-density=&quot;comfortable&quot;&gt;</code> around
        your application. The provider changes the density decision available
        to Protean components - it does not stamp a global attribute by itself.
      </p>

      <h2>Popup components stamp density on their own UI</h2>
      <p>
        Dialog, Select, Menu, and Tooltip stamp <code>data-density</code>{' '}
        directly on their popup UI:
      </p>
      <pre><code>{`<div
  data-presentation="popover"
  data-density="touch"
>
  ...
</div>`}</code></pre>
      <p>
        That lets the reference stylesheet - or your own CSS - apply the correct
        row and target values without an application-wide wrapper. Popups render
        through a portal, so an ancestor attribute could not reach them anyway.
      </p>

      <h2>Static content needs an explicit connection</h2>
      <p>
        Because the provider does not render a wrapper, a user density setting
        does not automatically appear on your static application markup. If your
        own non-popup content should follow the same setting, connect it
        explicitly:
      </p>
      <pre><code>{`<ProteanProvider density={density}>
  <div data-density={density}>
    <Dashboard />
  </div>
</ProteanProvider>`}</code></pre>
      <p>Then your application CSS can consume the same tokens:</p>
      <pre><code>{`[data-density="touch"] {
  --app-row-size: var(--protean-row);
  --app-target-size: var(--protean-target);
}`}</code></pre>
      <p>
        Not every density expression needs JavaScript, though. The reference
        styles use input-capability media queries for the automatic static
        path - the decision layer and the CSS expression layer work together.
        Do not rewrite every density-related media query as a React decision
        just because Protean has a density domain.
      </p>

      <h2>A Sheet can still use touch sizing</h2>
      <p>
        One subtle distinction is worth keeping precise. Suppose the density
        decision is <code>comfortable</code> but the selected presentation is a
        sheet:
      </p>
      <pre><code>{`density decision → comfortable
presentation     → sheet
CSS expression   → touch-sized sheet controls`}</code></pre>
      <p>
        The reference CSS gives sheets touch-oriented dimensions regardless of
        the profile - a sheet is a thumb surface. That does{' '}
        <strong>not</strong> mean Protean silently changed the density decision
        to <code>touch</code>. The selected presentation can influence how the
        density is expressed, while the decision itself stays user-selected.
      </p>

      <h2>Decision and expression are different layers</h2>
      <pre><code>{`Density decision → compact / comfortable / touch
CSS              → row size, target size, padding,
                   component-specific expression`}</code></pre>
      <p>
        The decision chooses the profile. CSS turns that profile into actual
        geometry.
      </p>

      <h2>Two things density is not</h2>
      <ul>
        <li>
          <strong>Not an accessibility certification.</strong> Larger targets
          can improve usability, but selecting <code>touch</code> does not make
          an application accessible by itself - labels, keyboard behavior,
          focus visibility, contrast, and content structure still matter. See{' '}
          <Link href="/en/guides/accessibility">Accessibility</Link>.
        </li>
        <li>
          <strong>Not a sibling of shape.</strong> Protean has CSS tokens such
          as <code>--protean-shape</code>, but shape is not a separate runtime
          decision domain - the selected presentation drives its CSS
          expression. Density is different because it is an independent
          decision domain. See <Link href="/en/about/scope">Scope</Link>.
        </li>
      </ul>

      <h2>Summary</h2>
      <pre><code>{`Pattern → dropdown / sheet / modal / ...
Density → compact / comfortable / touch
CSS     → actual dimensions and styling`}</code></pre>
      <p>
        Keeping these decisions separate lets Protean handle cases such as a
        large touch tablet without calling the whole environment
        &quot;mobile.&quot; Next:{' '}
        <Link href="/en/components/dialog">Dialog</Link>.
      </p>
    </div>
  )
}
