<template>
  <div
    data-name="partner-form-adset-chatbot-text"
    data-test="adset-chatbot-text-root"
  >
    <ElFormItem
      :label="t('adset.chatBot.form.chatBotText.label')"
      prop="chatbotText"
    >
      <ElInput
        :placeholder="t('adset.chatBot.form.chatBotText.placeholder')"
        type="textarea"
        size="large"
        v-model="model.chatbotText"
        :maxlength="150"
        show-word-limit
        :autosize="{ minRows: 4 }"
        data-test="adset-chatbot-text-input"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

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