import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as SegmentsApi from '@/modules/Partner/views/Segments/api'
import type { ISegmentModel } from '@/modules/Partner/views/Segments/types'

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

describe('Partner Segments Store createSegment', () => {
	beforeEach(() => {
		const app = createApp({})
		const pinia = createPinia()
		app.use(pinia)
		setActivePinia(pinia)
		vi.clearAllMocks()
	})

	const mockSegmentData: ISegmentModel = {
		title: 'Gaming Segment',
		streamers: [1, 2],
	}

	const mockSegmentsResponse = {
		data: [{
			id: 1,
			title: 'Gaming Segment',
			streamers: [1, 2],
		}],
		total: 1,
		perPage: 10,
		status: true,
	}

	const factory = async () => {
		const store = useSegmentsStore()
		return { store }
	}

	it('createSegment – success', async () => {
		const { store } = await factory();

		(SegmentsApi.createSegment as Mock).mockResolvedValueOnce({ id: 1, status: true });
		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce(mockSegmentsResponse)

		expect(store.segment.loading).toBe(false)

		const promise = store.createSegment(mockSegmentData)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(SegmentsApi.createSegment).toHaveBeenCalledWith({
			title: mockSegmentData.title,
			streamers: mockSegmentData.streamers,
		})
		expect(Logger.error).not.toHaveBeenCalled()
		expect(SegmentsApi.getSegments).toHaveBeenCalled()
		expect(store.segments.items).toEqual(mockSegmentsResponse.data)
	})

	it('createSegment – fail if createSegment fails', async () => {
		const { store } = await factory()
		const error = new Error('API Error');

		(SegmentsApi.createSegment as Mock).mockRejectedValueOnce(error)

		expect(store.segment.loading).toBe(false)

		const promise = store.createSegment(mockSegmentData)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error creating new segment',
			true,
			error,
		)
		expect(SegmentsApi.getSegments).not.toHaveBeenCalled()
	})

	it('createSegment – should refresh segments list after creation', async () => {
		const { store } = await factory();

		(SegmentsApi.createSegment as Mock).mockResolvedValueOnce({ status: true });
		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce({
			data: [{
				id: 1,
				title: mockSegmentData.title,
				streamers: mockSegmentData.streamers,
			}],
			total: 1,
			perPage: 10,
			status: true,
		})

		await store.createSegment(mockSegmentData)

		expect(SegmentsApi.getSegments).toHaveBeenCalledTimes(1)
		expect(store.segments.items[0]).toMatchObject({
			title: mockSegmentData.title,
			streamers: mockSegmentData.streamers,
		})
	})
})
