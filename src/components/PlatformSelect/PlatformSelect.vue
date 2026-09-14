<template>
  <ElSelect
    v-if="model.platform"
    :class="selectTheme"
    :popper-class="`widget-platform-select-popper ${selectTheme}`"
    v-model="model.platform"
    :size="'large'"
  >
    <template #prefix>
      <TwitchIcon
        v-if="model.platform === Platform.TWITCH"
        class="h-[26px] w-[26px] fill-[var(--color-twitch)]"
      />
      <YoutubeIcon
        v-if="model.platform === Platform.YOUTUBE"
        class="h-[26px] w-[26px] fill-[var(--color-youtube)]"
      />
      <TrovoIcon
        v-if="model.platform === Platform.TROVO"
        class="h-[26px] w-[26px] fill-[var(--color-trovo)]"
      />
      <VkplayIcon
        v-if="model?.platform === Platform.VK_PLAY"
        class="h-[26px] w-[26px] fill-[var(--color-vkplay)]"
      />
      <TiktokIcon
        v-if="model?.platform === Platform.TIKTOK"
        class="h-[26px] w-[26px] fill-[var(--color-tiktok)]"
      />
    </template>

    <ElOption
      :disabled="!platforms?.twitch"
      label="Twitch"
      :value="Platform.TWITCH"
    >
      <TwitchIcon class="mr-2 h-[26px] w-[26px] fill-[var(--color-twitch)]" />
      Twitch
    </ElOption>

    <ElOption
      :disabled="!platforms?.youtube"
      label="Youtube"
      :value="Platform.YOUTUBE"
    >
      <YoutubeIcon class="mr-2 h-[26px] w-[26px] fill-[var(--color-youtube)]" />
      Youtube
    </ElOption>

    <ElOption
      :disabled="!platforms?.trovo"
      label="Trovo"
      :value="Platform.TROVO"
    >
      <TrovoIcon class="mr-2 h-[26px] w-[26px] fill-[var(--color-trovo)]" />
      Trovo
    </ElOption>

    <ElOption
      :disabled="!platforms?.vkplay"
      label="VK Play"
      :value="Platform.VK_PLAY"
    >
      <VkplayIcon class="mr-2 h-[26px] w-[26px] fill-[var(--color-vkplay)]" />
      VK Play
    </ElOption>

    <ElOption
      :disabled="!platforms?.tiktok"
      label="TikTok"
      :value="Platform.TIKTOK"
    >
      <TiktokIcon class="mr-2 h-[26px] w-[26px] fill-[var(--color-tiktok)]" />
      TikTok
    </ElOption>
  </ElSelect>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { ElOption,ElSelect } from '@/components/element-plus'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkplayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

defineProps<{
  selectTheme?: string
}>()

const model = defineModel<{
  platform: Platform
}>({ required: true })

const streamerStore = useStreamerStore()

const platforms = computed(() => streamerStore.profile?.platforms)
</script>

<style lang="scss">
.widget-platform-select-popper {
  .el-select-dropdown__item {
		@apply flex items-center pl-3
  }
}
</style>
