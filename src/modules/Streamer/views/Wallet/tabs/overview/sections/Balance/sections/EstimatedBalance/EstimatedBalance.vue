<template>
  <div
    v-if="wallet"
    data-name="wallet-balance-estimated-balance"
    data-test="wallet-balance-estimated-balance"
    class="grid grid-cols-3 sm:max-w-[690px]"
  >
    <StatCard :value="formatCurrency(wallet.earnings.estimated, true, wallet.currency)">
      <template #label>
        <span
          class="_text-s-regular"
          v-html="t('wallet.balance.estimatedEarnings.label', { month })"
        />
        <QuestionTooltip :size="12">
          <p
            class="_text-s-regular break-normal text-left"
            v-html="t('wallet.balance.estimatedEarnings.popover')"
          />
        </QuestionTooltip>
      </template>
    </StatCard>

    <StatCard
      :value="formatCurrency(wallet.cpaAmountReview, true, wallet.currency)"
      :label="t('wallet.balance.cpaOnReview.label')"
    />

    <StatCard
      v-if="LINK_ENABLED"
      :value="formatCurrency(wallet.earnings.audited, true, wallet.currency)"
    >
      <template #label>
        <span
          class="_text-s-regular"
          v-html="t('wallet.balance.auditedEarnings.label')"
        />
        <QuestionTooltip :size="12">
          <p
            class="_text-s-regular break-normal text-left"
            v-html="t('wallet.balance.auditedEarnings.popover')"
          />
        </QuestionTooltip>
      </template>
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { LINK_ENABLED } from '@/core/consts'
import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { QuestionTooltip, StatCard } from '@/components'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const walletStore = useWalletStore()

const wallet = computed(() => walletStore.wallet)

const month = computed(() => moment().locale(appStore.appLocale).format('MMMM'))
</script>
