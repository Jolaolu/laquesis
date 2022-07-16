export interface IRegion {
  id: number
  name: string
}
export interface IExperiment {
  id: string
  jira_id: string
  title: string
  team: string
  platform: string
  status: string
  date_started: string
  deleted: boolean
  region_id: number
}
