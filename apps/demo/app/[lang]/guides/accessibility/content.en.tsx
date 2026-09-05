import Link from 'next/link'

export default function AccessibilityPage() {
  return (
    <div className="doc">
      <h1>Presentation can change without changing meaning</h1>
      <p className="lede">
        Protean can present the same interaction as a modal, a sheet, a
        fullscreen surface, or a popover.{' '}
        <strong>Protean may change presentation, but it should not arbitrarily
        change meaning.</strong> A Menu remains a Menu, a Tooltip remains short
        supplemental help, and a supporting pane remains a supporting region
        even when it visually looks like a sheet. That distinction is part of
        the component contract.
      </p>

      <h2>Accessibility is shared</h2>
      <p>
        Protean handles parts of the interaction contract through its
        primitives and adaptive components. The application still owns:
      </p>
      <ul>
        <li>useful accessible names</li>
        <li>meaningful labels and instructions</li>
        <li>correct heading structure</li>
        <li>choosing the right component for the interaction</li>
        <li>current-route state</li>
        <li>destructive-action confirmation when the product requires it</li>
        <li>accessible custom CSS and custom presentation implementations</li>
      </ul>
      <p>
        Protean cannot infer application meaning, so it cannot make any
        composition accessible automatically. What it can do is remove the
        burden of maintaining accessibility behavior twice across duplicate
        environment-specific implementations.
      </p>
      <pre><code>{`Protean
→ preserves component semantics and adaptive behavior contracts

application
→ supplies correct labels, content, structure, and product behavior`}</code></pre>

      <h2>Dialog: the adaptive role is not an ARIA role</h2>
      <p>
        Dialog accepts an adaptive <code>role</code> input -{' '}
        <code>confirmation</code>, <code>form</code>, <code>contextual</code> -
        that helps choose an appropriate presentation. These values are{' '}
        <strong>not</strong> DOM ARIA roles:
      </p>
      <pre><code>{`<Dialog.Root role="confirmation">   // adaptive input
// does NOT mean role="alertdialog" in the DOM`}</code></pre>
      <p>
        Alert-dialog semantics are a separate, explicit contract on the
        content:
      </p>
      <pre><code>{`<Dialog.Content alert title="Delete project?">
  ...
</Dialog.Content>
// → the popup renders role="alertdialog"`}</code></pre>
      <p>
        Do not assume every confirmation Dialog is automatically an alert
        dialog - the adaptive <code>role</code> and the popup&apos;s DOM
        semantics stay separate.
      </p>

      <h2>Dialog continuity preserves the interaction</h2>
      <p>
        The default <code>pinned</code> continuity keeps the chosen
        presentation stable while the Dialog is open. When an application
        deliberately uses <code>continuity=&quot;live&quot;</code>, the
        presentation may change mid-session - and the contract, fixed by
        tests, preserves the content DOM, React state, form input, and focus
        within the overlay across that change. <code>live</code> does not
        close one Dialog and open a new one; the user&apos;s in-progress form
        is not swapped for a fresh tree.
      </p>
      <p>
        For deliberate focus targets, Dialog Content exposes{' '}
        <code>initialFocus</code> and <code>finalFocus</code>. Custom
        presentation implementations supplied through Provider{' '}
        <code>components</code> must preserve the Dialog behavior the
        application expects (see below).
      </p>

      <h2>ListDetail moves focus only when the visible context changes</h2>
      <p>
        In <code>stack</code> presentation, activating the detail changes
        which region is visible - so ListDetail moves focus to the Detail
        region, which is programmatically focusable via{' '}
        <code>tabIndex={'{-1}'}</code>. In <code>panes</code> presentation both
        regions remain visible, so ListDetail does <strong>not</strong>{' '}
        automatically steal focus. This is a test-fixed contract:
      </p>
      <pre><code>{`stack activation → move focus to Detail
panes activation → keep current focus`}</code></pre>

      <h2>Tooltip remains a Tooltip</h2>
      <p>
        When hover is unavailable, Tooltip can use a tap-opened popover
        presentation - but its meaning does not become Dialog-like. Both paths
        retain <code>role=&quot;tooltip&quot;</code>, and the popover path
        does not move focus into the hint (the equivalent of{' '}
        <code>initialFocus = false</code> and <code>finalFocus = false</code>).
        Do not call it a modal or a small Dialog.
      </p>
      <div className="callout">
        <strong>Critical information must not exist only inside Tooltip
        content.</strong> Tooltip is progressive enhancement - its content is
        connected after mount. For an icon-only control, the accessible name
        belongs to the button itself:
      </div>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="Settings">
    <SettingsIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>Settings</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <p>The Tooltip does not supply that name automatically.</p>

      <h2>Navigation is a navigation landmark</h2>
      <p>
        <code>Navigation.Root</code> renders real <code>&lt;nav&gt;</code>{' '}
        semantics, and the current linked item exposes{' '}
        <code>aria-current=&quot;page&quot;</code>. Protean does not inspect
        the router - the application owns current-route state:
      </p>
      <pre><code>{`<Navigation.Item
  href="/settings"
  current={pathname === "/settings"}
>
  Settings
</Navigation.Item>`}</code></pre>
      <p>
        Icons can help compact presentations, but they do not replace the text
        meaning of a destination. Use labels that still make sense across bar,
        drawer, rail, and sidebar - one presentation is not permission to
        remove the accessible meaning of an item.
      </p>

      <h2>Screen.Content is a landmark by default</h2>
      <p>
        <code>Screen.Content</code> renders <code>&lt;main&gt;</code> by
        default - useful when Screen owns the page&apos;s primary-content
        landmark. A page should not accumulate duplicate <code>main</code>{' '}
        landmarks: if a parent already supplies the page&apos;s{' '}
        <code>&lt;main&gt;</code>, use{' '}
        <code>&lt;Screen.Content as=&quot;div&quot;&gt;</code>. Protean does
        not automatically complete the page&apos;s landmark structure.
      </p>

      <h2>Actions has toolbar semantics, not a full toolbar keyboard model</h2>
      <p>
        <code>Actions.Root</code> renders{' '}
        <code>role=&quot;toolbar&quot;</code>, identifying a related group of
        actions - but Protean does not currently implement a complete
        roving-focus toolbar model. Do not assume built-in ArrowLeft /
        ArrowRight navigation, roving <code>tabIndex</code>, or the full APG
        Toolbar keyboard behavior. The native buttons keep their normal
        keyboard behavior; if the product requires a specialized toolbar
        navigation model, the application must provide it.
      </p>

      <h2>SupportingPane remains a supporting region</h2>
      <p>
        <code>SupportingPane.Pane</code> renders an{' '}
        <code>&lt;aside&gt;</code> named by the required{' '}
        <code>paneLabel</code>. The compact <code>sheet</code> treatment does
        not turn that <code>&lt;aside&gt;</code> into{' '}
        <code>role=&quot;dialog&quot;</code>, and it does not add a focus
        trap, autofocus, or automatic focus restoration - it is a non-modal
        supporting region. A Dialog sheet pauses the current task for a
        separate interaction; a SupportingPane sheet re-arranges a supporting
        region of the same page in a narrow space. Same visual placement,
        different meaning.
      </p>
      <p>
        <code>paneLabel</code> should name the pane -{' '}
        <code>paneLabel=&quot;Filters&quot;</code>, not a control instruction
        like <code>paneLabel=&quot;Open&quot;</code>. The same label
        participates in identifying the pane and its toggle interaction.
      </p>

      <h2>Native controls keep native behavior</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Component</th><th>Default semantics</th></tr></thead>
          <tbody>
            <tr><td><code>Navigation.Root</code></td><td><code>&lt;nav&gt;</code></td></tr>
            <tr><td><code>Navigation.Item</code></td><td><code>&lt;a&gt;</code> with <code>href</code>, otherwise <code>&lt;button&gt;</code></td></tr>
            <tr><td><code>Screen.Content</code></td><td><code>&lt;main&gt;</code> (default; <code>as=&quot;div&quot;</code> allowed)</td></tr>
            <tr><td><code>PrimaryAction.Root</code> action element</td><td><code>&lt;button&gt;</code> (the wrapper is a div)</td></tr>
            <tr><td><code>Actions.Item</code></td><td><code>&lt;button&gt;</code></td></tr>
            <tr><td><code>Tooltip.Trigger</code></td><td><code>&lt;button&gt;</code></td></tr>
            <tr><td><code>SupportingPane.Pane</code></td><td><code>&lt;aside&gt;</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Keep links for navigation destinations, buttons for actions, and
        meaningful accessible names for icon buttons. Adaptive presentation
        sits on top of those semantics rather than erasing them - and prefer
        native <code>disabled</code> over CSS-only imitations like{' '}
        <code>pointer-events: none</code>, which hide the real state from
        assistive technology.
      </p>

      <h2>Reduced motion</h2>
      <p>
        Protean collects the user&apos;s reduced-motion preference as part of
        the environment, and the reference animations run only under{' '}
        <code>@media (prefers-reduced-motion: no-preference)</code>. If the
        user prefers reduced motion, those reference animations are not
        applied. If the application replaces Protean&apos;s animation CSS, the
        application owns preserving that preference too - Protean cannot
        enforce reduced-motion behavior inside arbitrary custom CSS.
      </p>

      <h2>Custom CSS can break accessibility</h2>
      <p>
        Protean can preserve a stable DOM contract, but application CSS can
        still make the result unusable. Be careful when overriding structural
        styles for Navigation, ListDetail, Screen, Actions, or SupportingPane:
      </p>
      <ul>
        <li>
          <strong>Focus indicators</strong> - do not apply{' '}
          <code>outline: none</code> without providing a replacement focus
          style.
        </li>
        <li>
          <strong>Hidden states</strong> - unconditionally overriding{' '}
          <code>display</code> can force regions that should be hidden in one
          interaction state to remain visible, breaking the intended focus or
          reading flow.
        </li>
        <li>
          <strong>Color contrast</strong> - changing tokens means the project
          re-checks text, background, and border contrast.
        </li>
      </ul>
      <p>CSS is not accessibility-neutral. Customize structural rules intentionally.</p>

      <h2>Custom Dialog implementations share the responsibility</h2>
      <p>
        Replacing a Dialog presentation through{' '}
        <code>ProteanProvider components</code> replaces behavior and
        structure, not merely visual styling. The custom implementation must
        continue to provide the semantics and focus behavior expected of the
        Dialog interaction - swapping in a bare{' '}
        <code>&lt;div&gt;&#123;children&#125;&lt;/div&gt;</code> discards the
        existing accessibility behavior, and Protean cannot automatically make
        an arbitrary replacement accessible. Implementation details live on{' '}
        <Link href="/en/guides/composition">Composition</Link>.
      </p>
      <p>
        The same judgment applies to <code>presentation</code> overrides: the
        API allowing a combination does not make it appropriate for the
        content. Forcing a long form or a long warning into a small popover
        renders, but the flow suffers. <code>presentation</code> is not an
        escape hatch from accessibility judgment.
      </p>

      <h2>Do not infer semantics from visual shape</h2>
      <pre><code>{`looks like a sheet    ≠ Dialog
looks like a popover  ≠ generic Popover semantics
looks like a toolbar  ≠ full roving-focus implementation`}</code></pre>
      <p>
        Choose semantics from the interaction&apos;s meaning, not from its
        visual geometry. This is one of the reasons Protean keeps semantic
        decisions and CSS expression separate. And density is expression, not
        certification: touch-profile target sizes help, but they do not by
        themselves satisfy accessibility criteria - text size, contrast, focus
        indicators, error messages, and content order remain the
        product&apos;s job.
      </p>

      <h2>Accessibility checklist</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Check</th><th>Responsibility</th></tr></thead>
          <tbody>
            <tr><td>Control has an accessible name</td><td>Application</td></tr>
            <tr><td>Current navigation item is marked</td><td>Application + Navigation contract</td></tr>
            <tr><td>Dialog semantics and focus behavior are preserved</td><td>Protean + application/custom backend</td></tr>
            <tr><td>Tooltip information is supplemental</td><td>Application</td></tr>
            <tr><td>ListDetail stack transition has a focus destination</td><td>Protean</td></tr>
            <tr><td>Duplicate <code>&lt;main&gt;</code> landmarks are avoided</td><td>Application</td></tr>
            <tr><td>SupportingPane remains non-modal</td><td>Protean contract</td></tr>
            <tr><td>Reduced-motion preference is respected by reference CSS</td><td>Protean</td></tr>
            <tr><td>Custom animation and CSS respect reduced motion</td><td>Application</td></tr>
            <tr><td>Custom Dialog backend remains accessible</td><td>Application</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Beyond the checklist, verify the flows directly: complete the main
        tasks with the keyboard alone; watch where focus lands when Dialogs
        open and close, when ListDetail activates the detail, and when Menu or
        Select opens; listen for icon buttons that read as their purpose
        rather than just &quot;button&quot;; and test the presentations your
        product can actually produce - modal, sheet, fullscreen, popover -
        since changing shape is the point of Protean.
      </p>

      <h2>What Protean does not claim</h2>
      <p>
        Protean does not claim WCAG certification, complete screen-reader
        certification, full keyboard coverage for every composition, that
        arbitrary custom CSS remains accessible, or that arbitrary Provider{' '}
        <code>components</code> replacements inherit accessibility
        automatically. The package ships accessibility-oriented semantics and
        tests; the current support status and remaining verification gaps live
        on <Link href="/en/about/status">Quality and support</Link>.
      </p>

      <h2>In short</h2>
      <pre><code>{`presentation           → may change with the environment
the interaction's meaning → the application keeps it
focus / keyboard / semantics → wired to the selected pattern's contract`}</code></pre>
      <p>
        Next: <Link href="/en/about/scope">what Protean does and does not
        do</Link>.
      </p>
    </div>
  )
}
