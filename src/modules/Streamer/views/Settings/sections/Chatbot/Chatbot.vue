<template>
  <DashboardSection
    v-if="platform && ![Platform.VK_PLAY, Platform.TIKTOK].includes(platform)"
    id="settings-chatbot"
    data-test="settings-chatbot-section"
    :title="t('settings.chatbot.title')"
  >
    <div class="grid gap-x-5">
      <div class="_text-m-regular mb-8 flex flex-col items-start">
        <div class="mb-2">
          {{ t('settings.chatbot.description') }}
        </div>

        <TextLink
          class="mt-auto no-underline"
          :href="t('links.chatbotSetup')"
          target="_blank"
        >
          {{ t('settings.chatbot.helpWithSetup') }}
        </TextLink>
      </div>
    </div>

    <State />

    <ElAlert
      v-if="platformError"
      class="mt-2"
      :type="'error'"
      show-icon
      :closable="false"
    >
      <div v-html="t('settings.chatbot.error')" />
    </ElAlert>
  </DashboardSection>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElAlert } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'

import { useSettingsStore } from '../../store'

import { State } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const settginsStore = useSettingsStore()

const platform = computed(() => settginsStore.widget?.platform)
const platformError = computed(() => route.query.error && route.query.error === 'invalid-platform')
</script>
