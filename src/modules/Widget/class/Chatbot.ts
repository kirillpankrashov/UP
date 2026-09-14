
import { AdFormat, ErrorMessage } from '@/core/types'
import { Api } from '@/core/client'
import { Logger } from '@/core/helpers'
import { Widget } from '@/modules/Widget/class/Widget'
import type { ICreative, IDemoCreative, IPromoCreative } from '@/modules/Widget/types'

export class Chatbot {
	widget: Widget

	constructor (widget: Widget) {
		this.widget = widget
	}

	async sendMessage (creative: ICreative | IDemoCreative | IPromoCreative) {
		const delay = this.widget.data.value.stream.delay * 1000

		setTimeout(async () => {
			this.trySendMessage(creative)
		}, delay)
	}

	async trySendMessage (
		creative: ICreative | IDemoCreative | IPromoCreative,
		attempt = 1,
	) {
		if (this.widget.pusher.subscribersCount.value > 1) return

		if (!creative.impressionSlug) return

		const url = `nightbot/${this.widget.data.value.platform}/messages/ad/${creative.impressionSlug}`

		const data = this.getMessageData(creative)

		try {
			await Api.post(
				url,
				data,
				{ showMessage: false, throwOnStatusFalse: false },
			)
			Logger.debug(`Send message for: ${creative.slug}`)
		}
		catch (err) {
			if (attempt > 0) {
				setTimeout(() => {
					this.trySendMessage(creative, attempt - 1)
				}, 45 * 1000)
			}
			else {
				Logger.critical(ErrorMessage.WIDGET_MESSAGE_SEND, false, err)
			}
		}
	}

	private getMessageData (creative: ICreative | IDemoCreative | IPromoCreative) {
		if (
			[AdFormat.YANDEX_FS, AdFormat.YANDEX_PF].includes(creative.adSet.format) &&
      creative.attachments.video?.extend?.ssp
		) {
			const { bid_price, chatbot_text, pixel_clicks, product_link } = creative.attachments.video.extend.ssp

			return {
				bid_price,
				chatbot_text,
				pixel_clicks,
				product_url: product_link,
			}
		}

		if (
			creative.adSet.format === AdFormat.YANDEX_TEXT &&
      creative.attachments.unit?.extend?.ssp
		) {
			const { bid_price, chatbot_text, pixel_clicks, product_link } = creative.attachments.unit.extend.ssp

			return {
				bid_price,
				chatbot_text,
				pixel_clicks,
				product_url: product_link,
			}
		}

		return undefined
	}

	async sendFreemiumMessage (message: string) {
		if (this.widget.pusher.subscribersCount.value > 1) return

		const url = `nightbot/${this.widget.data.value.platform}/messages/freemium/${this.widget.slug}`

		try {
			await Api.post(url, { message }, { showMessage: false, throwOnStatusFalse: false })
		}
		catch (err) {
			Logger.critical(ErrorMessage.WIDGET_FREEMIUM_MESSAGE_SEND, false, err)
		}
	}
}
