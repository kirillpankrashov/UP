<template>
  <ElDrawer
    data-name="campaigns-adset-info"
    :title="adset?.title"
    v-model="campaignStore.adsetInfoSidebarVisible"
    direction="rtl"
    :size="!appStore.isMobile ? '560px' : '100%'"
  >
    <div v-loading="campaignStore.isFetchingAdsetInfo">
      <div v-if="adset">
        <Stats :adset="adset" />

        <Info
          class="mb-4"
          :adset="adset"
        />

        <ReportBtn
          v-if="![CampaignType.PREROLL, CampaignType.EXTENSION, CampaignType.SPECIAL_PROJECT].includes(adset.campaignType)"
          :adset="adset"
          class="mb-4"
        />

        <Description
          class="mb-4"
          :adset="adset"
        />

        <Creative :adset="adset" />

        <PrerollLinks
          v-if="adset.campaignType === CampaignType.PREROLL"
          :adset="adset"
        />

        <TwitchClip :adset="adset" />
      </div>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import { useAppStore } from '@/core/store'
import { ElDrawer } from '@/components/element-plus'
import { ReportBtn } from '@/modules/Streamer/views/Campaigns/components'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import {
	Creative,
	Description,
	Info,
	PrerollLinks,
	Stats,
	TwitchClip,
} from './sections'

const appStore = useAppStore()
const campaignStore = useCampaignsStore()

const adset = computed(() => campaignStore.adsetInfo)
</script>
