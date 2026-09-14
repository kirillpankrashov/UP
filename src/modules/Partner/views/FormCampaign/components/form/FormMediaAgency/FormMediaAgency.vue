<template>
  <ElFormItem
    data-name="partner-form-campaign-media-agency"
    :label="t('campaign.settings.form.mediaAgency.label')"
    prop="mediaAgency"
  >
    <ElSelect
      v-model="model.mediaAgency"
      size="large"
      value-key="id"
      :placeholder="t('campaign.settings.form.mediaAgency.placeholder')"
      :no-data-text="t('campaign.settings.form.mediaAgency.noData')"
      filterable
      clearable
    >
      <ElOption
        v-for="item in mediaAgencies"
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
  mediaAgency: number | undefined
}>({ required: true })

const dictStore = useDictStore()

const mediaAgencies = computed(() => (dictStore.campaigns?.mediaAgencies || []))
</script>
