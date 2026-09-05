import Link from 'next/link'
import { TooltipDemo } from './tooltip-demo'

export default function TooltipPage() {
  return (
    <div className="doc">
      <h1>Tooltip</h1>
      <p className="lede">
        Use <code>Tooltip</code> for short, optional help attached to a control.
        When hover is available, Protean uses normal Tooltip behavior. When
        hover is not available, the same help opens as a tap-driven popover.
        The meaning stays the same - only the interaction used to reveal it
        changes.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Hover with a mouse; tap in a hover-less touch environment</span>
        <TooltipDemo label="Shipping fee info" hint="Free over $30." text="Shipping $3" />
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { Tooltip } from "@protean-ui/react";

<Tooltip.Root>
  <Tooltip.Trigger aria-label="Share">
    <ShareIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>
    Share this project
  </Tooltip.Content>
</Tooltip.Root>`}</code></pre>

      <h2>Default presentation</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment capability</th><th>Presentation</th></tr>
          </thead>
          <tbody>
            <tr><td>Hover available</td><td><code>tooltip</code></td></tr>
            <tr><td>Hover unavailable</td><td><code>popover</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The decision is based on <strong>hover capability</strong>, not a
        mobile/desktop classification. A device can be large and still lack
        hover; a narrow browser window can still support hover.
      </p>

      <h2>Popover still means Tooltip</h2>
      <p>
        The tap-opened presentation changes how the help is revealed - it does{' '}
        <strong>not</strong> change the meaning into a Dialog. The popup keeps{' '}
        <code>role=&quot;tooltip&quot;</code> in both presentation paths, and
        the popover path does not move focus into the popup (the interaction
        keeps the equivalent of <code>initialFocus=false</code> /{' '}
        <code>finalFocus=false</code>). The trigger remains the user&apos;s
        active control. It is still short help - not a modal sheet, and not a
        small Dialog.
      </p>

      <div className="callout">
        <strong>Do not put critical information only in a Tooltip.</strong>{' '}
        Tooltip is progressive enhancement - the control should still make
        sense before the Tooltip is available. An icon button needs its own
        accessible name (<code>aria-label</code>); the Tooltip adds help, it
        does not provide the name automatically.
      </div>

      <h2>Tooltip appears after mount</h2>
      <p>
        Tooltip intentionally waits until the component has mounted before
        choosing its hint presentation:
      </p>
      <pre><code>{`server              → plain button, no Tooltip content
first client render → same
after mount         → read actual hover capability
                    → choose tooltip or popover
                    → enable the hint`}</code></pre>
      <p>
        This keeps the server and first client paint aligned without asking the
        server to guess whether the user can hover. It also means the Tooltip
        content is not available before the client behavior runs - another
        reason essential instructions must not live only inside the hint. The
        full reasoning is on{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link>.
      </p>

      <h2>Open state</h2>
      <pre><code>{`<Tooltip.Root open={open} onOpenChange={setOpen}>
  ...
</Tooltip.Root>`}</code></pre>
      <p>
        Tooltip supports uncontrolled (<code>defaultOpen</code>) and controlled
        (<code>open</code> + <code>onOpenChange</code>) state. One limitation
        stays clear: <strong><code>open</code> and <code>defaultOpen</code> do
        not bypass the mount gate.</strong> Even an initially requested open
        hint is not rendered before Tooltip has mounted and chosen a
        presentation - it does not appear in server HTML.
      </p>

      <h2>Override the presentation</h2>
      <pre><code>{`<Tooltip.Root presentation="tooltip">
  ...
</Tooltip.Root>`}</code></pre>
      <p>
        Use <code>presentation</code> (<code>tooltip</code> or{' '}
        <code>popover</code>) when one piece of help should keep a specific
        interaction after mount - for example, hover-only help on a button
        that also performs an action on tap. Overriding the presentation does
        not disable the mount gate.
      </p>

      <h2>Tooltip.Trigger is a native button</h2>
      <pre><code>{`<Tooltip.Trigger aria-label="Help">
  <HelpIcon />
</Tooltip.Trigger>`}</code></pre>
      <p>
        The trigger renders a real <code>&lt;button&gt;</code>, forwards its
        ref, and accepts standard button props - a hinted button can also
        perform an action, and <code>disabled</code> locks the button and the
        hint together. Its type is <strong>fixed to{' '}
        <code>type=&quot;button&quot;</code></strong>, so it is always safe
        inside forms. This differs from PrimaryAction, where an explicit{' '}
        <code>type=&quot;submit&quot;</code> is preserved - do not carry that
        contract over.
      </p>

      <h2>Tooltip.Trigger does not have render</h2>
      <p>
        <code>Tooltip.Trigger</code> itself does <strong>not</strong> expose a{' '}
        <code>render</code> prop. When Tooltip needs to share one actual button
        with another trigger, the component that owns <code>render</code>{' '}
        performs the composition:
      </p>
      <pre><code>{`<Tooltip.Root>
  <Dialog.Trigger
    render={<Tooltip.Trigger aria-label="Delete project" />}
  >
    <TrashIcon />
  </Dialog.Trigger>
  <Tooltip.Content>Delete project</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <pre><code>{`Tooltip.Trigger       → the actual native button
Dialog.Trigger render → adds Dialog behavior to that button`}</code></pre>
      <p>
        One button in the DOM, two behaviors - no nested buttons. Full recipes
        live in <Link href="/en/guides/composition">Composition</Link>.
      </p>

      <h2>Tooltip.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>Overrides the hint presentation after mount (<code>tooltip</code> · <code>popover</code>, per size class if needed).</td></tr>
            <tr><td><code>open</code></td><td>Controlled open state.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>Initial uncontrolled open state.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>Called when the open state changes.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Tooltip.Content</h2>
      <pre><code>{`<Tooltip.Content>
  Keyboard shortcuts
</Tooltip.Content>`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>children</code></td><td>The help text.</td></tr>
            <tr><td><code>className</code></td><td>Adds a class to the popup.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Keep Tooltip content short and supplemental. If the information needs a
        form, multiple actions, or focusable interactive content, Tooltip is
        the wrong role. When mounted and active, the popup exposes{' '}
        <code>data-presentation</code> and <code>data-density</code> for
        styling - the full hook contract lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>
    </div>
  )
}
