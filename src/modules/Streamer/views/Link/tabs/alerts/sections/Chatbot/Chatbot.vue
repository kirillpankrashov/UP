<template>
  <DashboardSection
    id="streamer-link-alerts-chatbot"
    data-name="streamer-link-alerts-chatbot"
    :title="t('link.alerts.chatAlert')"
  >
    <div class="flex items-center justify-between">
      <div class="_text-s-regular text-gray">
        {{ t('link.alerts.preview') }}
      </div>

      <router-link :to="{name: RouteName.SETTINGS}">
        <TextLink class="no-underline">
          {{ t('link.alerts.chatBotReminder') }}
        </TextLink>
      </router-link>
    </div>

    <div class="mb-6 mt-2 rounded bg-[#4d4d4d] p-4">
      <img
        class="w-full max-w-[260px]"
        src="@/assets/img/freemium/chat-alert.png"
      >
    </div>

    <div class="alerts-section__controls">
      <ElFormItem>
        <ElSelect
          v-model="modelValue.chatbotFrequency"
          size="large"
        >
          <ElOption
            :label="t('link.chatbotMsgInterval.every15mins')"
            :value="ChatbotFrequency.EVERY_15_MIN"
          />
          <ElOption
            :label="t('link.chatbotMsgInterval.every30mins')"
            :value="ChatbotFrequency.EVERY_30_MIN"
          />
          <ElOption
            :label="t('link.chatbotMsgInterval.everyHour')"
            :value="ChatbotFrequency.EVERY_HOUR"
          />
          <ElOption
            :label="t('link.chatbotMsgInterval.disabled')"
            :value="ChatbotFrequency.DISABLED"
          />
        </ElSelect>
      </ElFormItem>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { ChatbotFrequency, type ILinkAlerts } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Streamer/router'
import { messages } from '@/modules/Streamer/views/Link/locales'

const { t } = useLocale<typeof messages>(messages)

const modelValue = defineModel<ILinkAlerts>({
	required: true,
})
</script>
