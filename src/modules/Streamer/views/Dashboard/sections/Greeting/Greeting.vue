<template>
  <div
    v-if="streamer"
    id="dashboard-greeting"
    data-name="dashboard-greeting"
    data-test="dashboard-greeting"
    class="mb-6"
  >
    <TextLink
      v-if="LINK_ENABLED && streamer.freemiumActive &&link"
      :href="link"
      target="_blank"
      class="no-underline"
    >
      {{ link }}
    </TextLink>

    <h2
      v-else
      data-test="dashboard-greeting-text"
      class="_text-s-regular"
    >
      {{ t('dashboard.greeting', { name: streamer.username }) }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeMount } from 'vue'

import { LINK_ENABLED } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const linkProfileStore = useLinkProfileStore()

const streamer = computed(() => streamerStore.profile)

const link = computed(() => !linkProfileStore.isLoadingData ? linkProfileStore.linkName : '')

onBeforeMount(() => {
	if (LINK_ENABLED && streamer.value?.freemiumActive) {
		linkProfileStore.fetchProfile()
	}
})
</script>
