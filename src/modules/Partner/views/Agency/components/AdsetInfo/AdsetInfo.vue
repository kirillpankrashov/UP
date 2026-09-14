<template>
  <ElDrawer
    data-name="partner-agency-adset-info"
    :title="adset?.title ?? store.adsetTitle ?? ''"
    v-model="store.adsetSidebarVisible"
    direction="rtl"
    :size="'560px'"
  >
    <div>
      <AdsetInfoSkeleton v-if="showInfoSkeleton" />

      <div v-else-if="adset">
        <Info
          class="mb-4"
          :adset="adset"
        />

        <div class="mb-8">
          <TextLink
            v-if="adset.campaignType !== CampaignType.PREROLL"
            data-test="partner-agency-adset-info-report-btn"
            @click="store.getStreamers(adset.slug)"
          >
            {{ t('creators.campaigns.reportBtn.full') }}
          </TextLink>
        </div>

        <Description
          class="mb-4"
          :adset="adset"
        />

        <Creative :adset="adset" />
      </div>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElDrawer } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAdsetsActiveStore, useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

import AdsetInfoSkeleton from './AdsetInfoSkeleton.vue'
import {
	Creative,
	Description,
	Info,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  store: ReturnType<typeof useAdsetsActiveStore | typeof useAdsetsClosedStore>
}>()

const store = computed(() => props.store)
const adset = computed(() => props.store.adsetInfo)

const showInfoSkeleton = computed(() => {
	return props.store.isFetchingData && !props.store.adsetInfo
})
</script>
