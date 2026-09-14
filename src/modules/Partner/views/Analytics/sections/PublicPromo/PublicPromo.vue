<template>
  <div
    data-name="public-promo"
    class="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between rounded bg-white p-5 shadow-lg sm:mb-16 sm:flex-row sm:px-8 sm:py-10"
  >
    <div class="mb-6 sm:mb-0">
      <div class="_text-caption-caps">
        {{ t('analytics.poweredBy') }}
      </div>
      <div class="_headline">
        {{ t('analytics.runAtestCampaignToday') }}
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
      <ElButton
        size="large"
        type="info"
        plain
        @click="router.push('/auth/partner/request')"
      >
        <span class="_text-m-bold">{{ t('analytics.getStarted') }}</span>
      </ElButton>
      <ElButton
        size="large"
        type="success"
        @click="onDemoClick"
      >
        <span class="_text-m-bold">{{ t('analytics.needHelp') }}</span>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()

const onDemoClick = () => {
	window.open('mailto:sales@uplify.app?subject="Demo request"', '_self')
}
</script>
