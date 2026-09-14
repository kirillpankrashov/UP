<template>
  <div>
    <ElTable
      class="w-full"
      :data="items"
      :default-sort="{ prop: 'impressions', order: 'descending' }"
      @sort-change="onSortChange"
    >
      <ElTableColumn
        :label="t('analytics.creator')"
        min-width="200"
      >
        <template #default="{ row, $index }">
          <div class="flex items-center">
            <div class="mr-2 w-5 shrink-0 text-center">
              {{ getRealRowIndex($index) }}
            </div>
            <div
              class="mr-2 h-8 w-8 shrink-0 rounded-full bg-lightest-gray bg-cover bg-center"
              :style="{ backgroundImage: `url(${row.image})` }"
            />
            <div class="truncate">
              {{ row.name }}
            </div>
            <div class="ml-2 fill-dark-gray">
              <TwitchIcon
                v-show="row.platform === Platform.TWITCH"
                class="h-4 w-4"
              />
              <YoutubeIcon
                v-show="row.platform === Platform.YOUTUBE"
                class="h-4 w-4"
              />
              <TrovoIcon
                v-show="row.platform === Platform.TROVO"
                class="h-4 w-4"
              />
              <TiktokIcon
                v-show="row.platform === Platform.TIKTOK"
                class="h-4 w-4"
              />
              <VkplayIcon
                v-show="row.platform === Platform.VK_PLAY"
                class="h-4 w-4"
              />
            </div>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn
        :label="t('analytics.impressions')"
        prop="impressions"
        sortable="custom"
        :formatter="(_row: any, _column: any, cellValue: any, _index: any) => {
          return formatNumber(cellValue || 0, false)
        }"
      />
      <ElTableColumn
        :label="t('analytics.clicks')"
        prop="clicks"
        sortable="custom"
        :formatter="(_row: any, _column: any, cellValue: any, _index: any) => {
          return formatNumber(cellValue || 0, false)
        }"
      />
      <ElTableColumn
        :label="t('analytics.CTR')"
        prop="ctr"
        sortable="custom"
        :formatter="(_row: any, _column: any, cellValue: any, _index: any) => {
          if (!cellValue) {
            return '0%'
          }
          return formatNumber((cellValue || 0) * 100) + '%'
        }"
      />
    </ElTable>

    <ElPagination
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="streamersStore.perPage"
      :current-page="props.filters.page"
      :total="streamersStore.total"
      @current-change="onPageChange"
      hide-on-single-page
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStreamersStore } from '@/modules/Partner/views/Analytics/store'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkplayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

const props = defineProps<{
	filters: {
		page: number
		sortBy: string | null
		sortDirection: string | null
	}
}>()

const emit = defineEmits(['update:filters'])

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()

const streamersStore = useStreamersStore()
const items = computed(() => streamersStore.data || [])

const getRealRowIndex = (index: number) => {
	return index + 1 + streamersStore.perPage * (props.filters.page - 1)
}

const onSortChange = (params: { order: string; prop: string }) => {
	const { order, prop } = params
	emit('update:filters', {
		...props.filters,
		sortBy: prop,
		sortDirection: order,
	})
}

const onPageChange = (newPage: number) => {
	emit('update:filters', {
		...props.filters,
		page: newPage,
	})
}
</script>
