<template>
  <component
    v-if="appStore.loaded"
    :is="module"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Role } from '@/core/types'
import { useAppStore } from '@/core/store'
import { AuthModule } from '@/modules/Auth'
import { PanelModule } from '@/modules/Panel'
import { PartnerModule } from '@/modules/Partner'
import { Analytics as AnalyticsModule } from '@/modules/Partner/views/Analytics'
import { StreamerModule } from '@/modules/Streamer'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import { RouteName } from './core/router'

const route = useRoute()

const appStore = useAppStore()
const streamerStore = useStreamerStore()

const showStreamerModule = computed(() => appStore.auth.role && appStore.auth.role === Role.STREAMER && streamerStore.profile?.isFilled)
const showPartnerModule = computed(() => appStore.auth.role && appStore.auth.role === Role.PARTNER)
const showPanelModule = computed(() => route.name === RouteName.OBS_DOCK)
const showPublicCampaignAnalyticsModule = computed(() => route.name === RouteName.PUBLIC_CAMPAIGN_ANALYTICS)

const module = computed(() => {
	if (showPanelModule.value) return PanelModule
	if (showPublicCampaignAnalyticsModule.value) return AnalyticsModule
	if (showStreamerModule.value) return StreamerModule
	if (showPartnerModule.value) return PartnerModule

	return AuthModule
})
</script>
