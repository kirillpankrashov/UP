<template>
  <DashboardSection
    v-if="wallet"
    id="wallet-balance"
    data-name="wallet-balance"
    data-test="wallet-balance"
    class="wallet-balance-section"
    :title="t('wallet.balance.title')"
    :no-border="true"
  >
    <div class="grid gap-2">
      <EstimatedBalance />
      <CurrentBalance />
    </div>

    <div class="_text-m-regular mt-4">
      <TextLink
        class="no-underline"
        :href="t('links.whenWillIReceiveMyPayouts')"
        target="_blank"
      >
        {{ t('wallet.balance.howPayoutsWork') }}
      </TextLink>
    </div>

    <PayoutStatus />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import {
	CurrentBalance,
	EstimatedBalance,
	PayoutStatus,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const walletStore = useWalletStore()

const wallet = computed(() => walletStore.wallet)
</script>
