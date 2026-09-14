<template>
  <div
    v-if="widget"
    id="settings-panel-obs"
  >
    <div class="_text-m-bold mb-2">
      {{ t('settings.panel.obsVersion.title') }}
    </div>

    <div class="_text-m-regular mb-4">
      {{ t('settings.panel.obsVersion.description') }}
    </div>

    <div class="relative mb-2 inline-block h-[48px] w-full overflow-hidden text-ellipsis rounded bg-primary-50 px-4 text-black after:absolute after:right-0 after:top-0 after:z-[1] after:h-full after:w-16 after:bg-gradient-to-r after:from-transparent after:to-primary-50 after:to-30%">
      <div
        class="_text-m-regular whitespace-nowrap !leading-[48px] text-dark-gray"
        :class="{'select-none blur-sm': blured}"
      >
        {{ widget.obsDockUrl }}
      </div>

      <div class="absolute right-4 top-0 z-[5] flex h-[48px] cursor-pointer select-none items-center">
        <EyeCloseIcon
          v-if="blured"
          class="h-4 w-4 cursor-pointer select-none"
          @click="blured=!blured"
        />

        <EyeIcon
          v-else
          class="h-4 w-4 cursor-pointer select-none"
          @click="blured=!blured"
        />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <ElButton
        data-test="settings-panel-obs-copy-btn"
        size="large"
        :type="copiedStatus ? 'success' : 'primary'"
        @click="copyLink"
      >
        <span class="_text-m-bold">{{ copiedStatus ? t('button.copyLink.success') : t('button.copyLink.static') }}</span>
      </ElButton>

      <ReloadButton
        @click="settingsStore.refreshObsLink"
        :loading="settingsStore.obsLink.sending"
      >
        {{ t('button.resetLink') }}
      </ReloadButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ReloadButton } from '@/components'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import EyeIcon from '@/assets/img/icons/eye.svg'
import EyeCloseIcon from '@/assets/img/icons/eye-close.svg'

const { t } = useLocale<typeof messages>(messages)

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const blured = ref(true)

const copyLink = () => {
	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	copy(widget.value?.obsDockUrl as string)
}

defineExpose({
	copyLink,
})
</script>
