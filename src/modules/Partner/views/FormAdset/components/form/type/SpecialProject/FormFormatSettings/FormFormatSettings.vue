<template>
  <div
    data-name="partner-form-adset-format-settings"
    data-test="adset-form-format-settings-container"
    class="grid grid-cols-2 gap-4"
  >
    <ElFormItem prop="frequency">
      <template #label>
        {{ t('adset.settings.form.formatSettings.frequency.label') }}
        <QuestionTooltip>
          <span class="_text-s-regular break-normal">{{ t('adset.settings.form.formatSettings.frequency.tooltip') }}</span>
        </QuestionTooltip>
      </template>
      <ElInput
        v-model="model.frequency"
        type="number"
        size="large"
      />
    </ElFormItem>

    <ElFormItem prop="duration">
      <template #label>
        {{ t('adset.settings.form.formatSettings.duration.label') }}
        <QuestionTooltip>
          <span class="_text-s-regular break-normal">{{ t('adset.settings.form.formatSettings.duration.tooltip') }}</span>
        </QuestionTooltip>
      </template>
      <ElInput
        v-model="model.duration"
        type="number"
        size="large"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { QuestionTooltip } from '@/components'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const model = defineModel<{
  duration: number | undefined
  frequency: number | undefined
}>({ required: true })

const { t } = useLocale<typeof messages>(messages)
</script>
