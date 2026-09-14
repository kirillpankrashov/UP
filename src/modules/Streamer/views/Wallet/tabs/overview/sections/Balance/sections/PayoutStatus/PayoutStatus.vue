<template>
  <div
    v-if="isVisible"
    id="wallet-balance-payout-status"
    data-name="wallet-balance-payout-status"
    data-test="wallet-balance-payout-status"
    class="mt-6 rounded bg-success-50 p-4 sm:max-w-[690px]"
  >
    <div class="_text-m-bold mb-4">
      {{ t('wallet.paymentServices.tochkaBank.paymentStatus.lastTransaction') }}
    </div>

    <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div class="w-full">
        <div class="_text-s-regular mb-2 flex h-5 items-center justify-between">
          {{ t('wallet.paymentServices.tochkaBank.paymentStatus.fields.amount') }}
          <span class="pl-6">{{ formatCurrency(payoutStatus?.amount || 0, false, wallet?.currency) }}</span>
        </div>
        <div class="_text-s-regular flex h-5 items-center justify-between">
          {{ t('wallet.paymentServices.tochkaBank.paymentStatus.fields.date') }}
          <span
            data-test="wallet-balance-payout-payment-day"
            class="pl-6"
          >{{ paymentDay }}</span>
        </div>
      </div>

      <div class="w-full">
        <div class="_text-s-regular mb-2 flex h-5 items-center justify-between">
          {{ t('wallet.paymentServices.tochkaBank.paymentStatus.fields.status') }}
          <ElTag
            class="ml-2"
            :type="statusLabel[0]"
            size="small"
            round
          >
            <span class="_text-s-bold uppercase">{{ statusLabel[1] }}</span>
          </ElTag>
        </div>

        <div class="_text-s-regular flex h-5 items-center justify-between">
          {{ t('wallet.paymentServices.tochkaBank.paymentStatus.fields.methods') }}
          <ElTag
            class="ml-2"
            :type="isPayable ? 'success' : 'warning'"
            size="small"
            round
          >
            <span class="_text-s-bold uppercase">{{ isPayable ? t('wallet.paymentServices.tochkaBank.statuses.payable') : t('wallet.paymentServices.tochkaBank.statuses.notPayable') }}</span>
          </ElTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { PayoutService, PayoutStatus } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElTag } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useTransactionsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const walletStore = useWalletStore()
const transactionsStore = useTransactionsStore()

const wallet = computed(() => walletStore.wallet)
const isPayable = computed(() => walletStore.isPayable)
const payoutMethod = computed(() => walletStore.payoutMethod)
const payoutStatus = computed(() => {
	const status = transactionsStore.payoutStatus

	if (status && !Array.isArray(status)) {
		return status
	}

	return null
})

type TElTagType = InstanceType<typeof ElTag>['type']

const statusLabel = computed<[TElTagType, string]>(() => {
	switch (payoutStatus.value?.status) {
		case PayoutStatus.SIGNED:
		case PayoutStatus.IN_PROGRESS:
			return ['warn' as TElTagType, t('wallet.paymentServices.tochkaBank.paymentStatus.status.inProgress') as string]
		case PayoutStatus.ERROR:
		case PayoutStatus.REVERSE:
			return ['danger' as TElTagType, t('wallet.paymentServices.tochkaBank.paymentStatus.status.error') as string]
		case PayoutStatus.DONE:
			return ['success' as TElTagType, t('wallet.paymentServices.tochkaBank.paymentStatus.status.success') as string]
		default:
			return ['danger' as TElTagType, '']
	}
})

const isVisible = computed(() => {
	if (payoutMethod?.value?.slug === PayoutService.TOCHKA_BANK && payoutStatus.value) {
		return true
	}
	return false
})

const paymentDay = computed(() => moment(payoutStatus.value?.created).locale(appStore.appLocale).format('L'))

defineExpose({
	statusLabel,
	isVisible,
	paymentDay,
})
</script>
