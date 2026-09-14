<template>
  <div
    data-name="partner-form-adset-alert-text"
    data-test="adset-form-alert-text-container"
  >
    <ElFormItem
      data-test="adset-form-alert-text-item"
      :label="t('adset.alerts.description.label')"
      prop="conversionAlert.text"
    >
      <ElInput
        data-test="adset-form-alert-text-input"
        :placeholder="tm('adset.alerts.description.placeholder')"
        type="textarea"
        size="large"
        v-model="model.conversionAlert.text"
        :maxlength="120"
        show-word-limit
        :autosize="{ minRows: 4 }"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t, tm } = useLocale<typeof messages>(messages)

const model = defineModel<{
  conversionAlert: {
		text: string
	}
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>