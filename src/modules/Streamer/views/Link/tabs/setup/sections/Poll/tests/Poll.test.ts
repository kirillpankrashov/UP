import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { LinkPollEndCondition } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

import Poll from '../Poll.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Setuo Poll', () => {
	const factory = () => {
		const wrapper = mount(Poll, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const setupStore = useLinkSetupStore()
		setupStore.poll = pollData
		setupStore.goal = goalData

		return { wrapper, setupStore }
	}

	it('renders add poll button when no poll is set', () => {
		const { wrapper, setupStore } = factory()

		setupStore.goal = null

		const button = wrapper.find('[data-test="streamer-link-poll-btn"]')

		expect(button.exists()).toBe(true)
	})

	it('renders LinkProgressCard when poll is set', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent({ name: 'LinkProgressCard' }).exists()).toBe(true)
		expect(wrapper.find('[data-test="streamer-link-poll-btn"]').exists()).toBe(false)
	})

	it('calls deletePoll when delete button is clicked in LinkProgressCard', async () => {
		const { wrapper, setupStore } = factory()

		await nextTick()

		const linkProgressCard = wrapper.findComponent({ name: 'LinkProgressCard' })
		await linkProgressCard.vm.$emit('onDelete')

		expect(setupStore.deletePoll).toHaveBeenCalled()
	})

	it('correctly computes footerText if endCondition is VOTES', async () => {
		const { wrapper, setupStore } = factory()

		setupStore.poll!.endCondition = LinkPollEndCondition.VOTES

		await nextTick()

		const footerText = wrapper.vm.footerText
		const pollResults = setupStore.poll?.answers.map(answer => answer?.votes || 0).reduce((a, b) => a + b, 0)
		const votesLeft = (setupStore.poll!.maxVotes || 0) - (pollResults || 0)

		expect(footerText).toBe(`Votes - ${votesLeft} left`)
	})

	it('correctly computes footerText if endCondition is DURATION', async () => {
		const { wrapper, setupStore } = factory()

		setupStore.poll!.endCondition = LinkPollEndCondition.DURATION

		await nextTick()

		const footerText = wrapper.vm.footerText

		const timeLeft = Math.round((setupStore.poll!.remainderDuration || 0) / 60)

		expect(footerText).toBe(`Duration - ${timeLeft} minutes left`)
	})
})
