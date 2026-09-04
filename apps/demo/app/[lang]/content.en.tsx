import Link from 'next/link'

export default function OverviewPage() {
  return (
    <div className="doc">
      <h1>Stop building the same UI twice for different environments</h1>
      <p className="lede">
        Protean UI replaces the <strong>per-environment UI branches</strong> you
        write by hand in React. Declare what a component is, and Protean picks
        the UI pattern and density that fit the current environment.
      </p>

      <h2>The usual way</h2>
      <pre><code>{`const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile ? (
  <BottomSheet rowHeight={44}>
    <CycleOptions />
  </BottomSheet>
) : (
  <Dropdown rowHeight={36}>
    <CycleOptions />
  </Dropdown>
);`}</code></pre>
      <p>It is the same feature, but now you have to:</p>
      <ul>
        <li>guess whether this is a mobile environment,</li>
        <li>split the dropdown and the bottom sheet,</li>
        <li>size rows separately for mouse and touch,</li>
        <li>and keep both implementations doing the same thing.</li>
      </ul>
      <p>
        Once branches like this appear on every screen, responsive code spreads
        through the whole UI.
      </p>

      <h2>With Protean, you build it once</h2>
      <pre><code>{`<Select.Root aria-label="Billing cycle" value={cycle} onValueChange={setCycle} items={cycles}>
  <Select.Trigger placeholder="Billing cycle" />
  <Select.Content>
    <Select.Item value="monthly">Monthly</Select.Item>
    <Select.Item value="yearly">Yearly</Select.Item>
  </Select.Content>
</Select.Root>`}</code></pre>
      <p>Protean decides how it shows up in each environment.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>What you get</th></tr>
          </thead>
          <tbody>
            <tr><td>Desktop + pointer</td><td>A dropdown with dense rows</td></tr>
            <tr><td>Small screen + touch</td><td>A bottom sheet with roomy rows</td></tr>
            <tr><td>Tablet + touch</td><td>A dropdown with touch-friendly rows</td></tr>
            <tr><td>Narrow window + pointer</td><td>Still a dropdown</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>A narrow screen does not always mean mobile.</strong> It might be
        a desktop browser window someone made small, or a large tablet driven by
        a finger. Protean never infers &quot;mobile&quot; from width alone - it{' '}
        <strong>reads the available space and the input method together</strong>.
      </p>

      <h2>What Protean decides</h2>
      <p>Protean owns exactly two decisions.</p>
      <h3>Pattern</h3>
      <p>
        The same feature is shown as the UI pattern that fits the situation - the
        same selection UI can become a dropdown or a bottom sheet.
      </p>
      <h3>Density</h3>
      <p>
        Inside the same UI, rows get a little denser for a mouse and a little
        roomier for a finger - so you stop re-wiring <code>rowHeight</code> and
        tap targets in application code every time the pattern changes.
      </p>

      <h2>It does not replace CSS</h2>
      <p>
        Protean is not a new responsive CSS engine. Layout, color, spacing,
        corners, smooth size changes -{' '}
        <strong>everything CSS is good at stays in CSS.</strong> Protean owns the
        choice that comes before:
      </p>
      <div className="callout">
        Should this UI be a dropdown or a sheet right now?
        <br />
        Should it be dense, or roomy enough for touch?
      </div>
      <p>If all you need is a simple visual change, you do not need Protean.</p>

      <h2>Proven in a real app</h2>
      <p>
        In a side-by-side comparison against a hand-branched implementation, the
        application code went from <strong>55 lines to 15</strong>. And after
        migrating a real app, its existing <strong>699 tests still passed
        unchanged</strong>. The full verification picture is in{' '}
        <Link href="/en/about/status">Quality and support</Link>.
      </p>

      <h2>These docs run on Protean</h2>
      <p>
        The navigation of this documentation site is a Protean component. Resize
        the browser window and its presentation follows the available space. You
        do not need to memorize any internal values here - when you want to know
        how the choice is made, read{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link>.
      </p>

      <h2>Next steps</h2>
      <p>
        New here? Build your first component in{' '}
        <Link href="/en/getting-started">Getting started in 10 minutes</Link>.
        Curious how Protean chooses first? Head to{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link>.
      </p>
    </div>
  )
}
