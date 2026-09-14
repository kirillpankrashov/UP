<template>
  <ElFormItem
    data-name="partner-form-campaign-external-id"
    :label="t('campaign.settings.form.externalId.label')"
    prop="externalId"
  >
    <ElInput
      :placeholder="t('campaign.settings.form.externalId.placeholder')"
      size="large"
      v-model="model.externalId"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  externalId: string
}>({ required: true })
</script>