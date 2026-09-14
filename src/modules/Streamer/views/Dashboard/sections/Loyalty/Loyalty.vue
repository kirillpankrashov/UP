<template>
  <div
    v-if="dashboardStore.tier.data"
    id="dashboard-loyalty"
    class="relative border-t border-light-gray py-8"
    v-loading="dashboardStore.isFetchingTier"
  >
    <Advice
      v-if="!dashboardStore.isFetchingTier"
      ref="adviceRef"
      type="primary"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="t('dashboard.levels.advice.title')"
      :label="t('dashboard.levels.advice.label')"
    >
      <p class="_text-m-regular">
        {{ t('dashboard.levels.advice.description') }}
      </p>

      <TextLink :href="t('dashboard.levels.advice.link.url')">
        {{ t('dashboard.levels.advice.link.text') }}
      </TextLink>
    </Advice>

    <div class="items-center justify-between sm:flex">
      <h2 class="_headline-2 mb-2 !font-normal sm:mb-0">
        {{ t('dashboard.levels.heading') }}
        <HelpIcon
          v-if="appStore.isMobile"
          @click="adviceRef?.toggleModal"
          class="inline-block h-4 w-4 fill-primary"
        />
      </h2>

      <div
        data-test="dashboard-loyalty-updated"
        class="_text-s-regular"
      >
        {{ current?.updated.text }} {{ current?.updated.date }}
      </div>
    </div>

    <Progress />
    <Metrics />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice, TextLink } from '@/components'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

import { Metrics, Progress } from './sections'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const dashboardStore = useDashboardStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const current = computed(() => dashboardStore.tier?.data?.current)
</script>
