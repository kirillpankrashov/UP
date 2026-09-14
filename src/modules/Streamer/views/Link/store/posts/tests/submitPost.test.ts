import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { Logger } from '@/core/helpers'
import { createPost, getPosts, updatePost } from '@/modules/Streamer/views/Link/api'
import { postData } from '@/modules/Streamer/views/Link/api/createPost/fixtures/postData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import { useLinkPostsStore } from '../posts'

vi.mock('@/core/helpers')
vi.mock('@/modules/Streamer/views/Link/api')

const newPost = {
	content: 'test',
	embed: 'test',
}

describe('Link Posts Store submitPost', () => {
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

	it('submitPost – success, calls updatePost if post have id', async () => {
		const { postsStore } = await factory()

		expect(postsStore.isLoadingPost).toBe(false)

		const promise = postsStore.submitPost(postData)

		expect(postsStore.isLoadingPost).toBe(true)

		await promise

		expect(updatePost).toHaveBeenCalled()
		expect(getPosts).toHaveBeenCalled()
		expect(postsStore.post).toEqual(postData)
		expect(postsStore.isLoadingPost).toBe(false)
	})

	it('submitPost – success, calls createPost if post doesn\'t have id', async () => {
		const { postsStore } = await factory()

		expect(postsStore.isLoadingPost).toBe(false)

		const promise = postsStore.submitPost(newPost)

		expect(postsStore.isLoadingPost).toBe(true)

		await promise

		expect(createPost).toHaveBeenCalled()
		expect(getPosts).toHaveBeenCalled()
		expect(postsStore.post).toEqual(newPost)
		expect(postsStore.isLoadingPost).toBe(false)
	})

	it('submitPost – fail, no streamer data', async () => {
		const { postsStore } = await factory(false)

		expect(postsStore.isLoadingPost).toBe(false)

		const promise = postsStore.submitPost(postData)

		expect(postsStore.isLoadingPost).toBe(false)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(createPost).not.toHaveBeenCalled()
		expect(updatePost).not.toHaveBeenCalled()
		expect(getPosts).not.toHaveBeenCalled()
		expect(postsStore.post).toEqual(null)
		expect(postsStore.isLoadingPost).toBe(false)
	})

	it('submitPost – fail, createPost throws request error', async () => {
		const { postsStore } = await factory();

		(createPost as Mock).mockRejectedValueOnce({ status: false })

		expect(postsStore.isLoadingPost).toBe(false)

		const promise = postsStore.submitPost(newPost)

		expect(postsStore.isLoadingPost).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(createPost).toHaveBeenCalled()
		expect(getPosts).not.toHaveBeenCalled()
		expect(postsStore.post).toEqual(newPost)
		expect(postsStore.isLoadingPost).toBe(false)
	})

	it('submitPost – fail, updatePost throws request error', async () => {
		const { postsStore } = await factory();

		(updatePost as Mock).mockRejectedValueOnce({ status: false })

		expect(postsStore.isLoadingPost).toBe(false)

		const promise = postsStore.submitPost(postData)

		expect(postsStore.isLoadingPost).toBe(true)

		await promise

		expect(Logger.error).toHaveBeenCalled()
		expect(updatePost).toHaveBeenCalled()
		expect(getPosts).not.toHaveBeenCalled()
		expect(postsStore.post).toEqual(postData)
		expect(postsStore.isLoadingPost).toBe(false)
	})
})
