import { AdFormat, AdsetStatus } from '@/core/types'

import type { IStreamerAdset } from '../types'

export const streamerAdsets: IStreamerAdset[] = [
	{
		id: 1,
		title: 'Test Adset',
		campaign: {
			id: 1,
			slug: 'test-campaign',
			type: 'test-type',
			title: 'Test Campaign',
			description: 'Test Description',
			category: 'Test Category',
			visible: true,
		},
		format: {
			description: 'Test Description',
			id: AdFormat.FULLSCREEN,
			icon: 'test-icon',
			title: 'Test Title',
		},
		revenue: 100,
		impressions: 100,
		totalCtr: 100,
		todayCtr: 100,
		status: AdsetStatus.ACTIVE,
		restore: true,
		slug: 'test-slug',
	},
]