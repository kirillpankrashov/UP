<template>
  <div
    data-name="partner-form-adset-budget-ppv"
    data-test="adset-budget-ppva-container"
  >
    <div class="mb-4 grid grid-cols-2 gap-4">
      <ElFormItem
        :label="t('adset.settings.form.budget.bidCap')"
        prop="bidCap"
      >
        <ElInput
          placeholder="100"
          size="large"
          type="number"
          min="0"
          v-model="model.bidCap"
        >
          <template #prefix>
            <span class="text-gray">{{ adsetCurrency?.flag }}&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.impressions')"
        prop="impressions"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.impressions"
          type="number"
          min="0"
        />
      </ElFormItem>
    </div>

    <div
      class="_text-m-regular rounded bg-primary-50 p-4 text-dark-gray"
      data-test="adset-budget-total-budget"
    >
      {{ t('adset.settings.form.budget.totalBudget') }}:
      <b>{{ totalBudget }}</b>
    </div>

    <div class="my-4 h-[1px] bg-gray" />

    <ElAlert
      :title="t('adset.settings.form.budget.infoMessage')"
      type="warning"
      :closable="false"
      show-icon
    />

    <div class="my-4 grid grid-cols-2 gap-4">
      <ElFormItem
        :label="t('adset.settings.form.budget.margin')"
        prop="margin"
      >
        <ElInput
          placeholder="100"
          size="large"
          type="number"
          min="0"
          v-model="model.margin"
        >
          <template #prefix>
            <span class="text-gray">%&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.agencyCommission')"
        prop="agencyCommission"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.agencyCommission"
          type="number"
          min="0"
        >
          <template #prefix>
            <span class="text-gray">%&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.cpmPercent')"
        prop="cpmPercent"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.cpmPercent"
          type="number"
          min="0"
        >
          <template #prefix>
            <span class="text-gray">%&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.cpa')"
        prop="cpa"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.cpa"
          type="number"
          min="0"
        >
          <template #prefix>
            <span class="text-gray">{{ adsetCurrency?.flag }}&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>
    </div>

    <div
      class="_text-s-regular rounded bg-primary-50 p-4 text-dark-gray"
      data-test="adset-budget-ppva-breakdown"
    >
      <div
        v-for="item in totalBudgetPPVA"
        :key="item.id"
        class="mb-1 flex justify-between"
        :data-test="`adset-budget-ppva-item-${item.id}`"
      >
        {{ item.title }}:
        <b>{{ item.value }}</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { ElAlert,ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  bidCap: number | undefined
  impressions: number | undefined
	margin: number | undefined
	agencyCommission: number | undefined
	cpmPercent: number | undefined
	cpa: number | undefined
}>({ required: true })

const { formatCurrency } = useCurrency()

const formCampaignStore = useFormCampaignStore()

const adsetCurrency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)

const totalBudget = computed(() => {
	if (!model.value.impressions || !model.value.bidCap) {
		return 0
	}

	return formatCurrency(((model.value.impressions / 1000) * model.value.bidCap), true, adsetCurrency.value?.code)
})

const totalBudgetPPVA = computed(() => {
	if (
		model.value.impressions === undefined || model.value.impressions === null ||
		model.value.bidCap === undefined || model.value.bidCap === null ||
		model.value.margin === undefined || model.value.margin === null ||
		model.value.agencyCommission === undefined || model.value.agencyCommission === null ||
		model.value.cpmPercent === undefined || model.value.cpmPercent === null ||
		model.value.cpa === undefined || model.value.cpa === null
	) {
		return []
	}

	const total = (model.value.impressions / 1000) * model.value.bidCap
	const margin = total * model.value.margin / 100
	const agencyCommission = total * model.value.agencyCommission / 100
	const remainder = total - margin - agencyCommission
	const CPM = remainder * (model.value.cpmPercent / 100)
	const CPA = remainder - CPM
	const budgetMargin = formatCurrency(margin, true, adsetCurrency.value?.code)
	const budgetAgencyCommission = formatCurrency(agencyCommission, true, adsetCurrency.value?.code)
	const budgetCreatorsPayout = `${formatCurrency(CPM, true, adsetCurrency.value?.code)} (CPM) / ${formatCurrency(CPA, true, adsetCurrency.value?.code)} (CPA)`
	const budgetConversion = Math.round(total / +model.value.cpa * 10) / 10
	const payingCreatorsForCPM = formatCurrency(CPM / (model.value.impressions / 1000), true, adsetCurrency.value?.code)
	const payingCreatorsForConversion = formatCurrency(CPA / budgetConversion, true, adsetCurrency.value?.code)

	return [
		{
			id: 0,
			title: t('adset.settings.form.budget.totalBudget'),
			value: totalBudget.value,
		},
		{
			id: 1,
			title: t('adset.settings.form.budget.margin'),
			value: `${budgetMargin} (${model.value.margin || 0}%)`,
		},
		{
			id: 2,
			title: t('adset.settings.form.budget.agencyCommission'),
			value: `${budgetAgencyCommission} (${model.value.agencyCommission || 0}%)`,
		},
		{
			id: 3,
			title: t('adset.settings.form.budget.creatorsPayout'),
			value: budgetCreatorsPayout,
		},
		{
			id: 4,
			title: t('adset.settings.form.budget.conversion'),
			value: budgetConversion,
		},
		{
			id: 5,
			title: t('adset.settings.form.budget.creatorsCPM'),
			value: payingCreatorsForCPM,
		},
		{
			id: 6,
			title: t('adset.settings.form.budget.creatorsCPA'),
			value: payingCreatorsForConversion,
		},
	]
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
