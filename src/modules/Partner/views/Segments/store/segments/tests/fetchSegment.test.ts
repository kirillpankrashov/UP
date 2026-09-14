import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as SegmentsApi from '@/modules/Partner/views/Segments/api'
import type { ISegment } from '@/modules/Partner/views/Segments/api/types'

import { useSegmentsStore } from '../segments'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Segments/api')
vi.mock('vue-router', () => ({
	useRoute: vi.fn(() => ({
		query: {},
	})),
}))

describe('Partner Segments Store fetchSegment', () => {
	beforeEach(() => {
		const pinia = createPinia()
		setActivePinia(pinia)
		vi.clearAllMocks()
	})

	const mockSegment = {
		id: 1,
		title: 'Gaming Segment',
		streamers: [
			{ id: 1, name: 'Streamer 1' },
			{ id: 2, name: 'Streamer 2' },
		],
	} as ISegment

	const factory = async (fetchSegment: boolean = true) => {
		const store = useSegmentsStore()

		if (fetchSegment) {
			await store.fetchSegment(1)
		}

		return { store }
	}

	it('fetchSegment – success', async () => {
		const { store } = await factory(false)
		const segmentId = 1;

		(SegmentsApi.getSegment as Mock).mockResolvedValueOnce(mockSegment)

		expect(store.segment.loading).toBe(false)
		expect(store.segment.data).toBeNull()

		const promise = store.fetchSegment(segmentId)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(store.segment.data).toEqual(mockSegment)
		expect(SegmentsApi.getSegment).toHaveBeenCalledWith(segmentId)
	})

	it('fetchSegment – fail if getSegment fails', async () => {
		const { store } = await factory(false)
		const segmentId = 1
		const error = new Error('API Error');

		(SegmentsApi.getSegment as Mock).mockRejectedValueOnce(error)

		expect(store.segment.loading).toBe(false)
		expect(store.segment.data).toBeNull()

		const promise = store.fetchSegment(segmentId)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(store.segment.data).toBeNull()
		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching segment',
			true,
			error,
		)
	})

	it('fetchSegment – should update existing segment data', async () => {
		const { store } = await factory(false)
		const firstSegment = { ...mockSegment }
		const secondSegment = { ...mockSegment, id: 2, title: 'Tech Segment' };

		(SegmentsApi.getSegment as Mock)
			.mockResolvedValueOnce(firstSegment)
			.mockResolvedValueOnce(secondSegment)

		// Fetch first segment
		await store.fetchSegment(1)
		expect(store.segment.data).toEqual(firstSegment)

		// Fetch second segment
		const promise = store.fetchSegment(2)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(store.segment.data).toEqual(secondSegment)
		expect(SegmentsApi.getSegment).toHaveBeenCalledTimes(2)
		expect(SegmentsApi.getSegment).toHaveBeenLastCalledWith(2)
	})
})
