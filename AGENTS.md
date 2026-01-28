# AGENTS.md

## Purpose
- This file provides universal, repo-agnostic guidance for agents working on my TypeScript projects.

## Baseline behavior
- Follow the local project conventions first; only deviate when this file explicitly says so.
- Keep changes minimal and focused on the request.
- Do not add new dependencies or modify tooling unless the user asks.
- When running scripts, use the project's package manager (packageManager field, lockfile, or docs) instead of assuming pnpm.

## ESLint and formatting
- Conform to the repo's linting and formatting expectations in all edits.
- If the repo already includes an ESLint setup, use it as-is and do not replace it.
- If the repo has no ESLint configuration, continue with best-effort formatting and tell the human it is unavailable.
- Before editing, mirror the target file's style (e.g., semicolons) and avoid reformatting.
- If unsure about a lint rule, ask before changing code.
- Do not reorder imports unless required by the existing lint configuration or necessary for correctness.

## TypeScript conventions
- Prefer explicit types where it improves clarity; avoid overly verbose annotations.
- Use modern TypeScript/ES features when they improve readability.
- Avoid any/unknown unless required by external APIs; narrow types promptly.
- Prefer `T[]` over `Array<T>`.
- Prefer positional args; use an options object when it improves clarity or when there are 3+ params.
- Avoid classes; prefer functions and plain objects.
- Avoid enums; prefer string/number literal unions or const objects with `as const`.
- For string literal unions, always use human-readable strings (e.g., "Logged Out") instead of kebab-case (e.g., "logged-out"), unless the user explicitly asks for machine-readable strings.

## Style / Architecture
- Keep entrypoint modules focused on orchestration: they should wire dependencies and delegate logic rather than contain detailed implementation.

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
- For options expressed via destructured params, document the *typed shape* rather than the binding so editor hints appear correctly (e.g., put comments above keys within the type literal).
- When adding inline property docs inside a type annotation, place the comment on its own line directly above the property key.

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
  /** First operand */
  one: number
  /** Second operand */
  two: string

}): void

export function example(
  ...args: (
    | number
    | string
    | {
      one: number
      two: string
    }
  )[]
): void {
  console.debug(args)
}

/**
 * Commodore 64 color palette (Pepto)
 */
export const colors = {
  black: 0x000000,
  white: 0xFFFFFF,
  /** Default background color. */
  lightBlue: 0x6C5EB5,
} as const
```

## Edits and safety
- Do not refactor unrelated code.
- Avoid mass reformatting; keep diffs tight.
- Preserve existing public APIs and behavior unless a change is requested.
- Do not edit generated files (e.g. `dist`, build output, auto-generated types) unless explicitly requested.

## Testing and validation
- Track the files you edit during the task.
- If the repo provides `lint-staged`, `typecheck`, and `test` scripts, prefer a single full validation chain using the repo's package manager (e.g., `pnpm lint-staged && pnpm typecheck && pnpm test`).
- If the repo defines a lint script or ESLint configuration, run the repo's lint script before finishing (e.g. `npm run lint`, `pnpm lint`, `yarn lint`, `bun run lint`). If lint errors are present, run the repo’s lint tool in fix mode only on the edited files, if supported, then re-run the lint script until clean.
- If the repo has a `typecheck` script or a `tsconfig.json`, run typechecking before finishing for any code or config changes (not just `.ts` files).
- If a `typecheck` script exists, use it (e.g. `npm run typecheck`, `pnpm typecheck`, `yarn typecheck`, `bun run typecheck`).
- If no `typecheck` script exists but `tsconfig.json` does, run `packageManager exec tsc --noEmit -p tsconfig.json` and report if `tsc` is unavailable.
- After each edit batch that changes code or config, re-run typechecking; do not wait until the final reply.
- If the editor or TS language service shows a TypeScript error, stop and fix it before continuing.
- No new code is considered complete until a fresh typecheck is clean after the last edit.
- If tests or lint scripts exist, suggest running them after code changes.
- Only run other commands when explicitly asked, or when they clearly unblock the work and are safe.

## Zero-Error Rule
- Do not introduce new errors; a task is considered complete only when `typecheck` and lint (if applicable) succeed with no errors, unless the user explicitly approves skipping them.
- Avoid placeholder code, unhandled `any`, or partial implementations that leave the codebase in a broken or incomplete state.
- Only use suppressions (e.g., `// @ts-ignore`) when explicitly requested.

## When in doubt
- Ask a brief clarifying question instead of making a risky assumption.
