<template>
  <div
    data-name="yandex-fs"
    class="pointer-events-none absolute bottom-0 left-0 h-full w-full"
    ref="wrapRef"
  >
    <div
      :class="{
        'absolute right-4 top-4 flex h-[248px] w-[440px] sm:h-[310px] sm:w-[550px]': isPip,
        'left-4 right-auto flex-row-reverse': isPip && isLeftTop,
        'bottom-4 top-auto': isPip && isRightBottom }"
      class="h-full w-full"
    >
      <video
        id="video-js-player"
        ref="video"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'

import { AdvertisingPosition } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useInterval } from '@/modules/Widget/sections/Creatives/utils'
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

const timeout = ref<NodeJS.Timeout | null>(null)

const player = ref()
const isPip = ref(true)
const isLeftTop = props.widget.advertising.position === AdvertisingPosition.LEFT_TOP_CORNER
const isRightBottom = props.widget.advertising.position === AdvertisingPosition.RIGHT_BOTTOM_CORNER
const path = props.creative?.attachments?.video?.path
const metacount = props.creative?.attachments?.video?.extend?.metacount
const rtbcount = props.creative?.attachments?.video?.extend?.rtbcount
const pixelImpressions = props.creative?.attachments?.video?.extend?.pixel_impressions
const isXml = path?.includes('.xml')

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

const endTime = () => {
	if (timeout.value) {
		clearTimeout(timeout.value)
	}
	emit('end-time')
}

if (!isXml) {
	endTime()
	Logger.warning('File is not XML in YandexFS creative', false, { path })
}

onMounted(() => {
	const video = document.getElementById('video-js-player') as HTMLVideoElement

	if (video) {
		const { startInterval } = useInterval(
			video,
			emit,
		)
		startInterval()

		player.value = window.videojs(video)

		const requestVast = async (callback: (error: any, data?: string) => void) => {
			try {
				const response = await axios.get(path as string)

				callback(null, response.data)
			}
			catch (err) {
				callback(err)
				Logger.warning('Error requesting VAST', false, err)
				endTime()
			}
		}

		const vastAd = player.value.vastClient({
			// adTagUrl: path,
			adTagXML: requestVast,
			autoResize: false,
			playAdAlways: true,
			adCancelTimeout: 60000,
		})

		timeout.value = setTimeout(endTime, 1000 * 15.5)

		const isPlaying = !player.value.paused() && !player.value.ended()

		if (!isPlaying) {
			player.value.play()
		}

		emit('start-time')

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

		player.value.on('vast.adError', endTime)

		player.value.on('vast.adsCancel', endTime)

		player.value.on('vast.contentEnd', endTime)

		player.value.on('vast.adEnd', endTime)

		player.value.on('reset', () => {
			const adsEnabled = player.value.options().plugins['ads-setup'].adsEnabled

			if (adsEnabled) {
				vastAd.enable()
			}
			else {
				vastAd.disable()
			}
		})
	}
	else {
		Logger.warning('Not found video element on page in YandexFS creative', false)
	}
})

onBeforeUnmount(() => {
	if (timeout.value) {
		clearTimeout(timeout.value)
		timeout.value = null
	}

	if (player.value) {
		player.value.dispose()
	}
})
</script>

<style lang="scss">
.vjs-ad-playing .vjs-poster {
  display: none;
}
</style>
