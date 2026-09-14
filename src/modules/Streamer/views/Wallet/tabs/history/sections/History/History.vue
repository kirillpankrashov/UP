<template>
  <DashboardSection
    id="wallet-history"
    data-name="wallet-history"
    data-test="wallet-history"
    :title="t('wallet.payoutHistory.title')"
    :no-border="true"
  >
    <ElTable
      v-if="transactions.data.length"
      :data="transactions.data"
      style="width: 100%"
    >
      <ElTableColumn
        :label="t('wallet.payoutHistory.columns.date')"
        prop="date"
      />

      <ElTableColumn :label="t('wallet.payoutHistory.columns.amount')">
        <template #default="{ row: { amount } }">
          {{ formatCurrency(amount, false, wallet?.currency) }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('wallet.payoutHistory.columns.service')"
        prop="service"
      />

      <ElTableColumn
        :label="t('wallet.payoutHistory.columns.invoice')"
        :align="'right'"
      >
        <template #default="{ row: { invoice } }">
          <a
            v-if="invoice"
            :href="invoice"
            target="_blank"
          >
            <DownloadIcon class="inline-block h-3 w-3 fill-gray" />
          </a>
        </template>
      </ElTableColumn>
    </ElTable>

    <div
      v-else
      class="_text-m-regular text-center"
    >
      {{ t('wallet.payoutHistory.noData') }}
    </div>

    <ElPagination
      class="mt-4"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="transactions.perPage"
      :current-page="transactions.page"
      :total="transactions.total"
      hide-on-single-page
      @current-change="changePage"
    />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useTransactionsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import DownloadIcon from '@/assets/img/icons/download.svg'

const { t } = useLocale<typeof messages>(messages)

const transactionsStore = useTransactionsStore()
const transactions = computed(() => transactionsStore.transactions)

const { formatCurrency } = useCurrency()

const walletStore = useWalletStore()
const wallet = computed(() => walletStore.wallet)

const changePage = (page: number) => {
	transactionsStore.fetchTransactions(page)
}
</script>
