import { AdFormat } from '@/core/types'
import { Analytic, Logger } from '@/core/helpers'
import { responseDemoToCreativeAdapter, responseToCreativeAdapter } from '@/modules/Widget/adapters/creative'
import * as WidgetApi from '@/modules/Widget/api'
import { Widget } from '@/modules/Widget/class/Widget'
import type {
	ICreative,
	ICreativeResponse,
	ICreativesResponse,
	IDemoCreativeResponse,
	IPromoCreativeResponse,
	IPusherSuccessEvent,
	IRealDemoCreativeResponse,
	ISspStreamInfo,
	IStreamInfo,
} from '@/modules/Widget/types'

import { AdFrequencyMap } from '../constants/ad-frequency-map'

type DemoCreativeType = IDemoCreativeResponse | IRealDemoCreativeResponse

const SKIP_TOKEN_CLEAR_INTERVAL = 1000 * 60 * 60

export class Preparer {
	widget: Widget
	private lastSspMediaCreativeId: null | number = null
	private interval: NodeJS.Timeout | null = null

	constructor (widget: Widget) {
		this.widget = widget

		this.interval = setInterval(() => {
			this.lastSspMediaCreativeId = null
		}, SKIP_TOKEN_CLEAR_INTERVAL)
	}

	prepareDemoCreatives (event: IPusherSuccessEvent<DemoCreativeType[]>) {
		const ad = event.data.map((item: DemoCreativeType) => responseDemoToCreativeAdapter(item))
		this.widget.creativesLoop.addDemo(ad)
	}

	preparePromoCreatives (event: IPusherSuccessEvent<IPromoCreativeResponse[]>) {
		const ad = event.data.map((item: IPromoCreativeResponse) => responseDemoToCreativeAdapter(item))
		this.widget.creativesLoop.addAd(ad)
	}

	async prepareCreatives (event: IPusherSuccessEvent<ICreativesResponse>) {
		const { items: creatives, stream } = event.data

		this.findLowestFrequency(creatives)

		Logger.debug('event.data', false, event.data)

		const resolvedCreatives: ICreative[] = []

		for (const creative of creatives) {
			let preparedCreative = null

			if ([AdFormat.YANDEX_PF, AdFormat.YANDEX_FS].includes(creative.ad_set.format)) {
				preparedCreative = await this.prepareSspMediaCreative(creative, stream)
			}
			else if (creative.ad_set.format === AdFormat.YANDEX_TEXT) {
				if (!this.widget.isLowFrequency) {
					preparedCreative = await this.prepareSspTextCreative(creative, stream)
				}
			}
			else if (creative.ad_set.format === AdFormat.CPMSTAR_BANNER) {
				preparedCreative = await this.prepareCpmStarCreative(creative, stream)
			}
			else if (creative.ad_set.format === AdFormat.CHATBOT_TEXT) {
				if (!this.widget.isLowFrequency) {
					preparedCreative = await this.prepareAwarenessCreative(creative, stream)
				}
			}
			else {
				preparedCreative = await this.prepareAwarenessCreative(creative, stream)
			}

			if (preparedCreative) {
				Analytic.ga('ecommerce:addItem', {
					id: preparedCreative.uuid,
					name: preparedCreative.slug,
					price: preparedCreative.viewersCount,
					quantity: '1',
				})

				resolvedCreatives.push(preparedCreative)
			}
		}

		Logger.debug('resolvedCreatives', false, resolvedCreatives)

		this.widget.creativesLoop.addAd(resolvedCreatives)
	}

	private findLowestFrequency (creatives: ICreativeResponse[]) {
		const lowestFrequency = Math.min(...creatives.map(creative => AdFrequencyMap[creative.ad_set.frequency]))
		const streamerFrequency = this.widget.data.value.advertising.frequency * 1000 * 60

		if (lowestFrequency < this.widget.frequency && lowestFrequency >= streamerFrequency) {
			this.widget.frequency = lowestFrequency
		}
	}

	private prepareAwarenessCreative (payload: ICreativeResponse, stream: IStreamInfo) {
		return responseToCreativeAdapter(payload, stream)
	}

