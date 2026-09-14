<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.impressions')"
    width="180"
  >
    <template #default="{ row }: {row: { impressions: { current: number, total: number } }}">
      <Progress
        v-if="row"
        :current="row.impressions.current"
        :total="row.impressions.total"
        :text="formatNumber(row.impressions.total)"
      />
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { useCurrency, useLocale } from '@/core/hooks'
import { Progress } from '@/components'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'

defineProps<{
	items: {
    impressions: {
      current: number
      total: number
    }
  }[]
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()
</script>
