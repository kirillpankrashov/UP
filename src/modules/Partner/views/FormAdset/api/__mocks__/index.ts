import { vi } from 'vitest'

import type { IStatus } from '@/core/types/response'
import { audience } from '@/modules/Partner/views/FormAdset/api/calculateAudience/fixtures/audience'
import type { IAudience } from '@/modules/Partner/views/FormAdset/api/calculateAudience/types'
import { brandAwarenessAdset } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/fixtures/brandAwarenessAdset'
import type { IBrandAwarenessAdset } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/types'
import { extensionAdset } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset/fixtures/extensionAdset'
import type { IExtensionAdset } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset/types'
import { performanceAdset } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/fixtures/performanceAdset'
import type { IPerformanceAdset } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/types'
import { prerollAdset } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/fixtures/prerollAdset'
import type { IPrerollAdset } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/types'
import { streamers } from '@/modules/Partner/views/FormAdset/api/searchStreamers/fixtures/streamers'
import type { ITargetingStreamerSearch } from '@/modules/Partner/views/FormAdset/api/searchStreamers/types'

export const calculateAudience = vi.fn(async (): Promise<IAudience> => {
	return new Promise(resolve => resolve(audience))
})

export const createBrandAwarenessAdset = vi.fn(async (): Promise<IBrandAwarenessAdset> => {
	return new Promise(resolve => resolve(brandAwarenessAdset))
})

export const updateBrandAwarenessAdset = vi.fn(async (): Promise<IBrandAwarenessAdset> => {
	return new Promise(resolve => resolve(brandAwarenessAdset))
})

export const getBrandAwarenessAdset = vi.fn(async (): Promise<IBrandAwarenessAdset> => {
	return new Promise(resolve => resolve(brandAwarenessAdset))
})

export const createPerformanceAdset = vi.fn(async (): Promise<IPerformanceAdset> => {
	return new Promise(resolve => resolve(performanceAdset))
})

export const updatePerformanceAdset = vi.fn(async (): Promise<IPerformanceAdset> => {
	return new Promise(resolve => resolve(performanceAdset))
})

export const getPerformanceAdset = vi.fn(async (): Promise<IPerformanceAdset> => {
	return new Promise(resolve => resolve(performanceAdset))
})

export const createPrerollAdset = vi.fn(async (): Promise<IPrerollAdset> => {
	return new Promise(resolve => resolve(prerollAdset))
})

export const updatePrerollAdset = vi.fn(async (): Promise<IPrerollAdset> => {
	return new Promise(resolve => resolve(prerollAdset))
})

export const getPrerollAdset = vi.fn(async (): Promise<IPrerollAdset> => {
	return new Promise(resolve => resolve(prerollAdset))
})

export const searchStreamers = vi.fn(async (): Promise<ITargetingStreamerSearch[]> => {
	return new Promise(resolve => resolve(streamers))
})

export const verifyAttachment = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const deleteAttachment = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const createExtensionAdset = vi.fn(async (): Promise<IExtensionAdset> => {
	return new Promise(resolve => resolve(extensionAdset))
})

export const updateExtensionAdset = vi.fn(async (): Promise<IExtensionAdset> => {
	return new Promise(resolve => resolve(extensionAdset))
})

export const getExtensionAdset = vi.fn(async (): Promise<IExtensionAdset> => {
	return new Promise(resolve => resolve(extensionAdset))
})
