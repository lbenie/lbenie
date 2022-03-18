import type { BaseCollection } from './baseCollection'
import type { Navigation } from './navigation'

export type NavigationCollection = {
  readonly navigationCollection: Readonly<BaseCollection<Navigation>>
}
