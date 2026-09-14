<template>
  <div
    id="dashboard-layout-sidebar-socials"
  >
    <div class="_text-s-regular mb-3 text-gray">
      {{ t('socials.title') }}
    </div>

    <div
      v-if="appStore.appLocale === Locale.RU"
      class="flex items-center"
    >
      <a
        :href="t('links.telegram.url')"
        target="_blank"
        class="group mr-[18px] inline-flex"
      >
        <TelegramIcon class="h-[22px] w-[22px] fill-dark-gray group-hover:fill-primary" />
      </a>

      <a
        :href="t('links.youtube.url')"
        target="_blank"
        class="group mr-[18px] inline-flex"
      >
        <YoutubeIcon class="h-[24px] w-[24px] fill-dark-gray group-hover:fill-primary" />
      </a>

      <a
        :href="t('links.vk.url')"
        target="_blank"
        class="group mr-[18px] inline-flex"
      >
        <VKIcon class="h-[22px] w-[22px] fill-dark-gray group-hover:fill-primary" />
      </a>
    </div>

    <div
      v-else
      class="flex items-center"
    >
      <a
        :href="t('links.telegram.url')"
        target="_blank"
        class="group mr-[18px] inline-flex"
      >
        <TelegramIcon class="h-[22px] w-[22px] fill-dark-gray group-hover:fill-primary" />
      </a>

      <a
        :href="t('links.twitter.url')"
        target="_blank"
        class="group mr-[18px] inline-flex"
      >
        <TwitterIcon class="h-[22px] w-[22px] fill-dark-gray group-hover:fill-primary" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Locale } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'

import TelegramIcon from '@/assets/img/icons/telegram-icon.svg'
import TwitterIcon from '@/assets/img/icons/twitter-icon.svg'
import VKIcon from '@/assets/img/icons/vk-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
</script>
