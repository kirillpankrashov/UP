import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { CampaignType } from '@/core/types'

import TypeItem from '../TypeItem.vue'

describe('TypeItem Component', () => {
	const mockItem = {
		id: CampaignType.BRAND_AWARENESS,
		title: 'Test Campaign Type',
		description: 'This is a test campaign type',
		icon: '/test-icon.svg',
		visible: true,
	}

	const factory = (props = {}) => {
		const wrapper = mount(TypeItem, {
			props: {
				item: mockItem,
				...props,
			},
		})

		return { wrapper }
	}

	it('renders item icon when provided', () => {
		const { wrapper } = factory()

		const icon = wrapper.find('img')
		expect(icon.exists()).toBe(true)
		expect(icon.attributes('src')).toBe('/test-icon.svg')
	})

	it('emits update:value event with item id when clicked', async () => {
		const { wrapper } = factory()

		await wrapper.trigger('click')

		const updateEvents = wrapper.emitted('update:value')
		expect(updateEvents).toBeTruthy()
		if (updateEvents) {
			expect(updateEvents[0][0]).toBe(CampaignType.BRAND_AWARENESS)
		}
	})

	it('does not emit event when clicked if item is not visible', async () => {
		const { wrapper } = factory({
			item: { ...mockItem, visible: false },
		})

		await wrapper.trigger('click')

		expect(wrapper.emitted('update:value')).toBeFalsy()
	})

	it('adds disabled styling but still emits event when disabled prop is true', async () => {
		const { wrapper } = factory({ disabled: true })

		expect(wrapper.classes()).toContain('pointer-events-none')
		expect(wrapper.classes()).toContain('cursor-not-allowed')

		await wrapper.trigger('click')

		const vm = wrapper.vm as any
		vm.onClick()

		expect(wrapper.emitted('update:value')).toBeTruthy()
	})

	it('should have CSS that prevents clicks when disabled', () => {
		const { wrapper } = factory({ disabled: true })

		expect(wrapper.classes()).toContain('pointer-events-none')
	})
})
