import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElRadioButton } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'

import CollectionSwitcher from '../CollectionSwitcher.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

describe('Partner Campaigns CollectionSwitcher', () => {
	const mockRoute = (name: RouteName) => {
		vi.mocked(useRoute).mockReturnValue({
			name,
			params: {},
			query: {},
		} as any)
	}

	const mockRouter = () => {
		const push = vi.fn()
		vi.mocked(useRouter).mockReturnValue({
			push,
			currentRoute: { value: {} },
		} as any)
		return { push }
	}
	const factory = (routeName: RouteName) => {
		mockRoute(routeName)
		const { push } = mockRouter() // Инициализируем мок роутера

		const wrapper = mount(CollectionSwitcher, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
					initialState: {
						'partner-campaigns': {
							collectionRoute: new Map([
								[`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CAMPAIGNS}`, RouteName.BRAND_AWARENESS_CAMPAIGNS],
								[`${CampaignType.BRAND_AWARENESS}:${AdEntityType.ADSETS}`, RouteName.BRAND_AWARENESS_ADSETS],
								[`${CampaignType.BRAND_AWARENESS}:${AdEntityType.CREATIVES}`, RouteName.BRAND_AWARENESS_CREATIVES],
								// Добавляем остальные маршруты
							]),
						},
					},
				})],
				stubs: [],
			},
		})

		return { wrapper, push }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders correct buttons for BRAND_AWARENESS campaign type', async () => {
		const { wrapper } = factory(RouteName.BRAND_AWARENESS_CAMPAIGNS)
		await nextTick()

		const buttons = wrapper.findAllComponents(ElRadioButton)
		expect(buttons.length).toBe(3)
		expect(buttons.map(b => b.props('label'))).toEqual([
			AdEntityType.CAMPAIGNS,
			AdEntityType.ADSETS,
			AdEntityType.CREATIVES,
		])
	})

	it('renders correct buttons for PERFORMANCE campaign type', async () => {
		const { wrapper } = factory(RouteName.PERFORMANCE_CAMPAIGNS)
		await nextTick()

		const buttons = wrapper.findAllComponents(ElRadioButton)
		expect(buttons.length).toBe(2)
		expect(buttons.map(b => b.props('label'))).toEqual([
			AdEntityType.CAMPAIGNS,
			AdEntityType.ADSETS,
		])
	})

	it('does not render CREATIVES button for PREROLL type', async () => {
		const { wrapper } = factory(RouteName.PREROLL_CAMPAIGNS)
		await nextTick()

		const buttons = wrapper.findAllComponents(ElRadioButton)
		expect(buttons.some(b => b.props('label') === AdEntityType.CREATIVES)).toBe(false)
	})
})
