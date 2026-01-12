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
 * Example function with three args
 */
export function example(arg1: number, arg2: string, arg3: boolean): void

/**
 * Example function with many args via options object
 */
export function example({
  one,
  two,
  three,
  four,
}: {
  /** One is a number */
  one: number
  /** Two is a string */
  two: string
  /** Three is a Boolean */
  three: boolean
  /** Four is another string */
  four: string
}): void

export function example(
  ...args: (
    | number
    | string
    | boolean
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
