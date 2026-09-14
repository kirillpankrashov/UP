<template>
  <ValuesItem
    :is-loading="walletStore.isFetching"
    :cash="estimatedEarnings"
    :caption="t('dashboard.values.estimatedEarnings', { month })"
    :link="RouteName.WALLET"
    :link-text="t('dashboard.values.turnOnUplifyPromo')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { useCurrency } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { ValuesItem } from '@/modules/Streamer/views/Dashboard/sections/Values/components'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const walletStore = useWalletStore()

const { formatCurrency } = useCurrency()

const wallet = computed(() => walletStore.wallet)
const estimatedEarnings = computed(() => {
	const estimated = wallet.value?.earnings.estimated
	if (typeof estimated !== 'number') {
		return null
	}

	return formatCurrency(estimated, true, wallet.value?.currency)
})
const month = computed(() => moment().locale(appStore.appLocale).format('MMMM'))
</script>
