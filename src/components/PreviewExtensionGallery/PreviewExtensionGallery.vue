<template>
  <div
    data-name="preview-gallery"
    class="relative aspect-video w-full overflow-hidden"
  >
    <div v-html="styleTag" />
    <div
      ref="previewRef"
      class="h-[1080px] w-[1920px] origin-top-left bg-cover bg-center"
      :style="{backgroundImage: `url(${streamImage})`, opacity: previewRefOpacity}"
    >
      <div class="frame">
        <div
          v-if="isVisible"
          class="gallery"
        >
          <div class="gallery-container">
            <ElCarousel
              ref="carouselRef"
              arrow="never"
              :autoplay="false"
              :loop="false"
              :pause-on-hover="true"
              @change="handleChange"
            >
              <ElCarouselItem
                v-for="(item, index) in gallery.list"
                :key="item.id"
              >
                <a
                  class="gallery-item"
                  href="#"
                  target="_blank"
                  @mouseenter="handleUserActivity"
                  @mousedown="handleUserActivity"
                  @touchstart="handleUserActivity"
                  @focus="handleUserActivity"
                  @keydown="handleUserActivity"
                >
                  <ImageOrVideo
                    ref="currentItemRef"
                    :src="item.path"
                    :autoplay="index === 0"
                  />
                </a>
              </ElCarouselItem>
            </ElCarousel>

            <button
              type="button"
              class="next-button"
              @click="handleNext"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import type { IGallery } from '@/core/types'
import { ElCarousel, ElCarouselItem } from '@/components/element-plus'

import { ImageOrVideo } from '..'

import streamImage from '@/assets/img/creatives/stream.jpg'

const props = defineProps<{
	gallery: IGallery
}>()

const currentItemRef = ref<InstanceType<typeof ImageOrVideo>[]>([])

const timeout = ref<NodeJS.Timeout | null>(null)
const carouselInterval = ref<NodeJS.Timeout | null>(null)

const GALLERY_SLIDES_INTERVAL = 1000 * 5

const isVisible = ref(false)

const styleTag = computed(() => {
	if (!props.gallery.styles) return ''
	return `<style>${props.gallery.styles}</style>`
})

const carouselRef = ref<InstanceType<typeof ElCarousel>>()
const previewRef = ref<HTMLDivElement>()
const previewRefOpacity = ref(0)

const resetHideTimer = (interval: number) => {
	if (timeout.value) clearTimeout(timeout.value)
	timeout.value = setTimeout(() => {
		isVisible.value = false
	}, interval)
}

const duration = computed(() => {
	const item = props.gallery.list[carouselRef.value?.activeIndex ?? 0]

	if (item.properties?.duration) {
		return Math.floor(item.properties?.duration * 1000)
	}

	return GALLERY_SLIDES_INTERVAL
})

const handleUserActivity = () => {
	if (carouselRef.value?.activeIndex !== (props.gallery.list.length || 0) - 1) return

	isVisible.value = true
	resetHideTimer(duration.value)
}

const playVideo = (index: number) => {
	if (currentItemRef.value && currentItemRef.value[index]) {
		const mediaRef = currentItemRef.value[index].videoRef as HTMLVideoElement

		if (mediaRef) {
			mediaRef.play().catch(() => {})
		}
	}
}

const handleNext = () => {
	carouselRef.value?.next()
}

const handleChange = (index: number) => {
	playVideo(index)
	resetHideTimer(duration.value)

	if (carouselInterval.value) clearTimeout(carouselInterval.value)

	if (index < (props.gallery.list.length || 0) - 1) {
		carouselInterval.value = setTimeout(handleNext, duration.value - 300)
	}
}

const reset = () => {
	isVisible.value = false
	if (timeout.value) clearTimeout(timeout.value)
	if (carouselInterval.value) clearTimeout(carouselInterval.value)
}

onMounted(() => {
	isVisible.value = true

	setTimeout(() => {
		carouselInterval.value = setTimeout(handleNext, duration.value)

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
  justify-content: flex-end;
  align-items: flex-end;
}

:deep(.el-carousel--horizontal, .el-carousel--vertical) {
	overflow: visible;
}

:deep(.el-carousel) {
	width: 236px;
	height: 350px;
}

:deep(.el-carousel__item) {
	height: 350px;
	transition: transform .4s ease-in-out;
}

:deep(.el-carousel__indicators) {
	display: none !important;
}

:deep(.el-carousel__arrow) {
	display: none !important;
}

.next-button {
	position: absolute;
	height: 100%;
	width: 46px;
	border-radius: 0px;
	right: 0;
	top: 0px;
	background-color: transparent;
	cursor: pointer;
}

:deep(.el-carousel__arrow--right .el-icon) {
	display: none;
}

.gallery {
	position: relative;
	width: 280px;
}

.gallery-container {
	position: relative;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;

  mask-image: linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
	width: 100%;
	overflow: hidden;
}

.gallery-item {
	display: block;
	width: 236px;
	padding-right: 6px;
}

.gallery-item img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.close-button {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 50;
	width: 24px;
	height: 24px;
	background-color: #F5F5F7;
	display: none;
	cursor: pointer;
	border: 1px solid #2e2b29;
}

.gallery:hover .close-button {
	display: block;
}
</style>
