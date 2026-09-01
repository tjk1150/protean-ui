export default function CompositionPage() {
  return (
    <div className="doc">
      <h1>Using them together</h1>
      <p className="lede">
        Nine roles in one app - does that tangle? Most combinations structurally
        cannot: the components do not know about each other. This page explains why,
        and the four places that genuinely deserve care.
      </p>

      <h2>The full assembly</h2>
      <p>A real app assembles like this. This docs site is the same structure.</p>
      <pre><code>{`<ProteanProvider>                  {/* optional - built-in default policy */}
  <Screen.Root>
    <Screen.Navigation>
      <Navigation.Root aria-label="Menu">   {/* bar - drawer - rail - sidebar */}
        <Navigation.Item href="/inbox">Inbox</Navigation.Item>
        ...
      </Navigation.Root>
    </Screen.Navigation>

    <Screen.Content>
      <Actions.Root aria-label="Document tools">  {/* action row */}
        <Actions.Item onClick={save}>Save</Actions.Item>
        <Actions.Item secondary onClick={rename}>Rename</Actions.Item>
      </Actions.Root>

      <ListDetail.Root detailActive={!!selected}>  {/* list-detail */}
        <ListDetail.List>...</ListDetail.List>
        <ListDetail.Detail>
          <ProteanBoundary>              {/* decisions use this panel's width */}
            <Dialog.Root role="confirmation">
              <Dialog.Trigger>Delete</Dialog.Trigger>
              <Dialog.Content title="Delete this?">...</Dialog.Content>
            </Dialog.Root>
          </ProteanBoundary>
        </ListDetail.Detail>
      </ListDetail.Root>
    </Screen.Content>

    <Screen.Actions>
      <PrimaryAction.Root>Check out</PrimaryAction.Root>
    </Screen.Actions>
  </Screen.Root>
</ProteanProvider>`}</code></pre>

      <h2>Why it does not tangle</h2>
      <p>
        Components share exactly two things: a read-only view of the environment
        (the traits) and a pure policy function. Every overlay decides
        independently, <strong>at the moment it opens</strong>; there is no channel
        through which one component reads or writes another&apos;s state. Three
        dialogs, two selects, and a menu on one screen each behave exactly as they
        would alone. Nesting works the same way - open a select inside a dialog and
        Base UI handles focus and stacking while each decides for itself.
      </p>
      <div className="callout">
        <strong>Why this design?</strong> The moment decisions flow between
        components, you get &quot;changing A broke B&quot;. Decisions live in a pure
        function and only the result reaches the DOM (<code>data-presentation</code>),
        so adding components multiplies the markup, not the cases.
      </div>

      <h2>The four places that deserve care</h2>

      <h3>1. Do not set display directly on parts</h3>
      <p>
        The reference stylesheet lives in <code>@layer</code>, so your CSS always
        wins - including against state-driven hiding. Setting
        <code>display: flex</code> on a part that a state hides (ListDetail&apos;s
        list, Navigation&apos;s overflow tab) defeats the hiding. Scope your display
        rules to the visible state
        (<code>[data-presentation=&quot;panes&quot;] [data-part=&quot;list&quot;]</code>) or style an
        inner wrapper instead.
      </p>

      <h3>2. Inside a Boundary, chrome still reads the viewport</h3>
      <p>
        Wrap a 420px panel in <code>ProteanBoundary</code> and overlays inside it
        decide by the panel&apos;s width (compact - the sheet rises from the
        panel&apos;s own bottom). Navigation in the same panel still reads the
        viewport: chrome is always on screen, so the server renders it, and the
        server cannot measure a panel. To adapt in-panel chrome, use CSS container
        queries against the same data attributes.
      </p>

      <h3>3. Sheet on sheet: manage the scrim yourself</h3>
      <p>
        On compact, opening a select inside a sheet dialog stacks sheet on sheet.
        Behavior is fully correct (focus, close order), but two scrims darken the
        page. Where stacking is common, drop the inner scrim in CSS:
      </p>
      <pre><code>{`/* skip the select sheet's scrim when a sheet is already up */
body:has([data-scope='overlay'][data-presentation='sheet'])
  [data-scope='select'] [data-part='backdrop'] {
  background: transparent;
}`}</code></pre>

      <h3>4. Nested boundaries: the nearest one wins</h3>
      <p>
        Put a Boundary inside a Boundary and an overlay measures against, and is
        contained by, the nearest one above it. This contract is pinned by a test.
      </p>

      <h2>A hinted button is still a button</h2>
      <p>
        <code>Tooltip.Trigger</code> passes every button prop through. To make a
        tooltipped icon button actually do something, hand it an
        <code>onClick</code> - on touch (tap-toggled popover) the hint opening and
        your onClick run together. <code>disabled</code> lands on the button
        natively and locks the hint with it.
      </p>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="Delete row" onClick={removeRow}>
    <TrashIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>Removes this row.</Tooltip.Content>
</Tooltip.Root>`}</code></pre>

      <h2>Two roles on one element: render</h2>
      <p>
        When one button needs a hint and also opens a dialog or menu, hand the
        action owner&apos;s trigger (Dialog, Menu) another element via
        <code>render</code>. Exactly one button reaches the DOM, with the behavior
        and accessibility wiring merged onto it - the Base UI render convention.
      </p>
      <pre><code>{`<Tooltip.Root presentation="tooltip">  {/* see the note below */}
  <Menu.Root>
    <Menu.Trigger render={<Tooltip.Trigger aria-label="More actions" />}>
      <MoreIcon />
    </Menu.Trigger>
    <Menu.Content>...</Menu.Content>
  </Menu.Root>
  <Tooltip.Content>More actions</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <div className="callout">
        <strong>Keep the hint hover-only on an action button.</strong> The default
        policy turns hints into tap-toggled popovers where hover does not exist -
        but on a button that acts, one tap would then do two things. Give
        <code>Tooltip.Root</code> <code>presentation=&quot;tooltip&quot;</code> and the hint
        opens only on hover, silently absent on touch - the accessible name is
        already carried by <code>aria-label</code>. A styled host button
        (<code>render=&#123;&lt;button className=&quot;...&quot;/&gt;&#125;</code>) composes the same way.
      </div>

      <h2>Proof it runs</h2>
      <p>
        The docs site you are reading is the Screen + Navigation assembly, and the
        Toss mini-app clone (24 screens, 699 tests) ran five overlay kinds plus the
        shell together through a real migration. Container decisions are live in
        the container boundary demo.
      </p>
    </div>
  )
}
