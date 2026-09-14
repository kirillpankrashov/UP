import { vi } from 'vitest'

import type { IResponseMessage, Platform, TStreamer } from '@/core/types'

import { profileData } from '../../store/__fixtures__/profileData'
import type { TAttachPlatformModel } from '../attachPlatform/types'

export const attachPlatform = vi.fn(async (	_model: TAttachPlatformModel, _platform: Platform): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})

export const deleteProfile = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})

export const deleteProfileRollback = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})

export const resendEmail = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [],
	}))
})

export const getProfile = vi.fn(async (): Promise<TStreamer> => {
	return new Promise(resolve => resolve({
		...profileData,
	}))
})
