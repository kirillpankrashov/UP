import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import * as SegmentsApi from '@/modules/Partner/views/Segments/api'

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

describe('Partner Segments Store detachStreamer', () => {
	beforeEach(() => {
		const app = createApp({})
		const pinia = createPinia()
		app.use(pinia)
		setActivePinia(pinia)
		vi.clearAllMocks()
	})

	const mockSegment = {
		id: 1,
		title: 'Gaming Segment',
		icon: 'default-icon',
		streamers: [
			{ id: 1, name: 'Streamer 1', lastActivityAt: '2024-01-01' },
			{ id: 2, name: 'Streamer 2', lastActivityAt: '2024-01-02' },
		],
	}

	const factory = async () => {
		const store = useSegmentsStore()
		store.segment.data = mockSegment
		return { store }
	}

	it('detachStreamer – success', async () => {
		const { store } = await factory()
		const streamerId = 1
		const segmentId = 1;

		(SegmentsApi.detachStreamer as Mock).mockResolvedValueOnce({ status: true })

		expect(store.segment.loading).toBe(false)

		const promise = store.detachStreamer(streamerId, segmentId)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(SegmentsApi.detachStreamer).toHaveBeenCalledWith(streamerId, segmentId)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('detachStreamer – fail if detachStreamer fails', async () => {
		const { store } = await factory()
		const streamerId = 1
		const segmentId = 1
		const error = new Error('API Error');

		(SegmentsApi.detachStreamer as Mock).mockRejectedValueOnce(error)

		expect(store.segment.loading).toBe(false)

		const promise = store.detachStreamer(streamerId, segmentId)

		expect(store.segment.loading).toBe(true)

		await promise

		expect(store.segment.loading).toBe(false)
		expect(Logger.error).toHaveBeenCalledWith(
			'Error detaching streamer with id: ' + streamerId + ' from segment with id: ' + segmentId,
			true,
			error,
		)
	})

	it('detachStreamer – should handle multiple detachments', async () => {
		const { store } = await factory()
		const streamerIds = [1, 2]
		const segmentId = 1;

		(SegmentsApi.detachStreamer as Mock)
			.mockResolvedValueOnce({ status: true })
			.mockResolvedValueOnce({ status: true })

		// Detach first streamer
		await store.detachStreamer(streamerIds[0], segmentId)
		expect(SegmentsApi.detachStreamer).toHaveBeenCalledWith(streamerIds[0], segmentId)

		// Detach second streamer
		await store.detachStreamer(streamerIds[1], segmentId)
		expect(SegmentsApi.detachStreamer).toHaveBeenCalledWith(streamerIds[1], segmentId)

		expect(SegmentsApi.detachStreamer).toHaveBeenCalledTimes(2)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('detachStreamer – should handle invalid segment id', async () => {
		const { store } = await factory()
		const streamerId = 1
		const invalidSegmentId = 999

		await store.detachStreamer(streamerId, invalidSegmentId)

		expect(store.segment.loading).toBe(false)
		expect(SegmentsApi.detachStreamer).toHaveBeenCalledWith(streamerId, invalidSegmentId)
		expect(Logger.error).not.toHaveBeenCalled()
	})
})
