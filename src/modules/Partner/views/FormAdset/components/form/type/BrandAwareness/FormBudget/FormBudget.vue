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

import { CPA, CPC, PPV, PPVA } from './sections'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  strategyPayment: StrategyPayment
	bidCap: number | undefined
	impressions: number | undefined
	cpc: number | undefined
	cpa: number | undefined
	clicks: number | undefined
	conversions: number | undefined
	cpcDailyLimit: number | undefined
	cpaDailyLimit: number | undefined
	margin: number | undefined
	agencyCommission: number | undefined
	cpmPercent: number | undefined
	targetCtr: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const strategyPayments = computed(() => dictStore.campaigns?.strategyPaymentTypes || [])

const settingsComponent = computed(() => {
	switch (model.value.strategyPayment) {
		case StrategyPayment.PPV:
			return PPV
		case StrategyPayment.CPC:
			return CPC
		case StrategyPayment.CPA:
			return CPA
		case StrategyPayment.PPVA:
			return PPVA
		default:
			return null
	}
})

const onStrategyPaymentChange = () => {
	model.value.cpa = undefined
	model.value.conversions = undefined
	model.value.cpaDailyLimit = undefined
	model.value.cpc = undefined
	model.value.clicks = undefined
	model.value.cpcDailyLimit = undefined
	model.value.bidCap = undefined
	model.value.impressions = undefined
	model.value.margin = undefined
	model.value.agencyCommission = undefined
	model.value.cpmPercent = undefined
	model.value.cpa = undefined
	model.value.targetCtr = undefined
}
</script>
