<template>
  <DashboardSection
    id="profile-platforms"
    :title="t('profile.platforms.title')"
  >
    <div class="grid gap-2 sm:grid-cols-2">
      <AuthButton
        v-if="platforms.includes(Platform.TWITCH)"
        :platform="Platform.TWITCH"
        request-url="streamer/attach/twitch"
        :attaching="attachingTwitch"
        :attached="!!twitch"
        :plain="!!twitch"
      >
        {{ twitch ? twitch.nickname : `${t('button.attach.static')} Twitch` }}
      </AuthButton>

      <AuthButton
        v-if="platforms.includes(Platform.YOUTUBE)"
        :platform="Platform.YOUTUBE"
        request-url="streamer/attach/youtube"
        :attaching="attachingYoutube"
        :attached="!!youtube"
        :plain="!!youtube"
      >
        {{ youtube ? youtube.nickname : `${t('button.attach.static')} Youtube` }}
      </AuthButton>

      <AuthButton
        v-if="platforms.includes(Platform.TROVO)"
        :platform="Platform.TROVO"
        request-url="streamer/attach/trovo"
        :attaching="attachingTrovo"
        :attached="!!trovo"
        :plain="!!trovo"
      >
        {{ trovo ? trovo.nickname : `${t('button.attach.static')} Trovo` }}
      </AuthButton>

      <AuthButton
        v-if="platforms.includes(Platform.VK_PLAY)"
        :platform="Platform.VK_PLAY"
        request-url="streamer/attach/vkplay"
        :attaching="attachingTrovo"
        :attached="!!vkplay"
        :plain="!!vkplay"
      >
        {{ vkplay ? vkplay.nickname : `${t('button.attach.static')} VK Play` }}
      </AuthButton>

      <AuthButton
        v-if="platforms.includes(Platform.TIKTOK)"
        :platform="Platform.TIKTOK"
        request-url="streamer/attach/tiktok"
        :attaching="attachingTrovo"
        :attached="!!tiktok"
        :plain="!!tiktok"
      >
        {{ tiktok ? tiktok.nickname : `${t('button.attach.static')} TikTok` }}
      </AuthButton>
    </div>

    <div class="mt-2">
      <ErrorAccountExists v-if="route.query?.reason === ErrorAuth.ACCOUNT_EXISTS" />
      <ErrorBlocked v-if="route.query?.error === ErrorAuth.ACCOUNT_BLOCKED" />
      <ErrorTwitch v-if="route.query?.error && platform === Platform.TWITCH" />
      <ErrorYoutube v-if="route.query?.error && platform === Platform.YOUTUBE" />
      <ErrorTrovo v-if="route.query?.error && platform === Platform.TROVO" />
      <ErrorVkplay v-if="route.query?.error && platform === Platform.VK_PLAY" />
      <ErrorTiktok v-if="route.query?.error && platform === Platform.TIKTOK" />
    </div>

    <div class="mt-6 text-center sm:mt-4 sm:text-left">
      <TextLink
        class="no-underline"
        :href="t('links.uplifyDiscord')"
        target="_blank"
      >
        {{ t('profile.platforms.writeUsToDetach') }}
      </TextLink>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ErrorAuth, Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { AuthButton, TextLink } from '@/components'
import { ErrorAccountExists, ErrorBlocked, ErrorTiktok, ErrorTrovo, ErrorTwitch, ErrorVkplay, ErrorYoutube } from '@/components/AuthError'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { attachPlatform } from '@/modules/Streamer/views/Profile/api'
import { messages } from '@/modules/Streamer/views/Profile/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const streamerStore = useStreamerStore()

const platforms = computed(() => appStore.domain?.platforms || [])

const youtube = computed(() => streamerStore.profile?.platforms.youtube)
const twitch = computed(() => streamerStore.profile?.platforms.twitch)
const trovo = computed(() => streamerStore.profile?.platforms.trovo)
const vkplay = computed(() => streamerStore.profile?.platforms?.vkplay)
const tiktok = computed(() => streamerStore.profile?.platforms?.tiktok)
const attachId = computed(() => route.query.attach as string)
const platform = computed(() => route.query.platform as Platform)
const attachingTwitch = computed(() => attachId.value && platform.value === Platform.TWITCH || false)
const attachingYoutube = computed(() => attachId.value && platform.value === Platform.YOUTUBE || false)
const attachingTrovo = computed(() => attachId.value && platform.value === Platform.TROVO || false)
const attachingVkplay = computed(() => attachId.value && platform.value === Platform.VK_PLAY || false)
const attachingTiktok = computed(() => attachId.value && platform.value === Platform.TIKTOK || false)

onMounted(async () => {
	if (!attachingTwitch.value && !attachingYoutube.value && !attachingTrovo.value && !attachingVkplay.value && !attachingTiktok.value) {
		return
	}

	try {
		await attachPlatform(
			{ provider: attachId.value },
			platform.value,
		)
		await streamerStore.fetchProfile()
	}
	finally {
		await router.push({ name: RouteName.PROFILE })
	}
})
</script>
