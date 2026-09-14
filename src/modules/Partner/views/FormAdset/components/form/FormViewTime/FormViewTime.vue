<template>
  <ElFormItem
    data-test="adset-form-view-time-form-item"
    :label="t('adset.settings.form.viewTime.label')"
    prop="view"
  >
    <ElTimePicker
      v-model="model.view"
      data-test="adset-form-view-time-picker"
      :default-value="defaultValue"
      size="large"
      is-range
      :range-separator="t('adset.settings.form.viewTime.to')"
      :disabled-seconds="disabledSeconds"
      clearable
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElTimePicker } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const model = defineModel<{
	view: null | [Date, Date]
}>({ required: true }) as Ref<{
  view: [Date, Date]
}>

const { t } = useLocale<typeof messages>(messages)

const defaultValue = ref<[Date, Date]>([
	moment().set('hour', 10).startOf('hour').toDate(),
	moment().set('hour', 22).startOf('hour').toDate(),
])

const disabledSeconds = () => {
	return Array.from({ length: 60 }, (_, i) => i)
}
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
