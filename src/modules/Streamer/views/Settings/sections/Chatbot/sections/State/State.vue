<template>
  <div id="settings-chatbot-state">
    <div class="grid gap-4 sm:grid-cols-2">
      <ElButton
        type="primary"
        :size="'large'"
        :loading="settingsStore.togglingChatbot"
        @click="settingsStore.toggleChatbot"
      >
        <span class="_text-m-bold">{{ isConnected ? t('settings.chatbot.disconnectNightbot') : t('settings.chatbot.connectNightbot') }}</span>
      </ElButton>

      <template v-if="isConnected">
        <ElButton
          v-if="isModerator"
          :loading="sendingMessage.sending"
          :type="sendingMessage.success ? 'success' : 'primary'"
          :size="'large'"
          @click="settingsStore.sendMessagePreview"
          plain
        >
          <span class="_text-m-bold">{{ sendingMessageBtnText }}</span>
        </ElButton>

        <ElButton
          v-else
          class="widget-chatbot-check"
          type="text"
          :size="'large'"
          @click="settingsStore.checkChatbot"
        >
          <div
            class="mr-2"
            :class="{'animate-spin': settingsStore.checkingChatbot}"
          >
            <RefreshIcon class="h-3 w-3 fill-primary" />
          </div>
          <span class="_text-m-regular">{{ t('settings.chatbot.checkChatbot') }}</span>
        </ElButton>
      </template>
    </div>

    <ElAlert
      v-if="isConnected && !isModerator"
      class="!mt-2"
      :title="t('settings.attention.chatbotDisabled.reasons.addChatbotAsModerator')"
      type="error"
      show-icon
      :closable="false"
    />
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElAlert, ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import RefreshIcon from '@/assets/img/icons/refresh.svg'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const isModerator = computed(() => {
	if (!widget.value) {
		return false
	}

	return widget.value.nightbot[widget.value.platform].moderator
})
const isConnected = computed(() => {
	if (!widget.value) {
		return false
	}

	return widget.value.nightbot[widget.value.platform].connected
})
const sendingMessage = computed(() => settingsStore.messagePreview)

const sendingMessageBtnText = computed(() => {
	if (settingsStore.messagePreview.success) {
		return t('settings.chatbot.messageSent')
	}
	if (!settingsStore.messagePreview.sending) {
		return t('settings.chatbot.sendMessage')
	}
	return null
})
</script>
