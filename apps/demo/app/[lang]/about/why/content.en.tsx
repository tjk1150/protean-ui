import Link from 'next/link'

export default function WhyPage() {
  return (
    <div className="doc">
      <h1>Why Protean?</h1>
      <p className="lede">
        Responsive UI is usually described as a layout problem - and often it
        is. Turning one column into two, tightening a gap, reflowing a grid:
        CSS is excellent at all of that.{' '}
        <strong>Protean was not created because CSS is insufficient at those
        jobs. It was created because some responsive changes are a different
        kind of decision.</strong>
      </p>

      <h2>Some responsive changes are semantic choices</h2>
      <p>Consider the same interaction in different environments:</p>
      <pre><code>{`contextual action    → popover or sheet
form Dialog          → modal or fullscreen
primary navigation   → bar, drawer, rail, or sidebar
list + detail        → stack or panes
short help           → hover Tooltip or tap-opened popover`}</code></pre>
      <p>
        These are not changes in width, padding, or radius. They change{' '}
        <strong>which interaction pattern is being used</strong> - and that is
        the part Protean tries to centralize.
      </p>

      <h2>CSS is still the right tool for the journey</h2>
      <p>
        Once a semantic endpoint has been selected, CSS should usually own how
        it is expressed:
      </p>
      <pre><code>{`Protean → sheet

CSS     → height · radius · padding · animation
        → safe-area treatment · exact geometry`}</code></pre>
      <p>
        One of the most useful rules during development was:{' '}
        <strong>Protean chooses the endpoint; CSS owns the journey and
        expression around it.</strong> Whether something is a popover or a
        sheet is a discrete decision - but there is no reason for a policy to
        own how width, spacing, corners, and animation move inside the chosen
        pattern. CSS does that better.
      </p>

      <h2>Why not just use width?</h2>
      <p>
        Width is useful, but it does not describe the whole interaction
        environment. A narrow desktop browser window can still have pointer
        input, hover, and a keyboard; a larger tablet can have touch and no
        hover. The same 500px is not the same environment:
      </p>
      <pre><code>{`narrow  ≠ automatically mobile
wide    ≠ automatically desktop interaction`}</code></pre>
      <p>
        So Protean collects only environment signals that carry direct meaning
        for UI decisions - size, input, hover, reduced motion, virtual
        keyboard - and combines them per decision. Not every component reads
        everything: Tooltip cares about hover more than width, and
        ListDetail&apos;s default decision needs no input at all. And the
        role matters as much as the environment - the same compact + touch
        has no reason to produce the same result for a short confirmation and
        a long form. Conceptually the decision is{' '}
        <strong>environment + the feature&apos;s role → presentation</strong>,
        never a device label.
      </p>

      <h2>Why centralize the decision?</h2>
      <p>Without a shared decision layer, applications accumulate local branches:</p>
      <pre><code>{`if (isSmallScreen && isTouchDevice) {
  return <BottomSheet />;
}
return <Popover />;`}</code></pre>
      <p>
        On one screen this looks harmless. But the same judgment reappears in
        Dialog, Menu, Navigation, primary actions, list/detail, and tooltips -
        and building the UI twice means keeping state, focus, keyboard,
        dismissal, ARIA, and form values in sync between two implementations.
        Over time each component develops its own definition of
        &quot;mobile&quot;, &quot;tablet&quot;, &quot;touch&quot;, and
        &quot;small&quot;. The problem is not that conditional rendering is
        always wrong - it is that{' '}
        <strong>the same product decision is being redefined repeatedly.</strong>{' '}
        Protean gives those decisions one vocabulary and one place to
        customize them: the app says{' '}
        <code>&lt;Dialog.Root role=&quot;form&quot;&gt;</code>, and the
        runtime picks the result from the current environment and policy.
      </p>
      <p>
        The goal is <em>not</em> &quot;zero-JavaScript responsiveness&quot;.
        Protean itself uses JavaScript where semantic decisions need runtime
        information - that is fine. The goal is a cleaner responsibility
        boundary: JavaScript for discrete semantic decisions that need
        combined traits, CSS for layout, rendering, and continuous
        adaptation. Purity is not the point.
      </p>

      <h2>Android was an inspiration, not a source port</h2>
      <p>
        Part of the idea came from how mature UI platforms think about
        adaptive structure. Android, Material guidance, and declarative
        systems like Jetpack Compose make it natural to think in window
        classes, navigation patterns, canonical layouts, and interaction
        modes rather than in scattered pixel conditions - Protean&apos;s
        compact / medium / expanded and the 600 / 840 thresholds come from
        the window size class convention. What was worth borrowing was the
        question, not the visuals: what is this UI&apos;s role, what space
        and input are available, and which pattern should express that role
        here? Protean is not Android APIs ported to React, not Material
        rewritten for the web, not a Compose compatibility layer, and not an
        attempt to make websites behave like Android apps.
      </p>
      <div className="callout">
        What Material achieved as a <strong>bundle</strong> (patterns plus a
        whole visual language), web teams with their own brands need{' '}
        <strong>unbundled</strong>. Behavior and accessibility are solved by
        proven primitives; the visual language belongs to each team. The
        empty slot was <strong>pattern decisions</strong> - that is the slot
        Protean fills.
      </div>

      <h2>The web needs a different boundary</h2>
      <p>
        The web already has an extraordinarily capable layout system - media
        queries, container queries, Grid, Flexbox, custom properties. Seeing
        adaptive concepts in native UI is no reason to move all responsive
        work into a JavaScript runtime; that would be backwards. So Protean
        does not compete with CSS for geometry, continuous sizing, container
        layout, or visual styling. It sits above that layer, answers the
        smaller question - <em>which semantic pattern should this interaction
        use?</em> - and hands CSS a stable result to express. That is why the
        library is intentionally narrower than many adaptive UI frameworks.
      </p>

      <h2>Shape was a useful boundary experiment</h2>
      <p>
        Early on, shape was considered as a possible adaptive domain - sharper
        in compact, rounder for touch. Putting real components through it
        produced a different conclusion: once a Dialog resolves to modal,
        sheet, or fullscreen, the appropriate shape is already largely
        determined - card corners for a modal, top corners for a sheet, screen
        edges for fullscreen.
      </p>
      <pre><code>{`[data-presentation="sheet"] {
  --protean-shape: ...;
}`}</code></pre>
      <p>
        Expressing shape from the presentation result in CSS was simpler than
        adding another JavaScript decision, so shape did not become a
        first-class decision domain. That No-Go mattered: grow decision
        domains just because you can, and shape, spacing, elevation, and
        motion all end up judged at runtime - and Protean becomes another
        giant responsive framework. The shape experiment helped define{' '}
        <strong>what Protean should not own.</strong>
      </p>

      <h2>Density survived that test</h2>
      <p>
        Density can also look like a mere CSS size difference at first. But
        the same Select genuinely wants a tighter profile under a precise
        pointer and larger targets under a finger - a profile tied to how the
        UI is used, one that must stay consistent across components - and the
        user can also explicitly choose compact, comfortable, or touch. So
        density stayed a real decision domain, with CSS tokens still
        expressing the actual values. The final distinction:
      </p>
      <pre><code>{`density → shared decision
shape   → CSS expression`}</code></pre>
      <p>
        The criterion was never &quot;does it vary with the
        environment?&quot; It was{' '}
        <strong>&quot;is this change a separate, meaningful choice?&quot;</strong>{' '}
        The more a feature needs different patterns, multiple combined
        signals, repeated branches, and state/focus/semantics maintained
        across implementations, the more it belongs in Protean. Continuous
        values and pure layout belong in CSS.
      </p>

      <h2>SSR reinforced the same idea</h2>
      <p>
        Server rendering raised another version of the question: should the
        server try to know the client environment perfectly? Protean&apos;s
        answer is usually no. Always-visible UI keeps a stable DOM with CSS
        expressing the first layout; closed overlays decide when they open;
        Tooltip enhances after mount. The server does not need to predict
        everything when the architecture avoids requiring that prediction -
        the same principle again:{' '}
        <strong>put each problem in the layer that can solve it most
        naturally.</strong>
      </p>

      <h2>Containers reinforced it again</h2>
      <p>
        Resizable panels raised the temptation once more: should every
        component become JavaScript container-aware? Again, no. A Boundary
        actually knows only the container&apos;s width, so it changes only
        the size input, for the few overlay consumers that genuinely need
        that semantic information. Plain container layout stays with CSS
        container queries. The library gets more predictable by not trying to
        own every responsive problem.
      </p>

      <h2>Narrow scope is a feature</h2>
      <p>
        Protean deliberately does not try to become a complete design system,
        a geometry engine, a universal responsive solver, a device-detection
        API, or a replacement for CSS. That narrowness lets it make stronger
        promises about the smaller set of decisions it does own. The same
        gate applies to future ideas - &quot;it varies by environment&quot;
        is not enough. Is it really a different UI pattern? Does the same
        branch repeat across apps? Do multiple signals combine? Is
        state/focus/semantics wiring needed? Would CSS be simpler?{' '}
        <strong>Finding reasons not to add something matters as much as
        adding it.</strong> Staying small is a goal.
      </p>

      <h2>What good adoption should feel like</h2>
      <p>
        The useful outcome is not more adaptive code - it is less repeated
        adaptive branching. Instead of:
      </p>
      <pre><code>{`feature code → detect environment
             → choose component tree
             → duplicate behavior`}</code></pre>
      <p>the intended shape is closer to:</p>
      <pre><code>{`feature code → describe the interaction
Protean      → choose the semantic endpoint
CSS          → express it`}</code></pre>
      <p>
        The feature stays about the product rather than about reproducing the
        responsive policy. A good adaptive abstraction should not require
        every feature engineer to think about hover detection, pointer
        classes, viewport thresholds, bottom-sheet switching, and navigation
        variants on every screen. Policy, traits, presentation results, and
        CSS hooks exist to encode those concerns once, keep them inspectable,
        and keep them out of ordinary feature logic - infrastructure for
        reducing repeated decisions, not ends in themselves.
      </p>
      <pre><code>{`application            → the feature's meaning and state
Protean                → the pattern and density for the environment
underlying primitives  → interaction behavior
CSS / design system    → actual layout and visual expression`}</code></pre>

      <h2>The final test</h2>
      <p>
        A single{' '}
        <code>isMobile ? &lt;MobileSomething /&gt; : &lt;DesktopSomething /&gt;</code>{' '}
        is not evil. The problem appears when the same question repeats across
        the product and drags state, focus, semantics, density, and CSS into
        two diverging implementations. So the question Protean tries to
        answer is one:
      </p>
      <p>
        <strong>Can this feature feel natural in different environments
        without implementing the same interaction twice?</strong>
      </p>
      <p>
        If the answer today requires one desktop implementation, one mobile
        implementation, and environment branches scattered through feature
        code, Protean is trying to offer a better boundary - not by replacing
        CSS, not by predicting every device, but by deciding only the
        semantic endpoints that actually need a shared decision. What has
        been verified so far is on{' '}
        <Link href="/en/about/status">Quality and support</Link>; how the
        idea becomes code starts at{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link>{' '}
        and <Link href="/en/getting-started">Getting started</Link>.
      </p>
    </div>
  )
}
