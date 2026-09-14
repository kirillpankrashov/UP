<template>
  <DashboardLayout
    id="campaigns"
    data-name="campaigns"
    v-loading="loading"
    :full-width="analyticsStore.isActive"
  >
    <template v-if="!analyticsStore.isActive">
      <DashboardTitle :title="t('campaigns.header.title')" />

      <ElTabs
        v-if="settingsStore.widget"
        v-model="activeTab"
      >
        <ElTabPane
          name="active"
          :label="`${t('campaigns.tabs.current')} (${campaignsStore.countActiveCampaigns})`"
          :lazy="true"
        >
          <CurrentPlatform />
          <UplifyLink />

          <AdsetsActive />
        </ElTabPane>

        <ElTabPane
          name="completed"
          :label="t('campaigns.tabs.completed')"
          :lazy="true"
        >
          <AdsetsClosed />
        </ElTabPane>
      </ElTabs>

      <AdsetInfo />
    </template>

    <Analytics v-else />
  </DashboardLayout>
</template>

<script setup lang=ts>
import { computed, ref } from 'vue'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignAnalyticsStore, useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import {
	AdsetInfo,
	AdsetsActive,
	AdsetsClosed,
	Analytics,
	CurrentPlatform,
	UplifyLink,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()
const campaignsStore = useCampaignsStore()
const analyticsStore = useCampaignAnalyticsStore()

const title = computed(() => {
	if (campaignsStore.adsetInfo && campaignsStore.adsetInfoSidebarVisible) {
		return campaignsStore.adsetInfo.title
	}
	return t('campaigns.header.title')
})

useTitle(title)

const activeTab = ref<'active' | 'completed'>('active')

const loading = computed(() => (
	campaignsStore.isFetchingActiveCampaigns ||
	campaignsStore.isFetchingCompletedCampaigns ||
	settingsStore.isFetching
))
</script>
