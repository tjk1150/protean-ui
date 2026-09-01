import { BillingSelect } from '../../../screen-demo/billing-select'

export default function SelectDocPage() {
  return (
    <div className="doc">
      <h1>Select</h1>
      <p className="lede">
        A listbox that presents as an anchored popover for pointers and a bottom sheet
        for compact touch - derived from the same contextual decision Dialog uses, with
        zero new policy surface.
      </p>

      <div className="example">
        <span className="exampleLabel">Live - resize the window, reopen</span>
        <BillingSelect />
      </div>

      <pre><code>{`<Select.Root aria-label="Billing cycle" value={value} onValueChange={setValue} items={cycles}>
  <Select.Trigger placeholder="Billing cycle" />
  <Select.Content>
    <Select.Item value="monthly">Monthly</Select.Item>
    <Select.Item value="yearly">Yearly</Select.Item>
  </Select.Content>
</Select.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>pointer, any size</td><td>anchored popover, typeahead, dense rows</td></tr>
            <tr><td>compact + touch</td><td>full-width bottom sheet, 44px rows, scrim</td></tr>
            <tr><td>medium/expanded + touch</td><td>popover with touch-sized rows (tablet convention)</td></tr>
            <tr><td>presentation=&quot;native&quot;</td><td>a real &lt;select&gt; element (requires items)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Select.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>value / defaultValue / onValueChange</td><td>string | null</td><td>controlled or uncontrolled selection</td></tr>
            <tr><td>items</td><td>&#123; value, label &#125;[]</td><td>label map for the trigger; required for native mode</td></tr>
            <tr><td>presentation</td><td>overlay override | &quot;native&quot;</td><td>&quot;native&quot; delegates to a platform select</td></tr>
            <tr><td>aria-label</td><td>string</td><td>names both the trigger and the native fallback</td></tr>
            <tr><td>name / disabled / defaultOpen</td><td></td><td>form integration and testing hooks</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Listbox behavior - keyboard model, typeahead, selection state - is the Base UI
        Select underneath in every presentation; the sheet look is the same behavior
        repositioned, so screen readers see one component.
      </p>
    </div>
  )
}
