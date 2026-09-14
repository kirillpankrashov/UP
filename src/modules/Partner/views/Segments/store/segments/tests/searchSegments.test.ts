import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as SegmentsApi from '@/modules/Partner/views/Segments/api'
import type { ISegmentList } from '@/modules/Partner/views/Segments/api/types'

import { useSegmentsStore } from '../segments'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Segments/api')

vi.mock('vue-router', () => ({
	createRouter: vi.fn(() => ({
		install: vi.fn(),
	})),
	createWebHistory: vi.fn(),
	useRoute: () => ({
		query: {
			page: 1,
		},
	}),
	useRouter: () => ({}),
}))

describe('Partner Segments Store searchSegments', () => {
	beforeEach(() => {
		const app = createApp({})
		const pinia = createPinia()
		app.use(pinia)
		setActivePinia(pinia)
		vi.clearAllMocks()
	})

	const mockSearchResults = [
		{ id: 1, title: 'Gaming Segment' },
		{ id: 2, title: 'Tech Segment' },
	] as ISegmentList[]

	const factory = async (searchSegments: boolean = true) => {
		const store = useSegmentsStore()

		if (searchSegments) {
			await store.searchSegments('test')
		}

		return { store }
	}

	it('searchSegments – success', async () => {
		const { store } = await factory(false)
		const searchQuery = 'gaming';

		(SegmentsApi.searchSegments as Mock).mockResolvedValueOnce(mockSearchResults)

		expect(store.searchedSegments.loading).toBe(false)

		const promise = store.searchSegments(searchQuery)

		expect(store.searchedSegments.loading).toBe(true)

		await promise

		expect(store.searchedSegments.loading).toBe(false)
		expect(store.searchedSegments.items).toEqual(mockSearchResults)
		expect(SegmentsApi.searchSegments).toHaveBeenCalledWith(searchQuery)
	})

	it('searchSegments – fail if searchSegments fails', async () => {
		const { store } = await factory(false)
		const searchQuery = 'gaming'
		const error = new Error('API Error');

		(SegmentsApi.searchSegments as Mock).mockRejectedValueOnce(error)

		expect(store.searchedSegments.loading).toBe(false)

		const promise = store.searchSegments(searchQuery)

		expect(store.searchedSegments.loading).toBe(true)

		await promise

		expect(store.searchedSegments.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error searching segments',
			true,
			error,
		)
		expect(store.searchedSegments.items).toEqual([])
	})

	it('searchSegments – should clear results before new search', async () => {
		const { store } = await factory(false)
		const firstSearchResults = [{ id: 1, title: 'Gaming Segment' }] as ISegmentList[]
		const secondSearchResults = [{ id: 2, title: 'Tech Segment' }] as ISegmentList[];

		(SegmentsApi.searchSegments as Mock)
			.mockResolvedValueOnce(firstSearchResults)
			.mockResolvedValueOnce(secondSearchResults)

		await store.searchSegments('gaming')
		expect(store.searchedSegments.items).toEqual(firstSearchResults)

		await store.searchSegments('tech')

		expect(store.searchedSegments.items).toEqual(secondSearchResults)
		expect(SegmentsApi.searchSegments).toHaveBeenCalledTimes(2)
		expect(SegmentsApi.searchSegments).toHaveBeenLastCalledWith('tech')
	})
})
