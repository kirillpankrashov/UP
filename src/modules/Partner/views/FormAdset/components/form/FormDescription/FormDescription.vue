<template>
  <ElFormItem
    data-name="partner-form-adset-description"
    :label="t('adset.settings.form.description.label')"
    prop="description"
  >
    <v-md-editor
      v-model="model.description"
      height="400px"
      :left-toolbar="'h bold italic strikethrough quote emoji | ul ol hr | link'"
      :right-toolbar="'fullscreen'"
      :mode="'editable'"
      :placeholder="t('adset.settings.form.description.placeholder')"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  description: string
}>({ required: true })
</script>