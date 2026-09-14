<template>
  <div
    v-if="widget"
    data-name="panel-box-size"
    class="mb-8"
  >
    <div class="mb-4 flex justify-between">
      <div class="_text-s-regular text-gray">
        {{ t('panel.settings.advertSettings.adsBlocksCountTitle') }}
      </div>
      <div class="_text-s-regular text-gray">
        {{ t('panel.settings.advertSettings.adsBlocksCountDuration', { seconds: widget.boxSize * 15 }) }}
      </div>
    </div>

    <div class="widget-box-size__range">
      <div class="h-[2px] border-b-[2px] border-b-lightest-gray pt-[38px]" />
      <div class="ml-[-8px] flex w-[calc(100%+16px)] justify-between">
        <span
          v-for="item in items"
          :data-test="`box-size-${item}`"
          :key="item"
          class="relative mt-[-39px] block w-[24px] cursor-pointer pb-[18px] text-center transition before:absolute before:left-[calc(50%-4px)] before:top-[34px] before:h-[8px] before:w-[8px] before:rounded-full before:bg-lightest-gray before:transition"
          :class="{'_active-size text-primary before:bg-white before:ring-8 before:ring-primary': item === widget.boxSize}"
          @click="widget!.boxSize = item"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { WIDGET_BOX_SIZE_MAX, WIDGET_BOX_SIZE_MIN } from '@/core/consts'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Panel/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const items = computed(() => {
	const result = []
	for (let i = WIDGET_BOX_SIZE_MIN; i <= WIDGET_BOX_SIZE_MAX; i++) {
		result.push(i)
	}
	return result
})
</script>
