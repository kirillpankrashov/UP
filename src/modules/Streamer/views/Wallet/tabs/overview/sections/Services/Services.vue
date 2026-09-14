<template>
  <ServiceRazorPay v-if="payoutMethod?.slug === PayoutService.RAZOR_PAY" />
  <ServiceTochka v-else-if="payoutMethod?.slug === PayoutService.TOCHKA_BANK" />
  <ServiceTipalti v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { PayoutService } from '@/core/types'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import {
	ServiceRazorPay,
	ServiceTipalti,
	ServiceTochka,
} from './sections'

const walletStore = useWalletStore()

const payoutMethod = computed(() => walletStore.payoutMethod)
</script>
