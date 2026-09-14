<template>
  <div
    data-name="campaigns-adset-card-indicators"
    data-test="campaigns-adset-card-indicators"
  >
    <template v-if="adset.status === 'closed'">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div class="w-28">
          <div class="_text-caption mb-1">
            {{ t('creators.campaignRow.dateEnd') }}
          </div>
          <div class="_text-m-regular">
            {{ adset.dates.end }}
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div class="w-28">
          <div class="_text-caption mb-1">
            {{ t('creators.campaignRow.dateStart') }}
          </div>
          <div class="_text-m-regular">
            {{ adset.dates.start }}
          </div>
        </div>

        <div class="w-28">
          <div class="_text-caption mb-1">
            {{ t('creators.campaignRow.dateEnd') }}
          </div>
          <div class="_text-m-regular">
            {{ adset.dates.end }}
          </div>
        </div>

        <div
          v-if="adset.impressions.total"
          class="w-28"
        >
          <div class="_text-caption mb-1">
            {{ t('creators.campaignRow.dateEnd') }}
          </div>
          <div class="_text-m-regular">
            {{ formatNumber(adset.impressions.total, false) }}
          </div>
        </div>

        <div
          v-if="adset.streamers"
          class="w-28"
        >
          <div class="_text-caption mb-1">
            {{ t('creators.campaignRow.attended') }}
          </div>
          <div class="_text-m-regular">
            {{ t('helpers.streamers', { n: formatNumber(adset.streamers, false) }) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCurrency, useLocale } from '@/core/hooks'
import type { IAdset } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IAdset
}>()

const { formatNumber } = useCurrency()
</script>
