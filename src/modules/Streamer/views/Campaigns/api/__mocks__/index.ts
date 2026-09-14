import { vi } from 'vitest'

import { type IPrerollVod, type IResponseData,PrerollAdsetStatus } from '@/core/types'
import type { IPaginatedData, IResponseMessage } from '@/core/types/response'
import type { ITwitchClipCreateResponse } from '@/modules/Streamer/views/Campaigns/api/createTwitchClip/types'
import type { IAdsetAnalytics } from '@/modules/Streamer/views/Campaigns/api/getAdsetAnalytics'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { brandAwarenessCustomAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import type { IBrandAwarenessAdsets } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsets/types'
import { brandAwarenessCustomAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/fixtures/brandAwarenessCustomAdsetShort'
import type { IBrandAwarenessAdsetsShort } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetsShort/types'
import { brandAwarenessCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessCompletedAdsets/fixtures/brandAwarenessCompletedAdset'
import type { IBrandAwarenessCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessCompletedAdsets/types'
import { extensionAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsetInfo/fixtures/extensionAdsetInfo'
import type { IExtensionAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsetInfo/types'
import { extensionAdset } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import type { IExtensionAdsets } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsets/types'
import { extensionAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsetsShort/fixtures/extensionAdsetShort'
import type { IExtensionAdsetsShort } from '@/modules/Streamer/views/Campaigns/api/getExtensionAdsetsShort/types'
import type { IPerformanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo'
import { performanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetInfo/fixtures/performanceAdsetInfo'
import { performanceAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import type { IPerformanceAdsets } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsets/types'
import { performanceAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetsShort/fixtures/performanceAdsetShort'
import type { IPerformanceAdsetsShort } from '@/modules/Streamer/views/Campaigns/api/getPerformanceAdsetsShort/types'
import type { IPerformanceCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceCompletedAdsets'
import { performanceCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getPerformanceCompletedAdsets/fixtures/performanceCompletedAdset'
import type { IPrerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import type { IPrerollAdsets } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/types'
import { prerollAdsetShort } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetsShort/fixtures/prerollAdsetShort'
import type { IPrerollAdsetsShort } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetsShort/types'
import type { IPrerollCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollCompletedAdsets'
import { prerollCompletedAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollCompletedAdsets/fixtures/prerollCompletedAdset'
import { specialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/fixtures/specialProjectAdsetInfo'
import type { ISpecialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/types'
import { specialProjectAdset } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/fixtures/specialProjectAdset'
import type { ISpecialProjectAdsets } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsets/types'
import type { ITwitchClipGetResponse } from '@/modules/Streamer/views/Campaigns/api/getTwitchClip/types'

export const getBrandAwarenessAdsets = vi.fn(async (): Promise<IBrandAwarenessAdsets> => {
	return new Promise(resolve => resolve({
		active: [brandAwarenessCustomAdset],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getBrandAwarenessAdsetsShort = vi.fn(async (): Promise<IBrandAwarenessAdsetsShort> => {
	return new Promise(resolve => resolve({
		active: [brandAwarenessCustomAdsetShort],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getPerformanceAdsets = vi.fn(async (): Promise<IPerformanceAdsets> => {
	return new Promise(resolve => resolve({
		active: [performanceAdset],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getPerformanceAdsetsShort = vi.fn(async (): Promise<IPerformanceAdsetsShort> => {
	return new Promise(resolve => resolve({
		active: [performanceAdsetShort],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getPrerollAdsets = vi.fn(async (): Promise<IPrerollAdsets> => {
	return new Promise(resolve => resolve([prerollAdset]))
})

export const getPrerollAdsetsShort = vi.fn(async (): Promise<IPrerollAdsetsShort> => {
	return new Promise(resolve => resolve([prerollAdsetShort]))
})

export const getBrandAwarenessAdsetInfo = vi.fn(async (): Promise<IBrandAwarenessAdsetInfo> => {
	return new Promise(resolve => resolve(brandAwarenessAdsetInfo))
})

export const getPerformanceAdsetInfo = vi.fn(async (): Promise<IPerformanceAdsetInfo> => {
	return new Promise(resolve => resolve(performanceAdsetInfo))
})

export const getPrerollAdsetInfo = vi.fn(async (): Promise<IPrerollAdsetInfo> => {
	return new Promise(resolve => resolve(prerollAdsetInfo))
})

export const getBrandAwarenessCompletedAdsets = vi.fn(async (): Promise<IPaginatedData<IBrandAwarenessCompletedAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [brandAwarenessCompletedAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getPerformanceCompletedAdsets = vi.fn(async (): Promise<IPaginatedData<IPerformanceCompletedAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [performanceCompletedAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getPrerollCompletedAdsets = vi.fn(async (): Promise<IPaginatedData<IPrerollCompletedAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [prerollCompletedAdset],
		perPage: 10,
		total: 10,
	}))
})

export const toggleAdsetVisibility = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Availability status changed',
				'code': 'AD_SET_STATUS_VISIBLE',
			},
		],
	}))
})

export const getBrandAwarenessProductLink = vi.fn(async (): Promise<IResponseData<{ url: string }>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: {
			url: 'http://www.uplify.us/s/lo3vu',
		},
	}))
})

export const getPrerollLink = vi.fn(async (): Promise<IResponseData<{ url: string }>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: { url: 'http://www.uplify.us/s/lo3vu' },
	}))
})

export const createPrerollVideo = vi.fn(async (): Promise<IResponseData<IPrerollVod>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: {
			id: 1,
			video: 'https://www.uplify.us/s/lo3vu',
			status: PrerollAdsetStatus.MODERATION,
		},
	}))
})

export const updatePrerollVideo = vi.fn(async (): Promise<IResponseData<IPrerollVod>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: {
			id: 1,
			video: 'https://www.uplify.us/s/lo3vu',
			status: PrerollAdsetStatus.MODERATION,
		},
	}))
})

export const getAdsetAnalytics = vi.fn(async (): Promise<IResponseData<IAdsetAnalytics>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: {
			title: 'test',
			data: [
				{
					date: '2021-01-01',
					impressions: 100,
					clicks: 100,
					botClicks: 100,
					ctr: 100,
				},
			],
		},
	}))
})

export const getExtensionAdsetInfo = vi.fn(async (): Promise<IExtensionAdsetInfo> => {
	return new Promise(resolve => resolve(extensionAdsetInfo))
})

export const getExtensionAdsets = vi.fn(async (): Promise<IExtensionAdsets> => {
	return new Promise(resolve => resolve({
		active: [extensionAdset],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getExtensionAdsetsShort = vi.fn(async (): Promise<IExtensionAdsetsShort> => {
	return new Promise(resolve => resolve({
		active: [extensionAdsetShort],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const getSpecialProjectAdsetInfo = vi.fn(async (): Promise<ISpecialProjectAdsetInfo> => {
	return new Promise(resolve => resolve(specialProjectAdsetInfo))
})

export const getSpecialProjectAdsets = vi.fn(async (): Promise<ISpecialProjectAdsets> => {
	return new Promise(resolve => resolve({
		active: [specialProjectAdset],
		inactive: [],
		future: [],
		unavailable: [],
	}))
})

export const createTwitchClip = vi.fn(async (): Promise<ITwitchClipCreateResponse> => {
	return new Promise(resolve => resolve({
		data: [{ id: 'clip-test-id', edit_url: 'https://clips.twitch.tv/edit/clip-test-id' }],
	}))
})

export const getTwitchClip = vi.fn(async (): Promise<ITwitchClipGetResponse> => {
	return new Promise(resolve => resolve({
		data: [{
			id: 'clip-test-id',
			url: 'https://clips.twitch.tv/clip-test-id',
			embed_url: 'https://clips.twitch.tv/embed/clip-test-id',
			creator_id: '62',
			creator_name: 'cathy',
			video_id: 'video-id',
			game_id: 'game-id',
			title: 'Stream Highlight',
			view_count: 0,
			created_at: '2026-01-01T00:00:00Z',
			thumbnail_url: 'https://clips.twitch.tv/clip-test-id/thumb.jpg',
			duration: 60,
			vod_offset: 0,
		}],
	}))
})

export const saveTwitchClip = vi.fn(async (): Promise<void> => {
	return Promise.resolve()
})
