<template>
  <div
    data-name="campaigns-stats-special-project"
    class="relative mb-8 grid gap-y-6 rounded bg-primary-50 px-2 py-5 text-center sm:grid-cols-2 sm:before:absolute sm:before:inset-y-2 sm:before:left-1/2 sm:before:w-[1px] sm:before:bg-light-gray sm:before:content-['']"
  >
    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-impressions"
          class="_headline-2"
        >{{ formatNumber(adset.impressions) }}</span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.deliveredImpressions') }}
      </div>
    </div>

    <div>
      <div class="mb-2">
        <span
          data-test="campaigns-stats-total-clicks"
          class="_headline-2"
        >{{ formatNumber(adset.clicks) }}</span>
      </div>
      <div class="_text-s-regular">
        {{ t('campaignSidebar.clicks') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrency, useLocale } from '@/core/hooks'
import type { ISpecialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
  adset: ISpecialProjectAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)
const { formatNumber } = useCurrency()
</script>
