<template>
  <div
    data-name="analytics-content"
    class="w-full"
  >
    <DashboardTitle :title="statisticsStore.info.title || t('analytics.fetchingData')">
      <template
        v-if="!isPublic"
        #right
      >
        <ElButton
          class="w-full sm:max-w-[220px]"
          size="large"
          :type="copiedStatus ? 'success' : 'primary'"
          @click="copyLink"
        >
          <span class="_text-m-bold">{{ copiedStatus ? t('button.copyLink.success') : t('button.copyLink.static') }}</span>
        </ElButton>
      </template>
    </DashboardTitle>

    <div class="relative">
      <div class="sm:absolute sm:right-0 sm:top-0">
        <span class="_text-caption">
          {{ t('analytics.status') }}:
          <span
            v-if="statisticsStore.data?.status"
            class="text-success"
          >{{ t('analytics.active') }}</span>
          <span
            class="text-danger"
            v-else
          >{{ t('analytics.inactive') }}</span>
        </span>
					&nbsp;

        <span class="_text-caption">
          {{ t('analytics.updated') }}: {{ statisticsStore.data?.updatedAt }}
        </span>
      </div>

      <ElTabs
        :model-value="activeTab"
        @tab-change="tabChange"
      >
        <ElTabPane
          :label="t('analytics.campaignOverview')"
          :name="Tab.STATISTICS"
          :lazy="true"
        >
          <Statistics />
        </ElTabPane>

        <ElTabPane
          :label="t('analytics.creators')"
          :name="Tab.STREAMERS"
          :lazy="true"
        >
          <Streamers />
        </ElTabPane>

        <ElTabPane
          :label="t('analytics.categories')"
          :name="Tab.CATEGORIES"
          :lazy="true"
        >
          <Categories />
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import type { TabPaneName } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { RouteName } from '@/core/router'
import { ElButton, ElTabPane,ElTabs } from '@/components/element-plus'
import { DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'
import { Tab } from '@/modules/Partner/views/Analytics/types'

import { Categories, Statistics, Streamers } from './sections'

const { t } = useLocale<typeof messages>(messages)

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const route = useRoute()
const router = useRouter()

const isPublic = computed(() => route.name === RouteName.PUBLIC_CAMPAIGN_ANALYTICS)

const statisticsStore = useStatisticsStore()

const activeTab = computed<Tab>(() => route.query.tab as Tab || Tab.STATISTICS)

const copyLink = () => {
	const { start, end } = route.query
	const slug = route.params.campaignSlug as string
	const link = `${window.location.origin}/campaign-analytics/${slug}?start=${start}&end=${end}`

	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	copy(link)
}

const tabChange = async (tab: TabPaneName) => {
	await nextTick()

	router.push({ query: { ...route.query, tab } })
}
</script>
