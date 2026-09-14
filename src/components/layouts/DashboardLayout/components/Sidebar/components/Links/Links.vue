<template>
  <div
    id="dashboard-layout-sidebar-links"
    class="grid grid-cols-2 gap-[18px] sm:block"
  >
    <div
      v-if="appStore.auth.role === Role.STREAMER"
      class="link-item"
    >
      <a
        :href="discordLink"
        target="_blank"
        class="link-anchor group"
      >
        <DiscordIcon class="link-icon w-[15px] group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.discord.label') }}</span>
      </a>
    </div>

    <div class="link-item">
      <a
        :href="t('links.help.url')"
        target="_blank"
        class="link-anchor group"
      >
        <HelpIcon class="link-icon group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.help.label') }}</span>
      </a>
    </div>

    <div class="link-item">
      <a
        target="_blank"
        class="beamerTrigger link-anchor group"
      >
        <NewsIcon class="link-icon h-[15px] group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.news.label') }}</span>
      </a>
    </div>

    <div class="link-item">
      <a
        :href="t('links.feedback.url')"
        target="_blank"
        class="link-anchor group"
      >
        <FeedbackIcon class="link-icon group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.feedback.label') }}</span>
      </a>
    </div>

    <div
      v-if="appStore.isMobile"
      class="link-item"
    >
      <a
        :href="t('links.twitter.url')"
        target="_blank"
        class="link-anchor group"
      >
        <TwitterIcon class="link-icon group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.twitter.label') }}</span>
      </a>
    </div>

    <div
      v-if="appStore.isMobile"
      class="link-item"
    >
      <a
        :href="t('links.telegram.url')"
        target="_blank"
        class="link-anchor group"
      >
        <TelegramIcon class="link-icon group-hover:fill-primary" />
        <span class="link-label group-hover:text-primary">{{ t('links.telegram.label') }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { DomainName, Role } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'

import HelpIcon from '@/assets/img/icons/circle-question.svg'
import FeedbackIcon from '@/assets/img/icons/dialog-bubbles.svg'
import DiscordIcon from '@/assets/img/icons/discord-icon.svg'
import NewsIcon from '@/assets/img/icons/star.svg'
import TelegramIcon from '@/assets/img/icons/telegram-icon.svg'
import TwitterIcon from '@/assets/img/icons/twitter-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const discordLink = computed(() => {
	if (appStore.domain?.name === DomainName.STREAMO) {
		return 'https://discord.gg/hpU9m9QCEU'
	}
	return t('links.discord.url')
})

onMounted(() => {
	if (window.beamer_config) {
		window.beamer_config.language = appStore.appLocale
	}
})
</script>

<style lang="scss" scoped>
.link-item {
	@apply h-[14px] sm:mb-4
}

.link-anchor {
	@apply relative flex cursor-pointer items-center no-underline
}

.link-icon {
	@apply mr-[7px] h-[16px] w-[16px] fill-dark-gray transition-all
}

.link-label {
	@apply _text-s-regular text-black transition-all
}
</style>
