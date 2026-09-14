<template>
  <ElFormItem
    data-name="partner-form-campaign-ord-markup"
    :label="t('campaign.settings.form.ordMarkup.label')"
    prop="ordMarkup"
  >
    <ElInput
      :placeholder="t('campaign.settings.form.ordMarkup.placeholder')"
      size="large"
      v-model="model.ordMarkup"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  ordMarkup: string
}>({ required: true })
</script>