<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.format')"
    width="120"
    show-overflow-tooltip
  >
    <template #default="{ row }: {row: AdEntityAdset | AdEntityCreative}">
      {{ getFormat(row) }}
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntityAdset, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

defineProps<{
	items: AdEntityAdset[] | AdEntityCreative[]
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const getFormat = (row: AdEntityAdset | AdEntityCreative) => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.ADSETS:
			return (row as AdEntityAdset).format.title
		case AdEntityType.CREATIVES:
			return (row as AdEntityCreative).adSet.format.title
		default:
			return '–'
	}
}
</script>
