<template>
  <div
    id="streamer-link-alerts"
    data-name="streamer-link-alerts"
    v-loading="alertsStore.isLoadingData"
  >
    <ElForm
      :model="model"
      v-if="alerts"
      label-position="top"
    >
      <SendPreview />
      <Supporters v-model="model" />
      <Goal v-model="model" />
      <Poll v-model="model" />
      <Chatbot v-model="model" />
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'

import { ChatbotFrequency, type ILinkAlerts,LinkCardPosition, SupporterAlertDuration } from '@/core/types/link'
import { ElForm } from '@/components/element-plus'
import { useLinkAlertsStore } from '@/modules/Streamer/views/Link/store'

import { Chatbot, Goal, Poll, SendPreview, Supporters } from './sections'

const alertsStore = useLinkAlertsStore()
const alerts = computed(() => alertsStore.data)

const model = reactive<ILinkAlerts>({
	chatbotFrequency: ChatbotFrequency.DISABLED,
	goalPosition: LinkCardPosition.DISABLED,
	pollPosition: LinkCardPosition.DISABLED,
	supporterAlertDuration: SupporterAlertDuration.EVERY_10_SEC,
	supporterAlertPosition: LinkCardPosition.DISABLED,
})

watch(model, async (value) => {
	if (!alertsStore.isBootsraped) {
		return
	}

	await alertsStore.updateAlerts(value)
})

watch(alerts, (value) => {
	Object.assign(model, value)
})

onMounted(() => {
	alertsStore.fetchAlerts()
})

defineExpose({
	model,
})
</script>
