import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { FormRules } from 'element-plus'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { required } from '@/core/validators'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

import GoalForm from '../GoalForm.vue'

describe('Streamer Link GoalForm', () => {
	const factory = () => {
		const wrapper = mount(GoalForm, {
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
			title: [required],
			description: [required],
			total: [required],
		}

		await nextTick()

		expect(wrapper.vm.rules).toEqual(rules)
	})

	it('form triggers updateGoal in store on form submit if there is current goal', async () => {
		const { wrapper, setupStore } = factory()

		await nextTick()

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(setupStore.updateGoal).toHaveBeenCalled()
	})

	it('form triggers createGoal in store on form submit if there is no current goal', async () => {
		const { wrapper, setupStore } = factory()

		setupStore.goal = null

		await nextTick()

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(setupStore.createGoal).toHaveBeenCalled()
	})
})
