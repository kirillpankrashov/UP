import { vi } from 'vitest'

import type { IResponseMessage, IStatus } from '@/core/types/response'
import type { IBrandAwarenessCreative } from '@/modules/Partner/views/FormCreative/api/getBrandAwarenessCreative'
import { brandAwarenessCreative } from '@/modules/Partner/views/FormCreative/api/getBrandAwarenessCreative/fixtures/brandAwarenessCreative'
import type { IExtensionCreative } from '@/modules/Partner/views/FormCreative/api/getExtensionCreative'
import { extensionCreative } from '@/modules/Partner/views/FormCreative/api/getExtensionCreative/fixtures/extensionCreative'

export const createBrandAwarenessCreative = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		messages: [
			{
				'field': null,
				'text': 'Креатив создан',
				'code': 'AD_BRAND_AWARENESS_CREATE',
			},
		],
		status: true,
	}))
})

export const updateBrandAwarenessCreative = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		messages: [
			{
				'field': null,
				'text': 'Креатив обновлен',
				'code': 'AD_BRAND_AWARENESS_UPDATE',
			},
		],
		status: true,
	}))
})

export const getBrandAwarenessCreative = vi.fn(async (): Promise<IBrandAwarenessCreative> => {
	return new Promise(resolve => resolve(brandAwarenessCreative))
})

export const createExtensionCreative = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		messages: [
			{
				'field': null,
				'text': 'Креатив создан',
				'code': 'AD_BRAND_AWARENESS_CREATE',
			},
		],
		status: true,
	}))
})

export const updateExtensionCreative = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		messages: [
			{
				'field': null,
				'text': 'Креатив обновлен',
				'code': 'AD_BRAND_AWARENESS_UPDATE',
			},
		],
		status: true,
	}))
})

export const getExtensionCreative = vi.fn(async (): Promise<IExtensionCreative> => {
	return new Promise(resolve => resolve(extensionCreative))
})

export const verifyAttachment = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const deleteAttachment = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})
