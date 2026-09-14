<template>
  <DashboardSection
    v-if="panels.length"
    id="referrals-panels-section"
    data-test="referrals-panels-section"
    :title="t('referrals.panels.title')"
  >
    <div class="_text-m-regular">
      {{ t('referrals.panels.description') }}
    </div>

    <div class="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
      <div
        data-test="referrals-panel"
        class="group relative cursor-pointer overflow-hidden"
        v-for="panel in panels"
        :key="panel.title"
        @click="open(panel.src)"
      >
        <img
          class="h-auto w-full"
          :src="panel.path"
        >

        <div class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden rounded opacity-0 transition group-hover:opacity-100">
          <div class="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50" />
          <div class="relative z-20 flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full bg-white transition group-hover:translate-y-0">
            <DownloadIcon class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Referrals/locales'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import DownloadIcon from '@/assets/img/icons/download.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const referralsStore = useReferralsStore()

const appLocale = computed(() => appStore.appLocale)
const panels = computed(() => referralsStore.panels)

const open = (src: string) => {
	window.open(src)
}

onMounted(() => {
	if (!panels.value.length) {
		referralsStore.fetchPanels(appLocale.value)
	}
})

watch(appLocale, () => {
	referralsStore.fetchPanels(appLocale.value)
})
</script>
