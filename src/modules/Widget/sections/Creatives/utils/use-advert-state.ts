import { computed } from 'vue'

import { AdFormat } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { Widget } from '@/modules/Widget/class/Widget'
import { messages } from '@/modules/Widget/locales'
import type { ICreative, IDemoCreative } from '@/modules/Widget/types'

import { useTime } from './use-time'

export const useAdvertState = (widget: Widget) => {
	const { t } = useLocale<typeof messages>(messages)

	const creativesManager = widget.creativesManager
	const { time } = useTime(creativesManager)
	const platform = widget.data.value.platform

	const streamerName = computed(() => {
		const name = widget.data.value[platform]?.displayname ||
      widget.data.value.streamer?.name ||
      'DemoStreamer'

		return name
	})

	const mainText = computed(() => {
		return `${t('widget.adForSupport')} ${streamerName.value}`
	})

	const introTimer = computed(() => {
		return `${t('widget.willStartIn')} ${time.value}`
	})

	const playingTimer = computed(() => {
		const one = widget.creativesManager.currentCreativeIndex.value + 1
		const of = t('widget.of')
		const length = (creativesManager.adSet.value as (ICreative | IDemoCreative)[]).filter(ad => ![AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(ad.adSet.format)).length

		if (!time.value) {
			return `• ${one} ${of} ${length}`
		}
		return `• ${one} ${of} ${length} • ${time.value}`
	})

	const timerText = computed(() => {
		if (widget.creativesManager.isIntro.value) {
			return introTimer.value
		}
		return playingTimer.value
	})

	const state = computed(() => {
		return `${mainText.value} ${timerText.value}`
	})

	return { state }
}
