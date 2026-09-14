<template>
  <div
    id="campaigns-adsets-closed"
    data-name="campaigns-adsets-closed"
  >
    <template v-if="route.name === RouteName.CAMPAIGNS_LIVESTREAM">
      <AdsetsList
        v-if="campaignsStore.completedCampaigns.data.length"
        data-test="adsets-closed-list"
        :adsets="campaignsStore.completedCampaigns.data"
      />
    </template>

    <template v-if="route.name === RouteName.CAMPAIGNS_PREROLL">
      <AdsetsList
        v-if="campaignsStore.completedPrerollCampaigns.data.length"
        data-test="adsets-closed-preroll-list"
        :adsets="campaignsStore.completedPrerollCampaigns.data"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { RouteName } from '@/modules/Streamer/router'
import { AdsetsList } from '@/modules/Streamer/views/Campaigns/components'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const route = useRoute()
const router = useRouter()

const streamerStore = useStreamerStore()
const campaignsStore = useCampaignsStore()

onMounted(() => {
	if (route.name === RouteName.CAMPAIGNS_LIVESTREAM) {
		campaignsStore.fetchCompletedCampaigns()
	}

	if (route.name === RouteName.CAMPAIGNS_PREROLL) {
		if (!streamerStore.profile?.prerollActive) {
			return router.push({ name: RouteName.CAMPAIGNS_LIVESTREAM })
		}

		campaignsStore.fetchCompletedPrerollCampaigns()
	}
})
</script>