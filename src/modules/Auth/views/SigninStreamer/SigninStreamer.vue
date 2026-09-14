<template>
  <AuthLayout id="signin-streamer">
    <template #default>
      <h1 class="_headline mb-8">
        {{ t('signinStreamer.title') }}
      </h1>
      <p class="_text-m-regular mb-4">
        {{ t('signinStreamer.subtitle') }}
      </p>

      <div class="mb-4 grid gap-4">
        <AuthButton
          v-if="platforms.includes(Platform.TWITCH)"
          :platform="Platform.TWITCH"
          request-url="auth/streamer"
          plain
        />
        <AuthButton
          v-if="platforms.includes(Platform.YOUTUBE)"
          :platform="Platform.YOUTUBE"
          request-url="auth/streamer/youtube"
          plain
        />
        <AuthButton
          v-if="platforms.includes(Platform.TROVO)"
          :platform="Platform.TROVO"
          request-url="auth/streamer/trovo"
          plain
        />
        <AuthButton
          v-if="platforms.includes(Platform.VK_PLAY)"
          :platform="Platform.VK_PLAY"
          request-url="auth/streamer/vkplay"
          plain
        />
        <AuthButton
          v-if="platforms.includes(Platform.TIKTOK)"
          :platform="Platform.TIKTOK"
          request-url="auth/streamer/tiktok"
          plain
        />
      </div>

      <p
        class="_text-s-regular text-dark-gray"
        v-html="t('signinStreamer.termsAndPolicy')"
      />

      <template v-if="route.query?.error === ErrorAuth.AUTH && route.query?.reason === ErrorReason.USER">
        <ErrorUser />
      </template>
      <template v-else>
        <ErrorBlocked v-if="route.query?.error === ErrorAuth.ACCOUNT_BLOCKED" />
        <ErrorTwitch v-if="route.query?.error === ErrorAuth.TWITCH" />
        <ErrorYoutube v-if="route.query?.error === ErrorAuth.YOUTUBE" />
        <ErrorTrovo v-if="route.query?.error === ErrorAuth.TROVO" />
        <ErrorVkplay v-if="route.query?.error === ErrorAuth.VK_PLAY" />
        <ErrorTiktok v-if="route.query?.error === ErrorAuth.TIKTOK" />
      </template>

      <!-- <Demo /> -->
    </template>

    <template #footer-links>
      <div class="flex items-center gap-4 sm:gap-6 text-dark-gray flex-wrap justify-center">
        <a
          class="no-underline"
          :href="t('links.terms')"
        >{{ t('phrases.terms') }}</a>
        <a
          class="no-underline"
          :href="t('links.privacy')"
        >{{ t('phrases.privacy') }}</a>
        <a
          class="no-underline"
          :href="t('links.uplifyDiscord')"
        >{{ t('phrases.help') }}</a>

        <router-link
          class="no-underline"
          :to="{name: RouteName.PARTNER_SIGNIN}"
        >
          {{ t('signinStreamer.partnerLogin') }}
        </router-link>
      </div>
    </template>

    <template
      v-if="showAbout"
      #side
    >
      <Info />
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { ErrorAuth, ErrorReason, Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { AuthButton } from '@/components'
import {
	ErrorBlocked,
	ErrorTiktok,
	ErrorTrovo,
	ErrorTwitch,
	ErrorUser,
	ErrorVkplay,
	ErrorYoutube,
} from '@/components/AuthError'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { RouteName } from '@/modules/Auth/router'
import { Info } from '@/modules/Auth/views/SigninStreamer/components'
import { checkStreamerParams } from '@/modules/Auth/views/SigninStreamer/helpers/checkStreamerParams'
import { messages } from '@/modules/Auth/views/SigninStreamer/locales'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const platforms = computed(() => appStore.domain?.platforms || [])

const showAbout = computed(() => {
	switch (route.name) {
		case RouteName.AUTH_STREAMER_SETTINGS:
		case RouteName.STREAMER_REFERRAL_TOKEN:
		case RouteName.PARTNER_REFERRAL_TOKEN:
			return false
		default:
			return true
	}
})

onMounted(() => checkStreamerParams(route))
</script>
