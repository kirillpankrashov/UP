<template>
  <DashboardLayout id="dashboard">
    <DashboardTitle
      :title="title"
      class="!mb-2"
    />

    <Greeting />
    <Setup />
    <Values />
    <Loyalty />
    <Resources />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { Greeting, Loyalty, Resources, Setup, Values } from '@/modules/Streamer/views/Dashboard/sections'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('dashboard.title'))

useTitle(title)

const dashboardStore = useDashboardStore()

onMounted(() => {
	if (!dashboardStore.checklist) {
		dashboardStore.fetchCheckList()
	}
	if (!dashboardStore.tier.data && !dashboardStore.tier.selectedLevel) {
		dashboardStore.fetchTier()
	}
})
</script>
