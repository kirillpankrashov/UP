<template>
  <DashboardLayout
    id="settings"
    v-loading="!widget"
  >
    <template v-if="widget">
      <DashboardTitle :title="title" />
      <Statuses />
      <CurrentPlatform />
      <WidgetLink />
      <Chatbot />
      <AdvertSettings />
      <SspSettings />
      <YoutubeText />
      <AdultContent />
      <Panel />
      <TwitchExtension />
      <StreamDelay />
      <IgnoreCategories />
    </template>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { debounce } from 'lodash'

import { PusherEventName } from '@/core/types'
import { Socket } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'

import {
	AdultContent,
	AdvertSettings,
	Chatbot,
	CurrentPlatform,
	IgnoreCategories,
	Panel,
	SspSettings,
	Statuses,
	StreamDelay,
	TwitchExtension,
	WidgetLink,
	YoutubeText,
} from './sections'
import { useSettingsStore } from './store'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('settings.header.title'))

useTitle(title)

const socket = ref<Socket | null>(null)
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

watch(
	widget,
	(state, prevState) => {
		if (prevState) {
			debounce(settingsStore.updateWidget, 2000)()
		}
		if (!socket.value && state) {
			socket.value = new Socket(state.slug)
			socket.value.listen((event, payload) => {
				const eventName = event as unknown as PusherEventName
				if (eventName === PusherEventName.WIDGET_UPDATED) {
					settingsStore.setWidgetData(payload)
				}
			})
		}
	},
	{ deep: true, immediate: true },
)

onBeforeUnmount(() => {
	socket.value?.leave()
})

defineExpose({
	widget,
})
</script>
