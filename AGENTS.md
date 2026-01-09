# AGENTS.md

## Purpose
- This file provides universal, repo-agnostic guidance for agents working on my TypeScript projects.

## Baseline behavior
- Follow the local project conventions first; only deviate when this file explicitly says so.
- Keep changes minimal and focused on the request.
- Do not add new dependencies or modify tooling unless the user asks.

## ESLint and formatting
- Treat the code style as if it is governed by `@antfu/eslint-config`.
- Conform to those linting and formatting expectations in all edits.
- If the repo already includes an ESLint setup, use it as-is and do not replace it.
- If ESLint is missing or fails because the config is not installed, report the issue and continue with best-effort formatting; do not install dependencies unless asked.
- Lint source of truth: repo ESLint config (eslint.config.* or package.json eslint).
- Before editing, mirror the target file's style (e.g., semicolons) and avoid reformatting.
- If unsure about a lint rule, ask before changing code.
- Do not reorder imports unless required by the existing lint configuration or necessary for correctness.

## TypeScript conventions
- Prefer explicit types where it improves clarity; avoid overly verbose annotations.
- Use modern TypeScript/ES features when they improve readability.
- Avoid any/unknown unless required by external APIs; narrow types promptly.
- Prefer positional args for up to 2 required, distinct types; switch to an object when you have 3+ args, optional args, multiple same-typed params, booleans/flags, or expect the signature to grow.
- Avoid classes; prefer functions and plain objects.
- Avoid enums; prefer string/number literal unions or const objects with `as const`.

## Documentation (JSDoc)
- Use JSDoc block comments (`/** ... */`) directly above the thing being documented.
- For overloaded functions, add a short doc block above each overload.
- For options objects, document each property inline in the type literal with `/** ... */` comments.
- For exported objects, add a short doc block above the object; only add per-property comments when the meaning is not obvious.
- Keep comments concise and descriptive; prefer this style over `@param` tags for options objects.

## Example shapes
```ts
/**
 * Example function with two args
 */
export function example(arg1: number, arg2: string): void

/**
 * Example function with many args via options object
 */
export function example({
  one,
  two,
}: {
  /** One is a number */
  one: number
  /** Two is a string */
  two: string
}): void

/**
 * A list of colors
 */
export const colors = {
  black: 0x000000,
  white: 0xFFFFFF,
} as const
```

## Edits and safety
- Do not refactor unrelated code.
- Avoid mass reformatting; keep diffs tight.
- Preserve existing public APIs and behavior unless a change is requested.
- Do not edit generated files (e.g. `dist`, build output, auto-generated types) unless explicitly requested.

## Testing and validation
- If TypeScript code is edited, the default expectation is to run `pnpm lint:staged` and `pnpm typecheck` before finishing.
- If no files are staged, ask how to proceed.
- If tests or lint scripts exist, suggest running them after code changes.
- Only run other commands when explicitly asked, or when they clearly unblock the work and are safe.

## When in doubt
- Ask a brief clarifying question instead of making a risky assumption.
