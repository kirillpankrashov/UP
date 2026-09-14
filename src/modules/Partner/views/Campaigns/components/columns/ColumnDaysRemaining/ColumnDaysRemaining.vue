<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.daysRemaining')"
    width="120"
  >
    <template #default="{ row }: {row: { dates: { end: string } }}">
      {{ calcDaysRemaining(row) }}
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'

defineProps<{
	items: {
    dates: {
      end: string
    }
  }[]
}>()

const { t } = useLocale<typeof messages>(messages)

const calcDaysRemaining = (row: { dates: { end: string } }) => {
	const endDate = moment(row.dates.end, 'DD.MM.YYYY')
	const diff = endDate.diff(moment(), 'days') + 1

	return diff < 0 ? 0 : diff
}
</script>
