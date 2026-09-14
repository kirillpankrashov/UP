<template>
  <div
    v-if="isStreamActive"
    data-name="campaigns-adset-info-twitch-clip"
    class="border-t border-light-gray pt-4"
  >
    <ElButton
      size="large"
      class="w-full"
      :disabled="isDisabled"
      :loading="isProcessing"
      :type="clipUrl ? 'success' : 'primary'"
      @click="handleClick"
    >
      <span class="_text-m-bold">{{ buttonText }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

import { Logger, wait } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { sendPreview } from '@/modules/Debug/api/sendPreview'
import type { IBrandAwarenessAdsetInfo, IExtensionAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { createTwitchClip, getTwitchClip, saveTwitchClip } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IActiveAdsetInfo } from '@/modules/Streamer/views/Campaigns/types'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const STREAM_DELAY = 30000

const props = defineProps<{
  adset: IActiveAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()

const isTimerActive = ref(false)
const timerSeconds = ref(10)
const timerInterval = ref<NodeJS.Timeout | null>(null)

const isProcessing = ref(false)
const processingMessage = ref('')
const clipUrl = ref('')

const widget = computed(() => settingsStore.widget)
const twitchPlatform = computed(() => streamerStore.profile?.platforms?.twitch)

const isStreamActive = computed(() => {
	return widget.value?.stream?.enabled === true
})

const hasTwitchCredentials = computed(() => {
	return !!(
		twitchPlatform.value?.application?.accessToken &&
		twitchPlatform.value?.application?.clientId &&
		twitchPlatform.value?.providerId
	)
})

const buttonText = computed(() => {
	if (clipUrl.value) {
		return t('campaignSidebar.twitchClipSuccess')
	}
	if (isTimerActive.value) {
		return t('campaignSidebar.twitchClipTimer', { seconds: timerSeconds.value })
	}
	if (isProcessing.value) {
		return processingMessage.value || t('campaignSidebar.twitchClipCreating')
	}
	return t('campaignSidebar.makeTwitchClip')
})

const isDisabled = computed(() => {
	return isTimerActive.value || isProcessing.value
})

const handleClick = () => {
	if (isDisabled.value) return
	startTimer()
}

const startTimer = () => {
	if (!hasTwitchCredentials.value) {
		Logger.error(t('campaignSidebar.twitchClipNoCredentials'), true)
		return
	}

	if (!widget.value?.slug) {
		Logger.error(t('campaignSidebar.twitchClipNoWidget'), true)
		return
	}

	const adsetWithAds = props.adset as IBrandAwarenessAdsetInfo | IExtensionAdsetInfo
	if (!('ads' in adsetWithAds) || !adsetWithAds.ads || adsetWithAds.ads.length === 0) {
		Logger.error(t('campaignSidebar.twitchClipNoAds'), true)
		return
	}

	isTimerActive.value = true
	timerSeconds.value = 10

	timerInterval.value = setInterval(() => {
		timerSeconds.value -= 1

		if (timerSeconds.value <= 0) {
			clearInterval(timerInterval.value!)
			timerInterval.value = null
			isTimerActive.value = false
			createClipAndLaunchCampaign()
		}
	}, 1000)
}

const createClipAndLaunchCampaign = async () => {
	isProcessing.value = true

	try {
		const broadcasterId = twitchPlatform.value!.providerId.toString()
		const accessToken = twitchPlatform.value!.application!.accessToken
		const clientId = twitchPlatform.value!.application!.clientId

		processingMessage.value = t('campaignSidebar.twitchClipLaunchingCampaign')
		await sendPreview(widget.value!.slug, [props.adset.slug])

		await wait(STREAM_DELAY)

		processingMessage.value = t('campaignSidebar.twitchClipCreating')
		const createResponse = await createTwitchClip({
			broadcasterId,
			accessToken,
			clientId,
		})

		if (!createResponse.data || createResponse.data.length === 0) {
			throw new Error('Failed to create clip')
		}

		const clipId = createResponse.data[0].id

		processingMessage.value = t('campaignSidebar.twitchClipGettingUrl')

		await wait(10000)

		let clipData = null
		let attempts = 0
		const maxAttempts = 3

		while (!clipData && attempts < maxAttempts) {
			try {
				const getResponse = await getTwitchClip({
					clipId,
					accessToken,
					clientId,
				})

				if (getResponse.data && getResponse.data.length > 0 && getResponse.data[0].url) {
					clipData = getResponse.data[0]
					break
				}
			}
			catch (err) {
				Logger.error('Error getting clip', false, err)
			}

			attempts++
			await wait(2000)
		}

		if (!clipData || !clipData.url) {
			throw new Error('Failed to get clip URL')
		}

		processingMessage.value = t('campaignSidebar.twitchClipSaving')

		await saveTwitchClip({
			adsetSlug: props.adset.slug,
			adsetTitle: props.adset.title,
			streamerId: streamerStore.profile?.userId ?? 0,
			streamerName: streamerStore.profile?.name ?? '',
			clipUrl: clipData.url,
		})

		await wait(3000)

		clipUrl.value = ''
		processingMessage.value = ''
	}
	catch (err) {
		Logger.error(t('campaignSidebar.twitchClipError'), true, err)
		clipUrl.value = ''
		processingMessage.value = ''
	}
	finally {
		isProcessing.value = false
	}
}


onBeforeUnmount(() => {
	if (timerInterval.value) {
		clearInterval(timerInterval.value)
	}
})
</script>
