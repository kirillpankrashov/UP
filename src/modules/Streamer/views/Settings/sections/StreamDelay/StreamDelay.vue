<template>
  <DashboardSection
    v-if="widget"
    id="settings-stream-delay-section"
    data-name="settings-stream-delay-section"
    data-test="settings-stream-delay-section"
    :title="t('settings.widgetDelay.title')"
  >
    <div class="_text-m-regular mb-6">
      <div class="widget-stream-delay-section__description-text">
        {{ t('settings.widgetDelay.description') }}
      </div>
    </div>

    <ElForm
      class="w-full"
      :label-position="'top'"
    >
      <ElFormItem :label="t('settings.widgetDelay.fieldLabel')">
        <ElInputNumber
          v-model="widget.stream.delay"
          size="large"
          :controls="false"
          class="w-full"
        />
      </ElFormItem>
    </ElForm>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElForm, ElFormItem, ElInputNumber } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
