<template>
  <div
    v-if="widget"
    id="settings-panel-mobile"
    class="mb-8 grid gap-4 sm:grid-cols-2"
  >
    <div>
      <div class="aspect-square w-full overflow-hidden rounded border border-light-gray sm:max-w-[200px]">
        <VueQr
          data-test="qr"
          class="relative w-full origin-[0_0] p-3 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gray"
          :class="{'_qr-blured blur-md': blured}"
          :text="widget.obsDockUrl"
          :margin="0"
        />
      </div>
    </div>

    <div>
      <div class="_text-m-bold mb-2">
        {{ t('settings.panel.mobileVersion.title') }}
      </div>

      <div class="_text-m-regular">
        {{ t('settings.panel.mobileVersion.description') }}
      </div>

      <ElButton
        data-test="panel-mobile-blur-btn"
        class="mt-6 w-full"
        type="primary"
        size="large"
        @click="blured = !blured"
      >
        <span class="_text-m-bold">{{ blured ? t('button.showQR') : t('button.hideQR') }}</span>
      </ElButton>

      <ReloadButton
        @click="settingsStore.refreshObsLink"
        :loading="settingsStore.obsLink.sending"
        class="mt-5 w-full"
      >
        {{ t('button.resetQR') }}
      </ReloadButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

import { useLocale } from '@/core/hooks'
import { ReloadButton } from '@/components'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const blured = ref(true)
</script>
