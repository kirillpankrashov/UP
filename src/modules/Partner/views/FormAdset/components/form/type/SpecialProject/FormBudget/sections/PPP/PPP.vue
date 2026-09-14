<template>
  <div
    data-name="partner-form-adset-budget-ppp"
    data-test="adset-budget-ppp-container"
  >
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  bidCap: number | undefined
}>({ required: true })

const formCampaignStore = useFormCampaignStore()

const adsetCurrency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
