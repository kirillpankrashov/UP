import { vi } from 'vitest'

import type { IResponse, IResponseData, IResponseMessage, IStatus } from '@/core/types'
import type { TBrandisStatus } from '@/modules/Streamer/views/Settings/api/checkBrandisExtension'
import type { TCheckChatbotStatus } from '@/modules/Streamer/views/Settings/api/checkChatbot'
import type { TExtensionStatus } from '@/modules/Streamer/views/Settings/api/checkExtension'
import type { TConnectChatbot } from '@/modules/Streamer/views/Settings/api/connectChatbot'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import type { TWidgetSettings } from '@/modules/Streamer/views/Settings/api/types'

export const getWidget = vi.fn(async (): Promise<TWidgetSettings> => {
	return new Promise(resolve => resolve(widgetData))
})

export const updateWidget = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				field: null,
				text: 'Saved',
				code: 'WIDGET_SAVED',
			},
		],
	}))
})

export const sendWidgetPreview = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				field: null,
				text: 'Ad request accepted',
				code: 'ADS_SUCCESS_REGISTER',
			},
		],
	}))
})

export const connectChatbot = vi.fn(async (): Promise<IResponse<TConnectChatbot>> => {
	return new Promise(resolve => resolve({
		status: true,
		src: '/some-route',
	}))
})

export const disconnectChatbot = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const checkChatbot = vi.fn(async (): Promise<IResponse<TCheckChatbotStatus>> => {
	return new Promise(resolve => resolve({
		status: true,
		moderator: true,
	}))
})

export const sendMessagePreview = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				field: null,
				text: 'Message sended',
				code: 'BOT_SEND_MESSAGE_SUCCESS',
			},
		],
	}))
})

export const checkBrandisExtension = vi.fn(async (): Promise<IResponse<TBrandisStatus>> => {
	return new Promise(resolve => resolve({
		status: true,
		activation: true,
		changed: true,
	}))
})

export const checkExtension = vi.fn(async (): Promise<IResponse<TExtensionStatus>> => {
	return new Promise(resolve => resolve({
		status: true,
		activation: true,
		changed: true,
	}))
})

export const sendManual = vi.fn(async (): Promise<IResponse<IResponseMessage>> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Запуск рекламы в ручном режиме',
				'code': 'ADS_SUCCESS_RUN_MANUAL_MODE',
			},
		],
	}))
})

export const refreshObsLink = vi.fn(async (): Promise<IResponse<IResponseMessage>> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Saved',
				'code': 'WIDGET_SAVED',
			},
		],
	}))
})

export const fetchYoutubeTextBlackList = vi.fn(async (): Promise<IResponseData<string>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	}))
})

export const updateYoutubeTextBlackList = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const toggleYoutubeText = vi.fn(async (): Promise<IResponse<IResponseMessage>> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Статус программы изменен',
				'code': 'YOUTUBE_TEXT_PROGRAM_STATUS_CHANGED',
			},
		],
	}))
})
