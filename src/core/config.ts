import en from 'element-plus/dist/locale/en'
import es from 'element-plus/dist/locale/es'
import pt from 'element-plus/dist/locale/pt'
import ru from 'element-plus/dist/locale/ru'

import {
	DomainName,
	DomainTheme,
	DomainURL,
	type IDomain,
	Locale,
	Platform,
} from '@/core/types'

export const ELEMENT_PLUS_LOCALES = {
	en,
	es,
	pt,
	ru,
}

export const ALL_PLATFORMS = [
	Platform.TWITCH, Platform.YOUTUBE, Platform.TROVO, Platform.VK_PLAY, Platform.TIKTOK,
]
export const ALL_LOCALES = [
	Locale.EN, Locale.ES, Locale.PT, Locale.RU,
]

export const DOMAINS_CONFIG: IDomain[] = [
	{
		name: DomainName.UPLIFY,
		baseUrl: DomainURL.PLATFORM,
		urls: [
			DomainURL.LOCAL,
			DomainURL.LOCAL_S,
			DomainURL.LOCAL_DOMAIN,
			DomainURL.LOCAL_DOMAIN_S,
			DomainURL.ALPHA,
			DomainURL.BETA,
			DomainURL.RELEASE,
			DomainURL.PLATFORM,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.UPLIFY,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.TROVO,
		baseUrl: DomainURL.TROVO,
		urls: [
			DomainURL.TROVO,
		],
		platforms: [Platform.TROVO],
		theme: DomainTheme.TROVO,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.JONEKIRI,
		baseUrl: DomainURL.JONEKIRI,
		urls: [
			DomainURL.JONEKIRI,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.JONEKIRI,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.GAMING_PARTNERS,
		baseUrl: DomainURL.GAMING_PARTNERS,
		urls: [
			DomainURL.GAMING_PARTNERS,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.GAMING_PARTNERS,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.PARETO,
		baseUrl: DomainURL.PARETO,
		urls: [
			DomainURL.PARETO,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.PARETO,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.STREAMMONEY,
		baseUrl: DomainURL.STREAMMONEY,
		urls: [
			DomainURL.STREAMMONEY,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.STREAMMONEY,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.STREAMO,
		baseUrl: DomainURL.STREAMO,
		urls: [
			DomainURL.STREAMO,
		],
		platforms: ALL_PLATFORMS,
		theme: DomainTheme.UPLIFY,
		locales: ALL_LOCALES,
	},
	{
		name: DomainName.AMPVERSE,
		baseUrl: DomainURL.AMPVERSE,
		urls: [
			DomainURL.AMPVERSE,
		],
		platforms: ALL_PLATFORMS.filter(platform => platform !== Platform.VK_PLAY),
		theme: DomainTheme.AMPVERSE,
		locales: ALL_LOCALES,
	},
]
