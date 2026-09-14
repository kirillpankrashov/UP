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

describe('Partner Segments Store updateSegment', () => {
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

	const mockSegment = {
		id: 1,
		title: 'Gaming Segment',
		icon: 'default-icon',
		streamers: [
			{ id: 1, name: 'Streamer 1', lastActivityAt: '2024-01-01' },
			{ id: 2, name: 'Streamer 2', lastActivityAt: '2024-01-02' },
		],
	}

	const mockSegmentsResponse = {
		data: [mockSegment],
		total: 1,
		perPage: 10,
		status: true,
	}

	const factory = async (withSegment: boolean = true) => {
		const store = useSegmentsStore()

		if (withSegment) {
			store.segment.data = mockSegment
		}

		return { store }
	}

	it('updateSegment – success', async () => {
		const { store } = await factory();

		(SegmentsApi.updateSegment as Mock).mockResolvedValueOnce({ id: 1, status: true });
		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce(mockSegmentsResponse)

		expect(store.segment.loading).toBe(false)

		const promise = store.updateSegment(mockSegmentData)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(SegmentsApi.updateSegment).toHaveBeenCalled()
		expect(Logger.error).not.toHaveBeenCalled()
		expect(SegmentsApi.getSegments).toHaveBeenCalled()
		expect(store.segments.items).toEqual(mockSegmentsResponse.data)
	})

	it('updateSegment – fail if no segment data', async () => {
		const { store } = await factory(false)

		const promise = store.updateSegment(mockSegmentData)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(SegmentsApi.updateSegment).not.toHaveBeenCalled()
		expect(SegmentsApi.getSegments).not.toHaveBeenCalled()
	})

	it('updateSegment – fail if updateSegment fails', async () => {
		const { store } = await factory()
		const error = new Error('API Error');

		(SegmentsApi.updateSegment as Mock).mockRejectedValueOnce(error)

		expect(store.segment.loading).toBe(false)

		const promise = store.updateSegment(mockSegmentData)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error updating segment with id: ' + mockSegment.id,
			true,
			error,
		)
		expect(SegmentsApi.getSegments).not.toHaveBeenCalled()
	})

	it('updateSegment – should refresh segments list after update', async () => {
		const { store } = await factory()
		const updatedSegment = {
			...mockSegment,
			title: 'Updated Gaming Segment',
		};

		(SegmentsApi.updateSegment as Mock).mockResolvedValueOnce({ id: 1, status: true });
		(SegmentsApi.getSegments as Mock).mockResolvedValueOnce({
			...mockSegmentsResponse,
			data: [updatedSegment],
		})

		await store.updateSegment({
			...mockSegmentData,
			title: 'Updated Gaming Segment',
		})

		expect(SegmentsApi.getSegments).toHaveBeenCalledTimes(1)
		expect(store.segments.items[0]).toMatchObject({
			id: mockSegment.id,
			title: 'Updated Gaming Segment',
			icon: mockSegment.icon,
			streamers: mockSegment.streamers,
		})
	})
})
