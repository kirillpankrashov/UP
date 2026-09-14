<template>
  <DashboardLayout
    data-name="agency"
    v-loading="advertisersStore.isFetchingData"
    :full-width="true"
  >
    <DashboardTitle :title="t('advertisers.header.title')" />

    <ElTabs v-model="activeTab">
      <ElTabPane
        :label="t('advertisers.tabs.advertisers')"
        :name="Tab.ADVERTISERS"
        :lazy="true"
      >
        <Advertisers />
      </ElTabPane>

      <ElTabPane
        :label="t('advertisers.tabs.holdings')"
        :name="Tab.HOLDINGS"
        :lazy="true"
      >
        <Holdings />
      </ElTabPane>
    </ElTabs>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { ElTabPane, ElTabs } from '@/components/element-plus'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Advertisers/locales'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { Tab } from '@/modules/Partner/views/Advertisers/types'

import { Advertisers, Holdings } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const advertisersStore = useAdvertisersStore()

const activeTab = ref<Tab>(route.query.tab as Tab || Tab.ADVERTISERS)

const title = computed(() => {
	switch (activeTab.value) {
		case Tab.ADVERTISERS:
			return t('advertisers.tabs.advertisers')
		case Tab.HOLDINGS:
			return t('advertisers.tabs.holdings')
		default:
			return ''
	}
})

useTitle(title)
</script>
