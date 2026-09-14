import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

import AdsetsClosed from '../AdsetsClosed.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/modules/Partner/views/Agency/api')

describe('Partner Agency AdsetsClosed section', () => {
	const factory = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const wrapper = mount(AdsetsClosed, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					AdsetsList: {
						name: 'AdsetsList',
						props: ['title', 'description', 'adsetsStore'],
						template: '<div data-test="adsets-closed-list" />',
					},
					AdsetStreamers: {
						name: 'AdsetStreamers',
						props: ['adsetsStore', 'modelValue'],
						template: '<div data-test="adset-streamers" />',
					},
					AdsetInfo: {
						name: 'AdsetInfo',
						props: ['store'],
						template: '<div data-test="adset-info" />',
					},
				},
			},
		})

		const adsetsStore = useAdsetsClosedStore(pinia)

		return { wrapper, adsetsStore }
	}

	it('fetches adsets on mount', async () => {
		const { adsetsStore } = factory()

		await nextTick()

		expect(adsetsStore.getAdsets).toHaveBeenCalledTimes(1)
	})

	it('passes correct props to AdsetsList and child sections', async () => {
		const { wrapper, adsetsStore } = factory()

		await nextTick()

		const list = wrapper.findComponent({ name: 'AdsetsList' })
		expect(list.exists()).toBe(true)
		expect(list.props('title')).toBe('creators.campaigns.closed.title')
		expect(list.props('description')).toBe('creators.campaigns.closed.description')
		expect(list.props('adsetsStore')).toBe(adsetsStore)

		expect(wrapper.find('[data-test="adset-streamers"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-info"]').exists()).toBe(true)
	})
})

