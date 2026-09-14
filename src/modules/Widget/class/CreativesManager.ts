import { computed, type Ref, ref } from 'vue'

import { AdFormat, ErrorMessage } from '@/core/types'
import { Analytic, isSspMediaFormat, Logger } from '@/core/helpers'
import { Chatbot } from '@/modules/Widget/class/Chatbot'
import { CreativeTimer } from '@/modules/Widget/class/CreativeTimer'
import { Widget } from '@/modules/Widget/class/Widget'
import { CHATBOT_TEXT_DELAY, YandexTextDelay } from '@/modules/Widget/constants/delays'
import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'
import { getCreativeDuration } from '@/modules/Widget/utils/get-creative-duration'
import { preloadCreatives } from '@/modules/Widget/utils/preload'
import { wait } from '@/modules/Widget/utils/wait'

export class CreativesManager {
	widget: Widget
	chatbot: Chatbot
	timer: CreativeTimer = new CreativeTimer()
	adSet: Ref<ICreative[] | IDemoCreative[] | IPromoCreative[]> = ref([])
	creative: Ref<ICreative | IDemoCreative | null> = ref(null)
	isUpdating: Ref<boolean> = ref(false)
	currentCreativeIndex: Ref<number> = ref(-1)
	isPreloading: Ref<boolean> = ref(false)
	isPlaying: Ref<boolean> = ref(false)
	isIntro: Ref<boolean> = ref(false)
	showWrapper: Ref<boolean>

	constructor (widget: Widget) {
		this.widget = widget
		this.chatbot = new Chatbot(widget)

		this.showWrapper = computed(() => {
			return this.isPlaying.value || this.isIntro.value
		})
	}

	async preload<T extends ICreative | IDemoCreative | IPromoCreative> (
		adSet: Array<T>,
	): Promise<{ preloaded: Array<T> }> {
		this.isPreloading.value = true
		const { preloaded } = await preloadCreatives(adSet)
		this.isPreloading.value = false
		return { preloaded }
	}

	async displayAd (adSet: ICreative[] | IPromoCreative[], whenDisplay = 0) {
		if (whenDisplay === 0) {
			await this.playCreatives(adSet)
		}
		else {
			const waitingInterval = setInterval(async () => {
				const now = new Date().getTime()
				if (whenDisplay < now) {
					clearInterval(waitingInterval)
					await this.playIntro(20 * 1000, adSet[0])
					await this.playCreatives(adSet)
				}
			}, 1000)
		}
	}

	async displayDemo (demo: IDemoCreative[]) {
		await this.playIntro(5 * 1000)
		await this.playCreatives(demo)
	}

	async playIntro (time: number, creative?: ICreative | IPromoCreative) {
		if (creative?.adSet.format && [AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(creative.adSet.format)) {
			return
		}

		this.isIntro.value = true
		this.timer.reset(time)
		await this.timer.play()
		this.isIntro.value = false
	}

	async playCreatives (adSet: ICreative[] | IDemoCreative[] | IPromoCreative[]) {
		this.adSet.value = adSet
		const totalTime = getCreativeDuration(this.adSet.value)

		this.isPlaying.value = true
		this.timer.reset(totalTime)
		this.nextCreative()
	}

	async onPlayEnd () {
		if (this.creative.value?.slug && this.creative.value?.slug !== 'Demo') {
			Analytic.ga('ecommerce:addTransaction', {
				id: this.creative.value.uuid,
				affiliation: this.widget?.data.value.streamer?.name,
				revenue: this.creative.value?.viewersCount,
			})
		}

		this.timer.stop()
		await this.nextCreative()
	}

	async nextCreative () {
		const index = this.increaseCreativeIndex()

		if (index === this.adSet.value.length) {
			this.finish()
			return
		}

		const creative = this.adSet.value[index]

		if (isSspMediaFormat(creative.adSet.format)) {
			this.setCreative(null)
			this.isUpdating.value = true

			await wait(100)

			this.isUpdating.value = false

			this.switchCreative(creative)

			return
		}
		else if ([AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(creative.adSet.format)) {
			this.setCreative(null)
			this.isUpdating.value = false

			await wait(this.getTextCreativeDelay(creative))

			this.switchCreative(creative)

			return
		}

		this.switchCreative(creative)
	}

	private getTextCreativeDelay (creative: ICreative | IDemoCreative) {
		if (creative.adSet.format === AdFormat.YANDEX_TEXT) {
			if (this.widget.data.value.sspTextFrequency === 1) {
				return YandexTextDelay.ONE
			}
			if (this.widget.data.value.sspTextFrequency === 2) {
				return YandexTextDelay.TWO
			}
			if (this.widget.data.value.sspTextFrequency === 3) {
				return YandexTextDelay.THREE
			}
		}

		return CHATBOT_TEXT_DELAY
	}

	private async switchCreative (creative: ICreative | IDemoCreative) {
		if (creative) {
			if (![AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(creative.adSet.format)) {
				this.widget.screenshot.makeScreenshot(creative)
			}

			this.setCreative(creative)
			this.chatbot.sendMessage(creative)

			if ([AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(creative.adSet.format)) {
				return
			}

			await this.startImageTimer(creative)
		}
	}

	increaseCreativeIndex () {
		this.currentCreativeIndex.value += 1
		return this.currentCreativeIndex.value
	}

	setCreative (creative: ICreative | IDemoCreative | IPromoCreative | null) {
		this.creative.value = creative
		return this.creative.value
	}

	async startImageTimer (creative: ICreative | IDemoCreative | IPromoCreative) {
		const hasUnitDuration = creative.attachments.unit?.properties?.duration
		const hasVideoDuration = creative.attachments.video?.properties?.duration
		const isImage = !hasUnitDuration && !hasVideoDuration

		if (isImage) {
			await this.timer.play(15 * 1000)
			await this.onPlayEnd()
		}
	}

	finish () {
		if (!this.creative.value) {
			Logger.warning(ErrorMessage.WIDGET_UNDEFINED_CREATIVE, false, { slug: this.widget.slug })
		}
		else if (this.creative.value.slug !== 'Demo') {
			Analytic.ga('ecommerce:send', {
				id: this.creative.value.uuid,
				affiliation: this.widget.data.value.streamer?.name,
				revenue: this.creative.value?.viewersCount,
			})
			Analytic.dataLayer({ event: 'viewAds' })
		}

		this.timer.reset()
		this.isPlaying.value = false
		this.isIntro.value = false
		this.currentCreativeIndex.value = -1
		this.creative.value = null

		if (this.widget.initialFrequency !== this.widget.frequency && !this.widget.isManual) {
			this.widget.restartWithNewFrequency(this.widget.frequency)
		}
	}
}
