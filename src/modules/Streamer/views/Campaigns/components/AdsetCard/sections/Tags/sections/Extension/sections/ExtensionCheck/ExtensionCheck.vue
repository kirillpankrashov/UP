<template>
  <div
    v-if="isVisible"
    data-name="campaigns-adset-card-tags-extension-extension-check"
    class="_text-s-regular flex items-center gap-1 text-gray"
    @click.stop="settingsStore.checkExtension"
  >
    {{ t('campaignRow.tags.checkExtension') }}
    <RefreshIcon class="h-3 w-3 fill-gray" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import type { IExtensionAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import RefreshIcon from '@/assets/img/icons/refresh-loop.svg'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IExtensionAdset
}>()

const settingsStore = useSettingsStore()

const isVisible = computed(() => settingsStore.widget?.extensionEnabled === false)
</script>
