<template>
  <DashboardSection
    v-if="widget"
    id="settings-allow-adult"
    data-test="settings-adult-content"
    :title="t('settings.adultOnly.title')"
  >
    <div class="_text-m-regular mb-2">
      {{ t('settings.adultOnly.description') }}
    </div>

    <ElFormItem class="!m-0">
      <ElCheckbox v-model="widget.ssp.allowAdult">
        {{ t('settings.adultOnly.label') }}

        <ElTooltip effect="light">
          <template #content>
            <div class="_text-s-regular max-w-[220px]">
              {{ t('settings.adultOnly.hint') }}
            </div>
          </template>
          <HelpIcon class="inline-block h-4 w-4 fill-dark-gray" />
        </ElTooltip>
      </ElCheckbox>
    </ElFormItem>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElCheckbox, ElFormItem, ElTooltip } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
