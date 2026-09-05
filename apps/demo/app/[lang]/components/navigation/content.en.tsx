import Link from 'next/link'

export default function NavigationDocPage() {
  return (
    <div className="doc">
      <h1>Navigation</h1>
      <p className="lede">
        Use <code>Navigation</code> for the primary navigation of an
        application. The same items can be expressed as a bottom bar, drawer,
        rail, or sidebar depending on the environment. Protean keeps one
        Navigation structure and exposes the selected presentation for CSS to
        express.
      </p>

      <div className="callout">
        The navigation of this documentation site is a Protean Navigation.
        Narrow the window and the sidebar becomes a drawer behind a
        &quot;Menu&quot; button.
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { Navigation } from "@protean-ui/react";

<Navigation.Root aria-label="Primary">
  <Navigation.Item href="/home" icon={<HomeIcon />} current>
    Home
  </Navigation.Item>
  <Navigation.Item href="/projects" icon={<ProjectsIcon />}>
    Projects
  </Navigation.Item>
  <Navigation.Item href="/settings" icon={<SettingsIcon />}>
    Settings
  </Navigation.Item>
</Navigation.Root>`}</code></pre>
      <p>
        The application owns the destination, the label, the icon, and whether
        an item represents the current page. Protean owns the adaptive
        presentation decision. CSS owns the actual layout.
      </p>

      <h2>Default presentations</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Presentation</th></tr>
          </thead>
          <tbody>
            <tr><td>compact + touch</td><td><code>bar</code></td></tr>
            <tr><td>compact + pointer / hybrid</td><td><code>drawer</code></td></tr>
            <tr><td>medium</td><td><code>rail</code></td></tr>
            <tr><td>expanded</td><td><code>sidebar</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The compact distinction is based on whether the environment is
        touch-first (<code>input === &quot;touch&quot;</code>). A compact
        hybrid environment follows the drawer path, not the bar path - so do
        not simplify the rule to &quot;compact → bar.&quot;
      </p>

      <h2>One Navigation tree</h2>
      <p>
        The four presentations do not mean four separate application trees.
        Conceptually the DOM stays one <code>nav &gt; ul</code> structure, and
        Protean exposes the selected presentation:
      </p>
      <pre><code>{`<nav data-presentation="sidebar">
  <ul>
    <li>...</li>
  </ul>
</nav>`}</code></pre>
      <p>
        The reference stylesheet determines how that structure is arranged. This
        keeps item identity and application state in one place.
      </p>

      <h2>Presentation is a decision contract</h2>
      <pre><code>{`<Navigation.Root presentation="rail">
  ...
</Navigation.Root>`}</code></pre>
      <p>
        Setting <code>presentation</code> changes the selected result and the
        corresponding DOM stamp. It does <strong>not</strong> mean Protean swaps
        the component into a different React tree, and it does not force layout
        geometry independently of CSS - the reference stylesheet still owns the
        actual layout.
      </p>
      <pre><code>{`React   → stable navigation structure
Protean → presentation decision
CSS     → bar / drawer / rail / sidebar layout`}</code></pre>
      <p>
        These normally agree under the default configuration. When you override
        the decision, style the stamp with your own CSS to make the override
        visible. Project-wide changes belong in policy - see{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Current page state belongs to the application</h2>
      <pre><code>{`<Navigation.Item
  href="/settings"
  current={pathname === "/settings"}
>
  Settings
</Navigation.Item>`}</code></pre>
      <p>
        Protean does not read your router. Set <code>current</code> on the
        active item and it maps to <code>aria-current=&quot;page&quot;</code>.
        The application knows the route; Navigation exposes that meaning
        accessibly.
      </p>

      <h2>Items can be links or buttons</h2>
      <pre><code>{`<Navigation.Item href="/projects">Projects</Navigation.Item>

<Navigation.Item onClick={openWorkspaceSwitcher}>
  Workspaces
</Navigation.Item>`}</code></pre>
      <p>
        With <code>href</code>, the item renders an anchor. Without it, the item
        renders a button - useful when navigation is driven by application state
        instead of URLs. <code>icon</code> is optional and hidden from
        assistive technology; the text label remains the item meaning.
      </p>

      <h2>Compact bars can overflow</h2>
      <pre><code>{`<Navigation.Root maxBarItems={5} overflowLabel="More">
  ...
</Navigation.Root>`}</code></pre>
      <p>
        A bottom bar cannot show unlimited destinations.{' '}
        <code>maxBarItems</code> (default 5) is the total number of bar slots,
        and <strong>the overflow toggle itself counts as one slot</strong> -
        with seven items and <code>maxBarItems=&#123;5&#125;</code>, the bar
        shows four primary items plus &quot;More&quot;, and the rest move into
        the overflow panel. In other presentations the full list stays visible.
      </p>
      <div className="callout">
        Overflow is based on <strong>child count</strong>, not pixel
        measurement. Navigation does not measure available width to decide how
        many items fit, so the server and the client always agree on the
        markup.
      </div>
      <p>
        The drawer presentation exposes a toggle button whose default accessible
        label is <code>Menu</code> - change it with{' '}
        <code>toggleLabel=&quot;Open navigation&quot;</code> to match your
        product language.
      </p>

      <h2>Reference layout</h2>
      <p>
        The reference Navigation layout is opt-in under{' '}
        <code>protean-defaults</code>. Conceptually, the reference stylesheet
        maps the environment with media queries:
      </p>
      <pre><code>{`< 600px + coarse pointer → bottom bar
< 600px + fine pointer   → drawer
600–839px                → rail
>= 840px                 → sidebar`}</code></pre>
      <p>
        The point is that <strong>CSS expresses the physical layout</strong>,
        and it can do so before hydration. If you customize Protean&apos;s size
        thresholds, the reference media queries do not rewrite themselves to
        match - coordinate your CSS accordingly. See{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Navigation.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>Overrides the selected presentation (<code>bar</code> · <code>drawer</code> · <code>rail</code> · <code>sidebar</code>, per size class if needed).</td></tr>
            <tr><td><code>toggleLabel</code></td><td>Accessible label for the drawer toggle. Default: <code>Menu</code>.</td></tr>
            <tr><td><code>maxBarItems</code></td><td>Total bar slots, counting the overflow toggle. Default: 5.</td></tr>
            <tr><td><code>overflowLabel</code></td><td>Label for the overflow action. Default: <code>More</code>.</td></tr>
            <tr><td><code>children</code></td><td>Navigation items.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Native <code>&lt;nav&gt;</code> attributes pass through - add{' '}
        <code>aria-label</code> when a page has more than one navigation
        region.
      </p>

      <h2>Navigation.Item</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>href</code></td><td>Navigation destination. Present → anchor; absent → button.</td></tr>
            <tr><td><code>icon</code></td><td>Optional visual icon, hidden from assistive technology.</td></tr>
            <tr><td><code>current</code></td><td>Marks the current page; maps to <code>aria-current=&quot;page&quot;</code>.</td></tr>
            <tr><td><code>children</code></td><td>Item label.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
