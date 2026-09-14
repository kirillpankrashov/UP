<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-gender"
    data-test="adset-form-targeting-gender-item"
    :label="t('adset.targeting.form.gender.label')"
    prop="gender"
  >
    <ElSelect
      data-test="adset-form-targeting-gender-select"
      v-model="model.targeting.gender"
      :placeholder="t('adset.targeting.form.gender.placeholder')"
      :disabled="disabled"
      size="large"
      remote
      @change="$emit('onInput', $event)"
    >
      <ElOption
        v-for="item in genders"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-gender-option-${item.id}`"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		gender: string | undefined
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])

const dictStore = useDictStore()

const genders = computed(() => dictStore.campaigns?.gender)
</script>
