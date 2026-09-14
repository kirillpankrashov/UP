<template>
  <div v-if="segment">
    <ElTable
      :data="paginatedStreamers"
      class="!max-w-xl"
      row-class-name="cursor-pointer"
    >
      <ElTableColumn
        :label="t('segments.form.table.columns.streamer')"
        prop="name"
      >
        <template #default="{ row }">
          <span>{{ row.name }} ({{ row.id }})</span>
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('segments.form.table.columns.lastDayOfActivity')"
        prop="lastActivityAt"
      >
        <template #default="{ row }">
          {{ row.lastActivityAt ? moment(row.lastActivityAt).locale(appStore.appLocale).format('l') : '–' }}
        </template>
      </ElTableColumn>

      <ElTableColumn>
        <template #default="{ row }">
          <div class="flex justify-end">
            <div
              class="_text-s-regular group flex items-center gap-1 border-none bg-transparent hover:text-primary"
              @click="detachStreamer(segment.id, row.id)"
              data-test="delete-streamer"
            >
              <CloseIcon class="h-2 w-2 group-hover:fill-primary" />
              {{ t('segments.form.table.deleteBtn') }}
            </div>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="pageSize"
      :total="selectedStreamers.length"
      :current-page="currentPage"
      @current-change="onPageChange"
      hide-on-single-page
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElPagination,ElTable, ElTableColumn } from '@/components/element-plus'
import type { ISegmentStreamer } from '@/modules/Partner/views/Segments/api'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

import CloseIcon from '@/assets/img/icons/x.svg'
const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const segmentsStore = useSegmentsStore()

const segment = computed(() => segmentsStore.segment.data)

const selectedStreamers = ref<ISegmentStreamer[]>([])

const currentPage = ref(1)
const pageSize = 10

const paginatedStreamers = computed(() => {
	const start = (currentPage.value - 1) * pageSize
	const end = start + pageSize
	return selectedStreamers.value.slice(start, end)
})

const onPageChange = (page: number) => {
	currentPage.value = page
}

const detachStreamer = async (segmentId: number, streamerId: number) => {
	try {
		await segmentsStore.detachStreamer(streamerId, segmentId)
		selectedStreamers.value = selectedStreamers.value.filter(s => s.id !== streamerId)
	}
	catch(err) {
		Logger.error('Error detaching streamer', true, err)
	}
}

onMounted(() => {
	selectedStreamers.value = segment.value?.streamers || []
})

defineExpose({
	selectedStreamers,
})
</script>
