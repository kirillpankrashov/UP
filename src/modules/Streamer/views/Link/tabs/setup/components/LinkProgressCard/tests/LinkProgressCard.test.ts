import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import LinkProgressCard from '../LinkProgressCard.vue'

describe('LinkProgressCard Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(LinkProgressCard, { props: {
			title: 'Test Title',
			footerText: 'Test Footer',
			items: [],
			...props,
		} })

		return {
			wrapper,
		}
	}

	it('renders title and footer text', () => {
		const { wrapper } = factory({
			title: 'Test Title',
			footerText: 'Test Footer',
		})

		expect(wrapper.find('[data-test="link-progress-card-title"]').text()).toContain('Test Title')
		expect(wrapper.find('[data-test="link-progress-card-footer"]').text()).toContain('Test Footer')
	})

	it('renders items with correct content and styles', () => {
		const { wrapper } = factory({
			title: 'Test Title',
			items: [
				{ textLeft: 'Item 1 Left', textRight: 'Item 1 Right', progressPercent: 30 },
				{ textLeft: 'Item 2 Left', textRight: 'Item 2 Right', progressPercent: 60 },
			],
			footerText: 'Footer Text',
		})

		const items = wrapper.findAll('[data-test^="link-progress-card-item-"]')
		expect(items.length).toBe(2)

		items.forEach((item, index) => {
			const textLeft = item.find(`[data-test="link-progress-card-${index}-text-left"]`)
			const textRight = item.find(`[data-test="link-progress-card-${index}-text-right"]`)
			const progressBar = item.find(`[data-test="link-progress-card-${index}-progress"]`)

			expect(textLeft.text()).toBe(`Item ${index + 1} Left`)
			expect(textRight.text()).toBe(`Item ${index + 1} Right`)
			expect((progressBar.element as HTMLElement).style.width).toBe(`${index === 0 ? 30 : 60}%`)
		})
	})

	it('emits onEdit when edit button is clicked', async () => {
		const { wrapper } = factory()

		const editButton = wrapper.find('[data-test="link-progress-card-edit-btn"]')
		await editButton.trigger('click')

		expect(wrapper.emitted()).toHaveProperty('onEdit')
	})

	it('emits onDelete when delete button is clicked', async () => {
		const { wrapper } = factory()

		const deleteButton = wrapper.find('[data-test="link-progress-card-delete-btn"]')
		await deleteButton.trigger('click')

		expect(wrapper.emitted()).toHaveProperty('onDelete')
	})
})
