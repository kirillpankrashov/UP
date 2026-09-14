<template>
  <DashboardLayout
    id="wallet"
    data-name="wallet"
    data-test="wallet"
    v-loading="!walletStore.wallet"
    :full-width="true"
  >
    <DashboardTitle :title="title" />

    <ElTabs v-model="activeName">
      <ElTabPane
        :label="t('wallet.tabs.overview')"
        name="overview"
      >
        <Balance />
        <Services />
        <Analytics />
      </ElTabPane>

      <ElTabPane
        :label="t('wallet.tabs.history')"
        name="history"
      >
        <History />
      </ElTabPane>
    </ElTabs>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import {
	useTransactionsStore,
	useWalletAnalyticsStore,
	useWalletStore,
} from '@/modules/Streamer/views/Wallet/store'
import { History } from '@/modules/Streamer/views/Wallet/tabs/history/sections'
import {
	Analytics,
	Balance,
	Services,
} from '@/modules/Streamer/views/Wallet/tabs/overview/sections'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('wallet.header.title'))

useTitle(title)

const referralStore = useReferralsStore()
const walletStore = useWalletStore()
const analyticsStore = useWalletAnalyticsStore()
const transactionsStore = useTransactionsStore()

const activeName = ref<'overview' | 'history'>('overview')

onBeforeMount(() => {
	if (!walletStore.wallet) {
		walletStore.fetchWallet()
	}
	if (!referralStore.referral) {
		referralStore.fetchReferral()
	}
	if (!transactionsStore.transactions.data.length) {
		transactionsStore.fetchTransactions()
	}
	if (!analyticsStore.data.length) {
		analyticsStore.fetchAnalytics()
	}
})
</script>
