import * as Sentry from '@sentry/vue'
import type { Language } from 'element-plus/es/locale'
import { defineStore } from 'pinia'

import { CampaignType, CurrencyName, type IDomain, Locale, Role, type TUser } from '@/core/types'
import { saveLocale } from '@/core/api'
import { ELEMENT_PLUS_LOCALES } from '@/core/config'
import { AUTH_IS_DEMO, getDomain, getRole, getToken } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import { useDictStore } from './dict'

export interface IAppStoreState {
	loaded: boolean
	uiLocale: Language
	appLocale: Locale
	domain: IDomain | null
	currency: CurrencyName
	auth: {
		locale: Locale
		role: Role | null
		user: TUser | null
	}
	alerts: {
		adblock: boolean
	}
	isDemo: boolean
	debugActive: boolean
	isMobile: boolean | null
}

export const useAppStore = () => {
	return defineStore('app', {
		state: (): IAppStoreState => ({
			loaded: false,
			uiLocale: ELEMENT_PLUS_LOCALES[Locale.EN],
			appLocale: Locale.EN,
			domain: null,
			currency: CurrencyName.USD,
			auth: {
				locale: localStorage.getItem('locale') as Locale || Locale.EN,
				role: getRole(),
				user: null,
			},
			alerts: {
				adblock: false,
			},
			isDemo: !!localStorage.getItem(AUTH_IS_DEMO),
			debugActive: false,
			isMobile: null,
		}),

		actions: {
			setIsLoaded () {
				this.loaded = true
			},

			setCurrentDomain () {
				this.domain = getDomain()
			},

			setUILocale (locale: Locale) {
				this.uiLocale = ELEMENT_PLUS_LOCALES[locale]
			},

			async setLocale (locale: Locale) {
				this.setUILocale(locale)
				this.appLocale = locale

				localStorage.setItem('locale', locale)

				i18n.global.locale.value = locale

				if (this.auth.user) {
					saveLocale(locale)
				}
				const dictStore = useDictStore()
				dictStore.getAllDictionaries(locale)
			},

			async fetchUser () {
				if (!getToken()) return

				if (this.auth.role === Role.STREAMER) {
					const streamerStore = useStreamerStore()
					await streamerStore.fetchProfile()

					this.debugActive = streamerStore.profile?.debugActive || false
					this.auth.user = streamerStore.profile
					this.currency = streamerStore.profile?.currency || CurrencyName.USD
				}
				if (this.auth.role === Role.PARTNER) {
					const dictStore = useDictStore()
					const partnerStore = usePartnerStore()

					await partnerStore.fetchProfile()

					this.debugActive = partnerStore.profile?.debugActive || false
					this.auth.user = partnerStore.profile
					this.currency = partnerStore.profile?.currency || CurrencyName.USD

					dictStore.getCampaignDictionary(this.appLocale, CampaignType.BRAND_AWARENESS)
				}

				Sentry.setUser({
					id: this.auth.user?.userId,
					email: this.auth.user?.email,
					username: this.auth.user?.username,
				})

				Sentry.setTag('domain', this.auth.user?.domain)
				Sentry.setTag('role', this.auth.role)
			},

			showAdblockAlert () {
				this.alerts.adblock = true
			},

			setDebugActive (active: boolean) {
				this.debugActive = active
			},

			setIsMobile () {
				const _checkIsMobile = () => this.isMobile = window.innerWidth < 640
				window.addEventListener('load', _checkIsMobile)
				window.addEventListener('resize', _checkIsMobile)
			},
		},
	})()
}
