import Link from 'next/link'
import { MenuDemo } from './menu-demo'

export default function MenuPage() {
  return (
    <div className="doc">
      <h1>Menu</h1>
      <p className="lede">
        Use <code>Menu</code> for a short list of actions related to a trigger.
        The same Menu can open as a popover or a sheet while keeping the same
        items and action handlers.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Open it, then change the window size and input environment and open it again</span>
        <MenuDemo trigger="More" share="Share" duplicate="Duplicate" remove="Delete" onPick="Picked" />
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { Menu } from "@protean-ui/react";

<Menu.Root>
  <Menu.Trigger>More</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={handleRename}>Rename</Menu.Item>
    <Menu.Item onSelect={handleDuplicate}>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={handleDelete}>Delete</Menu.Item>
  </Menu.Content>
</Menu.Root>`}</code></pre>
      <p>
        The item list stays the same. Protean only changes how the Menu is
        presented.
      </p>

      <h2>Default presentation</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>Pointer environment</td><td>Popover</td></tr>
            <tr><td>Medium / expanded touch</td><td>Popover</td></tr>
            <tr><td>compact + touch</td><td>Sheet</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The important condition is <code>compact + touch</code>.{' '}
        <strong>Touch alone does not force every Menu into a sheet</strong> - a
        tablet with enough space still uses a popover.
      </p>

      <h2>Menu items use onSelect</h2>
      <pre><code>{`<Menu.Item onSelect={() => duplicateDocument()}>
  Duplicate
</Menu.Item>`}</code></pre>
      <p>
        <code>onSelect</code> runs when the item is chosen, and the menu closes
        afterwards. It represents selecting the action rather than tying the
        public API to one pointer event.
      </p>

      <h3>Destructive actions</h3>
      <pre><code>{`<Menu.Item destructive onSelect={deleteProject}>
  Delete project
</Menu.Item>`}</code></pre>
      <p>
        <code>destructive</code> exposes the state as{' '}
        <code>data-variant=&quot;danger&quot;</code> so the reference styles -
        or your own CSS - can distinguish destructive items. Use it for
        genuinely destructive actions, not as a generic red-text switch. It does
        not add confirmation behavior by itself.
      </p>

      <h2>Override the presentation for one Menu</h2>
      <pre><code>{`<Menu.Root presentation="sheet">
  ...
</Menu.Root>`}</code></pre>
      <p>
        This instance override takes precedence over the default policy. The
        presentations Menu meaningfully renders are <code>popover</code> and{' '}
        <code>sheet</code>. Use a project policy when the same rule should apply
        to many Menus - see{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>The popup exposes the selected result</h2>
      <pre><code>{`<div
  data-presentation="sheet"
  data-density="touch"
>
  ...
</div>`}</code></pre>
      <p>
        The full DOM hook contract lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Trigger composition and accessible names</h2>
      <p>
        <code>Menu.Trigger</code> is a real button and accepts the usual button
        props. An icon-only trigger still needs an accessible name:
      </p>
      <pre><code>{`<Menu.Trigger aria-label="More actions">
  <MoreIcon />
</Menu.Trigger>`}</code></pre>
      <p>
        When an existing button should also be the Menu trigger, compose onto it
        with <code>render</code> instead of nesting buttons:
      </p>
      <pre><code>{`<Menu.Trigger
  render={<Tooltip.Trigger aria-label="More actions" />}
>
  <MoreIcon />
</Menu.Trigger>`}</code></pre>
      <p>
        Composition recipes live in{' '}
        <Link href="/en/guides/composition">Composition</Link>.
      </p>

      <h2>Menu.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>Overrides the adaptive presentation for this Menu (<code>popover</code> · <code>sheet</code>, per size class if needed).</td></tr>
            <tr><td><code>open</code></td><td>Controlled open state.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>Initial uncontrolled open state.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>Called when the open state changes.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Menu.Item</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>onSelect</code></td><td>Runs when the item is chosen; the menu closes afterwards.</td></tr>
            <tr><td><code>destructive</code></td><td>Marks a destructive action, stamped as <code>data-variant=&quot;danger&quot;</code>.</td></tr>
            <tr><td><code>disabled</code></td><td>Disables the item; passed through to assistive technology.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>Menu.Content</code> contains items and separators, and{' '}
        <code>Menu.Separator</code> divides related groups of actions. The
        Protean Menu namespace contains exactly these five parts - Root,
        Trigger, Content, Item, and Separator. There are no Group, Label,
        CheckboxItem, or RadioGroup components; the current Menu is
        intentionally focused on action lists.
      </p>

      <h2>Menu is not Select</h2>
      <pre><code>{`Select → choose a value
Menu   → invoke an action`}</code></pre>
      <p>
        That is why Menu items expose <code>onSelect</code> action handlers
        instead of participating in Select&apos;s value model. Keyboard
        navigation and <code>role=&quot;menu&quot;</code> semantics come from
        the underlying primitive in every presentation - the responsibility
        boundary is covered in{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>
    </div>
  )
}
