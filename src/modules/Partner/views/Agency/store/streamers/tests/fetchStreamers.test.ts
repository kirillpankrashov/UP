import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getStreamers } from '@/modules/Partner/views/Agency/api'
import { streamers as streamersData } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'

import { useAgencyStreamersStore } from '../streamers'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

describe('Agency Streamers Store fetchStreamers', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetchStreamers – success (replace), sets page/data and toggles loading', async () => {
		const store = useAgencyStreamersStore()
		const page = 2

		expect(store.isFetchingStreamers).toBe(false)
		expect(store.streamers.data).toEqual([])

		const promise = store.fetchStreamers(page, false, 'test')

		expect(store.isFetchingStreamers).toBe(true)

		await promise

		expect(getStreamers).toHaveBeenCalledWith({ page, q: 'test' })
		expect(store.isFetchingStreamers).toBe(false)
		expect(store.streamers.page).toBe(page)
		expect(store.streamers.data).toEqual(streamersData.data)
		expect(store.streamers.total).toBe(streamersData.total)
		expect(store.streamers.perPage).toBe(streamersData.perPage)
		expect(Logger.error).not.toHaveBeenCalled()
	})

	it('fetchStreamers – success (append), merges lists when append=true and existing data present', async () => {
		const store = useAgencyStreamersStore()
		const existing = streamersData.data.slice(0, 1)
		const next = streamersData.data.slice(1, 3)

		store.streamers.data = existing as any

		;(getStreamers as Mock).mockResolvedValueOnce({
			...streamersData,
			data: next,
		})

		await store.fetchStreamers(3, true, '')

		expect(store.streamers.page).toBe(3)
		expect(store.streamers.data).toEqual([...existing, ...next])
	})

	it('fetchStreamers – success (append), replaces when append=true but existing list is empty', async () => {
		const store = useAgencyStreamersStore()
		const page = 4

		expect(store.streamers.data).toEqual([])

		;(getStreamers as Mock).mockResolvedValueOnce({
			...streamersData,
			data: streamersData.data.slice(0, 1),
		})

		await store.fetchStreamers(page, true, '')

		expect(store.streamers.page).toBe(page)
		expect(store.streamers.data).toEqual(streamersData.data.slice(0, 1))
	})

	it('fetchStreamers – fail, logs error and resets loading', async () => {
		const store = useAgencyStreamersStore()
		const error = new Error('Streamers API Error')

		;(getStreamers as Mock).mockRejectedValueOnce(error)

		const promise = store.fetchStreamers(1, false, '')

		expect(store.isFetchingStreamers).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalledWith('Error fetching agency creators', true, error)
		expect(store.isFetchingStreamers).toBe(false)
		expect(store.streamers.data).toEqual([])
	})
})

