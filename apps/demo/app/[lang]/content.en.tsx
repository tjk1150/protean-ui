import Link from 'next/link'
import { TraitsChip } from '../traits-chip'

export default function OverviewPage() {
  return (
    <div className="doc">
      <h1>Declare the meaning. The runtime picks the pattern.</h1>
      <p className="lede">
        Protean UI is a headless adaptation policy runtime for React. Radix and Base UI
        give you the patterns - Protean decides which pattern, when: popover or bottom
        sheet, sidebar or drawer, inline button or fixed action bar.
      </p>

      <p>
        Your environment right now: <TraitsChip /> - resize the window and this page&apos;s
        own navigation switches between a sidebar and a drawer. This site is built with
        Protean&apos;s <code>Screen</code> and <code>Navigation</code>.
      </p>

      <h2>The problem</h2>
      <p>
        The web solved layout adaptation with CSS. It never solved pattern adaptation -
        swaps that change the DOM, focus management, and ARIA wiring. So every codebase
        hand-rolls them:
      </p>
      <pre><code>{`const isDesktop = useMediaQuery("(min-width: 768px)");
return isDesktop ? <Dialog>...</Dialog> : <Drawer>...</Drawer>;`}</code></pre>
      <p>
        Two component trees per overlay, wired by a width check, at every call site - 55
        lines in our reference implementation. With Protean it is one declaration:
      </p>
      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        See it side by side in <Link href="/delete-demo">the deletion demo</Link>.
      </p>

      <h2>How it decides</h2>
      <ul>
        <li>
          Environment traits - a size class (<code>compact</code> / <code>medium</code> /{' '}
          <code>expanded</code>) crossed with an input profile (<code>touch</code> /{' '}
          <code>pointer</code> / <code>hybrid</code>). Width alone is a proxy: a narrow
          desktop window with a mouse is not a phone.
        </li>
        <li>
          A pure policy function maps traits and a semantic role to a presentation. The
          default pack encodes documented platform convention, and the policy file lives
          in your repository like a Tailwind config.
        </li>
        <li>
          Decisions that the server could get wrong are either expressed in CSS or
          deferred to interaction time, so server rendering cannot flash or mismatch.{' '}
          <Link href="/en/concepts/ssr">Read the invariant.</Link>
        </li>
      </ul>

      <h2>Measured, not promised</h2>
      <ul>
        <li>73% less application code at the overlay call site (55 lines to 15, same primitives).</li>
        <li>Navigation morphs across four presentations from one DOM tree - measured layout shift 0, works with JavaScript disabled.</li>
        <li>
          A production-grade, mobile-only app (24 screens, 699 tests) adopted Protean:
          five hand-rolled sheets became one semantic component and a 50-line shell gave
          it a desktop layout, with every test still green.
        </li>
      </ul>

      <p>
        Start with <Link href="/en/getting-started">Getting started</Link>, or jump straight
        to a component: <Link href="/en/components/dialog">Dialog</Link>,{' '}
        <Link href="/en/components/select">Select</Link>,{' '}
        <Link href="/en/components/navigation">Navigation</Link>,{' '}
        <Link href="/en/components/screen">Screen</Link>,{' '}
        <Link href="/en/components/primary-action">PrimaryAction</Link>.
      </p>
    </div>
  )
}
