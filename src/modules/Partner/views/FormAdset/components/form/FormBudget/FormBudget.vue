<template>
  <div data-name="partner-form-adset-budget">
    <ElFormItem
      prop="payableType"
    >
      <ElRadioGroup
        v-model="model.payableType"
        size="large"
        data-test="payable-type-group"
        @change="onPayableTypeChange"
      >
        <ElRadioButton
          :label="PayoutType.IMPRESSIONS"
          data-test="payable-type-impressions"
        >
          {{ t('adset.settings.form.payType.payPerImpression') }}
        </ElRadioButton>
        <ElRadioButton
          :label="PayoutType.ACTIONS"
          data-test="payable-type-actions"
        >
          {{ t('adset.settings.form.payType.payPerAction') }}
        </ElRadioButton>
      </ElRadioGroup>
    </ElFormItem>

    <div
      v-if="model.payableType === PayoutType.IMPRESSIONS"
      class="grid grid-cols-2 items-end gap-4"
    >
      <ElFormItem
        :label="t('adset.settings.form.budget.costPerUnitLabel')"
        prop="bidCap"
      >
        <ElInput
          placeholder="500"
          size="large"
          v-model="model.bidCap"
          type="number"
          min="0"
          data-test="input-bidCap"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.impressionsLabel')"
        prop="impressions"
      >
        <ElInput
          placeholder="10000"
          size="large"
          v-model="model.impressions"
          type="number"
          min="0"
          data-test="input-impressions"
        />
      </ElFormItem>
    </div>

    <div
      v-if="model.payableType === PayoutType.ACTIONS"
      class="grid grid-cols-2 items-end gap-4"
    >
      <ElFormItem
        :label="t('adset.settings.form.budget.costPerActionLabel')"
        prop="bidCpa"
      >
        <ElInput
          placeholder="500"
          size="large"
          v-model="model.bidCpa"
          type="number"
          min="0"
          data-test="input-bidCpa"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.budgetLabel')"
        prop="budget"
      >
        <ElInput
          placeholder="10000"
          size="large"
          v-model="model.budget"
          type="number"
          min="0"
          data-test="input-budget"
        />
      </ElFormItem>
    </div>

    <div
      class="_text-m-regular rounded bg-primary-50 p-4 text-dark-gray"
      data-test="total-budget"
    >
      {{ t('adset.settings.form.budget.totalBudget') }}:
      <b>{{ totalBudget }}</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { PayoutType } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { ElFormItem, ElInput, ElRadioButton, ElRadioGroup } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const model = defineModel<{
	payableType: PayoutType
	bidCap: number | undefined
	bidCpa: number | undefined
	impressions: number | undefined
	budget: number | undefined
}>({ required: true })

const formCampaignStore = useFormCampaignStore()

const adsetCurrency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)

const totalBudget = computed(() => {
	if (model.value.payableType === PayoutType.IMPRESSIONS) {
		if (model.value.impressions && model.value.bidCap) {
			return formatCurrency(((model.value.impressions / 1000) * model.value.bidCap) || 0, false, adsetCurrency.value?.code)
		}
	}

	if (model.value.payableType === PayoutType.ACTIONS) {
		if (model.value.budget && model.value.bidCpa) {
			const result = Math.floor(model.value.budget / model.value.bidCpa)
			return isNaN(result) ? 0 : result
		}
	}

	return '0'
})

const onPayableTypeChange = () => {
	model.value.bidCap = undefined
	model.value.bidCpa = undefined
	model.value.impressions = undefined
	model.value.budget = undefined
}
</script>
