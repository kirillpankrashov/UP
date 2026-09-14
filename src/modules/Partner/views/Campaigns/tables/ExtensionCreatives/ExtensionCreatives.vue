<template>
  <ExtensionCreativesSkeleton
    v-if="isFetching"
    :columns="columns"
  />

  <div
    v-else
    v-loading="creatives.loading || !creatives.bootstrapped"
  >
    <ElTable
      v-if="items.length && !creatives.loading"
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
      <ColumnPlatform
        v-if="columns.platform"
        :items="items"
      />
      <ColumnImpressions
        v-if="columns.impressions"
        :items="items"
      />
      <ElTableColumn
        v-if="columns.ctr"
        :label="t('campaigns.tables.columns.ctr')"
        :formatter="(row: IExtensionCreative) => row.ctr.toFixed(2) + '%'"
        width="100"
      />
      <ColumnFormat
        v-if="columns.format"
        :items="items"
      />
      <ColumnRelatedAdset
        v-if="columns.relatedCampaign"
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
      v-if="creatives.bootstrapped && items.length"
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="creatives.perPage"
      :current-page="currentPage"
      :total="creatives.total"
      hide-on-single-page
      @current-change="(page) => changePage(page)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AdEntityType, CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import type { IExtensionCreative } from '@/modules/Partner/views/Campaigns/api'
import { Actions } from '@/modules/Partner/views/Campaigns/components'
import {
	ColumnFormat,
	ColumnId,
	ColumnImpressions,
	ColumnName,
	ColumnPlatform,
	ColumnRelatedAdset,
	ColumnRelatedCampaign,
	ColumnStatus,
} from '@/modules/Partner/views/Campaigns/components/columns'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import ExtensionCreativesSkeleton from './ExtensionCreativesSkeleton.vue'

defineProps<{
  isFetching?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const campaignsStore = useCampaignsStore()

const creatives = computed(() => campaignsStore.creatives)
const items = computed(() => creatives.value.items as IExtensionCreative[])

const changePage = async (page: number) => {
	await router.push({ query: { ...route.query, page } })
	campaignsStore.fetchCollection()
}

const defaultColumns = {
	state: true,
	platform: true,
	impressions: true,
	ctr: true,
	format: true,
	relatedGroup: true,
	relatedCampaign: true,
}

const currentPage = computed<number>(() => {
	if ('page' in route.query) {
		return +(route.query.page as string)
	}

	return 1
})

const filters = JSON.parse(window.localStorage.getItem(TABLE_FILTER_KEY) || '{}')
const columns = ref<typeof defaultColumns>(filters?.[CampaignType.EXTENSION]?.[AdEntityType.CREATIVES] ? filters?.[CampaignType.EXTENSION]?.[AdEntityType.CREATIVES] : defaultColumns)

onMounted(campaignsStore.fetchCollection)
</script>
