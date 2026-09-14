<template>
  <ElFormItem
    v-if="widget"
    data-name="panel-advertising-position"
    data-test="panel-advertising-position"
    :label="t('panel.settings.advertSettings.pictureInPicturePosition')"
  >
    <ElSelect
      v-model="widget.advertising.position"
      size="large"
    >
      <ElOption
        v-for="position in dictStore.all?.campaignsPositions"
        :data-test="position.id"
        :key="position.id"
        :label="position.title"
        :value="position.id"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang=ts>
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
</script>
