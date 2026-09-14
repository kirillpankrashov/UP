<template>
  <div
    data-name="preview-banner"
    class="relative aspect-video w-full overflow-hidden"
  >
    <div v-html="styleTag" />
    <div
      ref="previewRef"
      class="h-[1080px] w-[1920px] origin-top-left bg-cover bg-center"
      :style="{backgroundImage: `url(${streamImage})`, opacity: previewRefOpacity}"
    >
      <div
        v-if="!isUnitVisible"
        class="frame frame-panel"
      >
        <div
          data-test="preview-banner"
          class="panel"
          @mouseenter="handleUserActivity"
          @mousedown="handleUserActivity"
          @touchstart="handleUserActivity"
          @focus="handleUserActivity"
          @keydown="handleUserActivity"
        >
          <a
            v-if="!isUnitVisible"
            href="#"
            @click.prevent="isUnitVisible = true"
          >
            <ImageOrVideo
              ref="currentItemRef"
              :src="panel.banner1?.path"
            />
          </a>

          <ImageOrVideo
            v-else
            ref="currentItemRef"
            :src="panel.banner1?.path"
            @click.prevent="isUnitVisible = false"
          />
        </div>
      </div>

      <div
        v-else
        class="frame frame-unit"
      >
        <div
          v-if="panel.banner2"
          data-test="preview-unit"
          class="unit"
          @mouseenter="handleUserActivity"
          @mousedown="handleUserActivity"
          @touchstart="handleUserActivity"
          @focus="handleUserActivity"
          @keydown="handleUserActivity"
        >
          <a
            href="#"
            @click.prevent="isUnitVisible = false"
          >
            <ImageOrVideo
              ref="currentItemRef"
              :src="panel.banner2.path"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import type { IPanel } from '@/core/types'
import Panel from '@/modules/Streamer/views/Settings/sections/Panel/Panel.vue'

import { ImageOrVideo } from '..'

import streamImage from '@/assets/img/creatives/stream.jpg'

const props = defineProps<{
	panel: IPanel
}>()

const HIDE_INTERVAL_IN_SEC = 20

const currentItemRef = ref<InstanceType<typeof ImageOrVideo>>()

const timeout = ref<NodeJS.Timeout | null>(null)
const unitTimeout = ref<NodeJS.Timeout | null>(null)
const previewRef = ref<HTMLDivElement>()
const previewRefOpacity = ref(0)

const isVisible = ref(true)
const isUnitVisible = ref(false)

const duration = computed(() => {
	const { banner1, banner2 } = props.panel || {}
	const videoDuration = isUnitVisible.value ? banner2?.properties.duration : banner1?.properties.duration

	return videoDuration ? Math.floor(videoDuration * 1000) : HIDE_INTERVAL_IN_SEC * 1000
})

const resetHideTimer = (interval: number) => {
	if (timeout.value) clearTimeout(timeout.value)
	timeout.value = setTimeout(() => {
		isVisible.value = false
	}, interval)
}

const handleUserActivity = () => {
	isVisible.value = true

	resetHideTimer(duration.value)
}

const reset = () => {
	isVisible.value = false
	if (timeout.value) clearTimeout(timeout.value)
	if (unitTimeout.value) clearTimeout(unitTimeout.value)
}

const styleTag = computed(() => {
	if (!props.panel.styles) return ''
	return `<style>${props.panel.styles}</style>`
})

onMounted(() => {
	setTimeout(() => {
		resetHideTimer(duration.value)

		if (previewRef.value && previewRef.value.parentElement) {
			const transformScale = previewRef.value.parentElement.offsetWidth / previewRef.value.offsetWidth
			previewRef.value.style.transform = `scale(${transformScale})`
			previewRefOpacity.value = 1
		}
	}, 300)
})

onUnmounted(reset)
</script>

<style scoped>
.frame {
	width: 100%;
	height: 100%;
	display: flex;
	padding: 80px 80px 100px;
}

.frame-panel {
  align-items: flex-end;
  justify-content: center;
}

.frame-unit {
	align-items: flex-start;
	justify-content: flex-end;
}

.panel,
.unit {
	position: relative;
}

.panel img,
.panel video,
.unit img,
.unit video {
	width: 100%;
	height: 100%;
}

.panel {
	width: 728px;
	height: 90px;
}

.unit {
	width: 550px;
	height: 310px;
}
</style>
