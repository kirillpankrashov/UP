<template>
  <div
    data-name="custom"
    class="absolute left-0 top-0 h-full w-full"
    ref="wrapRef"
  >
    <div class="h-full w-full">
      <iframe
        class="h-full w-full"
        id="custom"
        :src="path"
        ref="iframe"
        frameborder="0"
        scrolling="no"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Logger } from '@/core/helpers'
import { usePixels } from '@/modules/Widget/sections/Creatives/utils'
import type { ICreative, IWidget } from '@/modules/Widget/types'

const props = defineProps<{
  creative: ICreative
  widget: IWidget
}>()

const emit = defineEmits<{
  (e: 'start-time'): void
  (e: 'end-time'): void
  (e: 'update-current-time', value: number): void
}>()

const wrapRef = ref<HTMLDivElement | null>(null)

const { formatPixels, callImpressionPixels } = usePixels()

const path = props.creative.attachments.zip?.path
const pixelImpressions = formatPixels(props.creative?.pixels.impressions || [], props.creative)

if (!path) {
	Logger.warning('Not found path in custom creative', false, { path })
}

onMounted(() => {
	const frame = document.getElementById('custom') as HTMLIFrameElement

	if (!frame) return

	emit('start-time')

	callImpressionPixels(pixelImpressions, wrapRef)

	setTimeout(() => {
		frame.contentWindow?.postMessage({
			call: 'sendValue',
			data: {
				username: props.widget[props.widget.platform]?.nickname || props.widget?.streamer?.name,
				signedUp: props.widget?.streamer?.signed_up,
				lang: props.widget?.streamer?.language,
				title: props.creative?.stream?.title,
			},
		}, '*')
	}, 800)
})
</script>
