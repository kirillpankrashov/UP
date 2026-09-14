<template>
  <DashboardSection
    id="settings-advert-settings"
    class="relative"
    v-if="widget"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('settings.advertSettings.title') }}
        <HelpIcon
          v-if="appStore.isMobile && showAdvice"
          @click="adviceRef?.toggleModal"
          class="inline-block h-4 w-4"
        />
      </div>
    </template>

    <div class="_text-m-regular mb-8">
      <div class="mb-2">
        {{ t('settings.advertSettings.description') }}
      </div>
      <TextLink
        :href="t('links.inStreamAdsFormat')"
        target="_blank"
      >
        {{ t('settings.advertSettings.moreAboutFormats') }}
      </TextLink>
    </div>

    <ElForm
      :label-position="'top'"
    >
      <div class="mb-8 grid gap-4 sm:grid-cols-2">
        <AdPlaybackMode />
        <BannerTimeout v-if="widget!.advertising.mode === AdvertisingMode.AUTO" />
        <ManualPlayback v-if="widget!.advertising.mode === AdvertisingMode.MANUAL" />
      </div>

      <BoxSize class="mb-8" />

      <div class="grid gap-4 sm:grid-cols-2">
        <AdvertisingPosition />
      </div>
    </ElForm>

    <Advice
      v-if="widget && showAdvice"
      ref="adviceRef"
      id="settings-widgetlink-advice"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      type="danger"
      :title="t('settings.advertSettings.advice.title')"
    >
      <div class="_text-m-regular">
        <p>{{ t('settings.advertSettings.advice.firstString') }}</p>
        <br><br>
        <p>{{ t('settings.advertSettings.advice.secondString') }}</p>
      </div>
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { AdvertisingMode } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice, TextLink } from '@/components'
import { ElForm } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import {
	AdPlaybackMode,
	AdvertisingPosition,
	BannerTimeout,
	BoxSize,
	ManualPlayback,
} from './sections'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const widget = computed(() => settingsStore.widget)
const showAdvice = computed(() => {
	if (!widget.value) {
		return false
	}
	return widget.value.advertising.mode === AdvertisingMode.MANUAL && (!widget.value.enabled || !widget.value.botEnabled || !widget.value.adManualEnabled)
})
</script>
