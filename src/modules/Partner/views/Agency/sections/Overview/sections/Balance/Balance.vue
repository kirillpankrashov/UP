<template>
  <div
    data-name="partner-agency-overview-balance"
    data-test="partner-agency-overview-balance"
    class="grid grid-cols-2"
  >
    <template v-if="!agencyStore.isUplifyAgency">
      <StatCard
        :loading="agencyStreamersStore.isFetchingStreamers"
        :label="t('creators.invite.invited')"
        :value="agencyStreamersStore.streamers.total.toString()"
      />
      <StatCard
        :loading="agencyStore.isFetchingData"
        :label="t('creators.invite.amount')"
        :value="formatCurrency(agencyStore.data?.wallet?.balance ?? 0, false, agencyStore.data?.wallet?.currency)"
      />
    </template>

    <template v-else>
      <StatCard
        :loading="referralStore.referral.isFetching"
        :label="t('creators.invite.invited')"
        :value="referralStore.referral.data?.invited.toString() || '0'"
      />
      <StatCard
        :loading="referralStore.referral.isFetching"
        :label="t('creators.invite.amount')"
        :value="formatCurrency(referralStore.referral.data?.balance ?? 0, false, referralStore.referral.data?.currency)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { StatCard } from '@/components'
import { messages } from '@/modules/Partner/views/Agency/locales'
import {
	useAgencyReferralStore,
	useAgencyStore,
	useAgencyStreamersStore,
} from '@/modules/Partner/views/Agency/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const agencyStore = useAgencyStore()
const agencyStreamersStore = useAgencyStreamersStore()
const referralStore = useAgencyReferralStore()

onMounted(() => {
	if (agencyStore.isUplifyAgency) {
		referralStore.fetchReferral()
	}
	else {
		agencyStore.fetchData()
		agencyStreamersStore.fetchStreamers()
	}
})
</script>
