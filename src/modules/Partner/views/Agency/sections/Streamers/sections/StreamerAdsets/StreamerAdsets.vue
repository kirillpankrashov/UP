<template>
  <div
    data-name="partner-agency-streamer-adsets"
    data-test="partner-agency-streamer-adsets"
  >
    <ElDrawer
      v-model="streamersStore.adsetsSidebarVisible"
      :before-close="onClose"
      :title="t('creators.creatorCampaigns.title', { streamer: streamersStore.selectedStreamer?.name || '' })"
      direction="rtl"
      ref="drawer"
      :size="'820px'"
    >
      <StreamerAdsetsSkeleton v-if="streamersStore.isFetchingStreamerAdsets" />

      <div v-else>
        <ElTable
          v-if="streamersStore.streamerCampaigns?.length"
          :data="streamersStore.streamerCampaigns"
          class="w-full"
          size="small"
        >
          <ElTableColumn
            :label="t('creators.stats.columns.campaign')"
            :width="'240px'"
          >
            <template #default="{ row }">
              <ElPopover
                placement="top-start"
                trigger="hover"
                :close-delay="0"
                :open-delay="0"
                :width="'auto'"
              >
                <template #default>
                  <span class="_text-s-regular truncate">{{ row.title }}</span>
                </template>
                <template #reference>
                  <div class="cursor-pointer truncate">
                    {{ row.title }}
                  </div>
                </template>
              </ElPopover>
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.income')">
            <template #default="{ row }">
              {{ getFormattedRevenue(row.revenue) }}
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('creators.stats.columns.views')"
            :width="100"
          >
            <template #default="{ row }">
              {{ row.impressions }}
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.avgCtr')">
            <template #default="{ row }">
              <span
                :class="{
                  '_text-danger': row.totalCtr > 0 && row.totalCtr < 0.3,
                  '_text-success': row.totalCtr >= 0.3
                }"
              >
                {{ row.totalCtr }}%
              </span>
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.ctr')">
            <template #default="{ row }">
              <span
                :class="{
                  '_text-danger': row.todayCtr > 0 && row.todayCtr < 0.3,
                  '_text-success': row.todayCtr >= 0.3
                }"
              >
                {{ row.todayCtr }}%
              </span>
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.status')">
            <template #default="{ row }">
              <ElSwitch
                :disabled="true"
                :model-value="row.status === AdsetStatus.ACTIVE"
                active-text="On"
                inactive-text="Off"
                style="--el-switch-on-color: var(--el-color-gray); --el-switch-off-color: var(--el-color-gray)"
                inline-prompt
              />
            </template>
          </ElTableColumn>

          <ElTableColumn>
            <template #default="{ row }">
              <button
                class="hover:bg-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-transparent transition-colors"
                @click="onCampaignClick(row.slug)"
              >
                <ChevronRightIcon class="h-4 w-4 fill-gray hover:fill-primary" />
              </button>
            </template>
          </ElTableColumn>
        </ElTable>

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
import { AdsetStatus } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { ElDrawer, ElPopover, ElSwitch, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAdsetsActiveStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import StreamerAdsetsSkeleton from './StreamerAdsetsSkeleton.vue'

import ChevronRightIcon from '@/assets/img/icons/chevron-right.svg'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const streamersStore = useAgencyStreamersStore()
const adsetsStore = useAdsetsActiveStore()

const getFormattedRevenue = (revenue: number) => {
	if (!streamersStore.streamerId) return formatCurrency(revenue, false)

	if (streamersStore.selectedStreamer?.wallet?.currency) {
		return formatCurrency(revenue, false, streamersStore.selectedStreamer.wallet.currency)
	}

	return formatCurrency(revenue, false)
}

const onCampaignClick = (slug: string) => {
	adsetsStore.getAdsetInfo(slug)
}

const onClose = () => {
	streamersStore.adsetsSidebarVisible = false
	streamersStore.streamerInfo = null
	streamersStore.streamerId = null
}
</script>
