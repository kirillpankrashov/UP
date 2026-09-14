<template>
  <div
    data-name="partner-form-adset-targeting-age"
    class="grid grid-cols-2 items-end gap-4"
  >
    <ElFormItem
      data-test="adset-form-targeting-age-from-item"
      :label="t('adset.targeting.form.age.label')"
      prop="targeting.age.from"
    >
      <ElSelect
        data-test="adset-form-targeting-age-from-select"
        v-model="model.targeting.age.from"
        :placeholder="t('adset.targeting.form.age.fromPlaceholder')"
        :disabled="disabled"
        size="large"
        @change="$emit('onInput', $event)"
      >
        <ElOption
          v-for="item in agesFrom"
          :key="item"
          :value="item"
          :label="item"
          :data-test="`adset-form-targeting-age-from-option-${item}`"
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem
      data-test="adset-form-targeting-age-to-item"
      prop="targeting.age.to"
    >
      <ElSelect
        data-test="adset-form-targeting-age-to-select"
        v-model="model.targeting.age.to"
        :placeholder="t('adset.targeting.form.age.toPlaceholder')"
        :disabled="disabled"
        size="large"
        @change="$emit('onInput', $event)"
      >
        <ElOption
          v-for="item in agesTo"
          :key="item"
          :value="item"
          :label="item"
          :data-test="`adset-form-targeting-age-to-option-${item}`"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		age: {
			from: number | undefined
			to: number | undefined
		}
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])

const MIN_AGE = 18
const MAX_AGE = 65

const agesFrom = computed(() => {
	const result = []
	if (model.value.targeting.age.to) {
		for (let i = MIN_AGE; i <= model.value.targeting.age.to; i++) {
			result.push(i)
		}
	}
	else {
		for (let i = MIN_AGE; i <= MAX_AGE; i++) {
			result.push(i)
		}
	}
	return result
})

const agesTo = computed(() => {
	const result = []
	if (model.value.targeting.age.from) {
		for (let i = model.value.targeting.age.from; i <= MAX_AGE; i++) {
			result.push(i)
		}
	}
	else {
		for (let i = MIN_AGE; i <= MAX_AGE; i++) {
			result.push(i)
		}
	}
	return result
})
</script>

<style scoped lang="scss">
.el-form-item {
	margin-bottom: 0 !important;
}
</style>