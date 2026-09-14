<template>
  <div
    data-name="custom-clouds"
    class="absolute bottom-[-70px] flex h-full w-full items-end justify-center"
  >
    <video
      id="intro"
      ref="intro"
      class="absolute inset-0 z-20 h-full w-full opacity-0"
      src="@/assets/img/custom/clouds/intro.webm"
      muted
    />
    <div
      id="creative"
      ref="creative"
      class="absolute inset-0 z-10 flex h-full w-full items-end justify-center opacity-0 transition-opacity duration-500"
    >
      <img
        id="bg"
        ref="bg"
        class="absolute bottom-0 left-1/2 h-[500px] w-[1044px] -translate-x-1/2"
        src="@/assets/img/custom/clouds/bg.png"
      >
      <div
        id="banner"
        ref="banner"
        class="relative bottom-[174px] z-10 h-[90px] w-[728px]"
        v-html="banner"
      />
    </div>
    <video
      id="outro"
      ref="outro"
      class="absolute inset-0 z-20 h-full w-full opacity-0"
      src="@/assets/img/custom/clouds/outro.webm"
      muted
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  banner: string
}>()

const CREATIVE_DURATION_IN_SECONDS = 15
const INTRO_DURATION = 4 * 1000
const OUTRO_DURATION = 5 * 1000
const RAW_CREATIVE_DURATION = (CREATIVE_DURATION_IN_SECONDS * 1000) - INTRO_DURATION - OUTRO_DURATION

const creative = ref<HTMLDivElement | null>(null)
const intro = ref<HTMLVideoElement | null>(null)
const outro = ref<HTMLVideoElement | null>(null)

onMounted(() => {
	if (!intro.value || !outro.value || !creative.value) return

	intro.value.style.opacity = '1'
	intro.value.play()

	setTimeout(() => {
		if (intro.value) {
			intro.value.style.opacity = '0'
		}
	}, INTRO_DURATION)

	setTimeout(() => {
		if (creative.value) {
			creative.value.style.opacity = '1'
		}
	}, INTRO_DURATION - 1800)

	setTimeout(() => {
		if (creative.value) {
			creative.value.style.opacity = '0'
		}
	}, INTRO_DURATION + RAW_CREATIVE_DURATION + 3200)

	setTimeout(() => {
		if (outro.value) {
			outro.value.style.opacity = '1'
			outro.value.play()
		}
	}, INTRO_DURATION + RAW_CREATIVE_DURATION)

	setTimeout(() => {
		if (outro.value) {
			outro.value.style.opacity = '0'
		}
	}, INTRO_DURATION + RAW_CREATIVE_DURATION + OUTRO_DURATION)
})
</script>


<style lang="scss" scoped>
#banner iframe {
	width: 100%;
	height: 100%;
	border: none;
}
</style>