<template>
  <div
    data-name="panel-adsets"
    v-if="activeAdsets.length"
  >
    <h2 class="_text-m-bold mb-6 flex items-center gap-2">
      {{ t('panel.campaigns.title') }} <span class="text-bold flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">{{ activeAdsets.length }}</span>
    </h2>

    <AdsetCard
      v-for="adset in activeAdsets"
      :key="adset.id"
      :adset="adset"
    />
  </div>
  <div v-else>
    <h2 class="_text-m-bold mb-6">
      {{ t('panel.campaigns.none') }}
    </h2>

    <img
      src="@/assets/img/obs-dock-no-campaigns.jpg"
      class="mb-6 h-auto w-full"
    >

    <p
      class="_text-l-regular text-center"
      v-html="t('panel.campaigns.comeBack')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Panel/locales'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import { AdsetCard } from './components'

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const activeAdsets = computed(() => campaignsStore.activeCampaigns.data.active)
</script>
