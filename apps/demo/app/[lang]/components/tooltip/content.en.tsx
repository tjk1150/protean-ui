import { TooltipDemo } from './tooltip-demo'

export default function TooltipPage() {
  return (
    <div className="doc">
      <h1>Tooltip</h1>
      <p className="lede">
        A short hint. Where hover exists it is the familiar tooltip; on touch it becomes
        a <strong>tap-opened toggletip</strong> - touch has no hover, so the tooltip
        pattern itself cannot fire. The purest example of the input axis: it changes
        because the input differs, not because the screen is small.
      </p>

      <div className="example">
        <span className="exampleLabel">Try it - hover with a mouse; tap on a touch screen</span>
        <TooltipDemo label="Shipping fee info" hint="Free over 30,000 won." text="Shipping 3,000 won" />
      </div>

      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="Shipping fee info">?</Tooltip.Trigger>
  <Tooltip.Content>Free over 30,000 won.</Tooltip.Content>
</Tooltip.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>hover-capable (pointer, hybrid)</td><td>a tooltip on hover and keyboard focus</td></tr>
            <tr><td>no hover (touch)</td><td>a tap-toggled bubble; it never steals focus, and tapping outside dismisses it</td></tr>
          </tbody>
        </table>
      </div>

      <h2>A new policy domain: hint</h2>
      <p>
        This decision is not an overlay role - it is its own policy domain,{' '}
        <code>hint</code>. The default is &quot;tooltip where hover exists, popover
        where it does not&quot;, overridable in your policy file
        (<code>hint: ({'{ traits, defaults }'}) =&gt; ...</code>) or per instance via{' '}
        <code>presentation</code>.
      </p>

      <div className="callout">
        <strong>Usage principle:</strong> a hint is supplementary. The server renders a
        plain button and the hint behavior attaches after mount (no JavaScript, no
        hint), so information that must reach everyone belongs in the copy or the
        label - which is standard tooltip accessibility guidance anyway.
      </div>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Root: presentation</td><td>&quot;tooltip&quot; | &quot;popover&quot; | per-size record</td><td>force this one hint</td></tr>
            <tr><td>Root: open / defaultOpen / onOpenChange</td><td></td><td>controlled or uncontrolled; an open hint appears only after hydration</td></tr>
            <tr><td>Trigger: aria-label</td><td>string</td><td>required in practice when the trigger is a glyph like &quot;?&quot;</td></tr>
            <tr><td>Trigger: onClick, disabled ...</td><td></td><td>every button prop passes through - a hinted button can act; disabled locks button and hint together</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
