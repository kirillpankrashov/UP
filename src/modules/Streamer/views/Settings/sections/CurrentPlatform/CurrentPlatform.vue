<template>
  <DashboardSection
    id="settings-platform"
    :title="t('settings.widgetPlatform.title')"
  >
    <div class="_text-m-regular mb-4">
      {{ t('settings.widgetPlatform.description') }}
    </div>

    <PlatformSelect
      v-if="settingsStore.widget"
      v-model="settingsStore.widget"
    />
  </DashboardSection>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { PlatformSelect } from '@/components'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()
</script>
