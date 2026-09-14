<template>
  <ValuesItem
    :is-loading="walletStore.isFetching"
    :cash="formatCurrency(walletStore.wallet?.cpaAmountReview || 0, true, walletStore.wallet?.currency)"
    :caption="t('dashboard.values.cpaEarnings')"
    :link="RouteName.WALLET"
    :link-text="t('dashboard.values.turnOnUplifyPromo')"
  />
</template>

<script setup lang="ts">
import { useCurrency, useLocale } from '@/core/hooks'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { ValuesItem } from '@/modules/Streamer/views/Dashboard/sections/Values/components'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)
const { formatCurrency } = useCurrency()

const walletStore = useWalletStore()
</script>
