<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.relatedCampaign')"
    width="250"
    show-overflow-tooltip
  >
    <template #default="{ row }: {row: AdEntityAdset | AdEntityCreative}">
      <router-link
        :to="getCampaignLink(row)"
        class="text-primary no-underline"
      >
        {{ getRelatedCampaign(row)?.title.default }}
      </router-link>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntityAdset, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

defineProps<{
	items: AdEntityAdset[] | AdEntityCreative[]
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const getRelatedCampaign = (row: AdEntityAdset | AdEntityCreative) => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.ADSETS:
			return (row as AdEntityAdset).campaign
		case AdEntityType.CREATIVES:
			return (row as AdEntityCreative).adSet.campaign
	}
	throw new Error('Unreachable case')
}

const getCampaignLink = (row: AdEntityAdset | AdEntityCreative): RouteLocationNamedRaw => {
	const campaign = getRelatedCampaign(row)

	return {
		name: RouteName.CAMPAIGN_EDIT,
		params: {
			campaignSlug: campaign.slug,
		},
	}
}
</script>
