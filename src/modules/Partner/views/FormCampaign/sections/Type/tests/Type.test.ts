import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { useDictStore } from '@/core/store'

import { TypeItem } from '../components'
import Type from '../Type.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Type Component', () => {
	const mockCampaignTypes = [
		{
			id: CampaignType.BRAND_AWARENESS,
			title: 'Brand Awareness',
			description: 'Brand awareness campaign',
			icon: '/brand-icon.svg',
			visible: true,
		},
		{
			id: CampaignType.PERFORMANCE,
			title: 'Performance',
			description: 'Performance campaign',
			icon: '/performance-icon.svg',
			visible: true,
		},
		{
			id: CampaignType.PREROLL,
			title: 'Preroll',
			description: 'Preroll campaign',
			icon: '/preroll-icon.svg',
			visible: false,
		},
	]

	const factory = (props = {}, storeState = {}) => {
		const wrapper = mount(Type, {
			props: {
				...props,
			},
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: {
									types: mockCampaignTypes,
								},
								...storeState,
							},
						},
					}),
				],
				stubs: {
					TypeItem: true,
				},
			},
		})

		const dictStore = useDictStore()

		return { wrapper, dictStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders available types correctly', () => {
		const { wrapper } = factory()

		const typeItems = wrapper.findAllComponents(TypeItem)

		expect(typeItems.length).toBe(3)

		expect(typeItems[0].props('item').id).toBe(CampaignType.BRAND_AWARENESS)
		expect(typeItems[1].props('item').id).toBe(CampaignType.PERFORMANCE)

		expect(typeItems[2].props('item').id).toBe(CampaignType.PREROLL)
	})

	it('separates coming soon types into different section', () => {
		const { wrapper } = factory()

		const comingSoonTitle = wrapper.find('div._text-s-regular')
		expect(comingSoonTitle.exists()).toBe(true)
		expect(comingSoonTitle.text()).toBe('campaign.type.comingSoon')

		const typeItems = wrapper.findAllComponents(TypeItem)

		expect(typeItems[0].props('item').visible).toBe(true)
		expect(typeItems[1].props('item').visible).toBe(true)
		expect(typeItems[2].props('item').visible).toBe(false)
	})

	it('passes correct props to TypeItem', () => {
		const { wrapper } = factory({ disabled: true })

		const typeItems = wrapper.findAllComponents(TypeItem)

		expect(typeItems[0].props('disabled')).toBe(true)
		expect(typeItems[1].props('disabled')).toBe(true)
		expect(typeItems[2].props('disabled')).toBe(false)
	})

	it('updates model value when TypeItem emits update:value', async () => {
		const { wrapper } = factory()

		const firstTypeItem = wrapper.findComponent(TypeItem)

		await firstTypeItem.vm.$emit('update:value', CampaignType.BRAND_AWARENESS)

		await nextTick()
		const updateEvents = wrapper.emitted('update:modelValue')
		expect(updateEvents).toBeTruthy()
		if (updateEvents) {
			expect(updateEvents[0][0]).toBe(CampaignType.BRAND_AWARENESS)
		}
	})

	it('does not update model when disabled is true', async () => {
		const { wrapper } = factory({ disabled: true })

		const firstTypeItem = wrapper.findComponent(TypeItem)

		await firstTypeItem.vm.$emit('update:value', CampaignType.BRAND_AWARENESS)

		await nextTick()
		expect(wrapper.emitted('update:modelValue')).toBeFalsy()
	})

	it('does not show coming soon section when there are no coming soon types', async () => {
		const visibleTypes = mockCampaignTypes.map(type => ({
			...type,
			visible: true,
		}))

		const { wrapper } = factory({}, { campaigns: { types: visibleTypes } })

		const comingSoonTitle = wrapper.find('div._text-s-regular')
		expect(comingSoonTitle.exists()).toBe(false)
	})

	it('handles empty types gracefully', () => {
		const { wrapper } = factory({}, { campaigns: { types: [] } })

		const typeItems = wrapper.findAllComponents(TypeItem)
		expect(typeItems.length).toBe(0)
	})

	it('sets selected type correctly', async () => {
		const { wrapper } = factory()

		await wrapper.setProps({ modelValue: CampaignType.PERFORMANCE })

		const typeItems = wrapper.findAllComponents(TypeItem)

		expect(typeItems[0].props('value')).toBe(CampaignType.PERFORMANCE)
		expect(typeItems[1].props('value')).toBe(CampaignType.PERFORMANCE)
	})
})
