# Agents

Universal `AGENTS.md` with a few dependencies.

## Dependencies

Dev dependencies:
- @antfu/eslint-config
- eslint
- lint-staged
- typescript

Add them explicitly:
```sh
pnpm add -D @antfu/eslint-config eslint lint-staged typescript
```

## Scripts

```json
{
  "lint": "eslint",
  "lint:fix": "eslint --fix",
  "lint:staged": "lint-staged",
  "typecheck": "tsc --noEmit"
}
```
