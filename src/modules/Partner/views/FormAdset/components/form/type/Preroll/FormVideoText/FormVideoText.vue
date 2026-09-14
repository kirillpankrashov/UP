<template>
  <div
    data-name="partner-form-adset-video-text"
    data-test="adset-video-text-root"
  >
    <ElFormItem
      :label="t('adset.creative.form.videoDescriptionText.label')"
      prop="videoDescriptionText"
    >
      <ElInput
        :placeholder="t('adset.creative.form.videoDescriptionText.placeholder')"
        type="textarea"
        size="large"
        v-model="model.videoDescriptionText"
        :autosize="{ minRows: 4 }"
        data-test="adset-video-text-input"
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
	videoDescriptionText: string
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
