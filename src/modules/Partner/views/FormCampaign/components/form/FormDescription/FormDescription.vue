<template>
  <ElFormItem
    data-name="partner-form-campaign-description"
    :label="t('campaign.settings.form.description.label')"
    prop="description"
  >
    <v-md-editor
      v-model="model.description"
      height="400px"
      :left-toolbar="'h bold italic strikethrough quote emoji | ul ol hr | link'"
      :right-toolbar="'fullscreen'"
      :mode="'editable'"
      :placeholder="t('campaign.settings.form.description.placeholder')"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  description: string
}>({ required: true })
</script>