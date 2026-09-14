<template>
  <div
    id="dashboard-layout-sidebar-profile-router-link"
    class="mx-[-12px] my-[-6px] block w-[calc(100%+24px)] cursor-pointer rounded-[4px] px-[12px] py-[6px] transition-all hover:bg-primary-50"
    :class="{'text-primary-100': route.name === StreamerRouteName.PROFILE}"
  >
    <div class="flex items-center">
      <div class="h-10 w-10 shrink-0">
        <div
          v-if="role === Role.STREAMER && avatar"
          class="h-10 w-10 rounded-full border-[1px] border-dark-gray bg-white bg-cover bg-center bg-no-repeat transition-all"
          :style="`background-image: url(${avatar})`"
        />
        <div
          v-else
          class="_text-m-bold flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all"
        >
          {{ initials }}
        </div>
      </div>

      <div class="w-[calc(100%-40px-16px)] pl-[8px]">
        <div class="_text-s-regular mb-[2px] max-w-full truncate text-primary transition-all">
          {{ user?.username }}
        </div>
        <div class="_text-caption-caps text-light-gray">
          {{ role }}
        </div>
      </div>

      <ArrowIcon class="h-4 w-4 shrink-0 fill-gray" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Role } from '@/core/types'
import { useAppStore } from '@/core/store'
import { RouteName as StreamerRouteName } from '@/modules/Streamer/router'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import ArrowIcon from '@/assets/img/icons/chevron-right.svg'

const route = useRoute()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const auth = computed(() => appStore.auth)
const widget = computed(() => settingsStore.widget)

const user = computed(() => auth.value.user)
const role = computed(() => auth.value.role)

const avatar = computed(() => {
	const platform = widget.value?.platform

	if (!platform || !user.value || !('platforms' in user.value)) {
		return null
	}

	return user.value?.platforms[platform]?.avatar
})

const initials = computed(() => {
	const names = user.value?.username.split(' ')

	if (!names) {
		return ''
	}

	let initials = names[0].charAt(0).toUpperCase()

	if (names[1]) {
		initials += names[1].charAt(0).toUpperCase()
	}

	return initials
})
</script>
