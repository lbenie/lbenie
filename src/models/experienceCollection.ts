import type { BaseCollection } from './baseCollection'
import type { Experience } from './experience'

export type ExperienceCollection = {
  readonly experienceCollection: Readonly<BaseCollection<Experience>>
}
