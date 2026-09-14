<template>
  <div
    id="campaigns-analytics-table"
    data-name="campaigns-analytics-table"
    class="mt-14"
  >
    <ElTable
      :data="tableData"
      style="width: 100%"
    >
      <ElTableColumn
        :label="t('campaigns.analytics.fields.date')"
        prop="date"
      />
      <ElTableColumn
        :label="t('campaigns.analytics.fields.impressions')"
        prop="impressions"
      />
      <ElTableColumn
        :label="t('campaigns.analytics.fields.clicks')"
        prop="clicks"
      />
      <ElTableColumn
        :label="t('campaigns.analytics.fields.botClicks')"
        prop="bot_clicks"
      />
      <ElTableColumn
        :label="t('campaigns.analytics.fields.ctr')"
        prop="ctr"
      />
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

const { t } = useLocale<typeof messages>(messages)

const analyticsStore = useCampaignAnalyticsStore()

const tableData = computed(() => {
	return analyticsStore.data.filter(row => {
		return row.botClicks || row.clicks || row.ctr || row.impressions
	})
})
</script>
