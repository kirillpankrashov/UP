<template>
  <div
    data-name="partner-form-adset-targets"
    data-test="adset-form-targets-container"
    class="grid grid-cols-2 items-end gap-4"
  >
    <ElFormItem
      data-test="adset-form-targets-ctr-item"
      :label="t('adset.settings.form.targets.ctrLabel')"
      prop="targetCtr"
    >
      <ElInput
        data-test="adset-form-targets-ctr-input"
        placeholder="0.25"
        size="large"
        v-model="model.targetCtr"
        type="number"
        min="0"
      >
        <template #prefix>
          <span class="text-gray">%&nbsp;</span>
        </template>
      </ElInput>
    </ElFormItem>

    <ElFormItem
      data-test="adset-form-targets-cpa-item"
      :label="t('adset.settings.form.targets.cpaLabel')"
      prop="targetCpa"
    >
      <ElInput
        data-test="adset-form-targets-cpa-input"
        placeholder="100"
        size="large"
        v-model="model.targetCpa"
        type="number"
        min="0"
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
	targetCtr: number | undefined
	targetCpa: number | undefined
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0 !important;
}
</style>
