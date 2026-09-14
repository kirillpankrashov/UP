import { CurrencyName, DomainName, DomainTheme, DomainURL, Locale, Role } from '@/core/types'
import { ALL_LOCALES, ALL_PLATFORMS, ELEMENT_PLUS_LOCALES } from '@/core/config'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import type { IAppStoreState } from '../app'

export const appStoreData: IAppStoreState = {
	loaded: true,
	uiLocale: ELEMENT_PLUS_LOCALES[Locale.EN],
	appLocale: Locale.EN,
	domain: 	{
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
	currency: CurrencyName.USD,
	auth: {
		locale: Locale.EN,
		role: Role.STREAMER,
		user: profileData,
	},
	alerts: {
		adblock: false,
	},
	isDemo: false,
	debugActive: true,
	isMobile: false,
}
