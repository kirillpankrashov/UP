<template>
  <div
    v-if="widget"
    id="campaigns-current-platform"
    data-name="campaigns-current-platform"
    class="mb-8"
  >
    <div
      class="_text-m-bold mb-3"
      v-html="t('campaigns.platforms.title')"
    />

    <div class="flex items-center">
      <div
        data-test="current-platform-twitch"
        v-if="widget.platform === Platform.TWITCH"
        class="mr-6 flex items-center"
      >
        <TwitchIcon class="mr-2 h-5 w-5 fill-twitch" />
        <span
          class="_text-m-bold uppercase text-twitch"
          v-show="!appStore.isMobile"
        >
          Twitch
        </span>
      </div>

      <div
        data-test="current-platform-youtube"
        v-if="widget.platform === Platform.YOUTUBE"
        class="mr-6 flex items-center"
      >
        <YoutubeIcon class="mr-2 h-5 w-5 fill-youtube" />
        <span
          class="_text-m-bold uppercase text-youtube"
          v-show="!appStore.isMobile"
        >
          Youtube
        </span>
      </div>

      <div
        data-test="current-platform-trovo"
        v-if="widget.platform === Platform.TROVO"
        class="mr-6 flex items-center"
      >
        <TrovoIcon class="mr-2 h-5 w-5 fill-trovo" />
        <span
          class="_text-m-bold uppercase text-trovo"
          v-show="!appStore.isMobile"
        >
          Trovo
        </span>
      </div>

      <div
        data-test="current-platform-vkplay"
        v-if="widget.platform === Platform.VK_PLAY"
        class="mr-6 flex items-center"
      >
        <VkPlayIcon class="fill-vkplay mr-2 h-5 w-5" />
        <span
          class="_text-m-bold text-vkplay uppercase"
          v-show="!appStore.isMobile"
        >
          VK Play
        </span>
      </div>

      <div
        data-test="current-platform-tiktok"
        v-if="widget.platform === Platform.TIKTOK"
        class="mr-6 flex items-center"
      >
        <TiktokIcon class="fill-tiktok mr-2 h-5 w-5" />
        <span
          class="_text-m-bold text-tiktok uppercase"
          v-show="!appStore.isMobile"
        >
          TikTok
        </span>
      </div>

      <router-link
        class="flex no-underline"
        :to="{name: RouteName.SETTINGS}"
      >
        <TextLink class="text-[10px] !text-dark-gray">
          {{ t('campaigns.platforms.link.text') }}
        </TextLink>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { TextLink } from '@/components'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkPlayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
