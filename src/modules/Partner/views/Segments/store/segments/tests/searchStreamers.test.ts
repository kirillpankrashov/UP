import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { searchStreamers } from '@/modules/Partner/views/Segments/api'

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

describe('Partner Segments Store searchStreamers', () => {
	beforeEach(() => {
		const app = createApp({})
		const pinia = createPinia()
		app.use(pinia)
		setActivePinia(pinia)
		vi.clearAllMocks()
	})

	const mockStreamers = [
		{ id: 1, name: 'Streamer 1', lastActivityAt: '2024-01-01' },
		{ id: 2, name: 'Streamer 2', lastActivityAt: '2024-01-02' },
	]

	const factory = async () => {
		const store = useSegmentsStore()
		return { store }
	}

	it('searchStreamers – success', async () => {
		const { store } = await factory()
		const searchQuery = 'streamer';

		(searchStreamers as Mock).mockResolvedValueOnce(mockStreamers)

		const result = await store.searchStreamers(searchQuery)

		expect(searchStreamers).toHaveBeenCalled()
		expect(Logger.error).not.toHaveBeenCalled()
		expect(result).toEqual(mockStreamers)
	})

	it('searchStreamers – success with segment id', async () => {
		const { store } = await factory()
		const searchQuery = 'streamer'
		const segmentId = 1;

		(searchStreamers as Mock).mockResolvedValueOnce(mockStreamers)

		const result = await store.searchStreamers(searchQuery, segmentId)

		expect(searchStreamers).toHaveBeenCalled()
		expect(Logger.error).not.toHaveBeenCalled()
		expect(result).toEqual(mockStreamers)
	})

	// it('searchStreamers – should not search if query length < 3', async () => {
	// 	const { store } = await factory()
	// 	const searchQuery = 'st'

	// 	const result = await store.searchStreamers(searchQuery)

	// 	expect(searchStreamers).not.toHaveBeenCalled()
	// 	expect(Logger.error).not.toHaveBeenCalled()
	// 	expect(result).toBeUndefined()
	// })

	it('searchStreamers – should handle empty response', async () => {
		const { store } = await factory()
		const searchQuery = 'nonexistent';

		(searchStreamers as Mock).mockResolvedValueOnce([])

		const result = await store.searchStreamers(searchQuery)

		expect(searchStreamers).toHaveBeenCalled()
		expect(Logger.error).not.toHaveBeenCalled()
		expect(result).toEqual([])
	})
})
