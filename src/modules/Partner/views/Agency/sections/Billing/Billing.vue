<template>
  <div
    data-name="agency-billing"
    data-test="agency-billing"
  >
    <Form />
    <Invoices />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useBillingStore } from '@/modules/Partner/views/Agency/store'

import { Form, Invoices } from './sections'

const billingStore = useBillingStore()

onMounted(() => {
	billingStore.fetchBilling()
	billingStore.fetchInvoices()
})
</script>
