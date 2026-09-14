<template>
  <div
    data-name="partner-agency-invoices"
    data-test="partner-agency-invoices"
  >
    <h3 class="_text-m-bold mb-6">
      {{ t('creators.billing.invoices.title') }}
    </h3>

    <InvoicesSkeleton v-if="showInvoicesSkeleton" />

    <ElTable
      v-else-if="billingStore.invoices.data?.length"
      :data="billingStore.invoices.data"
      class="w-full"
    >
      <ElTableColumn
        :label="t('creators.billing.invoices.date')"
        prop="date"
      />

      <ElTableColumn
        :label="t('creators.billing.invoices.amount')"
        prop="amount"
      >
        <template #default="{ row: { amount, currency } }">
          <div class="flex items-center gap-1">
            <span v-if="currency.code !== 'rub'">{{ currency.flag }}</span>
            <span>{{ amount }}</span>
            <span v-if="currency.code === 'rub'">{{ currency.flag }}</span>
          </div>
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('creators.billing.invoices.invoice')"
        align="right"
      >
        <template #default="{ row: { invoice } }">
          <a
            v-if="invoice"
            :href="invoice"
            target="_blank"
            class="inline-block cursor-pointer"
            download
          >
            <DownloadIcon class="h-3 w-3 fill-gray hover:fill-primary" />
          </a>
        </template>
      </ElTableColumn>
    </ElTable>

    <div
      v-else
      class="_text-m-regular pt-10 text-center text-lightest-gray"
    >
      {{ t('creators.creatorsTable.none') }}
    </div>

    <ElPagination
      v-if="!showInvoicesSkeleton && billingStore.invoices.data?.length"
      class="mt-6"
      layout="prev, pager, next"
      :prev-text="t('pagination.prev')"
      :next-text="t('pagination.next')"
      :page-size="billingStore.invoices.perPage"
      :current-page="billingStore.invoices.page"
      :total="billingStore.invoices.total"
      hide-on-single-page
      @current-change="onChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElPagination, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useBillingStore } from '@/modules/Partner/views/Agency/store'

import InvoicesSkeleton from './InvoicesSkeleton.vue'

import DownloadIcon from '@/assets/img/icons/download.svg'

const { t } = useLocale<typeof messages>(messages)

const billingStore = useBillingStore()

const showInvoicesSkeleton = computed(
	() => billingStore.invoices.loading && !billingStore.invoices.data?.length,
)

const onChangePage = (page: number) => {
	billingStore.fetchInvoices(page)
}
</script>
