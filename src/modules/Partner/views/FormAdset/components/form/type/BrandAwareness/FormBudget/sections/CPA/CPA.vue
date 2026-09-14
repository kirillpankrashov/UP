<template>
  <div
    data-name="partner-form-adset-budget-cpa"
    data-test="adset-budget-cpa-container"
  >
    <div class="mb-4 grid grid-cols-2 gap-4">
      <ElFormItem
        :label="t('adset.settings.form.budget.cpa')"
        prop="cpa"
      >
        <ElInput
          placeholder="100"
          size="large"
          type="number"
          min="0"
          v-model="model.cpa"
        >
          <template #prefix>
            <span class="text-gray">{{ adsetCurrency?.flag }}&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.conversions')"
        prop="conversions"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.conversions"
          type="number"
          min="0"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.dailyConversionCap')"
        prop="cpaDailyLimit"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.cpaDailyLimit"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  cpa: number | undefined
  conversions: number | undefined
  cpaDailyLimit: number | undefined
}>({ required: true })

const { formatCurrency } = useCurrency()

const formCampaignStore = useFormCampaignStore()

const adsetCurrency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)

const totalBudget = computed(() => {
	if (!model.value.cpa || !model.value.conversions) {
		return 0
	}

	return formatCurrency(model.value.cpa * model.value.conversions, true, adsetCurrency.value?.code) || 0
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
