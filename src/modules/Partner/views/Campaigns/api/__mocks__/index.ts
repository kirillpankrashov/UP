import { vi } from 'vitest'

import type { IPaginatedData, IResponseMessage } from '@/core/types/response'
import type { IBrandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import type { IBrandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'
import type { IBrandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'
import type { IExtensionAdset } from '@/modules/Partner/views/Campaigns/api/getExtensionAdsets'
import { extensionAdset } from '@/modules/Partner/views/Campaigns/api/getExtensionAdsets/fixtures/extensionAdset'
import type { IExtensionCampaign } from '@/modules/Partner/views/Campaigns/api/getExtensionCampaigns'
import { extensionCampaign } from '@/modules/Partner/views/Campaigns/api/getExtensionCampaigns/fixtures/extensionCampaign'
import type { IExtensionCreative } from '@/modules/Partner/views/Campaigns/api/getExtensionCreatives'
import { extensionCreative } from '@/modules/Partner/views/Campaigns/api/getExtensionCreatives/fixtures/extensionCreative'
import type { IPerformanceAdset } from '@/modules/Partner/views/Campaigns/api/getPerformanceAdsets'
import { performanceAdset } from '@/modules/Partner/views/Campaigns/api/getPerformanceAdsets/fixtures/performanceAdset'
import type { IPerformanceCampaign } from '@/modules/Partner/views/Campaigns/api/getPerformanceCampaigns'
import { performanceCampaign } from '@/modules/Partner/views/Campaigns/api/getPerformanceCampaigns/fixtures/performanceCampaign'
import type { IPrerollAdset } from '@/modules/Partner/views/Campaigns/api/getPrerollAdsets'
import { PrerollAdset } from '@/modules/Partner/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'
import type { IPrerollCampaign } from '@/modules/Partner/views/Campaigns/api/getPrerollCampaigns'
import { prerollCampaign } from '@/modules/Partner/views/Campaigns/api/getPrerollCampaigns/fixtures/prerollCampaign'

export const toggleStatus = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			'SUCCESS',
		],
	}))
})

export const getBrandAwarenessCampaigns = vi.fn(async (): Promise<IPaginatedData<IBrandAwarenessCampaign[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [brandAwarenessCampaign],
		perPage: 10,
		total: 10,
	}))
})

export const getBrandAwarenessAdsets = vi.fn(async (): Promise<IPaginatedData<IBrandAwarenessAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [brandAwarenessAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getBrandAwarenessCreatives = vi.fn(async (): Promise<IPaginatedData<IBrandAwarenessCreative[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [brandAwarenessCreative],
		perPage: 10,
		total: 10,
	}))
})

export const getPerformanceCampaigns = vi.fn(async (): Promise<IPaginatedData<IPerformanceCampaign[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [performanceCampaign],
		perPage: 10,
		total: 10,
	}))
})

export const getPerformanceAdsets = vi.fn(async (): Promise<IPaginatedData<IPerformanceAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [performanceAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getPrerollCampaigns = vi.fn(async (): Promise<IPaginatedData<IPrerollCampaign[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [prerollCampaign],
		perPage: 10,
		total: 10,
	}))
})

export const getPrerollAdsets = vi.fn(async (): Promise<IPaginatedData<IPrerollAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [PrerollAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getExtensionCampaigns = vi.fn(async (): Promise<IPaginatedData<IExtensionCampaign[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [extensionCampaign],
		perPage: 10,
		total: 10,
	}))
})

export const getExtensionAdsets = vi.fn(async (): Promise<IPaginatedData<IExtensionAdset[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [extensionAdset],
		perPage: 10,
		total: 10,
	}))
})

export const getExtensionCreatives = vi.fn(async (): Promise<IPaginatedData<IExtensionCreative[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [extensionCreative],
		perPage: 10,
		total: 10,
	}))
})
