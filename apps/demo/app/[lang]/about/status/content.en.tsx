import Link from 'next/link'

export default function StatusPage() {
  return (
    <div className="doc">
      <h1>How much can you rely on today?</h1>
      <p className="lede">
        Quality numbers change from release to release, so they live on
        exactly one page, with a date - if another page&apos;s number
        disagrees, this page is right. This page does not list only good
        results:{' '}
        <strong>automated checks, manual verification, and missing coverage
        are kept separate</strong> so you can judge the current trust level
        yourself.
      </p>
      <pre><code>{`As of                2026-09-06
@protean-ui/react    0.1.0-alpha.9 (published 2026-09-02)
Status               pre-alpha
React                >= 18
License              MIT`}</code></pre>
      <div className="callout">
        <strong>Usable today, but do not treat it as a stable release.</strong>{' '}
        Before a stable 0.1.0, APIs can move without notice. Experiments and
        internal tools are fine places to try it; in a real application, pin
        the version, commit the lockfile, and protect important adaptive
        flows with application-level regression tests.
      </div>

      <h2>The verification map first</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Area</th><th>Current evidence</th></tr></thead>
          <tbody>
            <tr><td>Default adaptive decisions</td><td>All 72 combinations asserted automatically</td></tr>
            <tr><td>Library behavior</td><td>245 automated tests (decision engine 123 + React 122)</td></tr>
            <tr><td>Boundary values · state transitions · exceptions</td><td>Automated tests</td></tr>
            <tr><td>Real-app migration</td><td>24 screens, 699 existing scenarios retained (external repository)</td></tr>
            <tr><td>Bundle budgets · server-HTML invariant</td><td>Automated release gate</td></tr>
            <tr><td>Browser compatibility</td><td>Primarily manual - Chrome + Apple Simulator</td></tr>
            <tr><td>Accessibility</td><td>Automated component-contract tests + manual axe checks</td></tr>
            <tr><td>Screen reader matrix</td><td>Not yet</td></tr>
            <tr><td>Full physical-device verification</td><td>Not yet</td></tr>
            <tr><td>Automated browser E2E · dedicated hydration tests</td><td>Not yet</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        In short:{' '}
        <strong>automated coverage of decisions and React behavior is strong;
        verification across real browsers, devices, and assistive technology
        is still expanding.</strong>
      </p>

      <h2>The default decisions assert all 72 combinations</h2>
      <p>
        The default rules are not sampled - the test suite{' '}
        <strong>asserts every cell of the defined 72-combination default
        decision table</strong>: three overlay roles &times; three sizes
        &times; three inputs, plus the default results for navigation,
        primary action, hint, list-detail, and density. Individual results
        like <code>compact + touch + form → fullscreen</code> are written as
        expected values in test code, so changing default policy behavior
        requires consciously changing the table too. This is a narrower claim
        than &quot;every possible environment is tested&quot; - it means
        every cell of the <em>defined default matrix</em> is asserted, and in
        adaptive UI a single missed combination can produce an unexpected
        pattern, so possible combinations are treated as test data.
      </p>
      <p>
        Boundary values get their own tests - just before and after size
        thresholds (599/600, 839/840), both directions of the anti-shiver
        transition, virtual-keyboard thresholds. So do state transitions
        (decision pinned while open, re-decided on reopen, DOM and focus
        preserved through live changes, drawer/overflow reset, stack focus
        movement) and exceptional inputs (fast repeated clicks, Select values
        outside the item data, an unmeasurable Boundary, environments without{' '}
        <code>visualViewport</code>).{' '}
        <strong>The number of tests is less important than which risks those
        tests own.</strong>
      </p>

      <h2>Migrated into a real application</h2>
      <p>
        One real application was migrated to Protean structure across{' '}
        <strong>24 screens</strong>, with the bar set by its{' '}
        <strong>699 pre-existing scenario tests all passing after
        migration</strong> (re-run on the snapshot date: 699 / 699). That
        migration removed a net 152 lines of application code - evidence from
        one migration that removing the branches did not make the app more
        complex, not a universal benchmark for every project.
      </p>
      <div className="callout">
        <strong>The real-app suite has an important limit.</strong> The 699
        scenarios live in a separate application repository outside the
        public one, and public CI (push / pull request) skips that item. The
        245 library tests are reproducible from the public repository; the
        699 scenarios are real migration evidence, but an external suite.
      </div>

      <h2>One release gate</h2>
      <p>
        A single <code>pnpm gate</code> command automatically checks the
        library test suites, the workspace typecheck, the package builds, the
        bundle budgets, and the deployed server HTML&apos;s overlay
        invariant - a failure blocks publishing. The same gate runs on GitHub
        push and pull request (with the external real-app suite skipped).
        Publishing itself runs from CI on a version-tag push using npm
        trusted publishing, with provenance attached.
      </p>
      <p>
        Not everything inside the gate is automated, though. The following
        remain a <strong>manual verification checklist</strong> the gate
        prints rather than enforces: axe checks on demo states, the
        Navigation CLS check, browser/simulator compatibility, and
        documentation-to-API parity. Manual results are never presented as
        automated results.
      </p>

      <h2>Testing has a stated methodology</h2>
      <p>
        What counts as quality follows the quality-characteristic framing of
        ISO/IEC 25010; test-case design uses techniques from ISO/IEC/IEEE
        29119-4 (decision tables, boundary-value analysis, equivalence
        partitioning, state transitions, negative cases, scenarios).
      </p>
      <div className="callout">
        <strong>This is not an ISO certification claim.</strong> The project
        applies the standards&apos; quality models and test-design techniques
        to its QA structure; it has not passed an external conformity
        assessment and does not claim to.
      </div>

      <h2>Bundle size</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Target</th><th>gzip (re-measured on snapshot date)</th><th>Gate budget</th></tr></thead>
          <tbody>
            <tr><td>React, all roles</td><td>~7.1 KB</td><td>≤ 8 KB</td></tr>
            <tr><td>One role via subpath (dialog + provider, tree-shaken)</td><td>~3.1 KB</td><td>≤ 3.5 KB</td></tr>
            <tr><td>Decision engine (core)</td><td>~1.3 KB</td><td>≤ 2 KB</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The measurement externalizes React, React DOM, the JSX runtime, Base
        UI, and (for the React measurements) Protean core, and does not
        include CSS. So this does not mean &quot;installing Protean adds
        exactly 7.1 KB to the network&quot; - real application output depends
        on tree shaking, dependencies, bundler configuration, CSS, and which
        subpaths you consume.{' '}
        <strong>These are release budgets intended to catch growth in the
        Protean adaptive layer</strong>, not marketing numbers.
      </p>

      <h2>React and Base UI</h2>
      <p>
        The public install contract is <code>react / react-dom &gt;= 18</code>;
        the current default development and CI environment is React 19. There
        is not yet an automated per-release version matrix that fully
        exercises React 18 and 19 separately.
      </p>
      <p>
        <code>@base-ui/react ^1.7.0</code> is installed alongside as a{' '}
        <strong>dependency</strong> (not a peer). Protean does not
        re-implement the underlying behavior of Dialog, Select, and Menu -
        but the decisions, presentation wiring, continuity, and DOM contracts
        Protean adds have their own tests. Using Base UI does not mean
        Protean&apos;s behavior is automatically verified.
      </p>

      <h2>Browsers and devices</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Current level</th></tr></thead>
          <tbody>
            <tr><td>Chrome (desktop)</td><td>Main states checked per release</td></tr>
            <tr><td>iPhone Safari</td><td>Checked in the iPhone 16 Pro Simulator</td></tr>
            <tr><td>iPadOS Safari</td><td>Checked in the iPad Pro 11 Simulator</td></tr>
            <tr><td>macOS Safari · Firefox</td><td>Spot checks</td></tr>
            <tr><td>Android Chrome</td><td>Full verification pending</td></tr>
            <tr><td>Physical iPhone / iPad / Android devices</td><td>Full verification pending</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The Apple Simulator runs real WebKit, but simulator verification is
        not equivalent to physical-device testing. And the current testing
        center is Vitest + Testing Library + jsdom plus manual browser
        checks -{' '}
        <strong>there is no browser-based automated E2E suite (Playwright or
        similar) yet.</strong> Confidence in per-browser rendering and real
        pointer behavior is lower than in the pure decision tests.
      </p>

      <h2>How far is SSR verified?</h2>
      <p>
        The release gate automatically checks the deployed page&apos;s server
        HTML for &quot;the trigger exists, and closed overlay popup markup is
        zero&quot;. You can inspect the same structure yourself on{' '}
        <a href="/ssr-proof">/ssr-proof</a>. But there is no dedicated
        automated hydration test that watches{' '}
        <code>renderToString → hydrateRoot</code> at the browser level yet.
        Current verification rests on the server-markup invariant, the
        stable-DOM strategy, and manual confirmation - and the Navigation CLS
        check is also a manual checklist item.
      </p>

      <h2>How far is accessibility verified?</h2>
      <p>
        Automated tests cover contracts such as Dialog focus and live
        continuity, ListDetail stack focus movement, ARIA state wiring,
        native semantics, and Tooltip&apos;s role and no-focus-steal
        behavior. Demo states use axe checks with the release target of
        &quot;0 critical/serious issues introduced by Protean&quot; - a{' '}
        <strong>manual</strong> release-verification item.
      </p>
      <p>
        There is <strong>no per-release screen-reader matrix</strong> yet
        that walks real user flows through VoiceOver, NVDA, JAWS, and
        TalkBack, and the project claims no WCAG conformance certification.
        Using Base UI does not confer one either. The responsibility
        boundaries are on{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>

      <h2>Known limitations</h2>
      <ul>
        <li>
          <strong>Tablet-touch differentiation is deliberately limited.</strong>{' '}
          The default medium/expanded rules for overlay, navigation, and
          primaryAction treat touch and pointer mostly the same, and
          listDetail does not read input at all (hint keeps reading hover,
          density keeps reading input). Speculative default branches are not
          added until more real device evidence exists - this does not mean
          tablets are unsupported.
        </li>
        <li>
          <strong>Boundary does not re-decide page chrome.</strong> The
          container-width consumers are Dialog, Select, and Menu; container
          adaptation for Navigation and PrimaryAction belongs to CSS
          container queries.
        </li>
        <li>
          <strong>Boundary width is not continuously observed.</strong> There
          is no ResizeObserver, so even with{' '}
          <code>continuity=&quot;live&quot;</code>, a Boundary-width-only
          change does not guarantee automatic re-resolution.
        </li>
        <li>
          <strong>Sheet positioning carries an upstream constraint.</strong>{' '}
          The current reference implementation pins the underlying floating
          positioner with CSS for unanchored sheet placement - tested
          behavior, but a known pre-alpha technical limitation.
        </li>
        <li>
          <strong>Physical devices, automated browser E2E, hydration E2E,
          and the screen-reader matrix are still missing</strong> - exactly
          the &quot;not yet&quot; rows in the tables above.
        </li>
        <li>
          <strong>The shipped adapter is React only.</strong> The core
          decision engine is DOM-independent, but no finished Vue or Svelte
          adapter is published.
        </li>
      </ul>
      <p>
        What matters in pre-alpha is not pretending there are no limits - it
        is distinguishing what is automatically tested, what is manual, and
        what is not yet covered. As verification is added or limits are
        resolved, this page is updated with the release.
      </p>

      <h2>Versioning and compatibility</h2>
      <p>
        The four packages (<code>protean-ui</code> ·{' '}
        <code>@protean-ui/react</code> · <code>@protean-ui/core</code> ·{' '}
        <code>@protean-ui/css</code>) version together. If you use them in a
        real service during pre-alpha: commit the lockfile, review the{' '}
        <a href="https://github.com/tjk1150/protean-ui/blob/main/CHANGELOG.md">
          CHANGELOG
        </a>{' '}
        before updates, and protect critical adaptive flows with your own
        regression tests.
      </p>

      <h2>Bugs and feature requests</h2>
      <p>
        Report bugs, feature requests, and documentation problems via{' '}
        <a href="https://github.com/tjk1150/protean-ui/issues">GitHub Issues</a>.
        Reproductions are especially helpful with the React version, browser,
        viewport, input mode, the presentation observed, and reproduction
        code. There is no response-time guarantee for ordinary Issues.
      </p>
      <div className="callout">
        <strong>Do not report security problems in a public Issue.</strong>{' '}
        Report vulnerabilities privately through GitHub Security Advisories;
        the target for an initial response is within one week.
      </div>

      <h2>Deciding whether to adopt now</h2>
      <p>
        If adaptive branching is a real recurring problem, pre-alpha API
        movement is acceptable, and critical flows can be protected with your
        own tests, evaluating or partially adopting Protean now is
        reasonable. If adoption requires stable API guarantees, a
        physical-device matrix, automated browser E2E evidence, per-screen-
        reader verification, or an official non-React adapter, decide from
        the current status above - that level is not claimed in advance.
      </p>

      <h2>In short</h2>
      <pre><code>{`strongest evidence   → decisions · boundaries · lifecycle · React DOM/focus contracts
real-app evidence    → 24 screens · 699 existing tests retained
still expanding      → physical devices · browser E2E · hydration E2E · screen readers`}</code></pre>
      <p>
        <strong>The important question is not how many tests exist. It is
        which risks are tested and which are still open.</strong> The goal of
        this page is not &quot;this many, therefore safe&quot; - it is
        letting you judge the adoption level yourself. Next:{' '}
        <Link href="/en/about/why">why Protean exists</Link>.
      </p>
    </div>
  )
}
