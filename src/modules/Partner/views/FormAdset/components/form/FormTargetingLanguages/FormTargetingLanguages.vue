<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-broadcaster-languages"
    data-test="adset-form-targeting-languages-item"
    :label="label"
    prop="targeting.broadcasterLanguages.list"
  >
    <ElSelect
      data-test="adset-form-targeting-languages-select"
      v-model="model.targeting.broadcasterLanguages.list"
      :placeholder="t('adset.targeting.form.language.placeholder')"
      :disabled="disabled"
      :tag-type="model.targeting.broadcasterLanguages.exclude ? 'danger' : 'success'"
      size="large"
      remote
      filterable
      multiple
      @change="$emit('onInput', $event)"
    >
      <div class="px-5">
        <ElCheckbox
          data-test="adset-form-targeting-languages-exclude-checkbox"
          v-model="model.targeting.broadcasterLanguages.exclude"
        >
          {{ t('placeholder.excludeSelected') }}
        </ElCheckbox>
      </div>

      <div class="mb-4 mt-2 h-[1px] bg-gray" />

      <ElOption
        v-for="item in languages"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-languages-option-${item.id}`"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { type TCountryId } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElCheckbox, ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		broadcasterLanguages: {
			list: TCountryId[]
			exclude: boolean
		}
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])

const dictStore = useDictStore()

const languages = computed(() => dictStore.all?.languages)

const label = computed(() => {
	if (!model.value.targeting.broadcasterLanguages.list.length) return t('adset.targeting.form.language.label')
	if (model.value.targeting.broadcasterLanguages.exclude) {
		return `${t('adset.targeting.form.language.label')} (${t('adset.targeting.addition.exceptSelected')})`
	}
	return `${t('adset.targeting.form.language.label')} (${t('adset.targeting.addition.onlySelected')})`
})

</script>
