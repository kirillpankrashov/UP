<template v-if="isVisible">
  <div
    data-name="preview-banner"
    class="relative aspect-video w-full overflow-hidden"
  >
    <div
      v-if="quiz"
      ref="previewRef"
      class="flex h-[1080px] w-[1920px] origin-top-left items-center justify-end bg-cover bg-center p-[80px] pb-[100px]"
      :style="{backgroundImage: `url(${streamImage})`, opacity: previewRefOpacity}"
    >
      <QuizInstance
        :quiz="quiz"
        :hide-navigation="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import type { IQuiz } from '@/core/types'
import { Logger } from '@/core/helpers'
import { QuizInstance } from '@/components'
import { preloadImage } from '@/modules/Widget/utils/preload-utils'

import streamImage from '@/assets/img/creatives/stream.jpg'

const props = defineProps<{
	quiz?: IQuiz
}>()

const HIDE_INTERVAL_IN_SEC = 20

const timeout = ref<NodeJS.Timeout | null>(null)
const unitTimeout = ref<NodeJS.Timeout | null>(null)
const previewRef = ref<HTMLDivElement>()
const previewRefOpacity = ref(0)

const isVisible = ref(true)

const resetHideTimer = (interval: number) => {
	if (timeout.value) clearTimeout(timeout.value)
	timeout.value = setTimeout(() => {
		isVisible.value = false
	}, interval)
}

const preloadImages = () => {
	if (!props.quiz) return

	const images = new Set<string>()

	try {
		if (props.quiz.welcomeBlob) images.add(props.quiz.welcomeBlob)
		if (props.quiz.resultBlob) images.add(props.quiz.resultBlob)
		props.quiz.questions?.forEach((question) => question.questionBlob && images.add(question.questionBlob))
		images.forEach((image) => {
			preloadImage(image)
		})
	}
	catch (error) {
		Logger.error('Failed to preload banner', false, error)
	}
}

const reset = () => {
	isVisible.value = false
	if (timeout.value) clearTimeout(timeout.value)
	if (unitTimeout.value) clearTimeout(unitTimeout.value)
}

onMounted(() => {
	resetHideTimer(HIDE_INTERVAL_IN_SEC)

	preloadImages()

	setTimeout(() => {
		if (previewRef.value && previewRef.value.parentElement) {
			const transformScale = previewRef.value.parentElement.offsetWidth / previewRef.value.offsetWidth
			previewRef.value.style.transform = `scale(${transformScale})`
			previewRefOpacity.value = 1
		}
	}, 300)
})

onUnmounted(reset)
</script>
