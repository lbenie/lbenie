export interface Experience {
  readonly company: string
  readonly address: string
  readonly description: string
  readonly role: string
  readonly from: Date
  readonly to: Date
  readonly stack: readonly string[]
  readonly slug: string
}
