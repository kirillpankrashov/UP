<template>
  <div data-name="campaigns-info-creative-performance">
    <div class="_text-s-regular mb-1 text-gray">
      {{ t('campaignSidebar.creativePreview') }}
    </div>

    <div
      class="relative mb-8 aspect-video w-full"
      v-if="videoSrc"
    >
      <div
        v-if="!isGif"
        data-test="video-container"
        class="absolute inset-0 flex items-center justify-center"
      >
        <video
          ref="videoRef"
          class="absolute inset-0 h-full w-full cursor-pointer"
          :src="videoSrc"
          @click="togglePause"
        />
        <button
          v-if="!isPlaying"
          class="relative z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-primary pl-1"
          @click="togglePause"
        >
          <PlayIcon class="h-5 w-5 fill-white" />
        </button>
      </div>
      <div
        class="absolute inset-0"
        v-else
      >
        <div
          class="h-full w-full bg-cover bg-center bg-no-repeat"
          :style="{backgroundImage: `url(${videoSrc})`}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import type { IPerformanceAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

import PlayIcon from '@/assets/img/icons/play.svg'

const props = defineProps<{
  adset: IPerformanceAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const videoSrc = computed(() => props.adset?.attachments?.unit?.path)
const isGif = computed(() => videoSrc.value?.indexOf('.gif') !== -1)

const videoRef = ref()
const player = ref()
const isPlaying = ref(false)

const togglePause = () => {
	if (!player.value || isGif.value) {
		return
	}

	if (player.value.paused()) {
		player.value.play()
		isPlaying.value = true
	}
	else {
		player.value.pause()
		isPlaying.value = false
	}
}

onMounted(() => {
	if (isGif.value) {
		return
	}

	if (videoRef.value) {
		player.value = window.videojs(videoRef.value)

		player.value.controls(false)

		player.value.on('ended', () => {
			isPlaying.value = false
		})
	}
})

defineExpose({
	isPlaying,
	player,
})
</script>
