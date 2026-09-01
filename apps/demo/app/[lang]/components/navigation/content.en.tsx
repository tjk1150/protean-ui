import Link from 'next/link'

export default function NavigationDocPage() {
  return (
    <div className="doc">
      <h1>Navigation</h1>
      <p className="lede">
        One <code>nav &gt; ul</code> tree that presents as a bottom tab bar, a drawer, a
        rail, or a sidebar. The default policy is expressed as media-query CSS over that
        single DOM, so first paint is always correct - no hydration mismatch, no layout
        shift, no JavaScript required.
      </p>

      <div className="callout">
        This documentation&apos;s own navigation is a Protean Navigation with an instance
        override (<code>presentation=&#123;&#123; compact: &quot;drawer&quot;, medium:
        &quot;sidebar&quot; &#125;&#125;</code>). Resize the window to watch it switch. The
        full four-state morph lives in the{' '}
        <Link href="/navigation-spike">navigation spike</Link>.
      </div>

      <pre><code>{`<Navigation.Root aria-label="Primary">
  <Navigation.Item href="/" current icon={<HomeIcon />}>Home</Navigation.Item>
  <Navigation.Item href="/orders" icon={<BoxIcon />}>Orders</Navigation.Item>
</Navigation.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>compact + touch</td><td>bottom tab bar, labels always visible, safe-area padded</td></tr>
            <tr><td>compact + pointer</td><td>header strip with a drawer - a narrow desktop window is not a phone</td></tr>
            <tr><td>medium</td><td>navigation rail</td></tr>
            <tr><td>expanded</td><td>sidebar</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Navigation.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>presentation</td><td>presentation | &#123; sizeClass: presentation &#125;</td><td>instance override (bar | drawer | rail | sidebar)</td></tr>
            <tr><td>toggleLabel</td><td>string</td><td>label for the drawer toggle button</td></tr>
            <tr><td>aria-label</td><td>string</td><td>names the landmark; required for multiple navs</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Navigation.Item</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>href</td><td>string, optional</td><td>renders a link; omit it to render a button for state-machine apps</td></tr>
            <tr><td>current</td><td>boolean</td><td>sets aria-current=&quot;page&quot; - identical semantics in every presentation</td></tr>
            <tr><td>icon</td><td>ReactNode</td><td>aria-hidden slot before the label</td></tr>
            <tr><td>onClick and other anchor/button props</td><td></td><td>pass through</td></tr>
          </tbody>
        </table>
      </div>

      <h2>The contract</h2>
      <p>
        The <code>data-scope</code> attribute sits on the root only; parts carry{' '}
        <code>data-part</code> (<code>list</code>, <code>item</code>, <code>link</code>,{' '}
        <code>icon</code>, <code>label</code>, <code>drawer-toggle</code>). JavaScript
        contributes the informational <code>data-presentation</code> stamp and the drawer
        open state; everything visual is your CSS.
      </p>
    </div>
  )
}
