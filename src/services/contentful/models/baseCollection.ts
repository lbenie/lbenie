export interface BaseCollection<T> {
  readonly total: number
  readonly skip: number
  readonly limit: number
  readonly items: readonly T[]
}
