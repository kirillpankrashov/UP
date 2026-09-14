import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import BrandAwareness from '../BrandAwareness.vue'

vi.mock('@/modules/Streamer/views/Campaigns/api')
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

describe('Streamer Campaigns AdsetInfo Creative BrandAwareness', () => {
	const factory = (props = {}) => {
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
					CopyLink: true,
				},
			},
			props: {
				adset: {
					...brandAwarenessAdsetInfo,
					...props,
				},
			},
		})

		const campaignsStore = useCampaignsStore()

		return { wrapper, campaignsStore }
	}

	describe('Creative Preview', () => {
		it('does not render preview for SSP format', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.YANDEX_FS,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('does not render preview for CPMSTAR_BANNER format', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CPMSTAR_BANNER,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('does not render preview for chatbot text format', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CHATBOT_TEXT,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(false)
		})

		it('renders preview for other formats', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [{
					id: 1,
					slug: 'test-slug',
				}],
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'Preview' }).exists()).toBe(true)
		})
	})

	describe('Navigation arrows', () => {
		it('shows navigation arrows when multiple ads exist', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [
					{ id: 1, slug: 'slug-1' },
					{ id: 2, slug: 'slug-2' },
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			expect(arrows).toHaveLength(2)
			expect(arrows[0].classes()).not.toContain('rotate-180') // левая стрелка
			expect(arrows[1].classes()).toContain('rotate-180') // правая стрелка
		})

		it('does not show navigation arrows with single ad', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [{ id: 1, slug: 'slug-1' }],
			})

			await nextTick()
			expect(wrapper.findAll('[data-test="arrow-icon"]')).toHaveLength(0)
		})

		it('navigates to next slide on right arrow click', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [
					{ id: 1, slug: 'slug-1', chatbotText: 'Text 1' },
					{ id: 2, slug: 'slug-2', chatbotText: 'Text 2' },
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[1].trigger('click') // правая стрелка
			await nextTick()

			expect(wrapper.text()).toContain('Text 2')
		})

		it('navigates to previous slide on left arrow click', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [
					{ id: 1, slug: 'slug-1', chatbotText: 'Text 1' },
					{ id: 2, slug: 'slug-2', chatbotText: 'Text 2' },
				],
			})

			await nextTick()
			// Сначала переходим на второй слайд
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[1].trigger('click')
			await nextTick()
			expect(wrapper.text()).toContain('Text 2')

			// Затем возвращаемся на первый
			await arrows[0].trigger('click')
			await nextTick()
			expect(wrapper.text()).toContain('Text 1')
		})

		it('cycles back to first slide after last slide', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [
					{ id: 1, slug: 'slug-1', chatbotText: 'Text 1' },
					{ id: 2, slug: 'slug-2', chatbotText: 'Text 2' },
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[1].trigger('click') // к второму слайду
			await arrows[1].trigger('click') // обратно к первому
			await nextTick()

			expect(wrapper.text()).toContain('Text 1')
		})

		it('cycles to last slide when clicking prev on first slide', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [
					{ id: 1, slug: 'slug-1', chatbotText: 'Text 1' },
					{ id: 2, slug: 'slug-2', chatbotText: 'Text 2' },
				],
			})

			await nextTick()
			const arrows = wrapper.findAll('[data-test="arrow-icon"]')
			await arrows[0].trigger('click') // с первого на последний
			await nextTick()

			expect(wrapper.text()).toContain('Text 2')
		})
	})

	describe('Chat message', () => {
		it('displays chat message when available', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [{
					id: 1,
					slug: 'test-slug',
					chatbotText: 'Test message',
				}],
			})

			await nextTick()
			expect(wrapper.text()).toContain('Test message')
		})

		it('displays placeholder when no chat message', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				ads: [{
					id: 1,
					slug: 'test-slug',
				}],
			})

			await nextTick()
			expect(wrapper.text()).toContain('—')
		})
	})

	describe('Product link', () => {
		it('shows copy link for non-CPC strategies', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				strategyPayment: {
					slug: StrategyPayment.PPVA,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'CopyLink' }).exists()).toBe(true)
		})

		it('does not show copy link for CPC strategy', async () => {
			const { wrapper } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				strategyPayment: {
					slug: StrategyPayment.CPC,
				},
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'CopyLink' }).exists()).toBe(false)
		})

		it('fetches product link on copy', async () => {
			const { wrapper, campaignsStore } = factory({
				format: {
					id: AdFormat.CUSTOM,
				},
				strategyPayment: {
					slug: StrategyPayment.PPVA,
				},
				ads: [{
					id: 1,
					slug: 'test-slug',
				}],
			})

			await nextTick()
			const copyLink = wrapper.findComponent({ name: 'CopyLink' })

			// Проверяем, что правильная ссылка передается в CopyLink компонент
			expect(copyLink.props('link')).toBe(wrapper.vm.copyProductLink)

			// Вызываем метод напрямую
			await wrapper.vm.copyProductLink()

			expect(campaignsStore.fetchBrandAwarenessProductLink).toHaveBeenCalledWith('test-slug')
		})
	})

	describe('Slide indicators', () => {
		it('shows slide indicators for multiple ads', async () => {
			const { wrapper } = factory({
				ads: [
					{ id: 1, slug: 'slug-1' },
					{ id: 2, slug: 'slug-2' },
				],
			})

			await nextTick()
			const indicators = wrapper.findAll('[data-test="dot"]')
			expect(indicators).toHaveLength(2)
		})

		it('updates active indicator on slide change', async () => {
			const { wrapper } = factory({
				ads: [
					{ id: 1, slug: 'slug-1' },
					{ id: 2, slug: 'slug-2' },
				],
			})

			await nextTick()
			const indicators = wrapper.findAll('[data-test="dot"]')
			await indicators[1].trigger('click')
			await nextTick()

			expect(indicators[1].classes()).toContain('bg-gray')
		})
	})
})
