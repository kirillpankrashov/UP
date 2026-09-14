<template>
  <ElFormItem
    data-name="partner-form-campaign-title"
    :label="t('campaign.settings.form.name.label')"
    prop="title"
  >
    <ElInput
      :placeholder="t('campaign.settings.form.name.placeholder')"
      size="large"
      v-model="model.title"
      :maxlength="120"
      show-word-limit
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  title: string
}>({ required: true })
</script>