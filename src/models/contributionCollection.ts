import type { BaseCollection } from './baseCollection'
import type { Contribution } from './contribution'

export type ContributionCollection = {
  readonly contributionCollection: Readonly<BaseCollection<Contribution>>
}
