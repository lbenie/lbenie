import type { BaseCollection } from './baseCollection'
import type { Skill } from './skill'

export type SkillsCollection = {
  readonly skillsCollection: Readonly<BaseCollection<Skill>>
}
