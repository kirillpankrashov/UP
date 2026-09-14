<template>
  <DashboardLayout
    data-name="agency"
  >
    <DashboardTitle :title="t('creators.header.title')" />

    <ElTabs
      v-if="agencyStore.data"
      v-model="activeTab"
    >
      <ElTabPane
        :label="t('creators.tabs.overview')"
        :name="Tab.OVERVIEW"
        :lazy="true"
      >
        <Overview
          @open-creators="activeTab = Tab.STREAMERS"
        />
      </ElTabPane>

      <ElTabPane
        v-if="agencyStore.isUplifyAgency"
        :label="t('creators.tabs.history')"
        :name="Tab.HISTORY"
        :lazy="true"
      >
        <History />
      </ElTabPane>

      <ElTabPane
        v-if="!agencyStore.isUplifyAgency"
        :label="t('creators.tabs.creators')"
        :name="Tab.STREAMERS"
        :lazy="true"
      >
        <Streamers />
      </ElTabPane>

      <ElTabPane
        v-if="!agencyStore.isUplifyAgency"
        :label="t('creators.tabs.campaignsActive')"
        :name="Tab.ADSETS_ACTIVE"
        :lazy="true"
      >
        <AdsetsActive />
      </ElTabPane>

      <ElTabPane
        v-if="!agencyStore.isUplifyAgency"
        :label="t('creators.tabs.campaignsClosed')"
        :name="Tab.ADSETS_CLOSED"
        :lazy="true"
      >
        <AdsetsClosed />
      </ElTabPane>

      <ElTabPane
        v-if="!agencyStore.isUplifyAgency"
        :label="t('creators.tabs.billing')"
        :name="Tab.BILLING"
        :lazy="true"
      >
        <Billing />
      </ElTabPane>
    </ElTabs>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore, useDictStore } from '@/core/store'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyStore } from '@/modules/Partner/views/Agency/store'
import { Tab } from '@/modules/Partner/views/Agency/types'

import {
	AdsetsActive,
	AdsetsClosed,
	Billing,
	History,
	Overview,
	Streamers,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()

const activeTab = ref<Tab>(route.query.tab as Tab || Tab.OVERVIEW)

const title = computed(() => {
	switch (activeTab.value) {
		case Tab.OVERVIEW:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.overview')
		case Tab.HISTORY:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.history')
		case Tab.ADSETS_ACTIVE:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.campaignsActive')
		case Tab.ADSETS_CLOSED:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.campaignsClosed')
		case Tab.STREAMERS:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.creators')
		case Tab.BILLING:
			return  t('creators.header.title') + ' | ' + t('creators.tabs.billing')
		default:
			return t('creators.header.title')
	}
})

useTitle(title)

const agencyStore = useAgencyStore()
const appStore = useAppStore()
const dictStore = useDictStore()

watch(activeTab, () => {
	router.push({ query: { tab: activeTab.value } })
})

onBeforeMount(async () => {
	dictStore.getCampaignDictionary(appStore.appLocale, CampaignType.BRAND_AWARENESS)
	agencyStore.fetchData()
})
</script>
