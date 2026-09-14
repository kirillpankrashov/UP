<template>
  <div
    data-name="partner-agency-adsets-closed"
    data-test="partner-agency-adsets-closed"
  >
    <AdsetsList
      :title="t('creators.campaigns.closed.title')"
      :description="t('creators.campaigns.closed.description')"
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
import { useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

const { t } = useLocale<typeof messages>(messages)

const adsetsStore = useAdsetsClosedStore()

onMounted(() => {
	adsetsStore.getAdsets()
})
</script>
