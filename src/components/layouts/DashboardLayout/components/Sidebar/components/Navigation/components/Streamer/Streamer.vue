<template>
  <ul
    id="dashboard-layout-sidebar-navigation-streamer"
    class="-ml-3 mb-auto w-[calc(100%+24px)]"
  >
    <LinkItem
      :route="{name: RouteName.DASHBOARD}"
      :label="t('navigation.streamer.dashboard.title')"
      :icon="HomeIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      v-if="LINK_ENABLED"
      :route="{name: RouteName.LINK}"
      :label="t('navigation.streamer.freemium.title')"
      :icon="HeartIcon"
      :icon-class="'h-[16px] w-[18px]'"
      :beta="true"
      @toggle-menu="$emit('toggleMenu')"
      @click="onFreemiumClick"
    />

    <LinkItem
      v-if="!hasSubCampaigns"
      :route="{name: RouteName.CAMPAIGNS_LIVESTREAM}"
      :label="t('navigation.streamer.campaigns.title')"
      :icon-class="'h-[14px] w-[18px]'"
      :icon="CreativeIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      v-else
      :route="{name: RouteName.CAMPAIGNS_LIVESTREAM}"
      :label="t('navigation.streamer.campaigns.title')"
      :icon-class="'h-[14px] w-[18px]'"
      :icon="CreativeIcon"
      :is-active="campaignRoutes.includes(routeName)"
      @toggle-menu="$emit('toggleMenu')"
    >
      <ul v-if="campaignRoutes.includes(routeName)">
        <LinkSubItem
          :route="{name: RouteName.CAMPAIGNS_LIVESTREAM}"
          :label="t('navigation.streamer.campaigns.subitems.live')"
          :is-active="routeName === RouteName.CAMPAIGNS_LIVESTREAM"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          v-if="streamerStore.profile?.prerollActive"
          :route="{name: RouteName.CAMPAIGNS_PREROLL}"
          :label="t('navigation.streamer.campaigns.subitems.preroll')"
          :is-active="routeName === RouteName.CAMPAIGNS_PREROLL"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          v-if="streamerStore.profile?.specialProjectsActive"
          :route="{name: RouteName.CAMPAIGNS_SPECIAL_PROJECT}"
          :label="t('navigation.streamer.campaigns.subitems.special_project')"
          :is-active="routeName === RouteName.CAMPAIGNS_SPECIAL_PROJECT"
          @toggle-menu="$emit('toggleMenu')"
        />
      </ul>
    </LinkItem>

    <LinkItem
      :route="{name: RouteName.REFERRALS}"
      :label="t('navigation.streamer.referrals.title')"
      :icon-class="'h-[18px] w-[18px]'"
      :icon="StarIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      :route="{name: RouteName.WALLET}"
      :label="t('navigation.streamer.wallet.title')"
      :icon-class="'h-[17px] w-[17px]'"
      :icon="WalletIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      :route="{name: RouteName.SETTINGS}"
      :label="t('navigation.streamer.widget.title')"
      :icon-class="'h-[18px] w-[18px]'"
      :icon="GearIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      v-if="streamerStore.profile?.debugActive"
      :route="{name: RouteName.DEBUG, params: {apiVersion: 'v1', slug: settingsStore.widget?.slug}}"
      :label="t('navigation.streamer.debug.title')"
      :icon-class="'h-[16px] w-[16px]'"
      :icon="WrenchGearIcon"
      @toggle-menu="$emit('toggleMenu')"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { LINK_ENABLED } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'
import { RouteName } from '@/modules/Streamer/router'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import LinkItem from '../LinkItem/LinkItem.vue'
import LinkSubItem from '../LinkSubItem/LinkSubItem.vue'

import CreativeIcon from '@/assets/img/icons/creative.svg'
import GearIcon from '@/assets/img/icons/gear.svg'
import HeartIcon from '@/assets/img/icons/heart.svg'
import HomeIcon from '@/assets/img/icons/home.svg'
import StarIcon from '@/assets/img/icons/star-referrals.svg'
import WalletIcon from '@/assets/img/icons/wallet.svg'
import WrenchGearIcon from '@/assets/img/icons/wrench-gear.svg'

const { t } = useLocale<typeof messages>(messages)

defineEmits(['toggleMenu'])

const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()

const route = useRoute()
const routeName = computed(() => route.name as RouteName)

const hasSubCampaigns = computed(() => streamerStore.profile?.prerollActive || streamerStore.profile?.specialProjectsActive)

const campaignRoutes = computed(() => {
	const routes = [RouteName.CAMPAIGNS_LIVESTREAM]
	if (streamerStore.profile?.prerollActive) routes.push(RouteName.CAMPAIGNS_PREROLL)
	if (streamerStore.profile?.specialProjectsActive) routes.push(RouteName.CAMPAIGNS_SPECIAL_PROJECT)
	return routes
})

const onFreemiumClick = () => {
	if (import.meta.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		console.log('Intercom call', t('intercom.freemium'))
		return
	}
	window?.Intercom('showNewMessage', t('intercom.freemium'))
}
</script>

<style lang="scss" scoped>
.nav-item {
	@apply mb-1
}

.nav-link {
	@apply flex h-9 cursor-pointer items-center rounded-[4px] px-3 transition-all hover:bg-primary-50 no-underline
}

.nav-icon {
	@apply mr-[10px] flex w-[18px] items-center justify-center fill-black transition-all
}

.nav-label {
	@apply font-bold text-black transition-all
}

.nav-tag {
	@apply text-success ml-[12px] mr-[6px] flex rounded-[10px]
}
</style>
