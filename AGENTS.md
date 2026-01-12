# AGENTS.md

## Purpose
- This file provides universal, repo-agnostic guidance for agents working on my TypeScript projects.

## Baseline behavior
- Follow the local project conventions first; only deviate when this file explicitly says so.
- Keep changes minimal and focused on the request.
- Do not add new dependencies or modify tooling unless the user asks.
- When asked to reuse an existing implementation or example, find it in the repo and copy it verbatim unless told otherwise.
- When running scripts, use the project's package manager (packageManager field, lockfile, or docs) instead of assuming pnpm.

## ESLint and formatting
- Conform to the repo's linting and formatting expectations in all edits.
- If the repo already includes an ESLint setup, use it as-is and do not replace it.
- If the repo has no ESLint configuration, continue with best-effort formatting and tell the human it is unavailable.
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
- Do not restate type information in prose (e.g. “is a number”, “is a string”) unless it adds semantic meaning.
- Comments should explain intent, constraints, or non-obvious behavior; avoid describing what the code already makes obvious.
- Do not add documentation to exported symbols whose purpose is obvious from the name and type.
- Prioritize documentation for public APIs (exported and intended for external use); avoid adding JSDoc to private or internal helpers unless the behavior is non-obvious.
- If code behavior changes, update or remove related comments in the same edit.
- When in doubt, prefer fewer comments over more comments.

## Example shapes
```ts
/**
 * Example overload with two args
 */
export function example(arg1: number, arg2: string): void

/**
 * Example overload with many args via options object
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

export function example(...args: unknown[]): void {
  console.debug(args)
}

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
- Track the files you edit during the task.
- If the repo defines a lint script or ESLint configuration, run the repo's lint script before finishing (e.g. `npm run lint`, `pnpm lint`, `yarn lint`, `bun run lint`). If lint errors are present, run the repo’s lint tool in fix mode only on the edited files, if supported, then re-run the lint script until clean.
- If TypeScript code is edited, the default expectation is to run the repo's typecheck script before finishing (e.g. `npm run typecheck`, `pnpm typecheck`, `yarn typecheck`, `bun run typecheck`).
- If tests or lint scripts exist, suggest running them after code changes.
- Only run other commands when explicitly asked, or when they clearly unblock the work and are safe.

## When in doubt
- Ask a brief clarifying question instead of making a risky assumption.
