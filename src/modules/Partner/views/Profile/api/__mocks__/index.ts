import { vi } from 'vitest'

import type { IResponseMessage, TPartner } from '@/core/types'

import { profileData } from '../getProfile/fixtures/profileData'

export const getProfile = vi.fn(async (): Promise<TPartner> => {
	return new Promise(resolve => resolve({
		...profileData,
	}))
})

export const updateProfile = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		'status': true,
		'messages': [
			{
				'field': null,
				'text': 'Сохранено',
				'code': 'PARTNER_PROFILE_SAVED',
			},
		],
	}))
})
