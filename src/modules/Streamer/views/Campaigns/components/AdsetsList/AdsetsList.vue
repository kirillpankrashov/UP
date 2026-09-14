<template>
  <div>
    <DashboardSection
      data-test="campaigns-adsets-list"
      class="relative"
      :no-left="true"
      :no-border="true"
      :collapsable="!!title"
    >
      <template #left>
        <div class="sm:flex">
          <div class="_text-m-bold shrink-0 sm:w-60">
            {{ title }}
            <HelpIcon
              v-if="appStore.isMobile && hint"
              data-test="campaigns-adsets-list-hint-icon"
              @click="$emit('toggleHint')"
              class="inline-block h-4 w-4 fill-dark-gray"
            />
          </div>

          <div
            v-if="!appStore.isMobile"
            class="_text-m-regular"
          >
            {{ description }}
          </div>
        </div>
      </template>

      <div
        v-if="appStore.isMobile"
        class="_text-m-regular"
      >
        {{ description }}
      </div>

      <slot name="hint" />

      <AdsetCard
        v-for="adset in adsets"
        :key="adset.id"
        :adset="adset"
      />

      <div
        v-if="!adsets.length"
        class="_headline-2 mt-10 text-center text-lightest-gray"
      >
        {{ emptyTitle }}
      </div>
    </DashboardSection>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { random } from 'lodash'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'

import { AdsetCard } from '../'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { tm } = useLocale<typeof messages>(messages)

defineProps<{
  title?: string
  description?: string
  adsets: IAdset[]
	hint?: boolean
	loading?: boolean
}>()

defineEmits(['toggleHint'])

const appStore = useAppStore()

const emptyTitle = computed(() => {
	const titles = tm('campaigns.none')
	if (Array.isArray(titles)) {
		const randomIdx = random(0, titles.length - 1)
		return titles[randomIdx]
	}
	return ''
})
</script>
