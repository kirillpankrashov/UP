<template>
  <div
    id="partner-segments-list"
    data-name="partner-segments-list"
    class="max-w-screen-lg"
  >
    <ElTable
      v-if="searchedSegments.items.length || segments.items.length"
      :data="searchedSegments.items.length ? searchedSegments.items : segments.items"
      @row-click="handleRowClick"
      style="width: 100%"
      row-class-name="cursor-pointer"
    >
      <ElTableColumn
        :label="t('segments.table.columns.title')"
        prop="title"
      />

      <ElTableColumn
        :label="t('segments.table.columns.date')"
        prop="createdAt"
      >
        <template #default="{ row }">
          {{ moment(row.createdAt).locale(appStore.appLocale).format('l') }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('segments.table.columns.streamers')"
        prop="streamers"
      />
    </ElTable>

    <ElPagination
      v-if="!searchedSegments.items.length && segments.items.length"
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="segments.perPage"
      :current-page="currentPage"
      :total="segments.total"
      hide-on-single-page
      @current-change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import type { ISegment } from '@/modules/Partner/views/Segments/api/types'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const segmentsStore = useSegmentsStore()

const segments = computed(() => segmentsStore.segments)
const searchedSegments = computed(() => segmentsStore.searchedSegments)

const router = useRouter()
const route = useRoute()

const currentPage = computed<number>(() => {
	if ('page' in route.query) {
		return +(route.query.page as string)
	}

	return 1
})

const changePage = async (page: number) => {
	await router.push({ query: { ...route.query, page } })
	segmentsStore.fetchSegments()
}

const handleRowClick = (row: ISegment) => {
	segmentsStore.segment.formVisible = true
	segmentsStore.fetchSegment(row.id)
}
</script>
