import Link from 'next/link'

export default function PrimaryActionDocPage() {
  return (
    <div className="doc">
      <h1>PrimaryAction</h1>
      <p className="lede">
        The screen&apos;s main action. On a phone it is a fixed, full-width action bar
        that respects the safe area and dodges the virtual keyboard; in a narrow desktop
        window it is a sticky footer; on larger screens it sits inline where you placed
        it.
      </p>

      <pre><code>{`<Screen.Actions>
  <PrimaryAction.Root onClick={buy}>Buy now</PrimaryAction.Root>
</Screen.Actions>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>compact + touch</td><td>action-bar: full-width, bottom-pinned, safe-area padded, shifted above the virtual keyboard via visualViewport</td></tr>
            <tr><td>compact + pointer</td><td>sticky-footer inside the content column</td></tr>
            <tr><td>medium / expanded</td><td>inline in the content flow - fixed-bottom buttons are a touch idiom, not a desktop one</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>presentation</td><td>presentation | &#123; sizeClass: presentation &#125;</td><td>action-bar | sticky-footer | inline</td></tr>
            <tr><td>...button props</td><td>type, disabled, onClick, form, ...</td><td>the inner element is a real button; submit wiring and loading states pass through untouched</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Virtual keyboard</h2>
      <p>
        When the on-screen keyboard opens, the container tracks{' '}
        <code>visualViewport</code> and exposes the occluded height as{' '}
        <code>--protean-vk-offset</code>; the reference stylesheet translates the action
        bar above the keyboard. This is a progressive enhancement - browsers without the
        API simply keep the bar at the bottom.
      </p>

      <p>
        Try it in the <Link href="/screen-demo">screen demo</Link>: focus the promo-code
        input on a phone and watch the button stay reachable.
      </p>
    </div>
  )
}
