import Link from 'next/link'
import { TraitsChip } from '../traits-chip'

export default function OverviewPage() {
  return (
    <div className="doc">
      <h1>Declare what the UI means. Protean decides how it shows.</h1>
      <p className="lede">
        Protean UI is a React library. Tell it the meaning - &quot;this dialog is an
        input form&quot; - and it picks the presentation that fits the user&apos;s
        current screen and input: fullscreen or a bottom sheet on a phone, a centered
        modal or popover on desktop.
      </p>

      <p>
        Your environment right now: <TraitsChip /> - resize the window and this
        page&apos;s own navigation switches between a sidebar and a drawer. This site
        is built with Protean.
      </p>

      <h2>Does this look familiar?</h2>
      <pre><code>{`const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile
  ? <BottomSheet rowHeight={44} />  // mobile: sheet, touch-sized rows
  : <Popover rowHeight={36} />;     // desktop: popover, pointer-sized rows`}</code></pre>
      <p>
        Every place the UI must differ by environment, you branch by hand: two
        component trees kept in sync, and even the sizing values coupled to each
        branch manually. The bundle repeats at every call site - 55 lines per overlay
        in our reference implementation.
      </p>

      <h2>The same thing with Protean</h2>
      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        <code>role=&quot;form&quot;</code> says &quot;this dialog is an input
        form&quot;. That one declaration opens fullscreen on a phone and as a centered
        modal on desktop - zero branch code, 15 lines in total, 73% less than the
        hand-written version. Compare them side by side in{' '}
        <Link href="/delete-demo">the deletion demo</Link>.
      </p>
      <p>
        It does not stop at the pattern: the same judgment picks the{' '}
        <strong>density</strong> - desktop-dense rows for a mouse, touch-sized rows for
        a finger - so the <code>rowHeight</code> you used to couple by hand stops being
        your code.
      </p>

      <h2>Protean does exactly two things</h2>
      <p>
        Name what you just saw and you have the whole library.{' '}
        <strong>Pattern adaptation</strong> - showing the same meaning as the UX
        pattern the situation calls for (modal · sheet · fullscreen · sidebar…). And{' '}
        <strong>density</strong> - fitting the row heights and tap targets inside it to
        the input method and the user&apos;s setting.
      </p>
      <div className="callout">
        CSS renders exceptionally well. Layout, smooth size changes, and simple
        mappings stay CSS&apos;s job. What Protean owns is combining the signals CSS
        cannot see - the UI&apos;s meaning, the input method, the size class, a user
        setting, the containing panel - to <strong>decide what to show</strong>.
        Values like corner radius simply follow the chosen presentation; they are not
        separate decisions.
      </div>

      <h2>How it decides</h2>
      <ol>
        <li>
          <strong>It reads the environment</strong> - the size class (compact / medium
          / expanded) together with the input method (touch / mouse).
        </li>
        <li>
          <strong>It applies the rules.</strong> The defaults transcribe conventions
          iOS and Android apps already follow; if they do not fit, the rules live as a
          file in your repository and you change them there.
        </li>
        <li>
          <strong>It shows the right presentation</strong> - a real UX pattern such as
          a modal, bottom sheet, fullscreen surface, or sidebar, at the right density.
        </li>
      </ol>
      <div className="callout">
        <strong>Why not just screen width?</strong> Someone who narrowed a desktop
        window is not a phone user. They have a mouse, so a small modal fits better
        than a thumb-oriented sheet. Protean reads size and input together, so it can
        tell the two apart.
      </div>

      <h2>Measured, not promised</h2>
      <ul>
        <li>73% less application code at the overlay call site (55 lines to 15, same primitives).</li>
        <li>
          Navigation morphs across four presentations from one DOM tree - measured
          layout shift 0, and the first layout is correct even before JavaScript runs.
        </li>
        <li>
          A production-grade, mobile-only app (24 screens, 699 tests) adopted Protean:
          five hand-rolled sheets became one semantic component and a 50-line shell
          gave it a desktop layout, with every test still green.
        </li>
      </ul>

      <h2>Why this needs to exist</h2>
      <p>
        Android apps come out acceptable-looking even from average developers - not
        because of taste, but structure: the platform owns the decisions and the
        developer picks meanings. On the web those decisions are all dumped into
        application code, and Protean takes back exactly two of them:{' '}
        <strong>the pattern and the density</strong>. The full argument is in{' '}
        <Link href="/en/about/why">Why this exists</Link>.
      </p>

      <p>
        Build one yourself in <Link href="/en/getting-started">Start in 10 minutes</Link>,
        or jump straight to a component:{' '}
        <Link href="/en/components/dialog">Dialog</Link>,{' '}
        <Link href="/en/components/select">Select</Link>,{' '}
        <Link href="/en/components/navigation">Navigation</Link>,{' '}
        <Link href="/en/components/primary-action">PrimaryAction</Link>.
      </p>
    </div>
  )
}
