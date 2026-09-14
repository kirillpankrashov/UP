<template>
  <ElDrawer
    :title="t('creators.list.title')"
    :before-close="toggleSidebarVisibility"
    v-model="sidebarVisible"
    ref="drawer"
    size="680px"
  >
    <StreamersListSkeleton v-if="referralStore.streamers.isFetching" />

    <template
      v-else-if="referralStore.streamers.data.length"
    >
      <div class="_text-m-regular mb-8">
        {{ t('creators.list.description') }} <b>{{ formatCurrency(referralStore.streamers.amount, false) }}</b>
      </div>

      <ElTable
        :data="referralStore.streamers.data"
        :default-sort="{prop: 'streamer.name', order: 'ascending'}"
        style="width: 100%"
      >
        <ElTableColumn
          prop="streamer.name"
          :label="t('creators.list.columns.creator')"
          sortable
          width="240"
        >
          <template #default="{ row: { streamer } }">
            {{ streamer.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn
          :label="t('creators.list.columns.lastActivity')"
          prop="last_activity"
          sortable
          width="240"
        >
          <template #default="{ row: { lastActivity } }">
            {{ moment(lastActivity).locale(appStore.appLocale).format('L') }}
          </template>
        </ElTableColumn>

        <ElTableColumn
          :label="t('creators.list.columns.earnings')"
          prop="amount"
          sortable
          width="120"
        >
          <template #default="{ row: { amount } }">
            {{ formatCurrency(amount, false) }}
          </template>
        </ElTableColumn>
      </ElTable>
    </template>

    <div
      v-else
      class="_text-m-regular_headline-2 pt-10 text-center text-lightest-gray"
    >
      {{ t('creators.list.none') }}
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'

import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElDrawer, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import StreamersListSkeleton from './StreamersListSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const referralStore = useAgencyReferralStore()
const appStore = useAppStore()

const { formatCurrency } = useCurrency()

const sidebarVisible = ref(false)

const toggleSidebarVisibility = () => {
	sidebarVisible.value = !sidebarVisible.value
}

defineExpose({
	toggleSidebarVisibility,
})
</script>
