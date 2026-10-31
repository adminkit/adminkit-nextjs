# Contributing to AdminKit for Next.js

Thank you for helping make AdminKit better. These guidelines keep changes easy to review.

## Setup

Node 24 is required. The version is pinned in `.nvmrc`.

```sh
nvm use
npm ci
npm run dev
```

`npm run dev` serves the app on http://localhost:3000 and reloads on changes. `npm run build` exports the static site to `out/` (gitignored); `npm start` serves it. `npm ci` also installs the git hooks described below.

## Branches and PRs

- Branch from `main` using a short prefixed name: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`
- Open the pull request against `main`
- CI must be green before a PR is merged: lint, build, test and commitlint run on every PR
- Include screenshots for visual changes, in light and dark mode
- Reference issues and pull requests liberally

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`.

- Allowed types come from [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional): `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- Allowed scopes: `free`, `pro`, `docs`, `web`, `build`, `deps`
- Use the imperative mood in the subject ("Add feature" not "Added feature") and keep it under 100 characters

Examples:

```
feat(free): add the forms page
fix(free): keep the dropdown inside the viewport on mobile
chore(deps): upgrade next to 16.4.3
```

[lefthook](https://github.com/evilmartians/lefthook) enforces this locally. The `commit-msg` hook runs commitlint on your message and the `pre-commit` hook runs ESLint and Prettier on staged files. Run `npm run lint` to check the whole repo and `npm run format` to fix formatting.

## Counts

Page, plugin and icon counts are generated, never typed: `npm run stats` updates `src/data/stats.json` and the README table, and `npm run lint` fails while either is stale. When AdminKit PRO's pages, plugins or icons change, and before every release, refresh its snapshot with `npm run stats:sync -- --pro <path to AdminKit PRO for Next.js>` and commit `src/data/editions/pro.json`.

## Changelog

A PR that changes behaviour adds a line under `Unreleased` in `CHANGELOG.md`. The file follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Pure refactors, formatting and tooling changes that users never notice don't need an entry. Keep each line short, imperative and user-facing ("Add pricing page (/pages-pricing)", "Upgrade to Next.js 16"); no explanations.
