<template>
  <ValuesItem
    :caption="captionText"
    :link="{name: RouteName.CAMPAIGNS_LIVESTREAM}"
    :link-text="t('dashboard.values.goToCampaigns')"
    :is-loading="!activeCampaignsLoaded"
  >
    <div
      v-if="!noActiveCampaigns"
      class="mt-[-5px]"
    >
      <div
        v-for="campaign in campaignsToShow"
        :key="campaign.id"
        class="campaign-card"
        :style="`background-image: url(${campaign.logo})`"
      />
      <div
        v-if="сampaignsCount > CAMPAIGN_COUNT"
        class="_text-l-regular inline-block h-10 w-10 rounded-full bg-primary-50 text-center align-middle !leading-10 text-primary"
        data-test="campaigns-left"
      >
        +{{ remainingCampaignsCount }}
      </div>
    </div>
    <div
      v-else
      class="campaigns-logos"
    >
      <div class="campaign-card _blank" />
      <div class="campaign-card _blank" />
      <div class="campaign-card _blank" />
    </div>
  </ValuesItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { RouteName } from '@/modules/Streamer/router'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { ValuesItem } from '@/modules/Streamer/views/Dashboard/sections/Values/components'

const CAMPAIGN_COUNT = 3

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const campaigns = computed(() => campaignsStore.activeCampaignsShort.data.active)

const сampaignsCount = computed(() => campaigns.value?.length || 0)
const activeCampaignsLoaded = computed(() => !campaignsStore.isFetchingActiveCampaigns)

const campaignsToShow = computed(() => campaigns.value?.slice(0, CAMPAIGN_COUNT))
const remainingCampaignsCount = computed(() => campaigns.value?.slice(CAMPAIGN_COUNT).length)

const noActiveCampaigns = computed(() => !сampaignsCount.value && activeCampaignsLoaded.value)

const captionText = computed(() => {
	if (noActiveCampaigns.value) {
		return t('dashboard.values.newCampaignsComingSoon')
	}
	return `${сampaignsCount.value} ${t('dashboard.values.activeCampaignsToday', сampaignsCount.value)}`
})

defineExpose({
	campaignsToShow,
	remainingCampaignsCount,
	CAMPAIGN_COUNT,
})
</script>

<style lang="scss" scoped>
.campaign-card {
	@apply inline-block align-middle relative w-10 h-10 mr-[-6px] rounded-full bg-cover bg-center;

	&._link {
		@apply border border-white bg-primary-100;
	}
}
</style>
