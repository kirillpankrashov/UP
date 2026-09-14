<template>
  <ElDialog
    v-model="model"
    :append-to-body="true"
    :before-close="onDialogClose"
    :show-close="false"
    :modal-class="'relogin-message'"
  >
    <div class="break-normal">
      <div class="_text-caption-caps mb-2 uppercase text-danger">
        {{ t('streamer.label') }}
      </div>

      <div class="_headline-2 mb-6 uppercase">
        {{ t('streamer.title', { platform: appStore.domain?.name }) }}
      </div>

      <div class="_text-m-regular mb-4">
        {{ t('streamer.description') }}
      </div>

      <ElButton
        class="w-full"
        :size="'large'"
        type="primary"
        @click="onDialogClose"
      >
        <span class="_text-m-bold">{{ t('streamer.button') }}</span>
      </ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { removeToken } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElButton, ElDialog } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/components/ReloginMessage/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const model = computed(() => settingsStore.widget?.relogin || false)

const onDialogClose = () => {
	removeToken()
}
</script>

<style lang="scss">
.relogin-message {
	@apply p-10;

  .el-dialog {
    @apply w-full max-w-[292px];

    &__header {
      @apply hidden;
    }
  }
}
</style>
