<template>
  <div data-name="partner-form-campaign-status">
    <ElSwitch
      v-model="model"
      style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
      active-text="On"
      inactive-text="Off"
      inline-prompt
    />
    <div class="_text-m-regular ml-2 inline-block align-middle">
      {{ model ? t('other.enabled') : t('other.disabled') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElSwitch } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<boolean>({ required: true })
</script>
