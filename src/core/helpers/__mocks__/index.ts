import { vi } from 'vitest'

import { AdEntityType, AdFormat, CampaignType, DomainName, DomainTheme, DomainURL, Locale, Platform } from '@/core/types'

import * as isSsp from '../isSsp'

export const getDomain = vi.fn(() => {
	return   {
		name: DomainName.UPLIFY,
		baseUrl: DomainURL.PLATFORM,
		urls: [DomainURL.PLATFORM],
		platforms: [Platform.TWITCH],
		theme: DomainTheme.UPLIFY,
		locales: [Locale.EN],
	}
})

export const setToken = vi.fn(() => {})

export const getToken = vi.fn(() => {})

export const getRole = vi.fn(() => {})

export const Logger = {
	debug: vi.fn(),
	info: vi.fn(),
	warning: vi.fn(),
	error: vi.fn(),
	critical: vi.fn(),
}

export const Analytic = {
	ga: vi.fn(),
	fbq: vi.fn(),
	vkgoal: vi.fn(),
	dataLayer: vi.fn(),
	heapTrack: vi.fn(),
	heapIdentity: vi.fn(),
	heapAddUserProperties: vi.fn(),
	pushUserToDataLayer: vi.fn(),
}

export const Socket = vi.fn().mockImplementation(() => {
	return {
		// constructor: vi.fn(),
		init: vi.fn(),
		listen: vi.fn(),
		leave: vi.fn(),
	}
})

export const isSspFormat = vi.fn(isSsp.isSspFormat)
export const isSspMediaFormat = vi.fn(isSsp.isSspMediaFormat)
export const isSspTextFormat = vi.fn(isSsp.isSspTextFormat)
export const isExternalFormat = vi.fn(isSsp.isExternalFormat)
export const isExternalMediaFormat = vi.fn(isSsp.isExternalMediaFormat)
export const parseSlug = vi.fn().mockImplementation(() => {
	return {
		campaignType: CampaignType.BRAND_AWARENESS,
		adEntityType: AdEntityType.CAMPAIGNS,
		adFormat: AdFormat.FULLSCREEN,
	}
})

export const handleServerError = vi.fn()
