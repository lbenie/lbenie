export interface Project {
  readonly name: string
  readonly slug: string
  readonly url: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly funFact: string
  readonly description: string
}
