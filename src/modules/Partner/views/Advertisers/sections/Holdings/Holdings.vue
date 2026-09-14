<template>
  <div data-name="partner-holdings">
    <div class="mb-8 max-w-[260px]">
      <ElInput
        v-model="searchValue"
        :placeholder="t('placeholder.partnerSearch')"
      >
        <template #prefix>
          <SearchIcon class="h-4 w-4 fill-gray" />
        </template>
      </ElInput>
    </div>

    <ElTable
      :data="filteredHoldings || []"
      style="width: 100%"
    >
      <ElTableColumn
        label="ID"
        width="84"
        prop="id"
      />

      <ElTableColumn
        :label="t('advertisers.holdings.table.holding')"
        width="240"
      >
        <template #default="{ row }">
          <div class="flex items-center">
            <div
              class="mr-2 h-8 w-8 rounded-full bg-gray bg-cover bg-center"
              :style="{ backgroundImage: `url(${row.logo})` }"
            />
            <span class="_text-m-regular truncate">{{ row.title }}</span>
          </div>
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('advertisers.holdings.table.description')"
        width="580"
        prop="description"
      />
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElInput, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Advertisers/locales'
import { useHoldingsStore } from '@/modules/Partner/views/Advertisers/store'

import SearchIcon from '@/assets/img/icons/search-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const searchValue = ref('')
const holdingsStore = useHoldingsStore()

const filteredHoldings = computed(() => {
	if (searchValue.value === '') {
		return holdingsStore.holdings
	}

	return holdingsStore.holdings?.filter(holding => {
		return holding.id.toString().includes(searchValue.value) || holding.title.toLowerCase().includes(searchValue.value.toLowerCase())
	})
})

onMounted(() => {
	holdingsStore.fetchHoldings()
})
</script>
