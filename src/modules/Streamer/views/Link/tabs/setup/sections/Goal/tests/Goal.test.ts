import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { goalData } from '@/modules/Streamer/views/Link/api/getGoal/fixtures/goalData'
import { pollData } from '@/modules/Streamer/views/Link/api/getPoll/fixtures/pollData'
// import { setupData } from '@/modules/Streamer/views/Link/api/_getSetup/fixtures/setupData'
// import { linkWidgetData } from '@/modules/Streamer/views/Link/api/_getWidget/fixtures/linkWidgetData'
import { useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

import Goal from '../Goal.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Setup Goal', () => {
	const factory = () => {
		const wrapper = mount(Goal, {
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

	it('renders add goal button when no goal is set', () => {
		const { wrapper, setupStore } = factory()

		setupStore.goal = null

		const button = wrapper.find('[data-test="streamer-link-goal-btn"]')

		expect(button.exists()).toBe(true)
	})

	it('renders LinkProgressCard when goal is set', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent({ name: 'LinkProgressCard' }).exists()).toBe(true)
		expect(wrapper.find('[data-test="streamer-link-goal-btn"]').exists()).toBe(false)
	})

	it('calls deleteGoal when delete button is clicked in LinkProgressCard', async () => {
		const { wrapper, setupStore } = factory()

		await nextTick()

		const linkProgressCard = wrapper.findComponent({ name: 'LinkProgressCard' })
		await linkProgressCard.vm.$emit('onDelete')

		expect(setupStore.deleteGoal).toHaveBeenCalled()
	})

	it('correctly computes progressText', async () => {
		const { wrapper, setupStore } = factory()

		setupStore.goal!.progress = 80
		setupStore.goal!.total = 100

		await nextTick()

		const progressText = wrapper.vm.progressText

		expect(progressText.textLeft).toBe('80 of 100 reached!')
		expect(progressText.progressPercent).toBe(80)
	})
})
