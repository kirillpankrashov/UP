<template>
  <div
    data-name="partner-agency-adset-info"
    data-test="partner-agency-adset-info"
    class="grid gap-6 sm:grid-cols-2"
  >
    <!-- Payment type -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.paymentType') }}
      </div>
      <div
        data-test="campaigns-info-payment-type"
        class="_text-m-regular"
      >
        {{ adset.payoutType }}
      </div>
    </div>
    <!-- End of Payment type -->

    <!-- Format -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.adFormat') }}
      </div>
      <div
        data-test="campaigns-info-ad-format"
        class="_text-m-regular"
      >
        {{ adset.format.title }}
      </div>
    </div>
    <!-- End of Format -->

    <!-- Frequency -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.frequency') }}
      </div>
      <div
        data-test="campaigns-info-frequency"
        class="_text-m-regular"
      >
        {{ adset.frequency }}
      </div>
    </div>
    <!-- End of Frequency -->

    <!-- Advertiser category -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.advertiserCategory') }}
      </div>
      <div
        data-test="campaigns-info-advertiser-category"
        class="_text-m-regular"
      >
        {{ adset.campaign.category }}
      </div>
    </div>
    <!-- End of Advertiser category -->

    <!-- Start date -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.dateStart') }}
      </div>
      <div
        data-test="campaigns-info-end-date"
        class="_text-m-regular"
      >
        {{ adset.dates.start }}
      </div>
    </div>
    <!-- End of Start date -->

    <!-- End date -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('creators.campaignSidebar.dateEnd') }}
      </div>
      <div
        data-test="campaigns-info-end-date"
        class="_text-m-regular"
      >
        {{ adset.dates.end }}
      </div>
    </div>
    <!-- End of End date -->
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import type { IAdsetInfo } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IAdsetInfo
}>()
</script>
