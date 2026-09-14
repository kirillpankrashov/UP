<template>
  <ValuesItem
    :cash="referralBalance"
    :caption="t('dashboard.values.earnedByReferalls')"
    link="/referrals"
    :link-text="t('dashboard.values.getReferalLink')"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { ValuesItem } from '@/modules/Streamer/views/Dashboard/sections/Values/components'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const referralsStore = useReferralsStore()
const referral = computed(() => referralsStore.referral)

const referralBalance = computed(() => {
	if (!referral.value) {
		return null
	}

	return formatCurrency(referral.value.amount, false, referral.value.currency)
})

onMounted(() => {
	if (referralsStore.referral) return

	referralsStore.fetchReferral()
})
</script>
