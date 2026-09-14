<template>
  <div data-name="partner-agency-adset-streamers">
    <ElDrawer
      v-model="model"
      :title="t('creators.campaignCreators.title', { title: adsetsStore.adsetTitle })"
      direction="rtl"
      ref="drawer"
      :size="'756px'"
    >
      <div>
        <AdsetStreamersSkeleton v-if="showInitialSkeleton" />

        <div v-else-if="adsetsStore.adsetStreamers.data?.length">
          <ElTable
            :data="adsetsStore.adsetStreamers.data"
            class="w-full"
            size="small"
          >
            <ElTableColumn
              :label="t('creators.stats.columns.creator')"
              :width="'210px'"
            >
              <template #default="{ row }">
                {{ row.nickname }}
              </template>
            </ElTableColumn>

            <ElTableColumn :label="t('creators.stats.columns.income')">
              <template #default="{ row }">
                {{ formatCurrency(row.revenue, false, row.currency) }}
              </template>
            </ElTableColumn>

            <ElTableColumn :label="t('creators.stats.columns.views')">
              <template #default="{ row }">
                {{ row.impressions }}
              </template>
            </ElTableColumn>

            <ElTableColumn :label="t('creators.stats.columns.avgCtr')">
              <template #default="{ row }">
                <span
                  :class="{
                    '_text-danger': row.averageCtr > 0 && row.averageCtr < 0.3,
                    '_text-success': row.averageCtr >= 0.3
                  }"
                >
                  {{ row.averageCtr }}%
                </span>
              </template>
            </ElTableColumn>

            <ElTableColumn :label="t('creators.stats.columns.ctr')">
              <template #default="{ row }">
                <span
                  :class="{
                    '_text-danger': row.dailyCtr > 0 && row.dailyCtr < 0.3,
                    '_text-success': row.dailyCtr >= 0.3
                  }"
                >
                  {{ row.dailyCtr }}%
                </span>
              </template>
            </ElTableColumn>

            <ElTableColumn :label="t('creators.stats.columns.status')">
              <template #default="{ row }">
                <ElSwitch
                  :disabled="true"
                  :model-value="row.status === 'active'"
                  active-text="On"
                  inactive-text="Off"
                  style="--el-switch-on-color: var(--el-color-gray); --el-switch-off-color: var(--el-color-gray)"
                  inline-prompt
                />
              </template>
            </ElTableColumn>
          </ElTable>

          <ElPagination
            v-if="adsetsStore.adsetStreamers.data?.length"
            class="mt-6"
            layout="prev, pager, next"
            :prev-text="t('button.pagination.prev')"
            :next-text="t('button.pagination.next')"
            :page-size="adsetsStore.adsetStreamers.perPage"
            :current-page="adsetsStore.adsetStreamers.page"
            :total="adsetsStore.adsetStreamers.total"
            hide-on-single-page
            @current-change="onChangePage"
          />
        </div>

        <div
          v-else
          class="_headline-2 pt-10 text-center text-lightest-gray"
        >
          {{ t('creators.stats.none') }}
        </div>
      </div>
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { ElDrawer, ElPagination, ElSwitch, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAdsetsActiveStore, useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

import AdsetStreamersSkeleton from './AdsetStreamersSkeleton.vue'

const model = defineModel<boolean>({ required: true })

const props = defineProps<{
  adsetsStore: ReturnType<typeof useAdsetsActiveStore | typeof useAdsetsClosedStore>
}>()

const { t } = useLocale<typeof messages>(messages)
const { formatCurrency } = useCurrency()

const showInitialSkeleton = computed(() => {
	return props.adsetsStore.isFetchingData && !props.adsetsStore.adsetStreamers.data?.length
})

const onChangePage = (page: number) => {
	const slug = props.adsetsStore.adsetSlug
	if (slug) {
		props.adsetsStore.getStreamers(slug, page)
	}
}
</script>
