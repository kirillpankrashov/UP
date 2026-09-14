<template>
  <div
    data-name="fullscreen"
    class="absolute left-0 top-0 h-full w-full"
    ref="wrapRef"
  >
    <div class="h-full w-full">
      <video
        v-if="isVideo"
        class="h-full w-full object-cover"
        id="video"
        :src="path"
        autoplay
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Logger } from '@/core/helpers'
import { useInterval, usePixels } from '@/modules/Widget/sections/Creatives/utils'
import type { ICreative, IDemoCreative, IWidget } from '@/modules/Widget/types'

const props = defineProps<{
  creative: ICreative | IDemoCreative
  widget: IWidget
}>()

const emit = defineEmits<{
  (e: 'start-time'): void
  (e: 'end-time'): void
  (e: 'update-current-time', value: number): void
}>()

const wrapRef = ref<HTMLDivElement | null>(null)

const { formatPixels, callImpressionPixels } = usePixels()

const path = props.creative.attachments.video?.path
const isVideo = path?.includes('.mp4') || path?.includes('.webm')
const pixelImpressions = formatPixels(props.creative?.pixels.impressions || [], props.creative)

if (!isVideo) {
	Logger.warning('File has undefined format in video creative', false, { path })
	emit('end-time')
}

onMounted(() => {
	const video = document.getElementById('video') as HTMLVideoElement
	if (video) {
		const { startInterval } = useInterval(
			video,
			emit,
		)
		startInterval()

		emit('start-time')

		callImpressionPixels(pixelImpressions, wrapRef)
	}
	else {
		Logger.warning('Not found video element on page in video creative', false)
	}
})
</script>
