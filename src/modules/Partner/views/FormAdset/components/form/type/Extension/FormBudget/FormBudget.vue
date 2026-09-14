<template>
  <div
    data-name="partner-form-adset-budget"
    data-test="adset-form-budget-root"
  >
    <ElFormItem
      :label="t('adset.settings.form.budget.title')"
      prop="strategyPayment"
    >
      <ElSelect
        v-model="model.strategyPayment"
        size="large"
        value-key="id"
        data-test="adset-form-budget-strategy-select"
        @change="onStrategyPaymentChange"
      >
        <ElOption
          v-for="item in strategyPayments"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </ElSelect>
    </ElFormItem>

    <component
      :is="settingsComponent"
      v-model="model"
      data-test="adset-form-budget-settings-component"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { StrategyPayment } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

import { PPV } from './sections'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  strategyPayment: StrategyPayment
	bidCap: number | undefined
	impressions: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const strategyPayments = computed(() => dictStore.campaigns?.strategyPaymentTypes || [])

const settingsComponent = computed(() => {
	switch (model.value.strategyPayment) {
		case StrategyPayment.PPV:
			return PPV
		default:
			return null
	}
})

const onStrategyPaymentChange = () => {
	model.value.bidCap = undefined
	model.value.impressions = undefined
}
</script>
