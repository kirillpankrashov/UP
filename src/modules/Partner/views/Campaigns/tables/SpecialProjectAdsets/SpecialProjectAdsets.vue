<template>
  <SpecialProjectAdsetsSkeleton
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
      <ColumnFormat
        v-if="columns.format"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.bidCap"
        :label="t('campaigns.tables.columns.bid_cap')"
        :formatter="(row: ISpecialProjectAdset) => formatCurrency(row.bidCap, false, row.currency.code)"
        width="150"
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
import type { ISpecialProjectAdset } from '@/modules/Partner/views/Campaigns/api'
import { Actions } from '@/modules/Partner/views/Campaigns/components'
import {
	ColumnFormat,
	ColumnId,
	ColumnModeration,
	ColumnName,
	ColumnPlatform,
	ColumnRelatedCampaign,
	ColumnStatus,
} from '@/modules/Partner/views/Campaigns/components/columns'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import SpecialProjectAdsetsSkeleton from './SpecialProjectAdsetsSkeleton.vue'

defineProps<{
  isFetching?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const { formatCurrency } = useCurrency()

const campaignsStore = useCampaignsStore()

const adsets = computed(() => campaignsStore.adsets)
const items = computed(() => adsets.value.items as ISpecialProjectAdset[])

const changePage = async (page: number) => {
	await router.push({ query: { ...route.query, page } })
	campaignsStore.fetchCollection()
}

const defaultColumns = {
	state: true,
	moderation: true,
	platform: true,
	format: true,
	bidCap: true,
	relatedCampaign: true,
}

const currentPage = computed<number>(() => {
	if ('page' in route.query) {
		return +(route.query.page as string)
	}

	return 1
})

const filters = JSON.parse(window.localStorage.getItem(TABLE_FILTER_KEY) || '{}')
const columns = ref<typeof defaultColumns>(filters?.[CampaignType.SPECIAL_PROJECT]?.[AdEntityType.ADSETS] ? filters?.[CampaignType.SPECIAL_PROJECT]?.[AdEntityType.ADSETS] : defaultColumns)

onMounted(campaignsStore.fetchCollection)
</script>
