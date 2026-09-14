<template>
  <ul
    id="dashboard-layout-sidebar-navigation-partner"
    class="-ml-3 mb-auto w-[calc(100%+24px)]"
  >
    <LinkItem
      :route="{name: RouteName.BRAND_AWARENESS_CAMPAIGNS}"
      :label="t('navigation.partner.campaigns.title')"
      :icon-class="'h-[14px] w-[18px]'"
      :icon="CreativeIcon"
      :is-active="isCampaignsActive"
      @toggle-menu="$emit('toggleMenu')"
    >
      <ul v-if="isCampaignsActive">
        <LinkSubItem
          :route="{name: RouteName.BRAND_AWARENESS_CAMPAIGNS}"
          :label="t('navigation.partner.campaigns.subitems.brand-awareness')"
          :is-active="[RouteName.BRAND_AWARENESS_CAMPAIGNS, RouteName.BRAND_AWARENESS_ADSETS, RouteName.BRAND_AWARENESS_CREATIVES].includes(routeName)"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          :route="{name: RouteName.PERFORMANCE_CAMPAIGNS}"
          :label="t('navigation.partner.campaigns.subitems.performance')"
          :is-active="[RouteName.PERFORMANCE_CAMPAIGNS, RouteName.PERFORMANCE_ADSETS].includes(routeName)"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          :route="{name: RouteName.PREROLL_CAMPAIGNS}"
          :label="t('navigation.partner.campaigns.subitems.preroll')"
          :is-active="[RouteName.PREROLL_CAMPAIGNS, RouteName.PREROLL_ADSETS].includes(routeName)"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          :route="{name: RouteName.EXTENSION_CAMPAIGNS}"
          :label="t('navigation.partner.campaigns.subitems.extension')"
          :is-active="[RouteName.EXTENSION_CAMPAIGNS, RouteName.EXTENSION_ADSETS, RouteName.EXTENSION_CREATIVES].includes(routeName)"
          @toggle-menu="$emit('toggleMenu')"
        />
        <LinkSubItem
          :route="{name: RouteName.SPECIAL_PROJECT_CAMPAIGNS}"
          :label="t('navigation.partner.campaigns.subitems.special_project')"
          :is-active="[RouteName.SPECIAL_PROJECT_CAMPAIGNS, RouteName.SPECIAL_PROJECT_ADSETS, RouteName.SPECIAL_PROJECT_CREATIVES].includes(routeName)"
          @toggle-menu="$emit('toggleMenu')"
        />
      </ul>
    </LinkItem>

    <LinkItem
      :route="{name: RouteName.SEGMENTS}"
      :label="t('navigation.partner.segments.title')"
      :icon-class="'h-[17px] w-[17px]'"
      :icon="PieChartIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      :route="{name: RouteName.ADVERTISERS}"
      :label="t('navigation.partner.advertisers.title')"
      :icon-class="'h-[17px] w-[17px]'"
      :icon="WalletIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      :route="{name: RouteName.AGENCY}"
      :label="t('navigation.partner.creators.title')"
      :icon-class="'h-[18px] w-[18px]'"
      :icon="StarIcon"
      @toggle-menu="$emit('toggleMenu')"
    />

    <LinkItem
      v-if="partnerStore.profile?.debugActive"
      :route="{name: RouteName.DEBUG}"
      :label="t('navigation.partner.debug.title')"
      :icon-class="'h-[16px] w-[16px]'"
      :icon="WrenchGearIcon"
      @toggle-menu="$emit('toggleMenu')"
    />
  </ul>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'
import { RouteName } from '@/modules/Partner/router'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import LinkItem from '../LinkItem/LinkItem.vue'
import LinkSubItem from '../LinkSubItem/LinkSubItem.vue'

import PieChartIcon from '@/assets/img/icons/analytics.svg'
import CreativeIcon from '@/assets/img/icons/creative.svg'
import StarIcon from '@/assets/img/icons/star-referrals.svg'
import WalletIcon from '@/assets/img/icons/wallet.svg'
import WrenchGearIcon from '@/assets/img/icons/wrench-gear.svg'

const { t } = useLocale<typeof messages>(messages)

defineEmits(['toggleMenu'])

const route = useRoute()

const partnerStore = usePartnerStore()

const routeName = computed(() => route.name as RouteName)

const isCampaignsActive = computed(() => {
	return [
		RouteName.BRAND_AWARENESS_CAMPAIGNS,
		RouteName.BRAND_AWARENESS_ADSETS,
		RouteName.BRAND_AWARENESS_CREATIVES,
		RouteName.PERFORMANCE_CAMPAIGNS,
		RouteName.PERFORMANCE_ADSETS,
		RouteName.PREROLL_CAMPAIGNS,
		RouteName.PREROLL_ADSETS,
		RouteName.EXTENSION_CAMPAIGNS,
		RouteName.EXTENSION_ADSETS,
		RouteName.EXTENSION_CREATIVES,
		RouteName.SPECIAL_PROJECT_CAMPAIGNS,
		RouteName.SPECIAL_PROJECT_ADSETS,
		RouteName.SPECIAL_PROJECT_CREATIVES,
	].includes(routeName.value)
})
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
