<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-devices-auditory"
    data-test="adset-form-targeting-devices-auditory-item"
    :label="label"
    prop="targeting.devicesAuditory.list"
  >
    <ElSelect
      data-test="adset-form-targeting-devices-auditory-select"
      v-model="model.targeting.devicesAuditory.list"
      :placeholder="t('adset.targeting.form.devices.placeholder')"
      :disabled="disabled"
      :tag-type="model.targeting.devicesAuditory.exclude ? 'danger' : 'success'"
      size="large"
      remote
      filterable
      multiple
    >
      <div class="px-5">
        <ElCheckbox
          data-test="adset-form-targeting-devices-auditory-exclude-checkbox"
          v-model="model.targeting.devicesAuditory.exclude"
        >
          {{ t('placeholder.excludeSelected') }}
        </ElCheckbox>
      </div>

      <div class="mb-4 mt-2 h-[1px] bg-gray" />

      <ElOption
        v-for="item in devices"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-devices-auditory-option-${item.id}`"
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
		devicesAuditory: {
			list: string[]
			exclude: boolean
		}
	}
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

const dictStore = useDictStore()

const devices = computed(() => dictStore.all?.devices)

const label = computed(() => {
	if (!model.value.targeting.devicesAuditory.list.length) return t('adset.targeting.form.devices.label')
	if (model.value.targeting.devicesAuditory.exclude) {
		return `${t('adset.targeting.form.devices.label')} (${t('adset.targeting.addition.exceptSelected')})`
	}
	return `${t('adset.targeting.form.devices.label')} (${t('adset.targeting.addition.onlySelected')})`
})

</script>
