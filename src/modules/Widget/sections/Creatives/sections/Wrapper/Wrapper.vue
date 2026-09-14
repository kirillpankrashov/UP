<template>
  <div
    data-name="wrapper"
    class="fixed bottom-0 left-0 h-full w-full"
    :class="{'bg-black': blacked}"
  >
    <slot />

    <AdvertState
      v-if="!isCompleted"
      :widget="widget"
      :is-intro="!creative && !isUpdating"
    />
    <Loader
      v-if="!isCompleted"
      :widget="widget"
    />
    <QrCode
      v-if="creative?.qr?.code && creative?.qr?.link"
      :link="creative?.qr?.link"
      :creative="creative"
      :widget="widget"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdFormat } from '@/core/types'
import { Widget } from '@/modules/Widget/class/Widget'
import type { ICreative, IDemoCreative } from '@/modules/Widget/types'

import { AdvertState, Loader, QrCode } from './sections'

const props = defineProps<{
  widget: Widget
  creative: ICreative | IDemoCreative | null
  isUpdating: boolean
  countCreatives?: number
}>()

const blacked = computed(() => {
	return props.creative?.adSet.format === AdFormat.FULLSCREEN &&
    !props.creative.attachments.video?.path.includes('.webm') &&
    props.countCreatives &&
    props.countCreatives > 1
})

const isCompleted = computed(() => {
	const currentIdx = props.widget.creativesManager.currentCreativeIndex.value + 1
	const mediaCreatives = (props.widget.creativesManager.adSet.value as (ICreative | IDemoCreative)[]).filter(ad => ![AdFormat.YANDEX_TEXT, AdFormat.CHATBOT_TEXT].includes(ad.adSet.format))

	return currentIdx > mediaCreatives.length
})
</script>
