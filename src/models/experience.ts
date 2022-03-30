export interface Experience {
  readonly company: string
  readonly address: string
  readonly description: string
  readonly role: string
  readonly from: string
  readonly to?: string
  readonly stack: readonly string[]
  readonly slug: string
  readonly isRemote: boolean
  readonly exerpt: string
}
