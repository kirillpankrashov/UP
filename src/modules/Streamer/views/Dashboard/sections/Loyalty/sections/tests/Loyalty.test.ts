import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { Advice } from '@/components'
import { ElLoadingDirective } from '@/components/element-plus'
import type { TTier } from '@/modules/Streamer/views/Dashboard/api'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

import Loyalty from '../../Loyalty.vue'

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRouter: vi.fn(),
	}
})

describe('Streamer Dashboard Loyalty', () => {
	beforeEach(() => {
		vi.mocked(useRouter).mockReturnValue({
			push: vi.fn(),
		} as any)
	})

	const factory = (props: any) => {
		const wrapper = mount(Loyalty, {
			global: {
				directives: {
					loading: ElLoadingDirective,
				},
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const dashboardStore = useDashboardStore()

		return {
			wrapper,
			dashboardStore,
		}
	}

	it('does not render the advice component when fetching tier', async () => {
		const { wrapper, dashboardStore } = factory({})
		dashboardStore.isFetchingTier = true

		await nextTick()

		expect(wrapper.findComponent(Advice).exists()).toBe(false)
	})

	it('renders the current tier update text and date', async () => {
		const { wrapper, dashboardStore } = factory({})

		dashboardStore.isFetchingTier = false
		dashboardStore.tier.data = {
			current: {
				updated: {
					text: 'Updated on',
					date: '2022-01-01',
				},
			},
		} as TTier

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-loyalty-updated"]').text()).toContain('Updated on 2022-01-01')
	})
})
