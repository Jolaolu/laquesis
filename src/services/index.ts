import staticRegions from '~/static/regions.json'
import staticExperiments from '~/static/data.json'
import { IRegion, IExperiment } from '~/services/interfaces'

export const experimentRegions: IRegion[] = staticRegions as IRegion[]

export const experimentData: IExperiment[] = staticExperiments as IExperiment[]
