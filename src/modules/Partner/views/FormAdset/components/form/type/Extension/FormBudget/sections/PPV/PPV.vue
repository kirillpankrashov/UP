<template>
  <div
    data-name="partner-form-adset-budget-ppv"
    data-test="adset-budget-ppv-container"
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
  bidCap: number | undefined
  impressions: number | undefined
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
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
