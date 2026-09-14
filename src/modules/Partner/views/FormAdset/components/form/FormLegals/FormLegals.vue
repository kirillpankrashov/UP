<template>
  <div
    data-name="partner-form-adset-legals"
    class="grid grid-cols-2 items-end gap-4"
  >
    <ElFormItem
      v-if="legalCompliance.erid.media"
      :label="t('adset.labels.fields.creative.label')"
      prop="bidCap"
    >
      <ElInput
        size="large"
        :value="legalCompliance.erid.media"
        :disabled="true"
      />
    </ElFormItem>

    <ElFormItem
      v-if="legalCompliance.erid.text"
      :label="t('adset.labels.fields.chatbot.label')"
      prop="impressions"
    >
      <ElInput
        size="large"
        :value="legalCompliance.erid.text"
        :disabled="true"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
	legalCompliance: {
    erid: {
      media: null | string
      text: null | string
    }
    marker: {
      media: null | string
      text: null | string
    }
  }
}>()
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0 !important;
}
</style>