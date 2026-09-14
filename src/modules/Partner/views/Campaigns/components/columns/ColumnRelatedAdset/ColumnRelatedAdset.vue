<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.relatedGroup')"
    width="250"
    show-overflow-tooltip
  >
    <template #default="{ row }: {row: AdEntityCreative}">
      <router-link
        :to="getAdsetLink(row)"
        class="text-primary no-underline"
      >
        {{ getRelatedAdset(row)?.title }}
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
	items: AdEntityCreative[]
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const getRelatedAdset = (row: AdEntityAdset | AdEntityCreative) => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.CREATIVES:
			return (row as AdEntityCreative).adSet
	}
	throw new Error('Unreachable case')
}

const getAdsetLink = (row: AdEntityAdset | AdEntityCreative): RouteLocationNamedRaw => {
	const adSet = getRelatedAdset(row)

	return {
		name: RouteName.ADSET_EDIT,
		params: {
			campaignSlug: adSet.campaign.slug,
			adsetSlug: adSet.slug,
		},
	}
}
</script>
