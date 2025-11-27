export type WithRequiredFields<T, K extends keyof T> = T & {
  readonly [P in K]-?: NonNullable<T[P]>
}

export const hasRequiredFields =
  <T, K extends keyof T>(...requiredFields: readonly K[]) =>
  (value: T | null | undefined): value is WithRequiredFields<T, K> => {
    if (!value) {
      return false
    }

    return requiredFields.every((field) => value[field] != null)
  }

export const isNonNull = <T>(
  value: T | null | undefined,
): value is NonNullable<T> => value != null

export const isDefined = <T>(value: T | null | undefined): value is T =>
  value != null
