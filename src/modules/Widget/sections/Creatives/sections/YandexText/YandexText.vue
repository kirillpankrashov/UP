<template>
  <div
    ref="wrapRef"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Logger } from '@/core/helpers'
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

const metacount = props.creative?.attachments?.unit?.extend?.metacount
const rtbcount = props.creative?.attachments?.unit?.extend?.rtbcount
const pixelImpressions = props.creative?.attachments?.unit?.extend?.pixel_impressions

const callPixel = (id: string, src: string) => {
	try {
		const oldPixel = document.getElementById(id)
		if (oldPixel) oldPixel.remove()

		const url = new URL(src)

		const img = document.createElement('img')
		img.id = id
		img.width = 1
		img.height = 1
		img.src = url.href
		wrapRef.value?.appendChild(img)
	}
	catch (err) {
		Logger.error(`Error adding pixel: ${src}`, false, err)
	}
}

onMounted(() => {
	if (metacount) {
		callPixel('metacount', metacount)
	}

	if (rtbcount) {
		setTimeout(() => callPixel('rtbcount', rtbcount), 2000)
	}

	if (pixelImpressions) {
		for (let i = 0; i < pixelImpressions.length; i++) {
			const pixel = pixelImpressions[i]
			callPixel('pixel-impression-' + i, pixel)
		}
	}

	Logger.debug('Yandex Text mounted')

	setTimeout(() => {
		Logger.debug('Yandex Text timeout')
		emit('end-time')
	}, 3000)
})
</script>
