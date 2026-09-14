<template>
  <BrandAwarenessCampaignsSkeleton
    v-if="isFetching"
    :columns="columns"
  />

  <div
    v-else
    v-loading="campaigns.loading || !campaigns.bootstrapped"
  >
    <ElTable
      v-if="items.length && !campaigns.loading"
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
        :formatter="(row: IBrandAwarenessCampaign) => row.ctr.toFixed(2) + '%'"
        width="100"
      />
      <ColumnDaysRemaining
        v-if="columns.daysRemaining"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.advertiser"
        :label="t('campaigns.tables.columns.advertiser')"
        :formatter="(row: IBrandAwarenessCampaign) => row.advertiser.title"
        width="150"
        show-overflow-tooltip
      />
      <ElTableColumn
        v-if="columns.channels"
        :label="t('campaigns.tables.columns.channels')"
        :formatter="(row: IBrandAwarenessCampaign) => formatNumber(row.channels, false, row.advertiser.wallet.currency.code)"
        width="100"
      />
      <ElTableColumn
        v-if="columns.clicks"
        :label="t('campaigns.tables.columns.clicks')"
        :formatter="(row: IBrandAwarenessCampaign) => formatNumber(row.clicks, false, row.advertiser.wallet.currency.code)"
        width="100"
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
      v-if="campaigns.bootstrapped && items.length"
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="campaigns.perPage"
      :current-page="currentPage"
      :total="campaigns.total"
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
import type { IBrandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api'
import { Actions } from '@/modules/Partner/views/Campaigns/components'
import {
	ColumnBudget,
	ColumnDaysRemaining,
	ColumnId,
	ColumnImpressions,
	ColumnModeration,
	ColumnName,
	ColumnStatus,
} from '@/modules/Partner/views/Campaigns/components/columns'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import BrandAwarenessCampaignsSkeleton from './BrandAwarenessCampaignsSkeleton.vue'

defineProps<{
  isFetching?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const { formatNumber } = useCurrency()

const campaignsStore = useCampaignsStore()

const campaigns = computed(() => campaignsStore.campaigns)
const items = computed(() => campaigns.value.items as IBrandAwarenessCampaign[])

const changePage = async (page: number) => {
	await router.push({ query: { ...route.query, page } })
	campaignsStore.fetchCollection()
}

const defaultColumns = {
	state: true,
	budget: true,
	moderation: true,
	impressions: true,
	ctr: true,
	daysRemaining: true,
	advertiser: true,
	channels: false,
	clicks: false,
}

const currentPage = computed<number>(() => {
	if ('page' in route.query) {
		return +(route.query.page as string)
	}

	return 1
})

const filters = JSON.parse(window.localStorage.getItem(TABLE_FILTER_KEY) || '{}')
const columns = ref<typeof defaultColumns>(filters?.[CampaignType.BRAND_AWARENESS]?.[AdEntityType.CAMPAIGNS] ? filters?.[CampaignType.BRAND_AWARENESS]?.[AdEntityType.CAMPAIGNS] : defaultColumns)

onMounted(campaignsStore.fetchCollection)
</script>
