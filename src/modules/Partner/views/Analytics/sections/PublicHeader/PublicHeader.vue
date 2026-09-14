<template>
  <div
    data-name="public-header"
    class="mx-auto mb-10 flex w-full max-w-screen-xl items-center justify-between rounded bg-white p-5 shadow-lg sm:px-8 sm:py-5"
  >
    <router-link to="/">
      <AppLogo />
    </router-link>
    <ElButton
      size="large"
      type="success"
      @click="onDemoClick"
      href="mailto:sales@uplify.app?subject='Demo request'"
    >
      <span class="_text-m-bold">{{ t('analytics.needHelp') }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { AppLogo } from '@/components'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'

const { t } = useLocale<typeof messages>(messages)

const onDemoClick = () => {
	window.open('mailto:sales@uplify.app?subject="Demo request"', '_self')
}
</script>
