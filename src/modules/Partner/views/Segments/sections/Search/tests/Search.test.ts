import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

import Search from '../Search.vue'

vi.mock('vue-router')
vi.mock('lodash', () => ({
	debounce: (fn: Function) => fn,
}))

describe('Partner Segments Search', () => {
	const mockRouter = {
		push: vi.fn(),
		replace: vi.fn(),
	}

	const mockRoute = {
		query: {},
	}

	const factory = () => {
		(useRouter as any).mockReturnValue(mockRouter)
		;(useRoute as any).mockReturnValue(mockRoute)

		const wrapper = mount(Search, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		})

		const segmentsStore = useSegmentsStore()

		return { wrapper, segmentsStore }
	}

	it('renders search input correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.find('#partner-segments-search').exists()).toBe(true)
		expect(wrapper.find('input').exists()).toBe(true)
	})

	it('initializes with search value from route query', () => {
		mockRoute.query = { segment: 'test-search' }
		const { wrapper } = factory()

		expect(wrapper.find('input').element.value).toBe('test-search')
	})

	it('calls searchSegments when input value is not empty', async () => {
		const { wrapper, segmentsStore } = factory()

		await wrapper.find('input').setValue('test')
		await wrapper.find('input').trigger('input')

		expect(mockRouter.push).toHaveBeenCalledWith({
			query: { segment: 'test' },
		})
		expect(segmentsStore.searchSegments).toHaveBeenCalledWith('test')
	})

	it('clears search and fetches segments when input is cleared', async () => {
		const { wrapper, segmentsStore } = factory()

		await wrapper.find('input').setValue('')
		await wrapper.find('input').trigger('input')

		expect(mockRouter.replace).toHaveBeenCalledWith({
			query: { segment: undefined },
		})
		expect(segmentsStore.fetchSegments).toHaveBeenCalled()
	})

	it('preserves existing query params when updating search', async () => {
		mockRoute.query = { otherParam: 'value' }
		const { wrapper } = factory()

		await wrapper.find('input').setValue('test')
		await wrapper.find('input').trigger('input')

		expect(mockRouter.push).toHaveBeenCalledWith({
			query: { otherParam: 'value', page: undefined, segment: 'test' },
		})
	})
})
