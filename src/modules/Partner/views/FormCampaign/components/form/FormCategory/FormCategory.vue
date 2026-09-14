<template>
  <ElFormItem
    data-name="partner-form-campaign-category"
    :label="t('campaign.settings.form.category.label')"
    prop="category"
  >
    <ElSelect
      v-model="model.category"
      size="large"
      value-key="id"
      :placeholder="t('campaign.settings.form.category.placeholder')"
      :no-data-text="t('campaign.settings.form.category.noData')"
    >
      <ElOption
        v-for="item in categories"
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
  category: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const categories = computed(() => dictStore.all?.campaignsCategories || [])
</script>
