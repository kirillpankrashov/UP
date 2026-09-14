<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.budget')"
    width="180"
  >
    <template #default="{ row }: {row: RowEntityCampaign | RowEntityAdset }">
      <Progress
        v-if="row"
        :current="row.budget.current"
        :total="row.budget.total"
        :text="formatCurrency(row.budget.total, false, getCurrency(row))"
        :forecast="calcForecast(row)"
        :currency="getCurrency(row)"
      />
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import moment from 'moment'

import { AdEntityType, CurrencyName } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { Progress } from '@/components'
import { ElTableColumn } from '@/components/element-plus'
import type {
	IBrandAwarenessAdset,
	IBrandAwarenessCampaign,
	IExtensionAdset,
	IExtensionCampaign,
	IPerformanceAdset,
	IPerformanceCampaign,
	IPrerollAdset,
	IPrerollCampaign,
} from '@/modules/Partner/views/Campaigns/api'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

type RowEntityCampaign = IBrandAwarenessCampaign | IPerformanceCampaign | IPrerollCampaign | IExtensionCampaign
type RowEntityAdset = IBrandAwarenessAdset | IPerformanceAdset | IPrerollAdset | IExtensionAdset

defineProps<{
	items: RowEntityCampaign[] | RowEntityAdset[]
}>()


const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const { formatCurrency } = useCurrency()

const getCurrency = (row: RowEntityCampaign | RowEntityAdset) => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.CAMPAIGNS:
			return (row as RowEntityCampaign).advertiser.wallet.currency.code
		case AdEntityType.ADSETS:
			return (row as RowEntityAdset).campaign.advertiser.wallet.currency.code
		default:
			return CurrencyName.USD
	}
}

const calcForecast = (row: RowEntityCampaign | RowEntityAdset) => {
	const currentDate = moment()
	const startDate = moment(row.dates.start, 'DD.MM.YYYY')
	const endDate = moment(row.dates.end, 'DD.MM.YYYY')

	const daysAfterStart = currentDate.diff(startDate, 'days') + 1 || 0
	const daysRemaining = endDate.diff(currentDate, 'days') + 1 || 0
	const duration = endDate.diff(startDate, 'days') + 1 || 0

	if (daysRemaining === 0) {
		return 0
	}

	if (daysAfterStart === 1) {
		return row.budget.total
	}

	const forecast = (row.impressions.current / daysAfterStart) * duration * row.avgCpm / 1000

	if (forecast < row.budget.current) {
		return row.budget.current
	}

	if (forecast > row.budget.total) {
		return row.budget.total
	}

	return forecast
}
</script>
