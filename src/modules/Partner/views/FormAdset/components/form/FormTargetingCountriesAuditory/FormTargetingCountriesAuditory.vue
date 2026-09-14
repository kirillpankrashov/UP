<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-countries-auditory"
    data-test="adset-form-targeting-countries-auditory-item"
    :label="label"
    prop="targeting.countriesAuditory.list"
  >
    <ElSelect
      data-test="adset-form-targeting-countries-auditory-select"
      v-model="model.targeting.countriesAuditory.list"
      :placeholder="t('adset.targeting.form.countries.placeholder')"
      :disabled="disabled"
      :tag-type="model.targeting.countriesAuditory.exclude ? 'danger' : 'success'"
      size="large"
      remote
      filterable
      multiple
    >
      <div class="px-5">
        <ElCheckbox
          data-test="adset-form-targeting-countries-auditory-exclude-checkbox"
          v-model="model.targeting.countriesAuditory.exclude"
        >
          {{ t('placeholder.excludeSelected') }}
        </ElCheckbox>
      </div>

      <div class="mb-4 mt-2 h-[1px] bg-gray" />

      <ElOption
        v-for="item in countries"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-countries-auditory-option-${item.id}`"
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
		countriesAuditory: {
			list: TCountryId[]
			exclude: boolean
		}
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

const dictStore = useDictStore()

const countries = computed(() => dictStore.all?.countries)

const label = computed(() => {
	if (!model.value.targeting.countriesAuditory.list.length) return t('adset.targeting.form.countries.label')
	if (model.value.targeting.countriesAuditory.exclude) {
		return `${t('adset.targeting.form.countries.label')} (${t('adset.targeting.addition.exceptSelected')})`
	}
	return `${t('adset.targeting.form.countries.label')} (${t('adset.targeting.addition.onlySelected')})`
})

</script>
