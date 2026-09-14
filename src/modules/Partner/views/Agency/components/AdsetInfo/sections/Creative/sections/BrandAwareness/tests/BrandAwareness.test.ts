import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdFormat } from '@/core/types'
import { i18n } from '@/core/i18n'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'

import BrandAwareness from '../BrandAwareness.vue'

vi.mock('@/assets/img/icons/arrow-left.svg', () => ({
	default: {
		template: '<svg data-test="arrow-icon"><path /></svg>',
	},
}))

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Partner Agency AdsetInfo Creative BrandAwareness', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (overrides: Partial<any> = {}) => {
		const wrapper = mount(BrandAwareness, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					Preview: true,
				},
			},
			props: {
				adset: {
					...adsetInfo,
					...overrides,
				},
			},
		})

		return { wrapper }
	}

	describe('Creative preview', () => {
		it('does not render preview and labels when ads list is empty', async () => {
			const { wrapper } = factory({
				ads: [],
			})

			await nextTick()

			expect(wrapper.find('[data-test="campaigns-info-creative-brand-awareness"]').exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
			expect(wrapper.text()).not.toContain('creators.campaignSidebar.creativePreview')
			expect(wrapper.text()).not.toContain('creators.campaignSidebar.chatMessage')
		})

		it('does not render preview for SSP format', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.YANDEX_FS,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('does not render preview for CPMSTAR_BANNER format', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CPMSTAR_BANNER,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('does not render preview for chatbot text format', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CHATBOT_TEXT,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('renders preview for other formats', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
				],
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(true)
		})
	})

	describe('Navigation arrows', () => {
		it('shows navigation arrows when multiple ads exist', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: 'Text 2',
					},
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			expect(arrows).toHaveLength(2)
			expect(arrows[0].classes()).not.toContain('rotate-180') // left
			expect(arrows[1].classes()).toContain('rotate-180') // right
		})

		it('does not show navigation arrows with single ad', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
				],
			})

			await nextTick()
			expect(wrapper.findAll('[data-test="arrow-icon"]')).toHaveLength(0)
		})

		it('navigates to next slide on right arrow click', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: 'Text 2',
					},
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[1].trigger('click') // right
			await nextTick()

			expect(wrapper.text()).toContain('Text 2')
		})

		it('cycles to last slide when clicking prev on first slide', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: 'Text 2',
					},
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[0].trigger('click') // from first to last
			await nextTick()

			expect(wrapper.text()).toContain('Text 2')
		})
	})

	describe('Chat message', () => {
		it('displays placeholder when no chat message on current slide', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: '',
					},
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[1].trigger('click') // go to second slide
			await nextTick()

			expect(wrapper.text()).toContain('—')
		})
	})

	describe('Slide indicators', () => {
		it('shows slide indicators for multiple ads', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: 'Text 2',
					},
				],
			})

			await nextTick()
			const indicators = wrapper.findAll('[data-test="dot"]')
			expect(indicators).toHaveLength(2)
		})

		it('updates active indicator on dot click', async () => {
			const { wrapper } = factory({
				format: {
					...adsetInfo.format,
					id: AdFormat.CUSTOM,
				},
				ads: [
					{
						...adsetInfo.ads[0],
						id: 1,
						slug: 'slug-1',
						chatbotText: 'Text 1',
					},
					{
						...adsetInfo.ads[0],
						id: 2,
						slug: 'slug-2',
						chatbotText: 'Text 2',
					},
				],
			})

			await nextTick()
			const indicators = wrapper.findAll('[data-test="dot"]')
			await indicators[1].trigger('click')
			await nextTick()

			expect(indicators[1].classes()).toContain('bg-gray')
			expect(wrapper.text()).toContain('Text 2')
		})
	})
})

