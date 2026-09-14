<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-age-restriction"
    data-test="adset-form-targeting-age-restriction-item"
    prop="targeting.mature"
  >
    <ElCheckbox
      data-test="adset-form-targeting-age-restriction-checkbox"
      v-model="model.targeting.mature"
      :disabled="disabled"
      @change="$emit('onInput', $event)"
    >
      {{ t('adset.targeting.form.ageRestrictions.label') }}
    </ElCheckbox>
  </ElFormItem>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElCheckbox, ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		mature: boolean
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])
</script>
