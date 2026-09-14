<template>
  <div
    ref="wrapRef"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Logger } from '@/core/helpers'
import type { ICreative, IDemoCreative, IWidget } from '@/modules/Widget/types'

defineProps<{
  creative: ICreative | IDemoCreative
  widget: IWidget
}>()

const emit = defineEmits<{
  (e: 'start-time'): void
  (e: 'end-time'): void
  (e: 'update-current-time', value: number): void
}>()

const wrapRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
	Logger.debug('Chatbot Text mounted')

	setTimeout(() => {
		Logger.debug('Chatbot Text timeout')
		emit('end-time')
	}, 3000)
})
</script>
