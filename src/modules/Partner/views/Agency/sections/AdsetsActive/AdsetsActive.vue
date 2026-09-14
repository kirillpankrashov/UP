<template>
  <div
    data-name="partner-agency-adsets-active"
    data-test="partner-agency-adsets-active"
  >
    <AdsetsList
      :title="t('creators.campaigns.active.title')"
      :description="t('creators.campaigns.active.description')"
      :adsets-store="adsetsStore"
    />
    <AdsetStreamers
      :adsets-store="adsetsStore"
      v-model="adsetsStore.adsetStreamersSidebarVisible"
    />
    <AdsetInfo
      :store="adsetsStore"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useLocale } from '@/core/hooks'
import { AdsetInfo, AdsetsList, AdsetStreamers } from '@/modules/Partner/views/Agency/components'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAdsetsActiveStore } from '@/modules/Partner/views/Agency/store'

const { t } = useLocale<typeof messages>(messages)

const adsetsStore = useAdsetsActiveStore()

onMounted(() => {
	adsetsStore.getAdsets()
})
</script>
