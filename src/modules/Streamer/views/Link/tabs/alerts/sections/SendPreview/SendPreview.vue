<template>
  <DashboardSection
    id="streamer-link-alerts-demo"
    data-name="streamer-link-alerts-demo"
    :title="t('link.alerts.alertPreview.title')"
    :no-border="true"
  >
    <div class="_text-m-regular mb-6">
      {{ t('link.alerts.alertPreview.description') }}
    </div>

    <ElButton
      data-test="streamer-link-alerts-demo-btn"
      size="large"
      plain
      class="mt-4 w-full sm:max-w-[220px]"
      :type="success ? 'success' : 'primary'"
      :loading="sending || success"
      @click="() => sendTest()"
    >
      <span class="_text-m-bold">{{ success ? t('button.sendPreview.success') : t('link.alerts.alertPreview.sendTest') }}</span>
    </ElButton>
  </DashboardSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkAlertsStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const alertsStore = useLinkAlertsStore()

const sending = ref(false)
const success = ref(false)

const sendTest = async () => {
	sending.value = true

	try {
		await alertsStore.requestDemo()

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 1500)
	}
	finally {
		sending.value = false
	}
}

defineExpose({
	sendTest,
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
