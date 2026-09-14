<template>
  <ElFormItem
    data-name="partner-form-campaign-holding"
    :label="t('campaign.settings.form.holding.label')"
    prop="holding"
  >
    <ElSelect
      v-model="model.holding"
      size="large"
      value-key="id"
      :placeholder="t('campaign.settings.form.holding.placeholder')"
      filterable
      @change="onChange"
    >
      <ElOption
        v-for="item in holdings"
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
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  advertiser: number | undefined
  holding: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const holdings = computed(() => dictStore.campaigns?.holdings || [])

const onChange = () => {
	model.value.advertiser = undefined
}
</script>
