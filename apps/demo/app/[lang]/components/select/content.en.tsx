import { BillingSelect } from '../../../screen-demo/billing-select'
import { SearchableSelectDemo } from './searchable-demo'

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
            <tr><td>open / defaultOpen / onOpenChange</td><td></td><td>the open state works the same way - wire it to routing or analytics</td></tr>
            <tr><td>items</td><td>&#123; value, label &#125;[]</td><td>label map for the trigger; required for native mode</td></tr>
            <tr><td>presentation</td><td>overlay override | &quot;native&quot;</td><td>&quot;native&quot; delegates to a platform select</td></tr>
            <tr><td>aria-label</td><td>string</td><td>names both the trigger and the native fallback</td></tr>
            <tr><td>searchable</td><td>boolean</td><td>renders a filter input inside the popup; requires items</td></tr>
            <tr><td>searchPlaceholder / emptyLabel</td><td>string</td><td>filter input placeholder and the no-results message</td></tr>
            <tr><td>name / disabled / defaultOpen</td><td></td><td>form integration and testing hooks</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Listbox behavior - keyboard model, typeahead, selection state - is the Base UI
        Select underneath in every presentation; the sheet look is the same behavior
        repositioned, so screen readers see one component.
      </p>

      <h2>When the list is long: search</h2>
      <p>
        Turn on <code>searchable</code> and a filter input appears at the top of the
        popup - in the desktop popover and in the phone sheet alike. This is not an
        input glued onto a listbox: underneath, the component switches to the proper
        combobox pattern, so screen readers announce it correctly as a type-to-filter
        field.
      </p>
      <div className="example">
        <span className="exampleLabel">Try it - type to filter</span>
        <SearchableSelectDemo
          label="Country"
          placeholder="Pick a country"
          searchPlaceholder="Search countries"
          emptyLabel="No results"
        />
      </div>
      <pre><code>{`<Select.Root aria-label="Country" searchable items={countries}
  searchPlaceholder="Search countries" emptyLabel="No results">
  <Select.Trigger placeholder="Pick a country" />
  <Select.Content />
</Select.Root>`}</code></pre>
      <p>
        In searchable mode the list renders from <code>items</code>, so leave{' '}
        <code>Select.Content</code> empty - Base UI has to own the filtered list and
        the keyboard highlight together for them to stay correct.
      </p>
    </div>
  )
}
