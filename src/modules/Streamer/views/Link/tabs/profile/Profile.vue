<template>
  <div
    id="streamer-link-profile"
    data-name="streamer-link-profile"
    v-loading="profileStore.isLoadingData"
  >
    <template v-if="profileStore.profile">
      <About />
      <!-- <Telegram /> -->
      <Gears />
      <SocialLinks />
      <Theme />
      <Banner />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import {
	About,
	Banner,
	Gears,
	SocialLinks,
	// Telegram,
	Theme,
} from './sections'

const profileStore = useLinkProfileStore()

onMounted(() => {
	if (profileStore.profile) return

	profileStore.fetchProfile()
})
</script>