	private async prepareSspMediaCreative (payload: ICreativeResponse, stream: IStreamInfo) {
		try {
			const params: ISspStreamInfo = {
				...stream,
				...payload.attachments.video?.extend?.stream,
				platform: this.widget.data.value.platform,
				allow_adult_content: this.widget.data.value.allowAdultContent,
				debug: this.widget.isDebug.value,
				impression_slug: payload.impression_slug,
			}

			if (this.lastSspMediaCreativeId) {
				params.skip_token = this.lastSspMediaCreativeId
			}

			const sspCreative = await WidgetApi.fetchSspMediaCreative(params)

			if (sspCreative && sspCreative.vast_path) {
				if (sspCreative?.id) {
					this.lastSspMediaCreativeId = sspCreative.id
				}

				if (
					payload.attachments.video &&
          payload.attachments.video?.extend &&
          sspCreative.vast_path
				) {
					payload.attachments.video.path = sspCreative.vast_path
					payload.attachments.video.extend.ssp = sspCreative
					payload.attachments.video.properties.duration = (sspCreative.duration || 0) + 0.1
					payload.attachments.video.extend.metacount = sspCreative.meta_count
					payload.attachments.video.extend.rtbcount = sspCreative.rtb_count
					payload.attachments.video.extend.pixel_impressions = sspCreative.pixel_impressions
					payload.ad_set.advertiser.legal_name = this.transformAdvertiserText(sspCreative.advertiser)

					return responseToCreativeAdapter(payload, stream)
				}
			}

			return null
		}
		catch (error) {
			Logger.error('Error preparing Ssp Media Creative', false, error)
			return null
		}
	}

	private async prepareSspTextCreative (payload: ICreativeResponse, stream: IStreamInfo) {
		try {
			const params: ISspStreamInfo = {
				...stream,
				...payload.attachments.unit?.extend?.stream,
				platform: this.widget.data.value.platform,
				allow_adult_content: this.widget.data.value.allowAdultContent,
				debug: this.widget.isDebug.value,
				impression_slug: payload.impression_slug,
			}

			const sspCreative = await WidgetApi.fetchSspTextCreative(params)

			if (sspCreative) {
				if (
					payload.attachments.unit &&
          payload.attachments.unit?.extend
				) {
					payload.attachments.unit.extend.ssp = sspCreative
					payload.attachments.unit.extend.metacount = sspCreative.meta_count
					payload.attachments.unit.extend.rtbcount = sspCreative.rtb_count
					payload.attachments.unit.extend.pixel_impressions = sspCreative.pixel_impressions

					return responseToCreativeAdapter(payload, stream)
				}
			}

			return null
		}
		catch (error) {
			Logger.error('Error preparing Ssp Text Creative', false, error)
			return null
		}
	}

	private async prepareCpmStarCreative (payload: ICreativeResponse, stream: IStreamInfo) {
		try {
			const params: ISspStreamInfo = {
				...stream,
				...payload.attachments.unit?.extend?.stream,
				platform: this.widget.data.value.platform,
				allow_adult_content: this.widget.data.value.allowAdultContent,
				debug: this.widget.isDebug.value,
				impression_slug: payload.impression_slug,
			}

			const cpmStarCreative = await WidgetApi.fetchCpmStarCreative(params)

			if (cpmStarCreative) {
				if (
					payload.attachments.unit &&
					payload.attachments.unit?.extend &&
					cpmStarCreative.payload
				) {
					payload.attachments.unit.path = cpmStarCreative.payload
					payload.attachments.unit.extend.cpmStar = cpmStarCreative
					payload.attachments.unit.properties.duration = (cpmStarCreative.duration || 0)
					payload.attachments.unit.extend.metacount = cpmStarCreative.meta_count
					// creative.attachments.unit.extend.rtbcount = cpmStarCreative.rtb_count
					payload.attachments.unit.extend.rtbcount = ''
					payload.attachments.unit.extend.pixel_impressions = cpmStarCreative.pixel_impressions
					payload.ad_set.advertiser.legal_name = this.transformAdvertiserText(cpmStarCreative.advertiser)

					return responseToCreativeAdapter(payload, stream)
				}
			}

			return null
		}
		catch (error) {
			Logger.error('Error preparing Cpm Star Creative', false, error)
			return null
		}
	}

	private transformAdvertiserText (text: string) {
		return 'Реклама ' + text
			.replace(/общество с ограниченной ответственностью/i, 'ООО')
			.replace('INN', 'ИНН')
	}
}
