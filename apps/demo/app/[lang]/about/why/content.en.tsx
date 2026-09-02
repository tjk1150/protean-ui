import Link from 'next/link'

export default function WhyPage() {
  return (
    <div className="doc">
      <h1>Why this exists</h1>
      <p className="lede">
        Why does every Android app come out looking acceptable - even from average
        developers? Decompose that, and you can see exactly where web developers are
        suffering, and exactly which piece of the answer Protean is.
      </p>

      <h2>The difference is structure, not taste</h2>
      <p>
        Android versus the web is not a difference in designers&apos; eyes. It is a
        difference in <strong>who owns the choices</strong>. Android&apos;s platform owns
        the decisions and lets developers pick meanings; the web throws every decision at
        the developer - and every decision point is a place where an average developer
        drifts out of coherence. Five mechanisms do the work.
      </p>

      <h3>1. The default path is the correct path</h3>
      <p>
        In Compose, <code>Button(onClick) &#123; Text(&quot;OK&quot;) &#125;</code> -
        with zero styling decisions - already carries a 48dp touch target, correct
        padding, the theme&apos;s shape, the right type role, contrast-guaranteed colors,
        press feedback, and disabled states. On the web,{' '}
        <code>&lt;button&gt;OK&lt;/button&gt;</code> is a gray bevel from 1995. Android
        has zero distance between no-effort and acceptable; on the web that distance is
        hundreds of opt-in choices.
      </p>

      <h3>2. Developers pick roles, not values</h3>
      <p>
        A Material developer writes <code>colorScheme.primary</code>, never{' '}
        <code>#3F51B5</code>. Colors exist as role pairs - every <code>primary</code>{' '}
        ships an <code>onPrimary</code> - so text contrast is a structural guarantee, not
        a review item. Type has fifteen roles, shape has five steps: an app with 37 font
        sizes is structurally impossible. The real reason shadcn/ui exploded on the web
        was not its components but its de-facto standardization of role tokens
        (<code>--background</code>, <code>--primary</code>). Web developers are starving
        for this layer.
      </p>

      <h3>3. Patterns are components</h3>
      <p>
        <code>Scaffold</code>, <code>NavigationBar</code>,{' '}
        <code>ModalBottomSheet</code> - Android developers assemble UX patterns; they do
        not invent them from divs.
      </p>

      <h3>4. Environment adaptation belongs to the framework</h3>
      <p>
        <code>WindowSizeClass</code> buckets screens into compact, medium, and expanded
        (Protean&apos;s 600/840 thresholds come from there), and{' '}
        <code>NavigationSuiteScaffold</code> switches between bar, rail, and drawer on
        its own. Nobody writes &quot;if tablet, rail&quot; in app code.
      </p>

      <h3>5. Deviating is harder than complying</h3>
      <p>
        Minimum touch targets are enforced by the components; the spacing grid is baked
        into their padding. The discipline is code, not a guidelines document - breaking
        it takes effort. The web is the inverse: keeping it takes effort.
      </p>

      <h2>But on the web, bundling fails</h2>
      <p>
        So far this sounds like &quot;build Material for the web&quot; - which has been
        tried, repeatedly, into the same wall. Material&apos;s everyone-looks-good is the
        result of a <strong>bundle</strong> that imposes the entire visual language, and
        web teams with a brand will not adopt someone else&apos;s visual language. Use
        MUI and you pay the looks-like-Material tax; a company design system&apos;s
        adaptive components are unusable outside that company.
      </p>
      <p>
        Getting the Android outcome on the web therefore requires{' '}
        <strong>unbundling</strong>: separating the universal mechanisms from the
        per-team ones.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Layer</th><th>Android</th><th>Web today</th></tr></thead>
          <tbody>
            <tr><td>Behavior and accessibility (focus, gestures, ARIA)</td><td>built into components</td><td>solved - Base UI, Radix, React Aria</td></tr>
            <tr><td>Pattern decisions (environment to UX pattern)</td><td>WindowSizeClass, NavigationSuite</td><td><strong>empty - what Protean builds</strong></td></tr>
            <tr><td>Role tokens (meaning, not values)</td><td>Material tokens</td><td>no standard - shadcn convention comes closest</td></tr>
            <tr><td>Parametric discipline (targets, spacing, safe areas)</td><td>built into components</td><td>empty - the reference stylesheet demonstrates it</td></tr>
            <tr><td>Visual language (color, shape, brand)</td><td>imposed by Material</td><td><strong>each team&apos;s own - correctly left empty</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Protean fills the one row that is both empty and universalizable -{' '}
        <strong>pattern decisions</strong> - delegates behavior to Base UI, and leaves
        the visual language to you. The reference stylesheet gives a
        do-nothing-and-it-looks-fine default without ever invading that last row.
      </p>

      <h2>In one sentence</h2>
      <div className="callout">
        What Material achieved by bundling, the web must achieve by unbundling. Web
        developers do not suffer from a lack of taste - they suffer because decisions a
        platform should own are dumped into application code. Protean reclaims the
        pattern decisions.
      </div>
      <p>
        How this becomes code: <Link href="/en/concepts/pattern-adaptation">design
        principles</Link>. Try it in ten minutes:{' '}
        <Link href="/en/getting-started">getting started</Link>.
      </p>
    </div>
  )
}
