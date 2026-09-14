<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.platform')"
    width="120"
  >
    <template #default="{ row }: {row: AdEntityAdset | AdEntityCreative}">
      <div
        v-if="getPlatform(row) === Platform.TWITCH"
        class="flex items-center gap-1"
      >
        <TwitchIcon class="h-4 w-4 fill-twitch" />
        <span class="_text-m-regular">Twitch</span>
      </div>
      <div
        v-if="getPlatform(row) === Platform.YOUTUBE"
        class="flex items-center gap-1"
      >
        <YoutubeIcon class="h-4 w-4 fill-youtube" />
        <span class="_text-m-regular">Youtube</span>
      </div>
      <div
        v-if="getPlatform(row) === Platform.TROVO"
        class="flex items-center gap-1"
      >
        <TrovoIcon class="h-4 w-4 fill-trovo" />
        <span class="_text-m-regular">Trovo</span>
      </div>
      <div
        v-if="getPlatform(row) === Platform.VK_PLAY"
        class="flex items-center gap-1"
      >
        <VkplayIcon class="h-4 w-4" />
        <span class="_text-m-regular">VK Play</span>
      </div>
      <div
        v-if="getPlatform(row) === Platform.TIKTOK"
        class="flex items-center gap-1"
      >
        <TiktokIcon class="h-4 w-4" />
        <span class="_text-m-regular">TikTok</span>
      </div>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { AdEntityType, Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntityAdset, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkplayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

defineProps<{
	items: AdEntityAdset[] | AdEntityCreative[]
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const getPlatform = (row: AdEntityAdset | AdEntityCreative) => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.ADSETS:
			return (row as AdEntityAdset).platform
		case AdEntityType.CREATIVES:
			return (row as AdEntityCreative).adSet.platform
		default:
			return null
	}
}
</script>
