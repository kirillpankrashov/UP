<template>
  <div
    data-name="partner-form-adset-target-ppv"
    data-test="adset-target-ppv-root"
  >
    <ElFormItem
      :label="t('adset.settings.form.targets.ctrLabel')"
      prop="targetCtr"
    >
      <ElInput
        placeholder="0.25"
        size="large"
        type="number"
        min="0"
        v-model="model.targetCtr"
        data-test="adset-target-ppv-input"
      >
        <template #prefix>
          <span class="text-gray">%&nbsp;</span>
        </template>
      </ElInput>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  targetCtr: number | undefined
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
