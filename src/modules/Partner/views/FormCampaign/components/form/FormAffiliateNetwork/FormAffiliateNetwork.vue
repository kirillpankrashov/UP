<template>
  <div
    data-name="partner-form-campaign-affiliate-network"
  >
    <div class="_text-m-regular mb-6">
      {{ t('campaign.affiliateNetworks.description') }}
    </div>

    <ElFormItem
      prop="affiliateNetwork"
    >
      <template #label>
        <div class="_text-m-bold text-black">
          {{ t('campaign.affiliateNetworks.field.label') }}
        </div>
      </template>

      <ElSelect
        v-model="model.affiliateNetwork"
        size="large"
        value-key="id"
        :placeholder="t('campaign.affiliateNetworks.field.label')"
        filterable
      >
        <ElOption
          :key="0"
          :label="t('campaign.affiliateNetworks.field.notSelected')"
          :value="-1"
        />
        <ElOption
          v-for="item in affiliateNetworks"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  affiliateNetwork: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const affiliateNetworks = computed(() => dictStore.campaigns?.affiliateNetworks || [])
</script>
