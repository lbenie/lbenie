export interface Contribution {
  readonly name: string
  readonly slug: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly funFact: string
  readonly description: string
  readonly url: string
}
