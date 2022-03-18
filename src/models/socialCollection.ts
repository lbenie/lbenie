import type { BaseCollection } from './baseCollection'
import type { Social } from './social'

export type SocialCollection = {
  readonly socialCollection: Readonly<BaseCollection<Social>>
}
