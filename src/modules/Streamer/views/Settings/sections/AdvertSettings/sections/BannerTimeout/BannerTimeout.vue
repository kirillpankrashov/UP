<template>
  <ElFormItem
    v-if="widget"
    id="settings-banner-timeout"
    data-test="settings-banner-timeout"
    :label="t('settings.advertSettings.bannerTimeout')"
  >
    <ElSelect
      v-model="widget.advertising.frequency"
      size="large"
    >
      <ElOption
        v-for="option in options"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const options = computed(() => dictStore.all?.widgetFrequencies)
</script>
