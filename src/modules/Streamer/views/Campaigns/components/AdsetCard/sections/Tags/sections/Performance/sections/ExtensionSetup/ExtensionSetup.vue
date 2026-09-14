<template>
  <a
    v-if="isVisible"
    data-name="campaigns-adset-card-tags-performance-extension-setup"
    :href="t('links.twitchExtensionBrandis')"
    class="_text-s-regular flex items-center gap-1 text-gray"
    target="_blank"
  >
    {{ t('campaignRow.tags.setupExtension') }}
    <LinkIcon class="h-3 w-3 fill-gray" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import type { IPerformanceAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import LinkIcon from '@/assets/img/icons/link.svg'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IPerformanceAdset
}>()

const settingsStore = useSettingsStore()

const isVisible = computed(() => settingsStore.widget?.brandisExtensionEnabled === false)
</script>
