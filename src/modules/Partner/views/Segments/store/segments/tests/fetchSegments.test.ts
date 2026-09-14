import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as SegmentsApi from '@/modules/Partner/views/Segments/api'
import { segmentList } from '@/modules/Partner/views/Segments/api/getSegments/fixtures/segmentList'

import { useSegmentsStore } from '../segments'

vi.mock('vue-router', () => ({
	useRoute: () => ({
		query: {
			page: 1,
		},
	}),
	useRouter: () => ({}),
}))

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Segments/api')

describe('Partner Segments Store fetchSegments', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const mockResponse = {
		data: [segmentList],
		perPage: 10,
		total: 1,
		status: true,
	}

	const factory = async (fetchSegments: boolean = true) => {
		const store = useSegmentsStore()

		if (fetchSegments) {
			await store.fetchSegments()
		}

		return { store }
	}

	it('fetchSegments – success', async () => {
		const { store } = await factory(false);

		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce(mockResponse)

		expect(store.segments.loading).toBe(false)

		const promise = store.fetchSegments()

		expect(store.segments.loading).toBe(true)

		await promise

		expect(store.segments.loading).toBe(false)
		expect(store.segments.items).toEqual(mockResponse.data)
		expect(store.segments.perPage).toBe(mockResponse.perPage)
		expect(store.segments.total).toBe(mockResponse.total)
		expect(store.segments.bootstrapped).toBe(true)
		expect(store.searchedSegments.items).toEqual([])
	})

	it('fetchSegments – success with specific page', async () => {
		const { store } = await factory(false)
		const page = 2;

		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce(mockResponse)

		expect(store.segments.loading).toBe(false)

		const promise = store.fetchSegments(page)

		expect(store.segments.loading).toBe(true)

		await promise

		expect(SegmentsApi.getSegments).toHaveBeenCalledWith({ page })
		expect(store.segments.loading).toBe(false)
	})

	it('fetchSegments – fail if getSegments fails', async () => {
		const { store } = await factory(false)
		const error = new Error('API Error');

		(SegmentsApi.getSegments as Mock).mockRejectedValueOnce(error)

		expect(store.segments.loading).toBe(false)

		const promise = store.fetchSegments()

		expect(store.segments.loading).toBe(true)

		await promise

		expect(store.segments.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching advertisers list',
			true,
			error,
		)
		expect(store.segments.items).toEqual([])
	})
})
