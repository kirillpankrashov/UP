<template>
  <DashboardSection
    id="streamer-link-poll"
    data-name="streamer-link-poll"
    data-test="streamer-link-poll"
    :title="t('link.setup.poll.title')"
  >
    <div class="_text-m-regular mb-6">
      {{ t('link.setup.poll.description') }}
    </div>

    <ElButton
      v-if="!poll"
      data-test="streamer-link-poll-btn"
      size="large"
      type="primary"
      class="w-full sm:max-w-[220px]"
      @click="formRef?.openForm"
    >
      <span class="_text-m-bold">{{ t('link.setup.poll.addPoll') }}</span>
    </ElButton>

    <LinkProgressCard
      v-if="poll"
      :title="poll.question"
      :items="items"
      :footer-text="footerText"
      @on-edit="formRef?.openForm"
      @on-delete="setupStore.deletePoll()"
    />

    <PollForm ref="formRef" />
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { ref } from 'vue'

import { LinkPollEndCondition } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'
import { LinkProgressCard } from '@/modules/Streamer/views/Link/tabs/setup/components'

import { PollForm } from './sections'

const { t } = useLocale<typeof messages>(messages)

const formRef = ref<InstanceType<typeof PollForm> | null>(null)

const setupStore = useLinkSetupStore()

const poll = computed(() => setupStore.poll)

const results = computed(() => {
	return setupStore.poll?.answers.map(answer => answer?.votes || 0) || null
})

const totalVotes = computed(() => results.value ? results.value?.reduce((a, b) => a + b, 0) : null)
const votesLeft = computed(() => {
	const votes = (poll.value?.maxVotes || 0) - (totalVotes.value || 0)

	return votes > 0 ? votes : 0
})

const pollInterval = ref()

const items = computed(() => {
	if (!poll.value?.answers) return []

	return poll.value.answers.map((answer, index) => {
		if (!totalVotes.value || !results.value) {
			return {
				textLeft: answer.answer,
				textRight: '',
				progressPercent: 0,
			}
		}
		const votes = results.value[index]
		let progressPercent = 0
		let textRight = ''

		if (poll.value?.endCondition === LinkPollEndCondition.DURATION) {
			progressPercent = Math.round(votes / totalVotes.value * 100)
			textRight = progressPercent + '%'

		}

		if (poll.value?.endCondition === LinkPollEndCondition.VOTES) {
			progressPercent = Math.floor(votes / poll.value.maxVotes * 100)
			textRight = `(${votes})`
		}

		return {
			textLeft: answer.answer,
			textRight,
			progressPercent: progressPercent,
		}
	})
})

const footerText = computed(() => {
	if (poll.value?.endCondition === LinkPollEndCondition.DURATION) {
		return `${t('link.setup.poll.duration')} - ${t('helpers.timeLeft.mins', Math.round((poll.value?.remainderDuration || 0) / 60))}`
	}

	if (poll.value?.endCondition === LinkPollEndCondition.VOTES) {
		return `${t('link.setup.poll.votes', { num: votesLeft.value })}`
	}

	return ''
})

const runPollTimer = () => {
	clearInterval(pollInterval.value)

	pollInterval.value = setInterval(() => {
		if (poll.value?.endCondition === LinkPollEndCondition.DURATION) {
			if (!poll.value?.remainderDuration || poll.value.remainderDuration <= 0) {
				clearInterval(pollInterval.value)
				return
			}

			setupStore.updatePollTimer(poll.value?.remainderDuration - 1)
		}
	}, 1000)
}

onMounted(runPollTimer)

watch(poll, runPollTimer)

defineExpose({
	footerText,
})
</script>
