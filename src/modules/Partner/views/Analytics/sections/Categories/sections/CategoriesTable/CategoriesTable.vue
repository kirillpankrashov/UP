<template>
  <div data-name="partner-analytics-categories-table">
    <ElTable
      class="w-full"
      :data="items"
      :default-sort="{ prop: 'impressions', order: 'descending' }"
    >
      <ElTableColumn :label="t('analytics.category')">
        <template #default="{ row, $index }">
          <div class="flex items-center">
            <div class="mr-2 w-5 text-center">
              {{ $index + 1 + (page - 1) * categoriesStore.impressions.perPage }}
            </div>
            <div
              class="mr-2 flex h-8 w-6 items-center justify-center bg-cover bg-center bg-no-repeat"
              :style="{ backgroundImage: `url(${categoryPlaceholder})` }"
            >
              <div
                class="h-8 w-6 bg-cover bg-center bg-no-repeat"
                :style="{ backgroundImage: `url(${row.image.replace(/\s+/g, '')})` }"
              />
            </div>
            <div class="grow">
              {{ row.name }}
            </div>
          </div>
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('analytics.impressions')"
        prop="impressions"
        sortable
        :formatter="(_row: any, _column: any, cellValue: any, _index: any) => {
          return formatNumber(cellValue || 0, false)
        }"
      />
    </ElTable>

    <ElPagination
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="categoriesStore.impressions.perPage"
      :current-page="page"
      :total="categoriesStore.impressions.total"
      hide-on-single-page
      @current-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useCategoriesStore } from '@/modules/Partner/views/Analytics/store'

import categoryPlaceholder from '@/assets/img/category-placeholder.png'

const props = defineProps<{
	dates: {
		start: string
		end: string
	}
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()

const categoriesStore = useCategoriesStore()

const page = ref(1)

const items = computed(() => categoriesStore.impressions.data || [])

const onPageChange = (newPage: number) => {
	page.value = newPage
}

watch(() => props.dates, () => {
	fetchData()
})

watch(page, () => {
	fetchData()
})

const fetchData = () => {
	if (props.dates.start && props.dates.end) {
		categoriesStore.fetchCategoriesImpressions({
			start: props.dates.start,
			end: props.dates.end,
			page: page.value,
		})
	}
}

onMounted(() => {
	if (props.dates.start && props.dates.start !== 'Invalid date') {
		fetchData()
	}
})
</script>
