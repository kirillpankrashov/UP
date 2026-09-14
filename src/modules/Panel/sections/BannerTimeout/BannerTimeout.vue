<template>
  <ElFormItem
    v-if="widget"
    data-name="panel-banner-timeout"
    data-test="panel-banner-timeout"
    :label="t('panel.settings.advertSettings.bannerTimeout')"
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
import { messages } from '@/modules/Panel/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const options = computed(() => dictStore.all?.widgetFrequencies)
</script>
