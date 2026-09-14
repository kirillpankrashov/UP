<template>
  <div
    v-if="widget.isLoaded.value"
    data-name="widget"
  >
    <Creatives
      v-if="chatBotConnected && resolutionCorrect && !tooManySubscribers"
      :widget="widget"
    />
    <ConvertionAlert
      v-if="chatBotConnected && resolutionCorrect && convertionAlertExist && !tooManySubscribers"
      :widget="widget"
    />
    <WarningMessage
      v-if="tooManySubscribers"
      :title="t('widget.tooManySubscribers.title')"
      :description="t('widget.tooManySubscribers.description')"
    />
    <WarningMessage
      v-if="widget.data.value.relogin"
      :title="t('widget.reloginMessage.title', { platform: appStore.domain?.name })"
      :description="t('widget.reloginMessage.description')"
    />
    <WarningMessage
      v-if="!chatBotConnected"
      :title="t('widget.chatbotErrorMessage.title')"
      :description="t('widget.chatbotErrorMessage.description')"
    />
    <WarningMessage
      v-if="!resolutionCorrect"
      :title="t('widget.resolutionErrorMessage.title')"
      :description="t('widget.resolutionErrorMessage.description')"
    />
    <DebugLayer
      :widget="widget"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { Locale } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Widget } from '@/modules/Widget/class/Widget'
import { messages } from '@/modules/Widget/locales'

import { WarningMessage } from './components'
import { ConvertionAlert, Creatives, DebugLayer } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const appStore = useAppStore()

const slug = route.params.slug as string
const widget = new Widget(slug)

const tooManySubscribers = computed(() => widget.pusher?.subscribersCount.value > 1)
const chatBotConnected = computed(() => widget.data.value.botEnabled)
const convertionAlertExist = computed(() => widget.conversionAlert.isShowing.value)

const resolutionCorrect = ref(true)
const checkResolution = () => resolutionCorrect.value = widget.widgetResolutionIsCorrect

onMounted(() => {
	appStore.setCurrentDomain()

	window.addEventListener('load', checkResolution)
	window.addEventListener('resize', checkResolution)
})

onBeforeUnmount(() => {
	window.removeEventListener('load', checkResolution)
	window.removeEventListener('resize', checkResolution)
})

watch(widget.isLoaded, (isLoaded: boolean) => {
	if (isLoaded) {
		appStore.setCurrentDomain()
		appStore.setLocale(
			widget.data.value.streamer?.locale||
			import.meta.env.VITE_APP_DEFAULT_LOCALE ||
			Locale.EN,
		)
	}
})
</script>
