<template>
  <div
    data-name="pip"
    class="absolute left-0 top-0 h-full w-full"
    ref="wrapRef"
  >
    <div
      :class="{
        'left-4 right-auto flex-row-reverse': isLeftTop,
        'bottom-4 top-auto': isRightBottom,
      }"
      class="absolute right-4 top-4 flex h-[240px] sm:h-[310px]"
    >
      <div class="h-[240px] w-[440px] sm:h-[310px] sm:w-[550px]">
        <video
          id="video"
          class="h-[240px] w-full object-contain sm:h-[310px]"
          :src="videoPath"
          autoplay
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { AdvertisingPosition } from '@/core/types'
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

const isLeftTop = props.widget.advertising.position === AdvertisingPosition.LEFT_TOP_CORNER
const isRightBottom = props.widget.advertising.position === AdvertisingPosition.RIGHT_BOTTOM_CORNER
const videoPath = props.creative.attachments.video?.path
const pixelImpressions = formatPixels(props.creative?.pixels.impressions || [], props.creative)

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
		Logger.warning('Not found video element on page in PIP creative', false)
	}

	if (!videoPath) {
		Logger.warning('Not found video path in leaderboard creative', false, { path: videoPath })
	}
})
</script>
