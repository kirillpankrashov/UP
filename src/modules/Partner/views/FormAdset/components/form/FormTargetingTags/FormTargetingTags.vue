<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-tags"
    data-test="adset-form-targeting-tags-item"
    :label="label"
    prop="targeting.tags.list"
  >
    <ElSelect
      data-test="adset-form-targeting-tags-select"
      v-model="model.targeting.tags.list"
      :placeholder="t('adset.targeting.form.tags.placeholder')"
      :disabled="disabled"
      :tag-type="model.targeting.tags.exclude ? 'danger' : 'success'"
      size="large"
      remote
      filterable
      multiple
      @change="$emit('onInput', $event)"
    >
      <div class="px-5">
        <ElCheckbox
          data-test="adset-form-targeting-tags-exclude-checkbox"
          v-model="model.targeting.tags.exclude"
        >
          {{ t('placeholder.excludeSelected') }}
        </ElCheckbox>
      </div>

      <div class="mb-4 mt-2 h-[1px] bg-gray" />

      <ElOption
        v-for="item in tags"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-tags-option-${item.id}`"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElCheckbox, ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		tags: {
			list: number[]
			exclude: boolean
		}
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])

const dictStore = useDictStore()

const tags = computed(() => dictStore.all?.tags)

const label = computed(() => {
	if (!model.value.targeting.tags.list.length) return t('adset.targeting.form.tags.label')
	if (model.value.targeting.tags.exclude) {
		return `${t('adset.targeting.form.tags.label')} (${t('adset.targeting.addition.exceptSelected')})`
	}
	return `${t('adset.targeting.form.tags.label')} (${t('adset.targeting.addition.onlySelected')})`
})

</script>
