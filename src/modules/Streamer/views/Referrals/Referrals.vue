<template>
  <DashboardLayout
    id="streamer-referrals"
    v-loading="referralsStore.isFetchingRefferal"
  >
    <DashboardTitle :title="title" />

    <div v-if="referralsStore.referral">
      <Invite />
      <Promotion />
      <Panels />
      <History />
    </div>

    <div v-else>
      <p
        class="_text-m-regular text-gray"
        v-html="t('referrals.unavailable')"
      />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Referrals/locales'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import {
	History,
	Invite,
	Panels,
	Promotion,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('referrals.header.title'))

useTitle(title)

const referralsStore = useReferralsStore()
const referral = computed(() => referralsStore.referral)

onMounted(() => {
	if (!referral.value) {
		referralsStore.fetchReferral()
	}
})
</script>
