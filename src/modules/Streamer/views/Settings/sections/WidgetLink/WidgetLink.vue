<template>
  <DashboardSection
    id="settings-widgetlink"
    class="relative"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('settings.widgetLink.title') }}
        <HelpIcon
          v-if="appStore.isMobile && showAdvice"
          @click="adviceRef?.toggleModal"
          class="inline-block h-4 w-4"
        />
      </div>
    </template>

    <OptionDrag
      v-if="widget?.url"
      :url="widget.url"
    />
    <OptionLink
      v-if="widget?.url"
      :url="widget.url"
    />
    <OptionWithSocket v-if="widget?.url" />

    <div class="_text-m-regular mb-4">
      {{ t('settings.widgetLink.preview') }}
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <WidgetPreview />
    </div>

    <Advice
      v-if="widget && showAdvice"
      ref="adviceRef"
      id="settings-widgetlink-advice"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      type="danger"
      :title="t('settings.attention.title')"
    >
      <div class="_text-m-regular">
        <template v-if="!widget.enabled">
          <p><b>{{ t('settings.attention.widgetDisabled.title') }}</b></p>
          <p>{{ t('settings.attention.widgetDisabled.reasons.title') }}</p>
          <ol class="list-decimal pl-4">
            <li><p>{{ t('settings.attention.widgetDisabled.reasons.broadcast') }}</p></li>
            <li><p>{{ t('settings.attention.widgetDisabled.reasons.notSetUp') }}</p></li>
          </ol>
        </template>

        <br v-if="!widget.enabled && !widget.botEnabled">
        <template v-if="!widget.botEnabled">
          <p><b>{{ t('settings.attention.chatbotDisabled.title') }}</b></p>
          <p>{{ t('settings.attention.chatbotDisabled.reasons.toBeConnected') }}</p>
          <p>{{ t('settings.attention.chatbotDisabled.reasons.addChatbotAsModerator') }}</p>
        </template>
      </div>
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice } from '@/components'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { OptionDrag, OptionLink, OptionWithSocket, WidgetPreview } from './sections'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const widget = computed(() => settingsStore.widget)
const showAdvice = computed(() => {
	return widget.value && (!widget.value.enabled || !widget.value.botEnabled)
})
</script>
