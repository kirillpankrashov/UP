import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { SocialLinks } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { MiniXButton } from '@/components'

import SocialLinkBlock from '../SocialLinkBlock.vue'

vi.mock('@/core/helpers')

describe('Streamer Link Profile SocialLinkBlock', () => {
	const factory = (props = {}) => {
		const wrapper = mount(SocialLinkBlock, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			},
			props: {
				index: 1,
				block: { name: SocialLinks.INSTAGRAM, link: 'https://instagram.com' },
				model: [
					{ name: SocialLinks.TWITTER, link: 'https://twitter.com' },
				],
				...props,
			},
		})

		return { wrapper }
	}

	it('emits delete-block event when MiniXButton is clicked', async () => {
		const { wrapper } = factory()

		await wrapper.findComponent(MiniXButton).trigger('click')

		expect(wrapper.emitted('delete-block')).toBeTruthy()
	})

	it('updates model when input value changes', async () => {
		const { wrapper } = factory()

		const input = wrapper.find('[data-test="link-block-input-properties"]')
		await input.setValue('https://new-link.com')

		expect(wrapper.emitted('change-block')).toBeTruthy()
		expect(wrapper.emitted('change-block')?.[0]).toEqual([
			{ name: SocialLinks.INSTAGRAM, link: 'https://new-link.com' },
		])
	})

	it('filters options correctly based on existing model', () => {
		const { wrapper } = factory({
			model: [
				{ name: SocialLinks.TWITTER, link: 'https://twitter.com' },
			],
			block: {
				name: SocialLinks.INSTAGRAM,
				link: 'https://instagram.com',
			},
		})

		// Получаем все платформы, кроме тех, что в model
		const expectedOptions = Object.values(SocialLinks)
			.filter(platform => platform !== SocialLinks.TWITTER)
			.map(platform => ({
				value: platform,
				label: platform,
			}))

		expect(wrapper.vm.options).toEqual(expectedOptions)
	})

	it('updates model when block prop changes', async () => {
		const { wrapper } = factory()

		await wrapper.setProps({
			block: { name: SocialLinks.TWITTER, link: 'https://twitter.com' },
		})

		await nextTick()

		expect(wrapper.vm.model).toEqual({
			name: SocialLinks.TWITTER,
			link: 'https://twitter.com',
		})
	})
})
