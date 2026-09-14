<template>
  <div data-name="panel-statuses">
    <div class="mb-3 grid grid-cols-2 gap-4">
      <Status
        :title="t('panel.statuses.stream')"
        :success="widget?.stream.enabled || false"
      />
      <Status
        :title="t('panel.statuses.extension')"
        :success="widget?.enabled || false"
      />
      <Status
        :title="t('panel.statuses.chatbot')"
        :success="widget?.botEnabled || false"
      />
    </div>

    <div
      v-if="displayWarning"
      class="_text-m-regular mt-8 rounded bg-[#282828] p-4 text-center"
    >
      {{ t('panel.statusesMustBeOn') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Panel/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { Status } from './components'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const displayWarning = computed(() => !(widget.value?.stream.enabled && widget.value?.enabled && widget.value?.botEnabled))
</script>
