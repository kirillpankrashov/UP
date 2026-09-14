<template>
  <div
    data-name="campaigns-adset-card-toggle"
    class="group shrink-0 text-right"
  >
    <div
      v-if="isVisible"
      data-test="campaigns-adset-card-toggle"
      class="_text-s-regular group absolute right-4 top-6 inline-flex cursor-pointer items-center transition group-hover:text-primary sm:static"
      @click.stop="toggleCampaignStatus"
    >
      {{ label }}
      <CloseIcon
        v-if="adset.status === AdsetStatus.ACTIVE"
        class="ml-1 h-2 w-2 fill-[var(--el-text-color-primary)] group-hover:fill-primary"
      />
      <CheckIcon
        v-else
        class="ml-1 h-2 w-2 fill-[var(--el-text-color-primary)] group-hover:fill-primary"
      />
    </div>
    <div
      v-if="blockedUntil"
      class="_text-caption"
    >
      {{ t('campaignRow.disabledUntil', { date: blockedUntilDate }) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'

import { AdsetStatus, CampaignType } from '@/core/types'
import { isExternalFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import type { IActiveAdset } from '@/modules/Streamer/views/Campaigns/types'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import CheckIcon from '@/assets/img/icons/check.svg'
import CloseIcon from '@/assets/img/icons/x.svg'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  adset: IAdset
}>()

const campaignsStore = useCampaignsStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const pending = ref(false)

const blockedUntil = computed(() => {
	if ('restore' in props.adset && 'blocked' in props.adset) {
		if (props.adset.status !== AdsetStatus.ACTIVE && !props.adset.restore && props.adset.blocked.until) {
			return true
		}
	}

	return false
})

const blockedUntilDate = computed(() => {
	return 'blocked' in props.adset ? moment(props.adset?.blocked.until).format('DD-MM-YYYY HH:mm') : ''
})

const isVisible = computed(() => {
	let isVisible = true

	if ('format' in props.adset) {
		if (isExternalFormat(props.adset.format.id)) {
			isVisible = false
		}
	}

	if (props.adset.campaignType === CampaignType.PREROLL) {
		isVisible = false
	}

	if (props.adset.campaignType === CampaignType.PERFORMANCE && !widget.value?.brandisExtensionEnabled) {
		isVisible = false
	}

	if (props.adset.campaignType === CampaignType.EXTENSION && !widget.value?.extensionEnabled) {
		isVisible = false
	}

	if (props.adset.status === 'close' || props.adset.status === AdsetStatus.UNAVAILABLE) {
		isVisible = false
	}

	if ('restore' in props.adset) {
		if (props.adset.status !== AdsetStatus.ACTIVE && !props.adset.restore) {
			isVisible = false
		}
	}

	return isVisible
})

const label = computed(() => {
	if (pending.value) return t('campaignRow.toggling')

	if (props.adset.status === AdsetStatus.ACTIVE) {
		return t('campaignRow.disable')
	}
	return t('campaignRow.enable')
})

const toggleCampaignStatus = async () => {
	if (pending.value) return

	pending.value = true

	try {
		await campaignsStore.changeCampaignStatus(props.adset as IActiveAdset)
	}
	finally {
		pending.value = false
	}
}
</script>
