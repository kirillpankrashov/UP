<template>
  <DashboardSection
    id="streamer-link-goal"
    data-name="streamer-link-goal"
    data-test="streamer-link-goal"
    :title="t('link.setup.goal.title')"
  >
    <div class="_text-m-regular mb-6">
      {{ t('link.setup.goal.description') }}
    </div>

    <ElButton
      v-if="!goal"
      data-test="streamer-link-goal-btn"
      size="large"
      type="primary"
      class="w-full sm:max-w-[220px]"
      @click="formRef?.openForm"
    >
      <span class="_text-m-bold">{{ t('link.setup.goal.addGoal') }}</span>
    </ElButton>

    <LinkProgressCard
      v-if="goal"
      :title="goal.title"
      :items="[progressText]"
      :footer-text="goal.description"
      @on-edit="formRef?.openForm"
      @on-delete="setupStore.deleteGoal()"
    />

    <GoalForm ref="formRef" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'
import { LinkProgressCard } from '@/modules/Streamer/views/Link/tabs/setup/components'

import { GoalForm } from './sections'

const { t } = useLocale<typeof messages>(messages)

const formRef = ref<InstanceType<typeof GoalForm> | null>(null)

const setupStore = useLinkSetupStore()

const goal = computed(() => setupStore.goal)

const progressText = computed(() => {
	const totalEarned = +(goal.value?.start || 0) + +(goal.value?.progress || 0)

	return {
		textLeft: `${totalEarned} of ${goal.value?.total} reached!`,
		progressPercent: Math.floor(totalEarned / (goal.value?.total || 0) * 100),
	}
})

defineExpose({
	progressText,
})
</script>
