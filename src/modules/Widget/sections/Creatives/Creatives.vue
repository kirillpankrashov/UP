<template>
  <Transition>
    <Wrapper
      v-if="creativesManager.showWrapper.value"
      :creative="creativesManager.creative.value"
      :is-updating="creativesManager.isUpdating.value"
      :widget="widget"
      :count-creatives="creativesManager.adSet.value.length"
    >
      <component
        v-if="creativesManager.creative.value"
        :key="creativesManager.creative.value?.id"
        :is="component"
        :creative="creativesManager.creative.value"
        :widget="widget.data.value"
        @start-time="onTimerStart"
        @update-current-time="onUpdateCurrentTime"
        @end-time="onTimerEnd"
      />
    </Wrapper>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdFormat } from '@/core/types'
import { Widget } from '@/modules/Widget/class/Widget'

import {
	ChatbotText,
	CpmStar,
	Custom,
	Fullscreen,
	Pip,
	Wrapper,
	YandexFS,
	YandexText,
} from './sections'

const props = defineProps<{
  widget: Widget
}>()
const creativesManager = props.widget.creativesManager

const component = computed(() => {
	switch (creativesManager.creative?.value?.adSet?.format) {
		case AdFormat.FULLSCREEN:
			return Fullscreen
		case AdFormat.PIP:
			return Pip
		case AdFormat.CUSTOM:
			return Custom
		case AdFormat.YANDEX_FS:
		case AdFormat.YANDEX_PF:
			return YandexFS
		case AdFormat.YANDEX_TEXT:
			return YandexText
		case AdFormat.CHATBOT_TEXT:
			return ChatbotText
		case AdFormat.CPMSTAR_BANNER:
			return CpmStar
		default:
			return null
	}
})

const onTimerStart = () => {
	// setTimeout(() => {
	//   if (!creativesManager.creative.value) return
	//   props.widget.screenshot.makeScreenshot(creativesManager.creative.value)
	// }, 1000 * 8)
}

const onUpdateCurrentTime = (time: number) => {
	creativesManager.timer.current.value += time * 1000
}

const onTimerEnd = () => {
	creativesManager.onPlayEnd.apply(creativesManager)
}
</script>
