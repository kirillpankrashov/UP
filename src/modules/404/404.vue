<template>
  <div class="z fixed left-0 top-0 flex h-screen w-screen justify-center bg-white">
    <router-link :to="{path: '/'}">
      <AppLogo class="absolute left-8 top-8" />
    </router-link>

    <div class="flex flex-col items-center justify-center text-center">
      <div class="_headline mb-12">
        {{ t('title') }}
      </div>
      <img
        class="h-60 w-auto"
        src="@/assets/img/404.png"
        alt="404"
      >
      <ElButton
        class="mb-4 w-80"
        type="primary"
        size="large"
        @click="$router.push({path: '/'})"
      >
        <span class="_text-m-bold">{{ t('back') }}</span>
      </ElButton>
      <div class="_text-s-regular text-center">
        {{ t('question') }}
        <a
          :href="t('links.uplifyDiscord')"
          target="_blank"
        >
          {{ t('chat') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useLocale } from '@/core/hooks'
import { AppLogo } from '@/components'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/404/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
