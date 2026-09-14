<template>
  <ElDrawer
    :title="t('campaigns.newGroup.title')"
    :before-close="() => campaignsStore.campaignsSidebarVisible = false"
    v-model="campaignsStore.campaignsSidebarVisible"
    direction="rtl"
    size="680"
  >
    <CampaignsSidebarSkeleton v-if="campaigns.loading" />

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
          :label="t('campaigns.tables.columns.advertiser')"
          prop="advertiser.title"
          show-overflow-tooltip
        />
      </ElTable>

      <ElPagination
        class="mt-6"
        layout="prev, pager, next"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        :page-size="campaigns.perPage"
        :current-page="campaigns.sidebarPage"
        :total="campaigns.total"
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
import type { AdEntityCampaign } from '@/modules/Partner/views/Campaigns/types'

import CampaignsSidebarSkeleton from './CampaignsSidebarSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const sidebarVisible = computed(() => campaignsStore.campaignsSidebarVisible)
const campaigns = computed(() => campaignsStore.campaigns)
const items = computed(() => campaigns.value.items as AdEntityCampaign[])

watch(sidebarVisible, (visible) => {
	if (!visible) {
		return
	}

	campaignsStore.fetchCollection({
		campaignType: campaignsStore.campaignType,
		adEntityType: AdEntityType.CAMPAIGNS,
	})
})

const onRowClick = (row: AdEntityCampaign) => {
	campaignsStore.campaignsSidebarVisible = false
	router.push({
		name: RouteName.ADSET_CREATE,
		params: {
			campaignSlug: row.slug,
		},
	})
}

const onChangePage = (page: number) => {
	campaignsStore.fetchCollection({
		campaignType: campaignsStore.campaignType,
		adEntityType: AdEntityType.CAMPAIGNS,
		page,
	})
}
</script>

<style>
.el-table__row {
	cursor: pointer;
}
</style>
