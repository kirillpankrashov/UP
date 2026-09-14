<template>
  <div
    data-name="convertion-alert"
    ref="wrapRef"
    class="absolute left-0 top-0 flex h-full w-full items-end justify-center p-12 opacity-0 transition-opacity duration-300"
    :class="{'!opacity-100': isMounted}"
  >
    <div class="text-center">
      <video
        id="video"
        :src="path"
        autoplay
        muted
      />
      <div
        class="text-center text-4xl font-extrabold leading-[1.4] text-primary"
        v-html="text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { Widget } from '@/modules/Widget/class/Widget'

const props = defineProps<{
  widget: Widget
}>()

const isMounted = ref(false)

const wrapRef = ref<HTMLDivElement | null>(null)

const alert = computed(() => props.widget.conversionAlert.currentAlert.value)

const path = alert.value?.animation.path

const text = computed(() => {
	return alert.value?.text
		.replaceAll(/\n/g, '<br>')
		.replaceAll('{{current_actions}}', alert.value?.conversions.toString())
		.replaceAll('{{target_actions}}', alert.value?.daily_limit.toString())
})

onMounted(() => {
	isMounted.value = true

	const video = document.getElementById('video') as HTMLVideoElement

	video.addEventListener('ended', () => {
		isMounted.value = false
		props.widget.conversionAlert.clearAlertTimeout()
		setTimeout(() => {
			props.widget.conversionAlert.hideAlert()
		}, 500)
	})
})

onUnmounted(() => {
	isMounted.value = false
})
</script>
