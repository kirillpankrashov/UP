import { vi } from 'vitest'

import type { IPaginatedData } from '@/core/types/response'
import { campaignStatistics } from '@/modules/Partner/views/Analytics/api/getCampaignStatistics/fixtures/campaignStatistics'
import type { ICampaignStatistics } from '@/modules/Partner/views/Analytics/api/getCampaignStatistics/types'
import { categoriesDistribution } from '@/modules/Partner/views/Analytics/api/getCategoriesDistribution/fixtures/categoriesDistribution'
import type { ICategoryDistribution } from '@/modules/Partner/views/Analytics/api/getCategoriesDistribution/types'
import { categoriesImpressions } from '@/modules/Partner/views/Analytics/api/getCategoriesImperssions/fixtures/categoriesImpressions'
import type { ICategoriesImperssions } from '@/modules/Partner/views/Analytics/api/getCategoriesImperssions/types'
import { streamersStatistics } from '@/modules/Partner/views/Analytics/api/getStreamersStatistics/fixtures/streamersStatistics'
import type { IStreamersStatistics } from '@/modules/Partner/views/Analytics/api/getStreamersStatistics/types'

export const getCampaignStatistics = vi.fn(async (): Promise<ICampaignStatistics> => {
	return new Promise(resolve => resolve(campaignStatistics))
})

export const getStreamersStatistics = vi.fn(async (): Promise<IPaginatedData<IStreamersStatistics>> => {
	return new Promise(resolve => resolve(streamersStatistics))
})

export const getCategoriesImperssions = vi.fn(async (): Promise<IPaginatedData<ICategoriesImperssions>> => {
	return new Promise(resolve => resolve(categoriesImpressions))
})

export const getCategoriesDistribution = vi.fn(async (): Promise<ICategoryDistribution[]> => {
	return new Promise(resolve => resolve(categoriesDistribution))
})
