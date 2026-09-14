<template>
  <DashboardSection
    id="profile-discord"
    title="Discord"
    ref="blockRef"
  >
    <div class="_text-m-regular">
      {{ t('profile.discord.title') }}
    </div>

    <div class="mt-4 flex items-center">
      <div class="_text-s-regular">
        {{ t('profile.discord.status.caption') }}
      </div>

      <ElTag
        v-if="!discord"
        class="ml-2 uppercase"
        :size="'small'"
        :round="true"
        type="warning"
      >
        {{ t('profile.discord.status.notConnected') }}
      </ElTag>
      <ElTag
        v-else
        class="ml-2 uppercase"
        :size="'small'"
        :round="true"
        type="success"
      >
        {{ t('profile.discord.status.connected') }}
      </ElTag>
    </div>

    <div class="mt-4 max-w-fit">
      <DiscordAuthButton v-if="!discord">
        {{ t('button.join.static') }} Discord
      </DiscordAuthButton>
    </div>

    <ErrorDiscord v-if="route.query?.error && platform === 'discord'" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type VNodeRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ErrorDiscord } from '@/components/AuthError'
import { ElTag } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { attachPlatform } from '@/modules/Streamer/views/Profile/api'
import { messages } from '@/modules/Streamer/views/Profile/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import { DiscordAuthButton } from './components'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()

const streamerStore = useStreamerStore()

const blockRef = ref<VNodeRef | null>(null)
const discord = computed(() => streamerStore.profile?.platforms.discord)
const attachId = computed(() => route.query.attach as string)
const platform = computed(() => route.query.platform)
const attachingDiscord = computed(() => !!(attachId.value && platform.value === 'discord'))

onMounted(async () => {
	if (!attachingDiscord.value) {
		return
	}

	try {
		await attachPlatform(
			{ provider: attachId.value },
			platform.value as Platform,
		)
		await streamerStore.fetchProfile()
	}
	finally {
		await router.push({ name: RouteName.PROFILE })
	}
})
</script>
