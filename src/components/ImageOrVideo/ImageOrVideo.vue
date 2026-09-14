<template>
  <video
    v-if="isVideo"
    ref="videoRef"
    :src="src"
    preload="auto"
    :autoplay="autoplay"
    :muted="muted"
    :loop="true"
    @click="emit('click')"
  />
  <img
    v-else
    ref="imageRef"
    :src="src"
    onload="this.style.display='block'"
    onerror="this.style.display='none'"
    @click="emit('click')"
  >
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = withDefaults(defineProps<{
  src: string | undefined
	autoplay?: boolean
	muted?: boolean
}>(), {
	autoplay: true,
	muted: true,
})

const isVideo = ref(false)

const videoRef = ref<HTMLVideoElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

defineExpose({
	videoRef,
	imageRef,
})

onMounted(() => {
	try {
		const img = new Image()
		img.onload = () => {
			isVideo.value = false
		}
		img.onerror = () => {
			isVideo.value = true
		}
		img.src = props.src || ''
	}
	catch (error) {
		isVideo.value = false
	}
})
</script>

<style scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
