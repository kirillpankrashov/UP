import * as Sentry from '@sentry/vue'
import axios from 'axios'
import { isEqual } from 'lodash'
import { defineStore } from 'pinia'

import { Platform } from '@/core/types'
import { Analytic, Logger } from '@/core/helpers'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import * as SettingsApi from '@/modules/Streamer/views/Settings/api'
import { type TWidgetSettings } from '@/modules/Streamer/views/Settings/api'

type TStatus = {
	sending: boolean
	success: boolean
}

export interface ISettingsState {
	isFetching: boolean
	widget: null | TWidgetSettings
	obsDockUrl: string | null
	checkingChatbot: boolean
	togglingChatbot: boolean
	messagePreview: TStatus
	widgetPreview: TStatus
	checkingBrandisExtension: boolean
	checkingExtension: boolean
	manual: TStatus
	obsLink: TStatus
	youtubeText: TStatus & { blacklist: string}
}

export const useSettingsStore = defineStore('settings', {
	state: (): ISettingsState => ({
		isFetching: false,
		widget: null,
		obsDockUrl: null,
		checkingChatbot: false,
		togglingChatbot: false,
		messagePreview: {
			sending: false,
			success: false,
		},
		widgetPreview: {
			sending: false,
			success: false,
		},
		checkingBrandisExtension: false,
		checkingExtension: false,
		manual: {
			sending: false,
			success: false,
		},
		obsLink: {
			sending: false,
			success: false,
		},
		youtubeText: {
			blacklist: '',
			sending: false,
			success: false,
		},
	}),

	actions: {
		async fetchWidget () {
			if (this.widget) {
				return
			}

			try {
				this.isFetching = true
				this.widget = await SettingsApi.getWidget()
				this.obsDockUrl = `${location.origin}/obs-dock/${this.widget.obsDockSlug}`

				Sentry.setTag('platform', this.widget.platform)
				Sentry.setContext('Widget', {
					slug: this.widget.slug,
					platform: this.widget.platform,
				})
			}
			catch(err) {
				Logger.error('Error fetching user widget', true, err)
			}
			finally {
				this.isFetching = false
			}
		},

		async updateWidget () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			if (this.isFetching) {
				return
			}

			try {
				this.isFetching = true
				await SettingsApi.updateWidget(this.widget)
			}
			catch(err) {
				Logger.error('Error updating user widget', true, err)
			}
			finally {
				this.isFetching = false
			}
		},

		setWidgetData (data: SettingsApi.TWidgetSettingsResponse) {
			const widgetData = SettingsApi.getWidgetAdapter(data)

			if (isEqual(this.widget, widgetData)) {
				return
			}

			this.widget = widgetData
			this.obsDockUrl = `${location.origin}/obs-dock/${this.widget.obsDockSlug}`
		},

		toggleChatbot () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			const _callAnalytics = () => {
				Analytic.vkgoal('customize_product')
				Analytic.fbq('track', 'CustomizeProduct')
			}

			if (this.widget.platform === Platform.TWITCH) {
				if (this.widget.nightbot.twitch.connected) {
					this.disconnectChatbot()
				}
				else {
					this.connectChatbot()
					_callAnalytics()
				}
			}

			if (this.widget.platform === Platform.YOUTUBE) {
				if (this.widget.nightbot.youtube.connected) {
					this.disconnectChatbot()
				}
				else {
					this.connectChatbot()
					_callAnalytics()
				}
			}

			if (this.widget.platform === Platform.TROVO) {
				if (this.widget.nightbot.trovo.connected) {
					this.disconnectChatbot()
				}
				else {
					this.connectChatbot()
					_callAnalytics()
				}
			}

			if (this.widget.platform === Platform.VK_PLAY) {
				if (this.widget.nightbot.vkplay.connected) {
					this.disconnectChatbot()
				}
				else {
					this.connectChatbot()
					_callAnalytics()
				}
			}

			if (this.widget.platform === Platform.TIKTOK) {
				if (this.widget.nightbot.tiktok.connected) {
					this.disconnectChatbot()
				}
				else {
					this.connectChatbot()
					_callAnalytics()
				}
			}
		},

		async connectChatbot () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.togglingChatbot = true
				const res = await SettingsApi.connectChatbot(this.widget.platform)
				window.location.href = res.src
			}
			catch(err) {
				Logger.error('Error connecting chatbot', true, err)
			}
			finally {
				this.togglingChatbot = false
			}
		},

		async disconnectChatbot () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.togglingChatbot = true
				await SettingsApi.disconnectChatbot(this.widget.platform)
				this.fetchWidget()
			}
			catch(err) {
				Logger.error('Error disconnecting chatbot', true, err)
			}
			finally {
				this.togglingChatbot = false
			}
		},

		async checkChatbot () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.checkingChatbot = true
				await SettingsApi.checkChatbot(this.widget.platform)
				this.fetchWidget()
			}
			catch(err) {
				Logger.error('Error checking chatbot', true, err)
			}
			finally {
				this.checkingChatbot = false
			}
		},

		async sendMessagePreview () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.messagePreview.sending = true
				await SettingsApi.sendMessagePreview(this.widget.platform)
				this.messagePreview.success = true
				setTimeout(() => this.messagePreview.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error sending test meesage to chatbot', true, err)
			}
			finally {
				this.messagePreview.sending = false
			}
		},

		async sendWidgetPreview () {
			try {
				this.widgetPreview.sending = true
				await SettingsApi.sendWidgetPreview()
				this.widgetPreview.success = true
				setTimeout(() => this.widgetPreview.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error sending preview to widget', true, err)
			}
			finally {
				this.widgetPreview.sending = false
			}
		},

		async checkBrandisExtension () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			if (this.checkingBrandisExtension) {
				return
			}

			try {
				this.checkingBrandisExtension = true
				const status = await SettingsApi.checkBrandisExtension()

				if (status?.changed) {
					// TODO: refetch streamer campaigns
					// dispatch('campaigns/fetchCampaigns', {}, { root: true })
					this.widget.brandisExtensionEnabled = status.activation
				}
			}
			catch(err) {
				Logger.error('Error checking Brandis extension status', true, err)
			}
			finally {
				this.checkingBrandisExtension = false
			}
		},

		async checkExtension () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			if (this.checkingExtension) {
				return
			}

			try {
				this.checkingExtension = true
				const status = await SettingsApi.checkExtension()

				if (status?.changed) {
					// TODO: refetch streamer campaigns
					// dispatch('campaigns/fetchCampaigns', {}, { root: true })
					this.widget.extensionEnabled = status.activation
				}
			}
			catch(err) {
				Logger.error('Error checking extension status', true, err)
			}
			finally {
				this.checkingExtension = false
			}
		},

		async sendManual () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.manual.sending = true
				await SettingsApi.sendManual()
				this.manual.success = true
				setTimeout(() => this.manual.success = false, 1500)
			}
			catch(err) {
				if (typeof err === 'object' && err !== null && 'code' in err) {
					const isDisabled = err.code === 'ADS_ERRORS_DISABLE'

					if (isDisabled) {
						return
					}
				}

				Logger.error('Error sending manual ad', true, err)
			}
			finally {
				this.manual.sending = false
			}
		},

		async refreshObsLink () {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			try {
				this.obsLink.sending = true
				await SettingsApi.refreshObsLink()
				this.obsLink.success = true
				setTimeout(() => this.obsLink.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error refreshing link in OBS', true, err)
			}
			finally {
				this.obsLink.sending = false
			}
		},

		async fetchYoutubeTextBlackList () {
			if (process.env.NODE_ENV !== 'production') {
				Logger.error('Youtube Text service available only in production', true)
				return
			}

			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			const streamer = useStreamerStore()

			if (!streamer.profile) {
				Logger.error('There is no streamer data yet', true)
				return
			}

			if (!streamer.profile.youtubeTextActive) {
				return
			}

			try {
				this.youtubeText.sending = true
				this.youtubeText.blacklist = await SettingsApi.fetchYoutubeTextBlackList(streamer.profile.userId)

				this.youtubeText.success = true
				setTimeout(() => this.youtubeText.success = false, 1500)
			}
			catch(err) {
				const axiosError = (err as any).origin
				if (axios.isAxiosError(axiosError) && axiosError.response?.status === 404) {
					return
				}
				Logger.error('Error fetching youtube blacklist', true, err)
			}
			finally {
				this.youtubeText.sending = false
			}
		},

		async updateYoutubeTextBlackList (blacklist: string) {
			if (process.env.NODE_ENV !== 'production') {
				Logger.error('Youtube Text service available only in production', true)
				return
			}

			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			const streamer = useStreamerStore()

			if (!streamer.profile) {
				Logger.error('There is no streamer data yet', true)
				return
			}

			if (!streamer.profile.youtubeTextActive) {
				return
			}

			try {
				this.youtubeText.sending = true
				await SettingsApi.updateYoutubeTextBlackList(streamer.profile.userId, blacklist)

				this.youtubeText.success = true
				setTimeout(() => this.youtubeText.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error updating youtube blacklist', true, err)
			}
			finally {
				this.youtubeText.sending = false
			}
		},

		async toggleYoutubeText (status: boolean) {
			if (!this.widget) {
				Logger.error('There is no widget yet', true)
				return
			}

			const streamer = useStreamerStore()

			if (!streamer.profile) {
				Logger.error('There is no streamer data yet', true)
				return
			}

			try {
				this.youtubeText.sending = true
				await SettingsApi.toggleYoutubeText(status)

				streamer.profile.youtubeTextActive = status

				this.youtubeText.success = true
				setTimeout(() => this.youtubeText.success = false, 1500)
			}
			catch(err) {
				Logger.error('Error updating youtube text status', true, err)
			}
			finally {
				this.youtubeText.sending = false
			}
		},
	},
})
