<template>
  <div
    id="settings-statuses"
    class="mb-3 grid grid-cols-2 gap-4 sm:flex sm:gap-8"
  >
    <Status
      :title="t('settings.header.widget')"
      :success="widget?.enabled || false"
    />
    <Status
      :title="t('settings.header.stream')"
      :success="widget?.stream.enabled || false"
    />
    <Status
      :title="t('settings.header.chatbot')"
      :success="widget?.botEnabled || false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { Status } from './components'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
