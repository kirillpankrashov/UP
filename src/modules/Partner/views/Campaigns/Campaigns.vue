<template>
  <DashboardLayout :full-width="true">
    <DashboardTitle :title="title" />

    <div class="flex items-start justify-between">
      <div class="mb-8 max-w-[400px]">
        <CollectionSwitcher />

        <div class="mt-2 flex gap-2">
          <Search />
          <Filter />
        </div>
      </div>

      <CreateCollection />
    </div>

    <component
      :is="collection"
      :is-fetching="collectionLoading"
    />

    <CampaignsSidebar />
    <AdsetsSidebar />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'

import { AdEntityType, CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import {
	AdsetsSidebar,
	CampaignsSidebar,
	CollectionSwitcher,
	CreateCollection,
	Filter,
	Search,
} from './sections'
import {
	BrandAwarenessAdsets,
	BrandAwarenessCampaigns,
	BrandAwarenessCreatives,
	ExtensionAdsets,
	ExtensionCampaigns,
	ExtensionCreatives,
	PerformanceAdsets,
	PerformanceCampaigns,
	PrerollAdsets,
	PrerollCampaigns,
	SpecialProjectAdsets,
	SpecialProjectCampaigns,
	SpecialProjectCreatives,
} from './tables'

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const collectionLoading = computed(() => campaignsStore.collectionLoading)
const campaignType = computed(() => campaignsStore.campaignType)
const adEntityType = computed(() => campaignsStore.adEntityType)

const title = computed(() => {
	switch (campaignType.value) {
		case CampaignType.BRAND_AWARENESS:
			return t('campaigns.header.title.brand-awareness')
		case CampaignType.PERFORMANCE:
			return t('campaigns.header.title.performance')
		case CampaignType.PREROLL:
			return t('campaigns.header.title.preroll')
		case CampaignType.EXTENSION:
			return t('campaigns.header.title.extension')
		case CampaignType.SPECIAL_PROJECT:
			return t('campaigns.header.title.specialProject')
		default:
			return ''
	}
})

useTitle(title)

const collection = computed(() => {
	const table = new Map()

	table.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CAMPAIGNS}`, BrandAwarenessCampaigns)
	table.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.ADSETS}`, BrandAwarenessAdsets)
	table.set(`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CREATIVES}`, BrandAwarenessCreatives)

	table.set(`${CampaignType.PERFORMANCE}:${AdEntityType.CAMPAIGNS}`, PerformanceCampaigns)
	table.set(`${CampaignType.PERFORMANCE}:${AdEntityType.ADSETS}`, PerformanceAdsets)

	table.set(`${CampaignType.PREROLL}:${AdEntityType.CAMPAIGNS}`, PrerollCampaigns)
	table.set(`${CampaignType.PREROLL}:${AdEntityType.ADSETS}`, PrerollAdsets)

	table.set(`${CampaignType.EXTENSION}:${AdEntityType.CAMPAIGNS}`, ExtensionCampaigns)
	table.set(`${CampaignType.EXTENSION}:${AdEntityType.ADSETS}`, ExtensionAdsets)
	table.set(`${CampaignType.EXTENSION}:${AdEntityType.CREATIVES}`, ExtensionCreatives)

	table.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CAMPAIGNS}`, SpecialProjectCampaigns)
	table.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.ADSETS}`, SpecialProjectAdsets)
	table.set(`${CampaignType.SPECIAL_PROJECT}:${AdEntityType.CREATIVES}`, SpecialProjectCreatives)

	return table.get(`${campaignType.value}:${adEntityType.value}`)
})
</script>
