<template>
  <div
    v-if="adset.status !== 'closed'"
    data-name="campaigns-adset-card-tags-brand-awareness"
    data-test="campaigns-adset-card-tags-brand-awareness"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <ElTag
      data-name="campaigns-adset-card-tags-format"
      size="small"
      round
    >
      <span class="font-regular">{{ label }}</span>
    </ElTag>

    <div class="flex flex-wrap items-center gap-1 sm:ml-auto">
      <TextLink
        @click.stop="adsetsStore.getStreamers(adset.slug)"
        size="small"
      >
        {{ t('creators.campaigns.reportBtn.short') }}
      </TextLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElTag } from '@/components/element-plus'
import type { IAdset } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'
import type { useAdsetsActiveStore, useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  adset: IAdset
	adsetsStore: ReturnType<typeof useAdsetsActiveStore> | ReturnType<typeof useAdsetsClosedStore>
}>()

const label = computed(() => props.adset?.format?.title || t('creators.campaignRow.tags.undefinedFormat'))
</script>
