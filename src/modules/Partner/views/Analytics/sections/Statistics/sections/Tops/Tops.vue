<template>
  <div data-name="partner-analytics-tops">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div class="flex flex-col">
        <h2 class="_headline-2 mb-6">
          {{ t('analytics.overviewTab.top5Channels') }}
        </h2>

        <div
          v-if="channels.length"
          class="mb-8 flex-1"
        >
          <TopList
            v-for="(channel, idx) in channels"
            :key="idx"
            :is-category="false"
            :index="idx + 1"
            :image="channel.image"
            :name="channel.name"
            :impressions="channel.impressions"
            :clicks="channel.clicks"
            :ctr="channel.ctr"
          />
        </div>

        <div
          v-else
          class="_text-l-regular mb-8 flex flex-1 items-center justify-center px-6 py-[70px]"
        >
          {{ t('other.noData') }}
        </div>

        <ElButton
          class="mt-auto w-full min-w-[200px] self-start lg:w-auto"
          type="primary"
          size="large"
          @click="goToCreators"
        >
          <span class="_text-m-bold">
            {{ t('analytics.overviewTab.creatorsLinkCaption') }}
          </span>
        </ElButton>
      </div>

      <div class="flex flex-col">
        <h2 class="_headline-2 mb-6">
          {{ t('analytics.overviewTab.top5Categories') }}
        </h2>

        <div
          v-if="categories.length"
          class="mb-8 flex-1"
        >
          <TopList
            v-for="(category, idx) in categories"
            :key="idx"
            :is-category="true"
            :index="idx + 1"
            :image="category.image"
            :name="category.name"
            :impressions="category.impressions"
            :clicks="0"
            :ctr="0"
          />
        </div>

        <div
          v-else
          class="_text-l-regular mb-8 flex flex-1 items-center justify-center px-6 py-[70px]"
        >
          {{ t('other.noData') }}
        </div>

        <ElButton
          class="mt-auto w-full min-w-[200px] self-start lg:w-auto"
          type="primary"
          size="large"
          @click="goToCategories"
        >
          <span class="_text-m-bold">
            {{ t('analytics.overviewTab.categoriesLinkCaption') }}
          </span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'
import { Tab } from '@/modules/Partner/views/Analytics/types'

import TopList from './components/TopList/TopList.vue'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const statisticsStore = useStatisticsStore()

const channels = computed(() => statisticsStore.data?.topChannels || [])
const categories = computed(() => statisticsStore.data?.topCategories || [])

const goToCreators = () => {
	router.push({
		name: RouteName.ANALYTICS,
		query: {
			...route.query,
			tab: Tab.STREAMERS,
		},
	})
}

const goToCategories = () => {
	router.push({
		name: RouteName.ANALYTICS,
		query: {
			...route.query,
			tab: Tab.CATEGORIES,
		},
	})
}
</script>
