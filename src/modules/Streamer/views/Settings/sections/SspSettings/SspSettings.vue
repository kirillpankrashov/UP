<template>
  <DashboardSection
    v-if="widget && campaignsList.length"
    id="settings-ssp-section"
    class="relative"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('settings.ssp.title') }}
        <HelpIcon
          v-if="appStore.isMobile"
          @click="adviceRef?.toggleModal"
          class="inline-block h-4 w-4 fill-dark-gray"
        />
      </div>
    </template>

    <div class="_text-m-regular mb-8">
      {{ t('settings.ssp.description') }}
    </div>

    <ElForm
      :label-position="'top'"
    >
      <SspMedia />
      <SspText />
    </ElForm>

    <Advice
      v-if="widget"
      ref="adviceRef"
      id="settings-ssp-advice"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      type="hint"
      :title="t('settings.ssp.advice.title')"
    >
      <div class="_text-m-regular">
        <p v-html="t('settings.ssp.advice.lines')" />
      </div>
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { AdsetStatus } from '@/core/types'
import { isExternalFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice } from '@/components'
import { ElForm } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import {
	SspMedia,
	SspText,
} from './sections'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const campaignsStore = useCampaignsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const widget = computed(() => settingsStore.widget)

const campaignsList = computed(() => ([
	...campaignsStore.activeCampaignsShort.data.active.filter(campaign => isExternalFormat(campaign.format) && campaign.status === AdsetStatus.ACTIVE),
	...campaignsStore.activeCampaignsShort.data.inactive.filter(campaign => isExternalFormat(campaign.format) && campaign.status === AdsetStatus.INACTIVE),
]))
</script>
