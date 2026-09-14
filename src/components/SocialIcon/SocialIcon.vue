<template>
  <div>
    <TwitchIcon
      v-if="platform === Platform.TWITCH"
      class="fill-[var(--color-twitch)]"
      :class="classes"
    />
    <YoutubeIcon
      v-if="platform === Platform.YOUTUBE"
      class="fill-[var(--color-youtube)]"
      :class="classes"
    />
    <TrovoIcon
      v-if="platform === Platform.TROVO"
      class="fill-[var(--color-trovo)]"
      :class="classes"
    />
    <VkplayIcon
      v-if="platform === Platform.VK_PLAY"
      class="fill-[var(--color-vkplay)]"
      :class="classes"
    />
    <TiktokIcon
      v-if="platform === Platform.TIKTOK"
      class="fill-[var(--color-tiktok)]"
      :class="classes"
    />
  </div>
</template>

<script setup lang="ts">
import { Platform } from '@/core/types'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkplayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

withDefaults(defineProps<{
	platform: Platform
	classes?: string
}>(), {
	classes: '',
})
</script>
