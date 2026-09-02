# Contributing

Thanks for looking under the hood. This is a pre-alpha project moving quickly; issues and small PRs are the most useful contributions right now.

## Setup

```
pnpm install
pnpm gate
```

`pnpm gate` is the release gate and the fastest way to know the tree is healthy: both test suites, a workspace typecheck, package builds, bundle budgets (tree-shaking is a contract), and the SSR invariant against the deployed site. Every push runs it in CI.

## The two rules that shape every change

1. **A role earns a component only when its interaction contract changes per environment.** A popover becoming a bottom sheet changes DOM, focus, and ARIA - that is a role. Tabs scrolling on a narrow screen is CSS - that is not. Feature proposals are argued against this criterion.
2. **The SSR invariant**: a decision the server could get wrong must be expressible in CSS, or deferred to interaction time. If a change makes the server render something width-dependent, it is wrong by construction.

## Working style

- Tests first. New behavior lands as a failing test before the implementation (the suites in `packages/*/src` show the house patterns - decision tables, boundary values, environment mocks, outerHTML-equality for SSR safety).
- Behavior belongs to Base UI. Protean owns only the decision, the wiring, and continuity across presentation switches; do not reimplement focus traps or listbox semantics.
- Styling changes go through the token contract (`packages/css/tokens.css` sets, parts consume) and stay inside `@layer protean`.
- Docs are part of the change: every shipped prop is documented in Korean and English (`apps/demo/app/[lang]`), and the Korean pages follow the existing plain-spoken style.
- Conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).

## Releasing (maintainer)

Versions are bumped together across all four packages, `CHANGELOG.md` gets an entry, and publishing runs from CI via npm trusted publishing (`.github/workflows/release.yml`, triggered by a `v*` tag). There are no npm tokens.
