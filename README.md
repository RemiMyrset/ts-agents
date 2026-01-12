# Agents

Universal `AGENTS.md` for TypeScript projects.

## Contents

- `AGENTS.md` with repo-agnostic guidance for agents.
- `eslint.config.mjs` for local linting in this repo.
- This repository uses ESLint and @antfu/eslint-config only to lint and validate `AGENTS.md` itself; these tools are not required by `AGENTS.md`.

## Local tooling (this repository only)

Dev dependencies:
- @antfu/eslint-config
- eslint
- typescript

Add them explicitly (pnpm example):
```sh
pnpm add -D @antfu/eslint-config eslint typescript
```

## Scripts

```json
{
  "lint": "eslint",
  "lint:fix": "eslint --fix",
  "typecheck": "tsc --noEmit"
}
```

## Usage in other repos

- Copy `AGENTS.md` into the repo root.
- Align lint/typecheck scripts with the project's tooling.
- No specific linting or package manager setup is required unless the project already uses one.
