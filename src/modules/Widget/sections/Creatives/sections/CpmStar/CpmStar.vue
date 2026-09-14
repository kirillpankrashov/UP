<template>
  <div
    data-name="custom"
    class="absolute left-0 top-0 h-full w-full"
    ref="wrapRef"
  >
    <div class="h-full w-full">
      <component
        class="h-full w-full"
        id="custom"
        :is="wrapper"
        :banner="path"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { sample } from 'lodash'

import { Logger } from '@/core/helpers'
import { usePixels } from '@/modules/Widget/sections/Creatives/utils'
import type { ICreative, IWidget } from '@/modules/Widget/types'

import { Clouds, Flash } from './components'

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
const wrapper = shallowRef(sample([Clouds, Flash]))

const { formatPixels, callImpressionPixels } = usePixels()

const path = props.creative.attachments.unit?.extend?.cpmStar?.payload || ''
const pixelImpressions = formatPixels(props.creative?.pixels.impressions || [], props.creative)

if (!path) {
	Logger.warning('Not found path in cpm star creative', false, { path })
}

onMounted(() => {
	const frame = document.getElementById('custom') as HTMLIFrameElement

	if (!frame) return

	emit('start-time')

	callImpressionPixels(pixelImpressions, wrapRef)
})
</script>
