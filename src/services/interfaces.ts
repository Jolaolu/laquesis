export interface IRegion {
  id: number
  name: string
}

export interface IExperiments {
  id: string
  jira_id: string
  title: string
  team: string
  platform: string
  status: string
  date_started: string
  delete: boolean
  region_id: number
}
