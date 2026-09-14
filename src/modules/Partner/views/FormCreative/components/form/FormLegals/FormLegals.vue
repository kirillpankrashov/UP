<template>
  <div
    data-name="partner-form-legals"
    class="grid grid-cols-2 gap-4"
  >
    <ElFormItem
      v-if="creative.legalCompliance.erid.media"
      :label="t('creative.form.labels.fields.creative.label')"
    >
      <ElInput
        :value="creative.legalCompliance.erid.media"
        size="large"
        :disabled="true"
      />
    </ElFormItem>

    <ElFormItem
      v-if="creative.legalCompliance.erid.text"
      :label="t('creative.form.labels.fields.chatbot.label')"
    >
      <ElInput
        :value="creative.legalCompliance.erid.text"
        size="large"
        :disabled="true"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'
import type { ICreative } from '@/modules/Partner/views/FormCreative/types/creative'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  creative: ICreative
}>()
</script>
