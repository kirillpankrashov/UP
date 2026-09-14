import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PrerollAdsetStatus } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

import LinkItem from '../LinkItem.vue'

vi.mock('@/modules/Streamer/views/Campaigns/api')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'button.save': 'Save',
				'button.saved': 'Saved',
				'validator.uniqueYoutubeUrl': 'URL must be unique',
				'validator.required': 'Field is required',
				'validator.youtubeUrl': 'Invalid YouTube URL',
			}
			return translations[key] || key
		},
	}),
}))

describe('Streamer Campaigns AdsetInfo PrerollLinks LinkItem', () => {
	const factory = (props = {}) => {
		const wrapper = mount(LinkItem, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						stubActions: false,
					}),
				],
			},
			props: {
				adsetSlug: 'test-slug',
				vod: {
					id: null,
					video: '',
					status: PrerollAdsetStatus.MISSING,
				},
				vods: [],
				...props,
			},
		})

		const campaignsStore = useCampaignsStore()

		return { wrapper, campaignsStore }
	}

	describe('Component rendering', () => {
		it('renders form with input and save button', () => {
			const { wrapper } = factory()

			expect(wrapper.find('[data-name="campaigns-info-preroll-link-item"]').exists()).toBe(true)
			expect(wrapper.find('input').exists()).toBe(true)
			expect(wrapper.find('[data-test="campaigns-info-preroll-link-item-save"]').exists()).toBe(true)
		})

		it('displays save button text correctly', () => {
			const { wrapper } = factory()

			expect(wrapper.find('[data-test="campaigns-info-preroll-link-item-save"]').text()).toBe('Save')
		})
	})

	describe('Input handling', () => {
		it('updates model when input value changes', async () => {
			const { wrapper } = factory()

			const input = wrapper.find('input')
			await input.setValue('https://youtube.com/watch?v=abcdefghijk')

			expect(input.element.value).toBe('https://youtube.com/watch?v=abcdefghijk')
		})

		it('disables input when vod status is CONFIRMED', () => {
			const { wrapper } = factory({
				vod: {
					id: 1,
					video: 'https://youtube.com/watch?v=abcdefghijk',
					status: PrerollAdsetStatus.CONFIRMED,
				},
			})

			const input = wrapper.find('input')
			expect(input.attributes('disabled')).toBeDefined()
		})
	})

	describe('Form validation rules', () => {
		it('has correct validation rules', () => {
			const { wrapper } = factory()
			const form = wrapper.findComponent({ name: 'ElForm' })

			expect(form.props('rules')).toBeDefined()
			expect(form.props('rules').video).toHaveLength(3)
		})
	})

	describe('Form submission', () => {
		it('calls savePrerollVideo on form submit', async () => {
			const { wrapper, campaignsStore } = factory()

			const input = wrapper.find('input')
			await input.setValue('https://youtube.com/watch?v=abcdefghijk')
			await wrapper.find('form').trigger('submit')

			expect(campaignsStore.savePrerollVideo).toHaveBeenCalledWith(
				null,
				{
					adsetSlug: 'test-slug',
					video: 'https://youtube.com/watch?v=abcdefghijk',
				},
			)
		})

		it('shows success state after successful submission', async () => {
			const { wrapper, campaignsStore } = factory()
			vi.useFakeTimers()

			// Мокаем успешный ответ
			vi.spyOn(campaignsStore, 'savePrerollVideo').mockResolvedValueOnce({
				status: true,
				data: {
					id: 1,
					video: 'https://youtube.com/watch?v=abcdefghijk',
					status: PrerollAdsetStatus.MISSING,
				},
			})

			const input = wrapper.find('input')
			await input.setValue('https://youtube.com/watch?v=abcdefghijk')
			await wrapper.find('form').trigger('submit')
			await nextTick()

			const button = wrapper.find('[data-test="campaigns-info-preroll-link-item-save"]')
			expect(button.text()).toBe('Saved')

			vi.advanceTimersByTime(2000)
			await nextTick()

			expect(button.text()).toBe('Save')
			vi.useRealTimers()
		})
	})

	describe('Button state', () => {
		it('disables button when vod status is CONFIRMED', () => {
			const { wrapper } = factory({
				vod: {
					id: 1,
					video: 'https://youtube.com/watch?v=abcdefghijk',
					status: PrerollAdsetStatus.CONFIRMED,
				},
			})

			const button = wrapper.find('[data-test="campaigns-info-preroll-link-item-save"]')
			expect(button.attributes('disabled')).toBeDefined()
		})
	})
})
