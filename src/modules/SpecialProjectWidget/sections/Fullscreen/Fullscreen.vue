<template>
  <video
    v-if="isVideo && videoPath"
    data-name="sp-fullscreen"
    :src="videoPath"
    autoplay
    loop
    muted
    playsinline
  />
  <img
    v-else-if="imagePath"
    data-name="sp-fullscreen"
    :src="imagePath"
    alt=""
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'

const props = defineProps<{
  creative: ISpCreative
}>()

const videoPath = computed(() => props.creative.attachments.video?.path ?? null)

const isVideo = computed(() => {
	const path = videoPath.value
	if (!path) return false
	return path.includes('.mp4') || path.includes('.webm')
})

const imagePath = computed(() => {
	if (isVideo.value) return null
	return props.creative.attachments.video?.path
		?? props.creative.attachments.unit?.path
		?? null
})
</script>
