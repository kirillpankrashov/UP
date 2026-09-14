import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { getPosts } from '@/modules/Streamer/views/Link/api'
import { postsData } from '@/modules/Streamer/views/Link/api/getPosts/fixtures/postsData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkPostsStore } from '../posts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

describe('Link Posts Store getPosts', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	const factory = async (streamerFetched: boolean = true) => {
		const postsStore = useLinkPostsStore()

		const streamerStore = useStreamerStore()
		if (streamerFetched) {
			streamerStore.profile = profileData
		}

		return { postsStore }
	}

	it('getPosts – success', async () => {
		const { postsStore } = await factory()

		expect(postsStore.isLoadingPosts).toBe(false)

		const promise = postsStore.getPosts()

		expect(postsStore.isLoadingPosts).toBe(true)

		await promise

		expect(getPosts).toHaveBeenCalled()
		expect(postsStore.posts.data).toEqual(postsData.posts)
		expect(postsStore.posts.total).toEqual(postsData.count)
		expect(postsStore.isLoadingPosts).toBe(false)
	})

	it('getPosts – fail, no streamer data', async () => {
		const { postsStore } = await factory(false)

		expect(postsStore.isLoadingPosts).toBe(false)

		const promise = postsStore.getPosts()

		expect(postsStore.isLoadingPosts).toBe(false)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(getPosts).not.toHaveBeenCalled()
		expect(postsStore.posts.data).toEqual(null)
		expect(postsStore.isLoadingPosts).toBe(false)
	})

	it('getPosts – fail, request error', async () => {
		const { postsStore } = await factory();

		(getPosts as Mock).mockRejectedValueOnce({ status: false })

		expect(postsStore.isLoadingPosts).toBe(false)

		const promise = postsStore.getPosts()

		expect(postsStore.isLoadingPosts).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(getPosts).toHaveBeenCalled()
		expect(postsStore.posts.data).toEqual(null)
		expect(postsStore.isLoadingPosts).toBe(false)
	})
})
