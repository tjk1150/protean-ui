import Link from 'next/link'
import { BillingSelect } from '../../../screen-demo/billing-select'
import { SearchableSelectDemo } from './searchable-demo'

export default function SelectDocPage() {
  return (
    <div className="doc">
      <h1>Select</h1>
      <p className="lede">
        Use <code>Select</code> when the user needs to choose one value from a
        list. The same Select can use a dropdown or a sheet depending on the
        current environment, while keeping the same value and item model.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Open it, then change the window size and input environment and open it again</span>
        <BillingSelect />
      </div>

      <h2>Basic usage</h2>
      <p>
        For a normal Select, put <code>Select.Item</code> elements inside{' '}
        <code>Select.Content</code>.
      </p>
      <pre><code>{`import { Select } from "@protean-ui/react";

<Select.Root
  aria-label="Billing cycle"
  value={billingCycle}
  onValueChange={setBillingCycle}
  items={cycles}
>
  <Select.Trigger placeholder="Billing cycle" />
  <Select.Content>
    <Select.Item value="monthly">Monthly</Select.Item>
    <Select.Item value="yearly">Yearly</Select.Item>
  </Select.Content>
</Select.Root>`}</code></pre>
      <p>
        This is the normal, non-searchable API. Do <strong>not</strong> replace
        these children with an empty <code>Select.Content</code> - authored
        items are what the popup renders in this mode.
      </p>

      <h2>Default adaptive result</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Presentation</th><th>Density</th></tr>
          </thead>
          <tbody>
            <tr><td>Desktop + pointer</td><td>Dropdown</td><td>Comfortable</td></tr>
            <tr><td>Small + touch</td><td>Sheet</td><td>Touch</td></tr>
            <tr><td>Tablet + touch</td><td>Dropdown</td><td>Touch</td></tr>
            <tr><td>Narrow window + pointer</td><td>Dropdown</td><td>Comfortable</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The last two rows are the important ones. A large touch device keeps the
        dropdown pattern while using larger touch targets; a narrow pointer
        window stays a dropdown even when its width is small. Pattern and
        density remain separate decisions.
      </p>

      <h2>The popup exposes both decisions</h2>
      <p>When Select opens, the popup surface exposes the selected presentation and density:</p>
      <pre><code>{`<div
  data-presentation="sheet"
  data-density="touch"
>
  ...
</div>`}</code></pre>
      <p>
        This lets CSS style the actual selected result. The full DOM hook
        contract lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Searchable Select uses items</h2>
      <p>If the list needs search, use the searchable API.</p>
      <pre><code>{`const cities = [
  { value: "seoul", label: "Seoul" },
  { value: "busan", label: "Busan" },
  { value: "incheon", label: "Incheon" },
];

<Select.Root
  aria-label="City"
  value={city}
  onValueChange={setCity}
  searchable
  items={cities}
>
  <Select.Trigger placeholder="Choose a city" />
  <Select.Content />
</Select.Root>`}</code></pre>
      <div className="example">
        <span className="exampleLabel">Try it - search, then pick</span>
        <SearchableSelectDemo
          label="Country"
          placeholder="Choose a country"
          searchPlaceholder="Search countries"
          emptyLabel="No results"
        />
      </div>
      <p>
        In searchable mode, <code>items</code> provides the option data and{' '}
        <code>Select.Content</code> can remain empty. This is intentionally
        different from the normal API:
      </p>
      <pre><code>{`normal Select     → Select.Item children inside Content
searchable Select → items on Root, empty Content is valid`}</code></pre>
      <p>
        Searchable Select needs the item data up front so it can filter and
        manage the search interaction - which is why the list moves to{' '}
        <code>items</code> instead of authored children.
      </p>

      <h2>Override the presentation for one Select</h2>
      <pre><code>{`<Select.Root
  presentation="sheet"
  value={value}
  onValueChange={setValue}
  items={cycles}
>
  ...
</Select.Root>`}</code></pre>
      <p>
        This instance override takes precedence over the default policy. Use it
        for local exceptions; use project policy when the rule should apply
        broadly - see{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Use the native select when that is the better fit</h2>
      <pre><code>{`<Select.Root
  presentation="native"
  aria-label="Billing cycle"
  value={value}
  onValueChange={setValue}
  items={cycles}
>
  ...
</Select.Root>`}</code></pre>
      <p>
        <code>&quot;native&quot;</code> is a value of the{' '}
        <code>presentation</code> prop, not a separate flag. It renders the
        browser&apos;s built-in <code>&lt;select&gt;</code> - use it when native
        behavior is the better fit for the product (for example, in
        reliability-critical forms). <code>items</code> is required in this
        mode.
      </p>

      <h2>The value belongs to the application</h2>
      <p>
        Select is controlled through <code>value</code> /{' '}
        <code>onValueChange</code> (or uncontrolled via{' '}
        <code>defaultValue</code>). Changing presentation does not create a
        second mobile value model:
      </p>
      <pre><code>{`same value
same option identity
different presentation`}</code></pre>
      <p>
        The open state works the same way - use <code>open</code> /{' '}
        <code>onOpenChange</code> when the application needs to own it.
        Initial-open server-rendering details are covered in{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link>.
      </p>

      <h2>Select.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>value</code> / <code>defaultValue</code> / <code>onValueChange</code></td><td>Controlled or uncontrolled selected value.</td></tr>
            <tr><td><code>open</code> / <code>defaultOpen</code> / <code>onOpenChange</code></td><td>Controlled or uncontrolled open state.</td></tr>
            <tr><td><code>items</code></td><td>List of <code>&#123; value, label &#125;</code> option data. Shows the selected label on the trigger; required in native and searchable modes.</td></tr>
            <tr><td><code>presentation</code></td><td>Overrides the adaptive presentation for this instance. <code>&quot;native&quot;</code> renders the browser&apos;s built-in select.</td></tr>
            <tr><td><code>searchable</code></td><td>Enables the searchable path. Requires <code>items</code>.</td></tr>
            <tr><td><code>searchPlaceholder</code> / <code>emptyLabel</code></td><td>Search input placeholder and the empty-results message.</td></tr>
            <tr><td><code>aria-label</code></td><td>Accessible name, wired to both the trigger and native mode.</td></tr>
            <tr><td><code>name</code></td><td>Form field name.</td></tr>
            <tr><td><code>disabled</code></td><td>Disables the Select.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Select.Trigger</h2>
      <pre><code>{`<Select.Trigger placeholder="Billing cycle" />`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>placeholder</code></td><td>Text shown before a value is selected.</td></tr>
            <tr><td><code>aria-label</code></td><td>Accessible name for the trigger when needed.</td></tr>
            <tr><td><code>className</code></td><td>Adds a class to the trigger button.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Prefer a visible form label where the application already has one; use{' '}
        <code>aria-label</code> when an accessible name is otherwise missing.
      </p>

      <h2>Select.Content and Select.Item</h2>
      <pre><code>{`// normal mode
<Select.Content>
  <Select.Item value="monthly">Monthly</Select.Item>
</Select.Content>

// searchable mode - items supplies the data
<Select.Content />`}</code></pre>
      <p>
        <code>Select.Item</code> takes a <code>value</code> and the visible
        label as children. There are no Group or Label subcomponents in the
        Select namespace.
      </p>
    </div>
  )
}
