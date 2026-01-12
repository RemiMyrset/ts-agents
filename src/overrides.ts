/**
 * Example function with no args
 */
export function example(): void

/**
 * Example function with one arg
 */
export function example(arg1: number): void

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
  three,
  four,
}: {
  /** First operand */
  one: number
  /** Second operand */
  two: string
  /** Third operand */
  three: boolean
  /** Fourth operand */
  four: string
}): void

export function example(
  ...args: (
    | number
    | string
    | {
      one: number
      two: string
      three: boolean
      four: string
    }
  )[]
): void {
  console.debug(args)
}
