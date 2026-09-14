<template>
  <div
    data-name="debug-send-chatbot-message"
    class="shrink-0"
  >
    <ElButton
      :disabled="!widget?.enabled"
      :type="settingsStore.messagePreview.success ? 'success' : 'info'"
      :loading="settingsStore.messagePreview.sending"
      @click="settingsStore.sendMessagePreview"
    >
      <span class="_text-m-bold">
        {{ settingsStore.messagePreview.success ? 'Message sent' : 'Send message' }}
      </span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from '@/components/element-plus'
import type { IDebugWidget } from '@/modules/Debug/types'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const props = defineProps<{
  widget?: IDebugWidget | null
}>()

const settingsStore = useSettingsStore()
</script>
