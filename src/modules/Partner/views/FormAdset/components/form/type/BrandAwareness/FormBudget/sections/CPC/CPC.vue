<template>
  <div
    data-name="partner-form-adset-budget-cpc"
    data-test="adset-budget-cpc-container"
  >
    <div class="mb-4 grid grid-cols-2 gap-4">
      <ElFormItem
        :label="t('adset.settings.form.budget.cpc')"
        prop="cpc"
      >
        <ElInput
          placeholder="100"
          size="large"
          type="number"
          min="0"
          v-model="model.cpc"
        >
          <template #prefix>
            <span class="text-gray">{{ adsetCurrency?.flag }}&nbsp;</span>
          </template>
        </ElInput>
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.clicks')"
        prop="clicks"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.clicks"
          type="number"
          min="0"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('adset.settings.form.budget.dailyClickCap')"
        prop="cpcDailyLimit"
      >
        <ElInput
          placeholder="100"
          size="large"
          v-model="model.cpcDailyLimit"
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
  cpc: number | undefined
  clicks: number | undefined
  cpcDailyLimit: number | undefined
}>({ required: true })

const { formatCurrency } = useCurrency()

const formCampaignStore = useFormCampaignStore()

const adsetCurrency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)

const totalBudget = computed(() => {
	if (!model.value.cpc || !model.value.clicks) {
		return 0
	}

	return formatCurrency(model.value.cpc * model.value.clicks, true, adsetCurrency.value?.code) || 0
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
