import Link from 'next/link'

export default function ScreenDocPage() {
  return (
    <div className="doc">
      <h1>Screen</h1>
      <p className="lede">
        The adaptive scaffold: named regions for navigation, content, and actions, laid
        out per environment by CSS. It ships no JavaScript of its own and works inside
        Server Components.
      </p>

      <div className="callout">
        This is a <strong>CSS-driven layout helper</strong>: it provides structure and
        markup without judging the situation, and the responsiveness belongs to the
        reference stylesheet (or your own CSS). Its default look applies inside an
        element carrying the <code>protean-defaults</code> class.
      </div>

      <pre><code>{`<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="Primary">...</Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>...</Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root>Buy now</PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>

      <h2>What the reference layout does</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Layout</th></tr></thead>
          <tbody>
            <tr><td>compact + touch</td><td>app shell: content scrolls, actions and navigation stay pinned at the bottom - the action bar stacks above the tab bar automatically</td></tr>
            <tr><td>compact + pointer</td><td>header navigation, content, sticky footer actions</td></tr>
            <tr><td>medium / expanded</td><td>side navigation column; actions sit inline at the end of the content flow; normal document scrolling</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Because both bottom-pinned pieces live in the shell grid rather than in
        position: fixed, their stacking order and safe-area handling need no
        coordination code. See it live in the{' '}
        <Link href="/screen-demo">screen demo</Link> - and this documentation is itself a
        Screen.
      </p>

      <h2>Parts</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Part</th><th>Renders</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Screen.Root</td><td>div[data-scope=&quot;screen&quot;]</td><td>give it a class and lay it out in CSS; server-component safe</td></tr>
            <tr><td>Screen.Navigation</td><td>div[data-part=&quot;navigation&quot;]</td><td>slot for a Navigation (use display: contents to let the nav join the grid)</td></tr>
            <tr><td>Screen.Content</td><td>main[data-part=&quot;content&quot;]</td><td><code>as=&quot;div&quot;</code> when your content already owns the main landmark</td></tr>
            <tr><td>Screen.Actions</td><td>div[data-part=&quot;actions&quot;]</td><td>slot for the primary action</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Real-world shape</h2>
      <p>
        In the migration showcase, a ~50-line component wrapped an existing 24-screen
        mobile-only app: Screen.Root, a Navigation shown from the medium size class up,
        and the untouched app as content. That is the entire desktop layout - the mobile
        experience stayed byte-for-byte identical.
      </p>
    </div>
  )
}
