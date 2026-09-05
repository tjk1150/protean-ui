import Link from 'next/link'

export default function CompositionPage() {
  return (
    <div className="doc">
      <h1>Compose behavior without duplicating controls</h1>
      <p className="lede">
        Protean components are designed to share application structure. The
        goal is never a desktop component plus a mobile component for the same
        interaction - compose the semantic pieces you already need and let each
        component own one responsibility.
      </p>

      <h2>App shell: Screen + Navigation + PrimaryAction</h2>
      <pre><code>{`<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="Primary">...</Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>
    ...
  </Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root>Continue</PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>
      <pre><code>{`Screen        → page structure
Navigation    → navigation semantics + adaptive presentation
PrimaryAction → primary CTA + adaptive placement`}</code></pre>
      <p>
        Screen does not control the Navigation or PrimaryAction decisions -
        each component owns its own.
      </p>

      <h2>Screen.Actions + Actions.Root</h2>
      <pre><code>{`<Screen.Actions>
  <Actions.Root aria-label="Document actions">
    <Actions.Item onClick={save}>Save</Actions.Item>
    <Actions.Item secondary onClick={duplicate}>Duplicate</Actions.Item>
  </Actions.Root>
</Screen.Actions>`}</code></pre>
      <pre><code>{`Screen.Actions → where actions belong in the page
Actions.Root   → action-group semantics and compact overflow`}</code></pre>

      <h2>Add help to an icon button</h2>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="Settings">
    <SettingsIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>Settings</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <p>
        The accessible name belongs to the button; the Tooltip adds optional
        help. Do not rely on Tooltip content as the button&apos;s only
        accessible name.
      </p>

      <h2>One button can open a Dialog and have a Tooltip</h2>
      <p>
        Do not nest two native buttons just to attach two behaviors -{' '}
        <code>&lt;button&gt;&lt;button&gt;</code> is invalid interactive
        nesting. Instead, let the Trigger API that supports <code>render</code>{' '}
        attach its behavior to the Tooltip button:
      </p>
      <pre><code>{`<Tooltip.Root presentation="tooltip">
  <Dialog.Root role="confirmation">
    <Dialog.Trigger
      render={<Tooltip.Trigger aria-label="Delete project" />}
    >
      <TrashIcon />
    </Dialog.Trigger>
    <Dialog.Content title="Delete project?">...</Dialog.Content>
  </Dialog.Root>
  <Tooltip.Content>Delete project</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <pre><code>{`Tooltip.Trigger       → the actual native button
Dialog.Trigger render → adds Dialog trigger behavior`}</code></pre>
      <p>
        The result is one button in the DOM with both behaviors - a contract
        the composition tests assert directly. Critical direction:{' '}
        <strong><code>Tooltip.Trigger</code> itself does not have{' '}
        <code>render</code></strong>. Do not reverse this composition.
      </p>
      <p>
        <code>Menu.Trigger</code> exposes the same verified <code>render</code>{' '}
        path - when a Menu trigger also needs Tooltip help, the actual button
        stays the Tooltip Trigger and Menu attaches its behavior:
      </p>
      <pre><code>{`<Menu.Trigger
  render={<Tooltip.Trigger aria-label="More actions" />}
>
  <MoreIcon />
</Menu.Trigger>`}</code></pre>
      <p>
        The same works for composing onto your own styled button:{' '}
        <code>render=&#123;&lt;button className=&quot;fancy&quot; /&gt;&#125;</code>.
        The principle: <strong>keep one actual interactive element.</strong>
      </p>

      <h2>Form actions</h2>
      <pre><code>{`<form onSubmit={handleSubmit}>
  ...
  <PrimaryAction.Root type="submit">Continue</PrimaryAction.Root>
</form>`}</code></pre>
      <p>
        This works because PrimaryAction preserves an explicit type and only
        falls back to <code>button</code> when none is supplied. Do not
        generalize that contract:
      </p>
      <pre><code>{`PrimaryAction.Root → type ?? "button"  (explicit submit survives)
Tooltip.Trigger    → type="button" fixed
Actions.Item       → type="button" fixed`}</code></pre>
      <p>Use the component whose contract matches the interaction.</p>

      <h2>SupportingPane inside Screen</h2>
      <pre><code>{`<Screen.Root>
  <Screen.Content>
    <SupportingPane.Root paneLabel="Filters">
      <SupportingPane.Main>
        <Results />
      </SupportingPane.Main>
      <SupportingPane.Pane>
        <Filters />
      </SupportingPane.Pane>
    </SupportingPane.Root>
  </Screen.Content>
</Screen.Root>`}</code></pre>
      <p>
        Screen owns the page structure; SupportingPane owns the main +
        supporting relationship inside the content. Neither requires the
        other.
      </p>

      <h2>Provider is optional</h2>
      <p>
        None of these recipes require a <code>ProteanProvider</code>. Add one
        only when the application needs shared configuration - project policy,
        explicit density, custom thresholds, SSR traits, or custom Dialog
        presentation implementations (below).
      </p>

      <h2>Replace Dialog presentation implementations</h2>
      <p>
        The Provider <code>components</code> prop is an advanced composition
        hook. Its current scope is{' '}
        <strong>Dialog presentation implementations</strong>:
      </p>
      <pre><code>{`<ProteanProvider
  components={{
    modal: MyModalPresentation,
  }}
>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        The registry is <code>Partial&lt;OverlayComponents&gt;</code> merged
        with Protean&apos;s defaults - replace only <code>modal</code> and{' '}
        <code>fullscreen</code> · <code>sheet</code> · <code>popover</code>{' '}
        keep the default implementations. The registry&apos;s consumer is
        Dialog Content.
      </p>
      <div className="callout">
        <strong><code>components</code> is not a global registry.</strong>{' '}
        There is no <code>components.Navigation</code> or{' '}
        <code>components.Menu</code> - this is not dependency injection for the
        whole package. And a replacement implementation still participates in a
        Dialog: it must preserve the behavior and accessibility contract Dialog
        expects. Protean does not make an arbitrary replacement accessible
        automatically.
      </div>
      <p>The decision rule:</p>
      <pre><code>{`same implementation, different appearance     → CSS
the presentation implementation must differ  → components`}</code></pre>
      <p>
        Do not replace the Dialog backend just to change radius, padding,
        scrim, shadow, or animation - those are CSS.
      </p>

      <h2>Nested overlays and sheet scrims</h2>
      <p>
        Opening a Select or Menu inside a sheet Dialog works - focus and
        dismissal are handled by the underlying primitives. But on small
        screens a sheet can open over another sheet, stacking two scrims and
        over-darkening the screen. If the product nests these surfaces often,
        adjust the inner scrim with CSS:
      </p>
      <pre><code>{`/* skip the select sheet's scrim when a sheet dialog is already up */
body:has([data-scope='overlay'][data-presentation='sheet'])
  [data-scope='select'] [data-part='backdrop'] {
  background: transparent;
}`}</code></pre>
      <p>
        (Whether to use <code>:has()</code> is the project&apos;s choice.)
        Nested visual treatment is a CSS concern - the interaction semantics do
        not need to change.
      </p>

      <h2>Composition map</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Goal</th><th>Compose</th></tr></thead>
          <tbody>
            <tr><td>Page shell</td><td><code>Screen</code> + <code>Navigation</code> + <code>PrimaryAction</code></td></tr>
            <tr><td>Several page actions</td><td><code>Screen.Actions</code> + <code>Actions.Root</code></td></tr>
            <tr><td>Help for an icon button</td><td><code>Tooltip</code></td></tr>
            <tr><td>Tooltip + Dialog on one button</td><td><code>Dialog.Trigger render</code> + <code>Tooltip.Trigger</code></td></tr>
            <tr><td>Tooltip + Menu on one button</td><td><code>Menu.Trigger render</code> + <code>Tooltip.Trigger</code></td></tr>
            <tr><td>Main content + supporting tools</td><td><code>Screen.Content</code> + <code>SupportingPane</code></td></tr>
            <tr><td>Form submission</td><td><code>PrimaryAction type=&quot;submit&quot;</code></td></tr>
            <tr><td>Different Dialog appearance</td><td>CSS</td></tr>
            <tr><td>Different Dialog presentation implementation</td><td>Provider <code>components</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Container-scoped decisions are their own topic - next:{' '}
        <Link href="/en/advanced/container-boundary">Using Protean inside
        containers</Link>.
      </p>
    </div>
  )
}
