<template>
  <component
    :is="logo"
    :big="big"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { DomainName } from '@/core/types'
import { useAppStore } from '@/core/store/app'

import Ampverse from './Ampverse.vue'
import GamingPartners from './GamingPartners.vue'
import JoneKiri from './JoneKiri.vue'
import Pareto from './Pareto.vue'
import Streammoney from './Streammoney.vue'
import Streamo from './Streamo.vue'
import Trovo from './Trovo.vue'
import Uplify from './Uplify.vue'

defineProps<{
  big?: boolean
}>()

const appStore = useAppStore()

const logo = computed(() => {
	switch (appStore.domain?.name) {
		case DomainName.STREAMO:
			return Streamo
		case DomainName.PARETO:
			return Pareto
		case DomainName.TROVO:
			return Trovo
		case DomainName.STREAMMONEY:
			return Streammoney
		case DomainName.GAMING_PARTNERS:
			return GamingPartners
		case DomainName.JONEKIRI:
			return JoneKiri
		case DomainName.AMPVERSE:
			return Ampverse
		default:
			return Uplify
	}
})
</script>
