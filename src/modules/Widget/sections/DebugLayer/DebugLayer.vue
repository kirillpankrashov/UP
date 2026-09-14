<template>
  <div
    v-if="isActive"
    data-name="debug"
    class="absolute left-0 top-0 z-[1000] w-full p-4"
  >
    <div class="w-full max-w-lg rounded-lg border border-primary bg-white p-6">
      <div class="mb-2 block">
        <div class="_text-l-bold">
          Widget:
        </div>
        <div class="_text-m-regular">
          Session UUID: <span class="_text-m-bold">{{ props.widget.session.uuid }}</span>
        </div>
        <div class="_text-m-regular">
          Resolution: <span class="_text-m-bold"> {{ windowWidth }}x{{ windowHeight }}</span>
        </div>
        <div class="_text-m-regular">
          Link: <span class="_text-m-bold"> {{ widgetLink }}</span>
        </div>
        <div class="_text-m-regular">
          Is manual: <span class="_text-m-bold">{{ props.widget.isManual }}</span>
        </div>
        <div class="_text-m-regular">
          Frequency: <span class="_text-m-bold">{{ props.widget.frequency / 1000 / 60 }}</span>
        </div>
        <div class="_text-m-regular">
          Initial frequency: <span class="_text-m-bold">{{ props.widget.initialFrequency / 1000 / 60 }}</span>
        </div>
      </div>
      <div class="mb-2 block">
        <div class="_text-l-bold">
          OBS:
        </div>
        <div class="_text-m-regular">
          Plugin version: <span class="_text-m-bold">{{ pluginVersion }}</span>
        </div>
        <div class="_text-m-regular">
          Control Level: <span class="_text-m-bold">{{ obsControlLevel }}</span>
        </div>
        <div class="_text-m-regular">
          Streaming status: <span class="_text-m-bold">{{ obsStatus?.streaming }}</span>
        </div>
        <div class="_text-m-regular">
          Recording status: <span class="_text-m-bold">{{ obsStatus?.recording }}</span>
        </div>
        <div class="_text-m-regular">
          User navigator: <span class="_text-m-bold">{{ obsUserNavigator }}</span>
        </div>
      </div>
      <div class="block">
        <div class="_text-m-bold">
          Requests:
        </div>
        <div
          v-if="nextBrandSafetyRequestTime"
          class="_text-s-regular"
        >
          Brand Safety request in: {{ nextBrandSafetyRequestTime }}
        </div>
        <div class="_text-s-regular">
          Next ad request in: {{ nextAdRequestTime }}
        </div>
      </div>
      <div class="block">
        <div class="_text-m-bold">
          Queue:
        </div>
        <div class="_text-s-regular">
          Display next creative in: {{ nextCreativeDisplayTime }}
        </div>
        <div class="_text-m-regular">
          <pre>{{ queue }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import moment from 'moment'

import { Widget } from '@/modules/Widget/class/Widget'
import { type OBSStatus,RequestType } from '@/modules/Widget/types'
import { getUserDeviceType } from '@/modules/Widget/utils/get-user-device-type'

const props = defineProps<{
  widget: Widget
}>()

const isActive = computed(() => {
	const url = new URL(window.location.href)
	return url.searchParams.get('debug_active')
})

const interval = ref<ReturnType<typeof setInterval> | null>(null)

const windowWidth = computed(() => window.innerWidth)
const windowHeight = computed(() => window.innerHeight)
const widgetLink = computed(() => window.location.origin + window.location.pathname)
const pluginVersion = computed(() => window?.obsstudio?.pluginVersion)
const obsStatus = ref<OBSStatus | null>(null)
const obsControlLevel = ref<number | null>(null)
const obsCSSStyle = ref<string | null>(null)
const obsUserNavigator = computed(() => getUserDeviceType())

const nextBrandSafetyRequestTime = ref<string | null>(null)
const nextAdRequestTime = ref<string | null>(null)
const nextCreativeDisplayTime = ref<string | null>(null)
const queue = ref<any>()

const calcTimer = (time: number) => {
	const now = new Date().getTime()
	const diffMs = time ? time - now : 0

	if (diffMs <= 0) {
		return '0m 0s'
	}

	const duration = moment.duration(diffMs)
	return `${duration.minutes()}m ${duration.seconds()}s`
}

const formatQueue = () => {
	return props.widget.creativesLoop.queue.map(item => {
		return {
			whenDisplay: moment(item.whenDisplay).format('HH:mm:ss'),
			adSet: item.adSet.map(adSet => ({
				slug: adSet.slug,
				impressionSlug: adSet.impressionSlug,
				adSet: {
					slug: (adSet.adSet as any)?.slug || '',
					format: adSet.adSet.format,
					campaign: adSet.adSet.campaign,
					makeScreenshots: adSet.adSet.makeScreenshots,
				},
			})),
		}
	})
}

onMounted(() => {
	interval.value = setInterval(() => {
		window?.obsstudio?.getStatus(status => {
			obsStatus.value = status
		})
		window?.obsstudio?.getControlLevel(level => {
			obsControlLevel.value = level
		})

		// @ts-ignore
		// obsCSSStyle.value = obsCSS?.innerText

		nextBrandSafetyRequestTime.value = calcTimer(props.widget.requestLoop.requests[RequestType.BRAND_SAFETY].nextCall)
		nextAdRequestTime.value = calcTimer(props.widget.requestLoop.requests[RequestType.BRAND_AWARENESS].nextCall)
		nextCreativeDisplayTime.value = calcTimer(props.widget.creativesLoop.queue.find(item => item.whenDisplay > new Date().getTime())?.whenDisplay || 0)
		queue.value = formatQueue()
	}, 1000)
})

onUnmounted(() => {
	if (interval.value) {
		clearInterval(interval.value)
	}
})
</script>
