<template>
  <div
    v-if="wallet"
    data-name="wallet-balance-current-balance"
    data-test="wallet-balance-current-balance"
    class="grid grid-cols-3 sm:max-w-[690px]"
  >
    <StatCard :value="formatCurrency(wallet?.balance || 0, false, wallet.currency)">
      <template #label>
        <span
          class="_text-s-regular"
          v-html="t('wallet.balance.currentBalance.label')"
        />
        <QuestionTooltip :size="12">
          <p
            class="_text-s-regular"
            v-html="t('wallet.balance.currentBalance.popover')"
          />
        </QuestionTooltip>
      </template>
    </StatCard>

    <StatCard
      v-if="paymentAmountLabel && minimumPaymentAmount"
      :value="formatCurrency(paymentAmount || 0, false, wallet.currency)"
      :label="paymentAmountLabel"
      :disabled="wallet.balance < minimumPaymentAmount"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { Locale } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore, useDictStore } from '@/core/store'
import { QuestionTooltip, StatCard } from '@/components'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const dictStore = useDictStore()
const walletStore = useWalletStore()
const streamerStore = useStreamerStore()

const wallet = computed(() => walletStore.wallet)

const minimumPaymentAmount = computed(() => {
	if (!wallet.value) {
		return null
	}
	return dictStore.all?.minimumPaymentAmount.find((item) => item.currency === wallet.value?.currency)?.value || null
})

const paymentAmount = computed(() => {
	if (!wallet.value || !minimumPaymentAmount.value) {
		return null
	}
	if (wallet.value.balance >= minimumPaymentAmount.value) {
		return wallet.value.balance
	}
	return minimumPaymentAmount.value
})

const paymentAmountLabel = computed(() => {
	if (!wallet.value || !minimumPaymentAmount.value) {
		return null
	}

	if (streamerStore.profile?.language !== Locale.EN && wallet.value.balance >= minimumPaymentAmount.value) {
		const date = moment(wallet.value.paymentDate, 'YYYY-MM-DD').locale(appStore.appLocale).format('L')

		return t('wallet.balance.nextPayout', { date })
	}

	return t('wallet.balance.minimumPayout')
})

defineExpose({
	minimumPaymentAmount,
	paymentAmount,
	paymentAmountLabel,
})
</script>
