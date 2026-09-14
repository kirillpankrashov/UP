<template>
  <DashboardLayout
    id="streamer-link"
    data-name="streamer-link"
    v-loading="profileStore.isLoadingData"
  >
    <DashboardTitle
      :title="t('link.title')"
      class="!mb-2"
    />

    <TextLink
      :href="profileStore.linkName"
      target="_blank"
      class="mb-6 inline-block no-underline"
    >
      {{ profileStore.linkName }}
    </TextLink>

    <ElTabs
      v-if="profileStore.profile"
      v-model="activeTab"
      v-loading="profileStore.isLoadingData"
      @tab-change="tabChange"
    >
      <ElTabPane
        :label="t('link.tabs.setup')"
        :name="Tab.SETUP"
      >
        <Setup />
      </ElTabPane>

      <ElTabPane
        :label="t('link.tabs.profile')"
        name="profile"
      >
        <Profile />
      </ElTabPane>

      <!-- <ElTabPane
        :label="t('link.tabs.alerts')"
        name="alerts"
      >
        <Alerts />
      </ElTabPane> -->

      <ElTabPane
        :label="t('link.tabs.supporters')"
        name="supporters"
      >
        <Analytics />
      </ElTabPane>

      <ElTabPane
        :label="t('link.tabs.posts')"
        name="posts"
      >
        <Posts />
      </ElTabPane>
    </ElTabs>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import type { TabPaneName } from 'element-plus'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { Tab } from '@/modules/Streamer/views/Link/types'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import {
	// Alerts,
	Analytics,
	Posts,
	Profile,
	Setup,
} from './tabs'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const streamerStore = useStreamerStore()
const profileStore = useLinkProfileStore()
const activeTab = ref<Tab>(route.query.tab as Tab || Tab.SETUP)
const streamer = computed(() => streamerStore.profile)

const title = computed(() => {
	switch (activeTab.value) {
		case Tab.SETUP:
			return t('link.title') + ' | ' + t('link.tabs.setup')
		case Tab.PROFILE:
			return t('link.title') + ' | ' + t('link.tabs.profile')
		case Tab.ALERTS:
			return t('link.title') + ' | ' + t('link.tabs.alerts')
		case Tab.SUPPORTERS:
			return t('link.title') + ' | ' + t('link.tabs.supporters')
		case Tab.POSTS:
			return t('link.title') + ' | ' + t('link.tabs.posts')
		default:
			return t('link.title')
	}
})

useTitle(title)

onMounted(async () => {
	if (!route.query.tab) {
		router.replace({ query: { tab: Tab.SETUP } })
	}

	if (!streamer.value?.freemiumActive) {
		await router.replace({ name: RouteName.NOT_FOUND })
	}

	profileStore.fetchProfile()
})

const tabChange = (tab: TabPaneName) => {
	router.replace({ query: { tab } })
}

defineExpose({
	router,
})
</script>
