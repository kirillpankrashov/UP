<template>
  <div id="profile-user-info">
    <div class="flex sm:block">
      <div
        v-if="avatar"
        class="mr-2 h-16 w-16 rounded-full border-[1px] border-light-gray bg-white bg-cover bg-center bg-no-repeat transition-all sm:mb-2 sm:mr-0 sm:h-20 sm:w-20"
        :style="`background-image: url(${avatar})`"
      />
      <div class="-mt-1 sm:mt-0">
        <div class="_text-l-bold mb-2">
          {{ streamer?.name }}
        </div>
        <div class="_text-m-regular mb-2 font-bold sm:mb-4 sm:font-normal">
          {{ tier }}
        </div>
        <TextLink
          class="no-underline"
          :href="t('links.whatIsTier')"
          target="_blank"
        >
          {{ t('profile.tier.whatIsTier') }}
        </TextLink>
      </div>
    </div>
    <div
      v-if="showAgencyInfo"
      class="mt-6"
    >
      <div class="_text-caption-caps mb-3">
        {{ t('profile.agency.title') }}
      </div>
      <div class="_text-m-regular">
        {{ streamer?.agency.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { messages } from '@/modules/Streamer/views/Profile/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()

const streamer = computed(() => streamerStore.profile)
const widget = computed(() => settingsStore.widget)

const tier = computed(() => streamer.value?.loyaltyProgram.level || '—')
const avatar = computed(() => {
	const platform = widget.value?.platform

	if (!platform || !streamer.value) {
		return null
	}

	return streamerStore.profile?.platforms[platform]?.avatar
})

const showAgencyInfo = computed(() => {
	return streamer.value?.agency && streamer.value.agency.id !== 1
})
</script>
