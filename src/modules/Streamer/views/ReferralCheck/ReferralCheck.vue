<template>
  <div data-name="referral-check">
    <AppLogo class="absolute left-6 top-9" />
    <div class="mx-auto w-full pt-24 text-center">
      <img
        class="mx-auto mb-8 h-auto w-full max-w-[480px]"
        src="@/assets/img/referral-check.gif"
      >

      <h1 class="_text-l-bold mb-4">
        {{ t('referralCheck.title') }}
      </h1>
      <p
        class="_text-m-regular mb-6"
        v-html="t('referralCheck.text')"
      />

      <ElButton
        type="primary"
        size="large"
        @click="onClick"
      >
        <span class="_text-m-bold">{{ t('referralCheck.btnText') }}</span>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { AppLogo } from '@/components'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/ReferralCheck/locales'

const { t } = useLocale<typeof messages>(messages)

const onClick = () => {
	window.location.href = '/'
}
</script>