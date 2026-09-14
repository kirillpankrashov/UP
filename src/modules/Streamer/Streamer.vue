<template>
  <div
    v-loading="isDictsFetching"
    :class="{'h-full w-full overflow-hidden': isDictsFetching}"
  >
    <ReloginMessage />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { removeToken, TallyFormManager } from '@/core/helpers'
import { useModuleRouter } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ReloginMessage } from '@/modules/Streamer/components'
import { RouteName, streamerRouter } from '@/modules/Streamer/router'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const route = useRoute()
const router = useRouter()
const { mergeRoutes } = useModuleRouter()

const discStore = useDictStore()
const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()
const walletStore = useWalletStore()
const campaignsStore = useCampaignsStore()

const streamer = computed(() => streamerStore.profile)
const isDictsFetching = computed(() => discStore.isFetching)

const fetchShortCampaigns = () => {
	if (![RouteName.CAMPAIGNS_LIVESTREAM, RouteName.CAMPAIGNS_PREROLL].includes(route.name as RouteName)) {
		if (settingsStore.widget && !campaignsStore.isFetchingActiveCampaigns) {
			campaignsStore.fetchActiveCampaignsShort()
		}
	}
}

const tallyFormManager = new TallyFormManager({
	formId: 'npNy2J',
	storageKey: 'tally_form_data',
	autoCloseTimeout: 30000,
	showDelay: 2000,
	layout: 'default',
	width: 360,
	hiddenFields: {
		user_id: streamer.value?.userId,
		channel_name: streamer.value?.username,
	},
})

onBeforeMount(async () => {
	await router.isReady()
	await mergeRoutes(streamerRouter)

	if (streamer.value?.deleted.isDeleted) {
		removeToken()
	}

	if (streamer.value?.deleted.isRequested) {
		router.push({ name: RouteName.DEACTIVATED })
		return
	}

	await settingsStore.fetchWidget()

	fetchShortCampaigns()

	walletStore.fetchWallet()

	tallyFormManager.updateHiddenFields({
		user_id: streamer.value?.userId,
		channel_name: streamer.value?.username,
	})

	tallyFormManager.showIfReady()
})

onBeforeUnmount(() => {
	tallyFormManager.destroy()
})

watch(() => route.name, () => {
	fetchShortCampaigns()
})

// TODO: remove isDictsFetching v-loading when all routes will have proper loading states with skeletons
</script>
