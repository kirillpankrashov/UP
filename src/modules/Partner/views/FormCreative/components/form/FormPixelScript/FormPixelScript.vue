<template>
  <div data-name="partner-form-creative-pixel-script">
    <ElFormItem
      prop="pixelClicksScripts"
    >
      <ElInput
        :placeholder="t('creative.form.data.fields.pixelClicksScripts.placeholder')"
        type="textarea"
        size="large"
        v-model="model.pixelClicksScripts"
        :autosize="{ minRows: 4 }"
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
	pixelClicksScripts: string
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0 !important;
}
</style>