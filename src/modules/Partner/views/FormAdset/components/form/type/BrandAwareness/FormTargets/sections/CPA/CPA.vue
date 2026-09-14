<template>
  <div
    data-name="partner-form-adset-target-cpa"
    data-test="adset-target-cpa-root"
  >
    <ElFormItem
      :label="t('adset.settings.form.targets.evrLabel')"
      prop="targetEvr"
      data-test="adset-target-cpa-form-item"
    >
      <ElInput
        placeholder="0.25"
        size="large"
        type="number"
        min="0"
        v-model="model.targetEvr"
        data-test="adset-target-cpa-input"
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
  targetEvr: number | undefined
}>({ required: true })
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
