<template>
  <ElFormItem
    data-name="partner-form-adset-timezone"
    :label="t('adset.settings.form.timezone.label')"
    prop="timeZone"
  >
    <ElSelect
      v-model="model.timeZone"
      size="large"
      value-key="id"
      :placeholder="t('adset.settings.form.timezone.placeholder')"
      :disabled="disabled"
      filterable
    >
      <ElOption
        v-for="item in timezones"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  timeZone: number | undefined
}>({ required: true })

defineProps<{
  disabled?: boolean
}>()

const dictStore = useDictStore()

const timezones = computed(() => dictStore.all?.timeZones || [])
</script>
