<template>
  <div
    id="dashboard-layout-sidebar-logout"
    class="relative flex h-5 items-center sm:mb-4"
    @click="logOut"
  >
    <LogoutIcon class="mr-[7px] h-4 w-4 fill-black transition-all" />
    <span class="_text-s-regular transition-all">
      {{ t('navigation.profile.logout') }}
    </span>
  </div>
</template>

<script setup lang=ts>
import { Api } from '@/core/client'
import { removeToken } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { messages } from '@/components/layouts/DashboardLayout/components/Sidebar/locales'

import LogoutIcon from '@/assets/img/icons/logout.svg'

const { t } = useLocale<typeof messages>(messages)

const logOut = async () => {
	await Api.clearCache()
	removeToken()
}
</script>
