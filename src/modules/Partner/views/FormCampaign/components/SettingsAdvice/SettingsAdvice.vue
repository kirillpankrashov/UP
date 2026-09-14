<template>
  <Advice
    :title="t('campaign.settings.advice.title')"
    class="sm:absolute sm:left-[calc(100%+24px)] sm:top-3"
    type="hint"
  >
    <p class="_text-m-regular">
      <b>{{ t('campaign.settings.advice.name.title') }}</b> {{ t('campaign.settings.advice.name.description') }}
    </p>
  </Advice>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { Advice } from '@/components'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
