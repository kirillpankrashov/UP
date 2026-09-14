<template>
  <div
    id="dashboard-layout-sidebar"
    class="relative left-0 top-0 z-[15] flex w-full flex-col justify-between bg-background p-[20px] sm:fixed sm:z-[5] sm:h-screen sm:w-[200px] sm:px-[24px] sm:pb-[28px] sm:pt-[34px] sm:shadow-xl"
    :class="{'h-screen overflow-auto sm:h-auto': menuActive}"
  >
    <div class="z-[15] flex items-center justify-between sm:block">
      <AppLogo />
      <button
        class="inline-block h-6 w-6 border-none bg-transparent sm:hidden"
        @click="toggleMenu"
      >
        <MenuIcon
          v-if="!menuActive"
          class="h-6 w-6 fill-[var(--el-text-color-regular)]"
        />
        <CloseIcon
          v-else
          class="h-6 w-6 fill-[var(--el-text-color-regular)]"
        />
      </button>
    </div>

    <div
      class="hidden flex-1 flex-col justify-between pt-9 sm:flex sm:pt-0"
      :class="{'!flex': menuActive}"
    >
      <Navigation @toggle-menu="toggleMenu" />

      <div class="mt-auto pt-20 sm:pt-0">
        <RequestDemo v-if="appStore.auth.role === Role.PARTNER" />

        <Profile @toggle-menu="toggleMenu" />

        <div class="my-3 w-full border-t border-t-light-gray" />

        <Links />

        <div class="my-3 w-full border-t border-t-light-gray" />

        <div v-show="!appStore.isMobile">
          <Socials />
          <div class="my-3 w-full border-t border-t-light-gray" />
        </div>

        <div class="grid grid-cols-2 items-center gap-[18px] sm:block">
          <ThemeSwitcher class="sm:mb-3" />
          <LocaleSwitcher class="ml-[-7px] sm:mb-[-10px] sm:mt-[-14px]" />
          <LogoutButton v-show="appStore.isMobile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

import { Role } from '@/core/types'
import { useAppStore } from '@/core/store'
import { LocaleSwitcher, ThemeSwitcher } from '@/components'

import {
	AppLogo,
	Links,
	LogoutButton,
	Navigation,
	Profile,
	RequestDemo,
	Socials,
} from './components'

import CloseIcon from '@/assets/img/icons/close-menu-icon.svg'
import MenuIcon from '@/assets/img/icons/menu-icon.svg'

const appStore = useAppStore()
const menuActive = ref(false)

const toggleMenu = () => {
	if (!appStore.isMobile) return

	menuActive.value = !menuActive.value;
	(document.querySelector('html') as HTMLElement).style.overflow = menuActive.value ? 'hidden' : 'auto';
	(document.querySelector('body') as HTMLElement).style.overflow = menuActive.value ? 'hidden' : 'auto'
}
</script>
