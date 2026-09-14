<template>
  <ElButton
    data-test="create-collection-btn"
    type="primary"
    @click="onClick"
  >
    <span class="_text-m-bold">{{ btnText }}</span>
  </ElButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()

const campaignsStore = useCampaignsStore()

const btnText = computed(() => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.CREATIVES:
			return t('button.create.creatives')
		case AdEntityType.ADSETS:
			return t('button.create.groups')
		default:
			return t('button.create.campaigns')
	}
})

const onClick = () => {
	switch (campaignsStore.adEntityType) {
		case AdEntityType.CREATIVES:
			campaignsStore.adsetsSidebarVisisble = true
			break
		case AdEntityType.ADSETS:
			campaignsStore.campaignsSidebarVisible = true
			break
		default:
			router.push({
				name: RouteName.CAMPAIGN_CREATE,
				params: {
					campaignType: campaignsStore.campaignType,
				},
			})

	}
}
</script>
