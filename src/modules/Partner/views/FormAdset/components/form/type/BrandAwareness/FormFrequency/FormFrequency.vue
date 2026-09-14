<template>
  <div>
    <ElFormItem
      data-name="partner-form-adset-frequency"
      prop="frequency"
      data-test="adset-form-frequency-item"
    >
      <ElSelect
        v-model="model.frequency"
        size="large"
        value-key="id"
        :placeholder="t('adset.settings.form.frequency.period')"
        :disabled="disabled"
        filterable
        data-test="adset-form-frequency-select"
      >
        <ElOption
          v-for="item in frequencies"
          :key="item.id"
          :label="item.title"
          :value="item.id"
          data-test="adset-form-frequency-option"
        />
      </ElSelect>
    </ElFormItem>

    <div
      v-if="model.frequency && model.frequency === AdvertisingFrequency.CUSTOM"
      class="grid grid-cols-2 gap-4"
    >
      <ElFormItem
        :label="t('adset.settings.form.frequency.impressionsCount')"
        prop="frequencyCount"
      >
        <ElInput
          v-model="model.frequencyCount"
          type="number"
          min="0"
          size="large"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.frequency.period')"
        prop="frequencyPeriod"
      >
        <ElSelect
          v-model="model.frequencyPeriod"
          size="large"
          value-key="id"
          :placeholder="t('adset.settings.form.frequency.period')"
          :disabled="disabled"
          filterable
          data-test="adset-form-frequency-period-select"
        >
          <ElOption
            v-for="item in frequencyPeriods"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            data-test="adset-form-frequency-period-option"
          />
        </ElSelect>
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdvertisingFrequency } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElInput, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  frequency: AdvertisingFrequency | undefined
  frequencyCount: number | undefined
  frequencyPeriod: string | undefined
}>({ required: true })

defineProps<{
  disabled?: boolean
}>()

const dictStore = useDictStore()

const frequencies = computed(() => dictStore.campaigns?.frequency || [])
const frequencyPeriods = computed(() => dictStore.campaigns?.frequencyPeriods || [])
</script>
