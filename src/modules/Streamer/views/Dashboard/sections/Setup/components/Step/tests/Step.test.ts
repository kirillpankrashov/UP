import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { checkListData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/checkListData'

import Step from '../Step.vue'

describe('Streamer Dashboard Setup Step', () => {
	const factory = (props: any) => {
		const wrapper = mount(Step, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const dashboardStore = useDashboardStore()
		dashboardStore.checklist = checkListData

		return { wrapper, dashboardStore }
	}

	it('renders the step index correctly', async () => {
		const { wrapper } = factory({
			indexId: 1,
			title: 'Step 1',
			completed: false,
			route: '/step1',
			guideUrl: 'https://example.com/guide',
		})

		await nextTick()

		expect(wrapper.find('[data-test="setup-step-1-num"]').text()).toBe('1')
		expect(wrapper.find('[data-test="setup-step-1-status"]').exists()).toBe(false)
	})

	it('renders the completed step correctly', async () => {
		const { wrapper } = factory({
			indexId: 1,
			title: 'Step 1',
			completed: true,
			route: '/step1',
			guideUrl: 'https://example.com/guide',
		})

		await nextTick()

		expect(wrapper.find('[data-test="setup-step-1-num"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="setup-step-1-status"]').exists()).toBe(true)
	})

	it('opens the guide URL in a new window if not a YouTube URL', async () => {
		const { wrapper } = factory({
			indexId: 1,
			title: 'Step 1',
			completed: false,
			route: '/step1',
			guideUrl: 'https://example.com/guide',
		})

		await nextTick()

		const openSpy = vi.spyOn(window, 'open').mockImplementation(() => ({
			focus: vi.fn(),
		} as any))

		const btn = wrapper.find('[data-test="setup-step-1-btn"]')

		expect(btn.exists()).toBe(true)
		await btn.trigger('click')

		expect(openSpy).toHaveBeenCalledWith('https://example.com/guide', '_blank')
	})

	it('sets dialogVisible to true if guide URL is a YouTube URL', async () => {
		const { wrapper } = factory({
			indexId: 1,
			title: 'Step 1',
			completed: false,
			route: '/step1',
			guideUrl: 'https://www.youtube.com/watch?v=12345',
		})

		await nextTick()

		const btn = wrapper.find('[data-test="setup-step-1-btn"]')

		expect(btn.exists()).toBe(true)
		await btn.trigger('click')

		expect((wrapper.vm as any).dialogVisible).toBe(true)
	})
})
