import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { deletePost, getPosts } from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkPostsStore } from '../posts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

const POST_ID = 1

describe('Link Posts Store deletePost', () => {
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

	it('deletePost – success', async () => {
		const { postsStore } = await factory()

		const promise = postsStore.deletePost(POST_ID)

		await promise

		expect(deletePost).toHaveBeenCalled()
		expect(getPosts).toHaveBeenCalled()
	})

	it('deletePost – fail, no streamer data', async () => {
		const { postsStore } = await factory(false)

		const promise = postsStore.deletePost(POST_ID)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(deletePost).not.toHaveBeenCalled()
	})

	it('deletePost – fail, request error', async () => {
		const { postsStore } = await factory();

		(deletePost as Mock).mockRejectedValueOnce({ status: false })

		const promise = postsStore.deletePost(POST_ID)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(deletePost).toHaveBeenCalled()
	})
})
