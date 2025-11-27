/**
 * Type helper to make specific fields non-nullable
 */
export type WithRequiredFields<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>
};

/**
 * Creates a type guard for filtering items with required non-null fields
 */
export const hasRequiredFields = <T, K extends keyof T>(
  ...requiredFields: K[]
) => (value: T | null | undefined): value is WithRequiredFields<T, K> => {
  if (!value) return false;
  return requiredFields.every((field) => value[field] != null)
}


/**
 * Simple type guard for non-null values
 */
export const isNonNull = <T>(value: T | null | undefined): value is NonNullable<T> =>
  value != null

/**
 * Type guard that filters out null/undefined from arrays
 */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value != null
