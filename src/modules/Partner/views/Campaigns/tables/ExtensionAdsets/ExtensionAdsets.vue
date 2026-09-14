<template>
  <ExtensionAdsetsSkeleton
    v-if="isFetching"
    :columns="columns"
  />

  <div
    v-else
    v-loading="adsets.loading || !adsets.bootstrapped"
  >
    <ElTable
      v-if="items.length && !adsets.loading"
      :data="items"
      style="width: 100%"
      tooltip-effect="light"
    >
      <ColumnId :items="items" />
      <ColumnName :items="items" />
      <ColumnStatus
        v-if="columns.state"
        :items="items"
      />
      <ColumnModeration
        v-if="columns.moderation"
        :items="items"
      />
      <ColumnPlatform
        v-if="columns.platform"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.channels"
        :label="t('campaigns.tables.columns.channels')"
        :formatter="(row: IExtensionAdset) => formatNumber(row.channels, false, row.campaign.advertiser.wallet.currency.code)"
        width="100"
      />
      <ColumnBudget
        v-if="columns.budget"
        :items="items"
      />
      <ColumnImpressions
        v-if="columns.impressions"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.ctr"
        :label="t('campaigns.tables.columns.ctr')"
        :formatter="(row: IExtensionAdset) => row.ctr.toFixed(2) + '%'"
        width="100"
      />
      <ColumnDaysRemaining
        v-if="columns.daysRemaining"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.clicks"
        :label="t('campaigns.tables.columns.clicks')"
        :formatter="(row: IExtensionAdset) => formatNumber(row.clicks, false, row.campaign.advertiser.wallet.currency.code)"
        width="100"
      />
      <ColumnFormat
        v-if="columns.format"
        :items="items"
      />
      <ColumnRelatedCampaign
        v-if="columns.relatedCampaign"
        :items="items"
      />

      <Actions v-model="columns" />
    </ElTable>

    <div
      v-else
      class="_headline-2 pt-40 text-center text-lightest-gray"
    >
      {{ t('campaigns.tables.noCampaigns') }}
    </div>

    <ElPagination
      v-if="adsets.bootstrapped && items.length"
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="adsets.perPage"
      :current-page="currentPage"
      :total="adsets.total"
      hide-on-single-page
      @current-change="(page) => changePage(page)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AdEntityType,CampaignType } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import type { IExtensionAdset } from '@/modules/Partner/views/Campaigns/api'
import { Actions } from '@/modules/Partner/views/Campaigns/components'
import {
	ColumnBudget,
	ColumnDaysRemaining,
	ColumnFormat,
	ColumnId,
	ColumnImpressions,
	ColumnModeration,
	ColumnName,
	ColumnPlatform,
	ColumnRelatedCampaign,
	ColumnStatus,
} from '@/modules/Partner/views/Campaigns/components/columns'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import ExtensionAdsetsSkeleton from './ExtensionAdsetsSkeleton.vue'

defineProps<{
  isFetching?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const { formatNumber } = useCurrency()

const campaignsStore = useCampaignsStore()

const adsets = computed(() => campaignsStore.adsets)
const items = computed(() => adsets.value.items as IExtensionAdset[])

const changePage = async (page: number) => {
	await router.push({ query: { ...route.query, page } })
	campaignsStore.fetchCollection()
}

const defaultColumns = {
	state: true,
	moderation: true,
	platform: true,
	channels: true,
	budget: true,
	impressions: true,
	ctr: true,
	daysRemaining: true,
	clicks: false,
	format: true,
	relatedCampaign: true,
}

const currentPage = computed<number>(() => {
	if ('page' in route.query) {
		return +(route.query.page as string)
	}

	return 1
})

const filters = JSON.parse(window.localStorage.getItem(TABLE_FILTER_KEY) || '{}')
const columns = ref<typeof defaultColumns>(filters?.[CampaignType.EXTENSION]?.[AdEntityType.ADSETS] ? filters?.[CampaignType.EXTENSION]?.[AdEntityType.ADSETS] : defaultColumns)

onMounted(campaignsStore.fetchCollection)
</script>
