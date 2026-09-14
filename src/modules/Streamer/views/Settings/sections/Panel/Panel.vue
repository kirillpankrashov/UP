<template>
  <DashboardSection
    v-if="widget"
    id="settings-panel-section"
    :title="t('settings.panel.title')"
    class="relative"
  >
    <PanelMobile />
    <PanelObs />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { PanelMobile, PanelObs } from './sections'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
