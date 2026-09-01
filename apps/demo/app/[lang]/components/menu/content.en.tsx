import { MenuDemo } from './menu-demo'

export default function MenuPage() {
  return (
    <div className="doc">
      <h1>Menu</h1>
      <p className="lede">
        A list of actions. Pointers get an anchored dropdown menu; compact touch gets
        an <strong>action sheet</strong> (the iOS one). It rides the same contextual
        decision Select uses - zero new policy surface.
      </p>

      <div className="example">
        <span className="exampleLabel">Try it - resize the window, reopen</span>
        <MenuDemo trigger="More" share="Share" duplicate="Duplicate" remove="Delete" onPick="Picked" />
      </div>

      <pre><code>{`<Menu.Root>
  <Menu.Trigger>More</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={share}>Share</Menu.Item>
    <Menu.Item onSelect={duplicate}>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={remove}>Delete</Menu.Item>
  </Menu.Content>
</Menu.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>pointer, any size</td><td>anchored dropdown menu with arrow-key navigation</td></tr>
            <tr><td>compact + touch</td><td>full-width action sheet: 44px rows, scrim behind</td></tr>
            <tr><td>inside a ProteanBoundary</td><td>the action sheet rises from the panel&apos;s bottom edge; the dropdown stays at the document level to avoid clipping</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Root: presentation</td><td>overlay override</td><td>force this one menu</td></tr>
            <tr><td>Item: onSelect</td><td>() =&gt; void</td><td>runs on pick; the menu closes</td></tr>
            <tr><td>Item: destructive</td><td>boolean</td><td>marks a destructive action - stamped <code>data-variant=&quot;danger&quot;</code>, tinted red by the reference stylesheet</td></tr>
            <tr><td>Item: disabled</td><td>boolean</td><td>disabled, announced as such</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Keyboard interaction and <code>role=&quot;menu&quot;</code> semantics are Base
        UI&apos;s Menu in every presentation. Reach for Menu when the user performs an{' '}
        <strong>action</strong>; when they pick a value, that is Select.
      </p>
    </div>
  )
}
