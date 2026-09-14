<template>
  <div
    data-name="partner-form-creative-qr-code"
    data-test="creative-qr-code"
  >
    <ElFormItem
      prop="qrCode"
    >
      <ElCheckbox
        size="large"
        v-model="model.qrCode"
        data-test="creative-qr-code-input"
      >
        {{ t('creative.form.data.fields.qrCode.label') }}
      </ElCheckbox>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElCheckbox, ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	qrCode: boolean
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>