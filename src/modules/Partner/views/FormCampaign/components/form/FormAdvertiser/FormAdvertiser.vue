<template>
  <ElFormItem
    data-name="partner-form-campaign-advertiser"
    :label="t('campaign.settings.form.advertiser.label')"
    prop="advertiser"
  >
    <ElSelect
      v-model="model.advertiser"
      size="large"
      value-key="id"
      :disabled="!model.holding"
      :placeholder="t('campaign.settings.form.advertiser.placeholder')"
      :no-data-text="t('campaign.settings.form.advertiser.noData')"
      filterable
    >
      <ElOption
        v-for="item in advertisers"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  advertiser: number | undefined
  holding: number | undefined
}>({ required: true })

const advertiserStore = useAdvertisersStore()

const advertisers = computed(() => (advertiserStore.advertisers || []).filter(advertiser => advertiser.holding.id === model.value.holding))
</script>
