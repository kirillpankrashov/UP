<template>
  <div
    data-name="partner-agency-streamers-list"
    class="creators-table"
  >
    <StreamersListSkeleton v-if="showInitialSkeleton" />

    <div v-else-if="streamersStore.streamers.data?.length">
      <ElTable
        :data="streamersStore.streamers.data"
        style="width: 100%"
      >
        <ElTableColumn
          :label="t('creators.creatorsTable.columns.creators')"
          width="240"
        >
          <template #default="{ row: { name, id } }">
            {{ name }} ({{ id }})
          </template>
        </ElTableColumn>

        <ElTableColumn
          width="160"
          :label="t('creators.creatorsTable.columns.lastActivity')"
        >
          <template #default="{ row: { lastActivity } }">
            {{ moment(lastActivity).locale(appStore.appLocale).format('L') }}
          </template>
        </ElTableColumn>

        <ElTableColumn :label="t('creators.creatorsTable.columns.balance')">
          <template #default="{ row: { wallet } }">
            {{ formatCurrency(wallet.balance, false, wallet.currency) }}
          </template>
        </ElTableColumn>

        <ElTableColumn
          :label="t('creators.creatorsTable.columns.campaign')"
          width="85"
        >
          <template #default="{ row: { campaigns } }">
            {{ campaigns }}
          </template>
        </ElTableColumn>

        <ElTableColumn v-slot="{ row }">
          <div class="flex w-20 justify-end gap-4">
            <StreamerStatus :streamer="row" />

            <button
              class="group shrink-0 cursor-pointer border-none bg-transparent"
              @click="streamersStore.fetchStreamerAdsets(row.id)"
            >
              <CreativeIcon class="h-4 w-4 fill-gray group-hover:fill-primary" />
            </button>

            <button
              class="group shrink-0 cursor-pointer border-none bg-transparent"
              @click="streamersStore.fetchStreamerInfo(row.id)"
            >
              <GearIcon class="h-4 w-4 fill-gray group-hover:fill-primary" />
            </button>
          </div>
        </ElTableColumn>
      </ElTable>

      <div style="text-align: center;">
        <ElButton
          v-if="hasMoreStreamers"
          class="mt-8 w-full max-w-[220px]"
          type="primary"
          size="large"
          :loading="streamersStore.isFetchingStreamers"
          :disabled="streamersStore.isFetchingStreamers"
          @click="load"
        >
          <span class="_text-m-bold">
            {{ streamersStore.isFetchingStreamers ? t('button.loadMorePending') : t('button.loadMore') }}
          </span>
        </ElButton>
      </div>
    </div>

    <div
      v-else
      class="_text-m-regular_headline-2 pt-10 text-center text-lightest-gray"
    >
      {{ t('creators.creatorsTable.none') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElButton, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import { StreamerStatus } from './sections'
import StreamersListSkeleton from './StreamersListSkeleton.vue'

import CreativeIcon from '@/assets/img/icons/creative.svg'
import GearIcon from '@/assets/img/icons/gear.svg'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()

const streamersStore = useAgencyStreamersStore()

const showInitialSkeleton = computed(() => {
	return streamersStore.isFetchingStreamers && streamersStore.streamers.data.length === 0
})

const hasMoreStreamers = computed(() => {
	return streamersStore.streamers.data.length < streamersStore.streamers.total
})

const load = () => {
	streamersStore.fetchStreamers(streamersStore.streamers.page + 1, true)
}
</script>
