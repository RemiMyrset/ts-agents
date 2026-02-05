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
- Do not use `.js` extensions in import specifiers (e.g., `import { createServer } from "./server.js"`); prefer extensionless paths unless the user explicitly asks otherwise.

## Naming
- Avoid abbreviations in identifiers; prefer full words for clarity (e.g., `request`/`response`, not `req`/`res`).
- Common short forms are OK only when they are standard terms of art and widely unambiguous (e.g., `id`, `url`, `lhs`, `rhs`).

## Style / Architecture
- Entrypoints (e.g., `index.ts`, `main.ts`, `server.ts`, `cli.ts`) must be orchestration-only: wire dependencies, register routes/handlers by importing modules, and start/stop the process with graceful shutdown; do not put validation/parsing/business logic/rendering/data access in entrypoints.

## Cohesion and file boundaries
- Each source file must have a single, explicit responsibility; if you cannot describe the file's purpose in one sentence without "and", split it.
- Keep layering clear: do not mix domain logic with IO, rendering, UI, or orchestration in the same file.
- Prefer one primary exported API per file; if multiple exports serve different concerns, split.
- Add new features in new modules by default; extend an existing file only when the feature belongs to the same responsibility and shares internal data structures.
- When a file already spans multiple concerns, extract the new concern instead of adding more.
- Index or barrel files are for orchestration/re-exports only; avoid significant logic in them.
- Hard size triggers apply to `*.ts`, `*.tsx`, `*.js`, and `*.jsx` source files.
- Any source file over 600 lines must be split into smaller modules before adding new features in that area.
- Any source file over 1000 lines must be split even for small edits.
- Splitting oversized files is required and is considered in-scope; it overrides "keep changes minimal" unless the user explicitly opts out.
- When splitting, create a folder named after the module and move sub-responsibilities into separate files.
- Do not turn a non-index module into a pure barrel. The original file must remain the public façade and keep the top-level orchestration (construction, composition, policy decisions, and wiring).
- Re-exports are allowed, but the original file should still "do the level 1 work" (call into submodules and assemble the final API).

## Documentation (JSDoc)
- Use JSDoc block comments (`/** ... */`) directly above the thing being documented.
- For overloaded functions, add a short doc block above each overload.
- For options objects, document each property inline in the type literal with `/** ... */` comments.
- For exported objects, add a short doc block above the object; only add per-property comments when the meaning is not obvious.
- Keep comments concise and descriptive; prefer this style over `@param` tags for options objects.
- Do not restate type information in prose (e.g. “is a number”, “is a string”) unless it adds semantic meaning.
- Comments should explain intent, constraints, or non-obvious behavior; avoid describing what the code already makes obvious.
- Prefer documenting public APIs (exported and intended for external use), even when the purpose seems obvious at first glance.
- For private/internal helpers, add JSDoc when behavior is non-obvious; treat type guards, error normalization/mapping, parsing/validation helpers, and protocol glue as non-obvious by default.
- If code behavior changes, update or remove related comments in the same edit.
- When in doubt, prefer a short doc block over no documentation.
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
