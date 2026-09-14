<template>
  <div
    data-name="campaigns-adset-card-indicators-special-project"
    class="grid grid-cols-2 gap-4 sm:grid-cols-4"
  >
    <div class="w-28">
      <div class="_text-caption mb-1">
        {{ t('campaignRow.dateEnd') }}
      </div>
      <div class="_text-m-regular">
        {{ adset.dates.end || '—' }}
      </div>
    </div>

    <div class="w-28">
      <div class="_text-caption mb-1">
        {{ t('campaignSidebar.deliveredImpressions') }}
      </div>
      <div class="_text-m-regular">
        {{ adset.impressions }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import type { ISpecialProjectAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
  adset: ISpecialProjectAdset
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
