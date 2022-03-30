import type { BaseCollection } from './baseCollection'
import type { Project } from './project'

export type ProjectCollection = {
  readonly projectCollection: Readonly<BaseCollection<Project>>
}
