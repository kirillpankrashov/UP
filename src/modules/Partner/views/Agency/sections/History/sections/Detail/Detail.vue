<template>
  <ElDrawer
    :title="t('creators.history.detailed.title')"
    :before-close="toggleSidebarVisibility"
    v-model="sidebarVisible"
    direction="rtl"
    size="660px"
  >
    <div class="_text-m-regular mb-8">
      {{ t('creators.history.detailed.description') }}
    </div>

    <ElTable
      v-if="referralStore.historyDetail.data.length"
      :data="referralStore.historyDetail.data"
      :default-sort="{prop: 'streamer.name', order: 'ascending'}"
      style="width: 100%"
    >
      <ElTableColumn
        prop="streamer.name"
        :label="t('creators.list.columns.creator')"
        sortable
      >
        <template #default="{ row: { streamer } }">
          {{ streamer.name }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('creators.list.columns.earnings')"
        prop="amount"
        sortable
      >
        <template #default="{ row: { amount } }">
          {{ formatCurrency(amount) }}
        </template>
      </ElTableColumn>
    </ElTable>

    <div
      v-else
      class="_headline-2 pt-10 text-center text-lightest-gray"
    >
      {{ t('creators.list.none') }}
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import {
	ElDrawer,
	ElTable,
	ElTableColumn,
} from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'


const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const sidebarVisible = ref(false)

const toggleSidebarVisibility = () => {
	sidebarVisible.value = !sidebarVisible.value
}

const referralStore = useAgencyReferralStore()

defineExpose({
	toggleSidebarVisibility,
})
</script>
