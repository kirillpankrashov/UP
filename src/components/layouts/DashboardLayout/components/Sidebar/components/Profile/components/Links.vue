<template>
  <div
    id="dashboard-layout-sidebar-profile-links"
    @click="$emit('click')"
  >
    <router-link
      v-if="appStore.auth.role === Role.STREAMER && !('deleted' in user && user.deleted.isRequested)"
      :to="{name: StreamerRouteName.PROFILE}"
      class="group mb-4 flex cursor-pointer items-center no-underline"
    >
      <UserIcon class="mr-2 h-4 w-4 fill-black transition-all group-hover:fill-primary" />
      <div class="_text-m-regular transition-all group-hover:text-primary">
        {{ t('navigation.profile.settings') }}
      </div>
    </router-link>

    <a
      v-if="appStore.auth.role === Role.PARTNER"
      :href="partnerRoutesMap.get(PartnerRouteName.PROFILE)"
      class="group mb-4 flex cursor-pointer items-center no-underline"
    >
      <UserIcon class="mr-2 h-4 w-4 fill-black transition-all group-hover:fill-primary" />
      <div class="_text-m-regular transition-all group-hover:text-primary">
        {{ t('navigation.profile.settings') }}
      </div>
    </a>

    <!-- <router-link
      v-if="appStore.auth.role === Role.PARTNER"
      :to="{name: PartnerRouteName.PROFILE}"
      class="group mb-4 flex cursor-pointer items-center no-underline"
    >
      <UserIcon class="mr-2 h-4 w-4 fill-black transition-all group-hover:fill-primary" />
      <div class="_text-m-regular transition-all group-hover:text-primary">
        {{ t('navigation.profile.settings') }}
      </div>
    </router-link> -->

    <div
      class="group flex cursor-pointer items-center"
      @click="logOut"
    >
      <LogoutIcon class="mr-2 h-4 w-4 fill-black transition-all group-hover:fill-primary" />
      <div class="_text-m-regular transition-all group-hover:text-primary">
        {{ t('navigation.profile.logout') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Role, type TPartner, type TStreamer } from '@/core/types'
import { Api } from '@/core/client'
import { removeToken } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'
import { RouteName as PartnerRouteName, routesMap as partnerRoutesMap } from '@/modules/Partner/router'
import { RouteName as StreamerRouteName } from '@/modules/Streamer/router'

import LogoutIcon from '@/assets/img/icons/logout.svg'
import UserIcon from '@/assets/img/icons/user.svg'

defineEmits(['click'])

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const user = computed(() => {
	if (appStore.auth.role === Role.STREAMER) {
		return appStore.auth.user as TStreamer
	}

	return appStore.auth.user as TPartner
})

const logOut = async () => {
	await Api.clearCache()
	removeToken()
}
</script>
