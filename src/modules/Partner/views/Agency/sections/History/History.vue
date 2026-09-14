<template>
  <DashboardSection
    data-name="creators-history"
    data-test="creators-history"
    class="creators-history"
    :title="t('creators.history.title')"
    :no-border="true"
  >
    <div
      v-if="referralStore.history.amount"
      class="rounded-base _text-m-regular mb-6 inline-block w-full overflow-hidden text-ellipsis bg-primary-50 px-4 !leading-[48px] text-dark-gray"
    >
      {{ t('creators.history.payments') }} <b>{{ formatCurrency(referralStore.history.amount) }}</b>
    </div>

    <HistorySkeleton v-if="referralStore.history.isFetching" />

    <ElTable
      v-else-if="referralStore.history.data.length"
      :data="referralStore.history.data"
      @row-click="rowClick"
    >
      <ElTableColumn :label="t('creators.history.columns.date')">
        <template #default="{ row: { date }}">
          {{ moment(date, 'DD.MM.YYYY').locale(appStore.appLocale).format('LL') }}
        </template>
      </ElTableColumn>

      <ElTableColumn :label="t('creators.history.columns.payment')">
        <template #default="{ row: { amount } }">
          {{ formatCurrency(amount) }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        width="80"
        align="right"
        :label="t('creators.history.columns.details')"
      >
        <div class="flex justify-end">
          <ArrowLeft class="h-3 w-3 rotate-180" />
        </div>
      </ElTableColumn>
    </ElTable>

    <div
      v-else
      class="_headline-2 pt-10 text-center text-lightest-gray"
    >
      {{ t('creators.history.none') }}
    </div>

    <ElPagination
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="referralStore.history.perPage"
      :current-page="referralStore.history.page"
      :total="referralStore.history.total"
      hide-on-single-page
      @current-change="changePage"
    />

    <!-- <CreatorsDetailedPayout
      v-if="detailedDate"
      v-model:date="detailedDate"
    /> -->

    <Detail ref="detailRef" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import moment from 'moment'

import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import HistorySkeleton from './HistorySkeleton.vue'
import { Detail } from './sections'

import ArrowLeft from '@/assets/img/icons/arrow-left.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const referralStore = useAgencyReferralStore()

const detailRef = ref<InstanceType<typeof Detail>>()

const { formatCurrency } = useCurrency()

const rowClick = (row: {date: string}) => {
	const date = moment(row.date, 'DD.MM.YYYY').locale(appStore.appLocale).format('DD-MM-YYYY')

	referralStore.fetchReferralHistoryDetail(date)
	detailRef.value?.toggleSidebarVisibility()
}

const changePage = (page: number) => {
	referralStore.fetchReferralHistory(page)
}

onMounted(() => {
	referralStore.fetchReferralHistory()
})
</script>

<style lang="scss" scoped>
.el-table__row {
  cursor: pointer !important;
}
</style>
