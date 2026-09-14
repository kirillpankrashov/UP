import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { FormRules } from 'element-plus'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { LinkPollEndCondition } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { positiveNum, required } from '@/core/validators'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

import PollForm from '../PollForm.vue'

describe('Streamer Link PollForm', () => {
	const factory = () => {
		const wrapper = mount(PollForm, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		wrapper.vm.openForm()

		const setupStore = useLinkSetupStore()
		setupStore.poll = pollData
		setupStore.goal = goalData

		return { wrapper, setupStore }
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('form has corresponding validators', async () => {
		const { wrapper } = factory()

		const rules: FormRules = {
			question: [required],
			endCondition: [required],
			duration: [positiveNum],
			maxVotes: [positiveNum],
		}

		await nextTick()

		expect(wrapper.vm.rules).toEqual(rules)
	})

	it('form triggers updatePoll in store on form submit if there is current poll', async () => {
		const { wrapper, setupStore } = factory()

		await nextTick()

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(setupStore.updatePoll).toHaveBeenCalled()
	})

	it('form triggers createPoll in store on form submit if there is no current poll', async () => {
		const { wrapper, setupStore } = factory()

		setupStore.poll = null

		await nextTick()

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(setupStore.createPoll).toHaveBeenCalled()
	})

	it('form shows corresponding fields for endCondition property', async () => {
		const { wrapper } = factory()

		wrapper.vm.model.endCondition = LinkPollEndCondition.VOTES

		await nextTick()

		expect(wrapper.find('[data-test="poll-form-votes-form-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="poll-form-duration-form-item"]').exists()).toBe(false)

		wrapper.vm.model.endCondition = LinkPollEndCondition.DURATION

		await nextTick()

		expect(wrapper.find('[data-test="poll-form-votes-form-item"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="poll-form-duration-form-item"]').exists()).toBe(true)
	})
})
