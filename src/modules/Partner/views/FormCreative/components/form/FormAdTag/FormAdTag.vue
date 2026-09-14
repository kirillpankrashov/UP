<template>
  <div
    data-name="partner-form-creative-ad-tag"
    data-test="creative-ad-tag-root"
  >
    <ElFormItem
      :label="t('creative.form.adtag.label')"
      prop="scriptCode"
      data-test="creative-ad-tag-form-item"
    >
      <ElInput
        :placeholder="t('creative.form.adtag.placeholder')"
        type="textarea"
        size="large"
        v-model="model.scriptCode"
        :autosize="{ minRows: 4 }"
        data-test="creative-ad-tag-input"
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
	scriptCode: string
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>