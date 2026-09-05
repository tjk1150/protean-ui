import Link from 'next/link'

export default function ScreenDocPage() {
  return (
    <div className="doc">
      <h1>Screen</h1>
      <p className="lede">
        Use <code>Screen</code> to give a page a stable structure for
        navigation, main content, and actions. Screen itself does not choose
        between adaptive presentations - it renders a predictable DOM structure
        and lets CSS arrange that structure for the available space.
      </p>

      <h2>Basic usage</h2>
      <pre><code>{`import { Screen, Navigation, PrimaryAction } from "@protean-ui/react";

<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="Primary">...</Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>
    <CheckoutForm />
  </Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root type="submit">Continue</PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>
      <p>
        The markup stays stable. CSS decides how those regions are arranged.
        See it in the <Link href="/screen-demo">screen demo</Link> - the
        skeleton of this documentation site is a Screen too.
      </p>

      <h2>Screen does not have a presentation decision</h2>
      <p>
        Unlike Navigation or PrimaryAction, Screen does not expose{' '}
        <code>presentation</code> and does not ask the policy engine to choose
        one.
      </p>
      <pre><code>{`Screen → stable structure
CSS    → responsive page layout`}</code></pre>
      <p>
        This is intentional. A page changing from one column to two columns is a
        layout problem, and CSS already handles that well.
      </p>

      <h2>Reference layout</h2>
      <p>
        The reference Screen layout is opt-in under{' '}
        <code>protean-defaults</code> - importing <code>reference.css</code>{' '}
        alone does not force this page layout onto your application.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>
        With it enabled, the reference stylesheet keeps the same Screen DOM and
        rearranges it with CSS:
      </p>
      <pre><code>{`compact (default)        compact + fine pointer     wider
┌──────────────┐         ┌──────────────┐           ┌──────┬─────────┐
│   Content    │         │  Navigation  │           │ Nav  │ Content │
├──────────────┤         ├──────────────┤           │      ├─────────┤
│   Actions    │         │   Content    │           │      │ Actions │
├──────────────┤         ├──────────────┤           └──────┴─────────┘
│  Navigation  │         │   Actions    │
└──────────────┘         └──────────────┘`}</code></pre>
      <p>
        These are reference CSS layouts, not Screen presentations. The page
        does not need <code>isMobile ? &lt;MobileScreen /&gt; :
        &lt;DesktopScreen /&gt;</code> just to rearrange those regions.
      </p>

      <h2>One DOM structure</h2>
      <pre><code>{`<div data-scope="screen">
  <div data-part="navigation">...</div>
  <main data-part="content">...</main>
  <div data-part="actions">...</div>
</div>`}</code></pre>
      <p>
        Detailed hook customization lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
        You can also keep the stable markup and replace the layout CSS
        entirely:
      </p>
      <pre><code>{`[data-scope="screen"] {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
}`}</code></pre>
      <p>
        <strong>Screen owns structure. Your CSS can own the layout.</strong>
      </p>

      <h2>Screen.Content uses main by default</h2>
      <p>
        <code>Screen.Content</code> renders the content region as{' '}
        <code>&lt;main&gt;</code>, giving the page&apos;s primary content an
        appropriate landmark. If the application already has a{' '}
        <code>&lt;main&gt;</code> higher in the tree, avoid a duplicate
        landmark by rendering a <code>div</code> instead:
      </p>
      <pre><code>{`<Screen.Content as="div">
  ...
</Screen.Content>`}</code></pre>
      <p>
        The public contract is <code>as=&quot;main&quot; | &quot;div&quot;</code>{' '}
        with <code>main</code> as the default.
      </p>

      <h2>Navigation and Actions are layout slots</h2>
      <p>
        <code>Screen.Navigation</code> is a structural slot - it does not
        replace <code>Navigation.Root</code>:
      </p>
      <pre><code>{`Screen.Navigation → where navigation belongs in the page structure
Navigation.Root   → actual navigation semantics and adaptive presentation`}</code></pre>
      <p>
        Likewise, <code>Screen.Actions</code> is not the same component as{' '}
        <code>Actions.Root</code>:
      </p>
      <pre><code>{`<Screen.Actions>
  <Actions.Root>...</Actions.Root>
</Screen.Actions>`}</code></pre>
      <pre><code>{`Screen.Actions → page-layout slot
Actions.Root   → toolbar / action-group component`}</code></pre>
      <p>
        The next page covers <Link href="/en/layout/actions">Actions</Link> in
        detail.
      </p>
      <div className="callout">
        One reference-style nuance: the Screen Navigation wrapper can use{' '}
        <code>display: contents</code> so the nested Navigation participates
        directly in the Screen grid. Do not rely on that wrapper as a permanent
        visual box when using the reference styles - style the Navigation
        element inside it instead.
      </div>

      <h2>API</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Part</th><th>Renders</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code>Screen.Root</code></td><td><code>div[data-scope=&quot;screen&quot;]</code></td><td>Outer container. Accepts standard div attributes and your own classes.</td></tr>
            <tr><td><code>Screen.Navigation</code></td><td><code>div[data-part=&quot;navigation&quot;]</code></td><td>Navigation layout region.</td></tr>
            <tr><td><code>Screen.Content</code></td><td><code>main[data-part=&quot;content&quot;]</code></td><td><code>as=&quot;main&quot; | &quot;div&quot;</code>, default <code>main</code>.</td></tr>
            <tr><td><code>Screen.Actions</code></td><td><code>div[data-part=&quot;actions&quot;]</code></td><td>Page-actions layout region.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        All parts accept the standard HTML attributes for their underlying
        element. There is no <code>presentation</code>, density, or policy prop
        on any of them.
      </p>
    </div>
  )
}
