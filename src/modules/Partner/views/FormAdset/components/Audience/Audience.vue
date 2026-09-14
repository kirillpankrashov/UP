<template>
  <Advice
    data-name="adset-audience"
    class="sm:absolute sm:left-[calc(100%+24px)] sm:top-3"
    type="primary"
    :label="t('adset.targeting.evaluation.label')"
  >
    <p class="_text-m-regular">
      {{ t('adset.targeting.evaluation.description') }}
    </p>

    <p class="_text-m-regular mt-6">
      {{ t('adset.targeting.evaluation.size') }}
    </p>
    <p
      class="_text-l-bold"
      data-test="audience-impressions"
    >
      {{ formatNumber(audience?.impressions || 0, false) }}
    </p>

    <p class="_text-m-regular mt-6">
      {{ t('adset.targeting.evaluation.reach') }}
    </p>
    <p
      class="_text-l-bold"
      data-test="audience-reach"
    >
      {{ formatNumber(audience?.reach || 0, false) }}
    </p>

    <p class="_text-m-regular mt-6">
      {{ t('adset.targeting.evaluation.streamersNumber') }}
    </p>
    <p
      class="_text-l-bold"
      data-test="audience-streamers"
    >
      {{ audience?.streamers || '–' }}
    </p>

    <p class="_text-m-regular mt-6">
      <a href="#">{{ t('adset.targeting.evaluation.howCalculated') }}</a>
    </p>
  </Advice>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { Advice } from '@/components'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

const { formatNumber } = useCurrency()

const { t } = useLocale<typeof messages>(messages)

const formAdsetStore = useFormAdsetStore()

const audience = computed(() => formAdsetStore.audience)
</script>
