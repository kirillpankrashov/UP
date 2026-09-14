<template>
  <div id="profile-deactivation">
    <DashboardSection>
      <template #left>
        <div
          class="_text-m-bold"
          v-html="t('profile.deactivation.title')"
        />
      </template>

      <div
        class="_text-m-regular mb-4"
        v-html="t('profile.deactivation.textBlock1')"
      />
      <div
        class="_text-m-regular"
        v-html="t('profile.deactivation.textBlock2', { date: daysLeft })"
      />

      <div class="mt-6 grid gap-2 sm:grid-cols-2">
        <ElButton
          type="danger"
          :size="'large'"
          @click="toggleDrawer"
        >
          <span class="_text-m-bold">{{ t('profile.deactivation.deactivateBtn') }}</span>
        </ElButton>
      </div>
    </DashboardSection>

    <ElDrawer
      :before-close="toggleDrawer"
      v-model="drawerActive"
      direction="rtl"
      :size="!appStore.isMobile ? '560px' : '100%'"
    >
      <template #header>
        <div>
          <div
            class="_headline-2 mb-3 pt-1"
            v-html="t('profile.deactivation.drawer.title')"
          />
          <div
            class="_text-m-regular"
            v-html="t('profile.deactivation.drawer.subtitle')"
          />
        </div>
      </template>

      <div class="_text-m-regular mb-4">
        <strong v-html="t('profile.deactivation.drawer.textBlock1')" />
      </div>

      <div class="_text-m-regular">
        <ol class="list-decimal pl-4">
          <li
            class="mb-2"
            v-for="text, index in tm('profile.deactivation.drawer.textBlock2')"
            :key="index"
            v-html="text"
          />
        </ol>
      </div>

      <div
        class="_text-m-regular"
        v-html="t('profile.deactivation.drawer.textBlock3')"
      />

      <div class="mt-6 grid gap-2 sm:grid-cols-2">
        <ElButton
          data-test="delete-profile-button"
          type="danger"
          :size="'large'"
          :loading="loading"
          @click="deleteProfile"
        >
          <span class="_text-m-bold">{{ t('profile.deactivation.drawer.confirmBtn') }}</span>
        </ElButton>

        <ElButton
          type="primary"
          :size="'large'"
          :loading="loading"
          @click="toggleDrawer"
          plain
        >
          <span class="_text-m-bold">{{ t('profile.deactivation.drawer.cancelBtn') }}</span>
        </ElButton>
      </div>
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'

import { Locale } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElButton, ElDrawer } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Profile/locales'
import { deleteProfileHandler } from '@/modules/Streamer/views/Profile/sections/Deactivation/helpers'

const { t, tm } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const loading = ref(false)
const drawerActive = ref(false)

const currentLocale = computed<Locale>(() => appStore.appLocale as Locale)

const daysLeft = computed(() => {
	return moment().locale(currentLocale.value).add(40, 'days').format('LL')
})

const toggleDrawer = () => {
	drawerActive.value = !drawerActive.value
}

const deleteProfile = async () => {
	loading.value = true

	try {
		await deleteProfileHandler()
	}
	finally {
		loading.value = false
	}
}
</script>
