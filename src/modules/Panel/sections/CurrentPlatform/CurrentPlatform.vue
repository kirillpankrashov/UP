<template>
  <PlatformSelect
    data-name="panel-current-platform"
    v-if="settingsStore.widget"
    v-model="settingsStore.widget"
  />
</template>

<script setup lang="ts">
import { PlatformSelect } from '@/components'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const settingsStore = useSettingsStore()
</script>
