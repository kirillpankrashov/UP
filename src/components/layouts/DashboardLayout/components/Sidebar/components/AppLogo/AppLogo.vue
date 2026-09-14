<template>
  <div
    id="dashboard-layout-sidebar-app-logo"
    class="sm:mb-9"
  >
    <a
      v-if="appStore.domain?.name === DomainName.STREAMO"
      target="_blank"
      href="https://www.streamo.media"
      class="relative inline-block"
    >
      <AppLogo />
    </a>
    <router-link
      v-else
      :to="mainPage"
      class="relative inline-block"
    >
      <AppLogo />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { DomainName, Role } from '@/core/types'
import { useAppStore } from '@/core/store'
import { AppLogo } from '@/components'
import { RouteName as PartnerRouteName } from '@/modules/Partner/router'
import { RouteName as StreamerRouteName } from '@/modules/Streamer/router'

const appStore = useAppStore()

const mainPage = computed<RouteLocationRaw>(() => {
	if (appStore.auth.role === Role.STREAMER) {
		return { name: StreamerRouteName.DASHBOARD }
	}
	if (appStore.auth.role === Role.PARTNER) {
		return { name: PartnerRouteName.BRAND_AWARENESS_CAMPAIGNS }
	}
	return { path: '/' }
})
</script>
