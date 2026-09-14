<template>
  <ElDrawer
    :title="t('campaigns.newGroup.title')"
    :before-close="() => campaignsStore.adsetsSidebarVisisble = false"
    v-model="campaignsStore.adsetsSidebarVisisble"
    direction="rtl"
    size="680"
  >
    <AdsetsSidebarSkeleton v-if="adsets.loading" />

    <div v-else>
      <div class="_text-m-regular mb-8">
        {{ t('campaigns.newGroup.description') }}
      </div>

      <ElTable
        :data="items"
        tooltip-effect="light"
        @row-click="onRowClick"
      >
        <ElTableColumn
          :label="t('campaigns.tables.columns.name')"
          prop="title.default"
          show-overflow-tooltip
        />
        <ElTableColumn
          :label="t('campaigns.tables.columns.id')"
          prop="slug"
          show-overflow-tooltip
        />
        <ElTableColumn
          :label="t('campaigns.tables.columns.relatedCampaign')"
          prop="campaign.title.default"
          show-overflow-tooltip
        />
      </ElTable>

      <ElPagination
        class="mt-6"
        layout="prev, pager, next"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        :page-size="adsets.perPage"
        :current-page="adsets.sidebarPage"
        :total="adsets.total"
        hide-on-single-page
        @current-change="onChangePage"
      />
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { ElDrawer, ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntityAdset } from '@/modules/Partner/views/Campaigns/types'

import AdsetsSidebarSkeleton from './AdsetsSidebarSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const sidebarVisible = computed(() => campaignsStore.adsetsSidebarVisisble)
const adsets = computed(() => campaignsStore.adsets)
const items = computed(() => adsets.value.items as AdEntityAdset[])

watch(sidebarVisible, (visible) => {
	if (!visible) {
		return
	}

	campaignsStore.fetchCollection({
		campaignType: campaignsStore.campaignType,
		adEntityType: AdEntityType.ADSETS,
	})
})

const onRowClick = (row: AdEntityAdset) => {
	campaignsStore.adsetsSidebarVisisble = false
	router.push({
		name: RouteName.CREATIVE_CREATE,
		params: {
			campaignSlug: row.campaign.slug,
			adsetSlug: row.slug,
		},
	})
}

const onChangePage = (page: number) => {
	campaignsStore.fetchCollection({
		campaignType: campaignsStore.campaignType,
		adEntityType: AdEntityType.ADSETS,
		page,
	})
}
</script>

<style>
.el-table__row {
	cursor: pointer;
}
</style>
