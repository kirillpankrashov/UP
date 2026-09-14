<template>
  <div
    data-name="partner-form-creative-chatbot-text"
    data-test="creative-chatbot-text-root"
  >
    <ElFormItem
      :label="t('creative.form.data.fields.chatbotText.label')"
      prop="chatbotText"
    >
      <ElInput
        :placeholder="t('creative.form.data.fields.chatbotText.placeholder')"
        type="textarea"
        size="large"
        v-model="model.chatbotText"
        :maxlength="150"
        show-word-limit
        :autosize="{ minRows: 4 }"
        data-test="creative-chatbot-text-input"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	chatbotText: string
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>