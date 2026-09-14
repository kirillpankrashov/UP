<template>
  <DashboardSection
    v-if="widget"
    id="settings-ignore-categories-section"
    data-name="settings-ignore-categories-section"
    data-test="settings-ignore-categories-section"
    :title="t('settings.ignoreCategories.title')"
  >
    <div class="_text-m-regular mb-5">
      {{ t('settings.ignoreCategories.description') }}
    </div>

    <ElSelect
      v-model="widget.ignoreCategories"
      :placeholder="t('placeholder.chooseCategories')"
      multiple
      clearable
      :size="'large'"
      tag-type="info"
    >
      <ElOption
        v-for="category in categories"
        :key="category.id"
        :label="category.title"
        :value="category.id"
      />
    </ElSelect>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElOption,ElSelect } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
const categories = computed(() => dictStore.all?.campaignsCategories)

// onVisibleChange (value) {
//       if (value) return
//       this.widget.debouncedUpdate()
//     },
// onRemove () {
// 	this.widget.debouncedUpdate()
// },
</script>
