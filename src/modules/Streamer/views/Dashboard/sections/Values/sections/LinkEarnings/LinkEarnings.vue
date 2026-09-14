<template>
  <ValuesItem
    :is-loading="linkAnalyticsStore.analyticsLoading"
    :cash="linkEarned"
    :caption="t('dashboard.values.earnedByFreemium', { month })"
    :link="RouteName.LINK"
    :link-text="t('dashboard.values.freemiumLink')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { ValuesItem } from '@/modules/Streamer/views/Dashboard/sections/Values/components'
import { useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)
const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const walletStore = useWalletStore()
const linkAnalyticsStore = useLinkAnalyticsStore()

const linkEarned = computed(() => formatCurrency(linkAnalyticsStore.analytics?.revenue.month || 0, true, walletStore.wallet?.currency))

const month = computed(() => moment().locale(appStore.appLocale).format('MMMM'))
</script>
