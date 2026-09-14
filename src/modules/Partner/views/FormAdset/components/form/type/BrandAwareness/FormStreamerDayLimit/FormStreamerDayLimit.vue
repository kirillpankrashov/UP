<template>
  <ElFormItem
    :label="t('adset.settings.form.streamerDayLimit.label')"
    prop="streamerDayLimit"
  >
    <ElInput
      v-model="model.streamerDayLimit"
      type="number"
      min="1"
      max="255"
      size="large"
      :placeholder="t('adset.settings.form.streamerDayLimit.placeholder')"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  streamerDayLimit: number | undefined
}>({ required: true })

defineProps<{
  disabled?: boolean
}>()
</script>
