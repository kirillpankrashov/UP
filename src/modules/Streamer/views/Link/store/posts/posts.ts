import { defineStore } from 'pinia'

import type { ILinkPost } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import * as LinkApi from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

export const POST_CONTENT_MAX_LENGTH = 1024

export type ILinkPostModel = Pick<ILinkPost, 'content' | 'embed'>

interface State {
  posts: {
    perPage: number
    page: number
    total: number
    data: null | ILinkPost[]
  }
	isLoadingPosts: boolean
  post: ILinkPost | ILinkPostModel | null
	isLoadingPost: boolean
  sidebarVisible: boolean
}

export const useLinkPostsStore = defineStore('linkPosts', {
	state: (): State => ({
		posts: {
			perPage: 25,
			page: 1,
			total: 25,
			data: null,
		},
		isLoadingPosts: false,
		post: null,
		isLoadingPost: false,
		sidebarVisible: false,
	}),

	actions: {
		async getPosts () {
			const streamerStore = useStreamerStore()

			try {
				if (!streamerStore.streamerId) {
					throw new Error('No streamer data fetched yet')
				}

				this.isLoadingPosts = true

				const limit = this.posts.perPage
				const offset = limit * (this.posts.page - 1)
				const res = await LinkApi.getPosts(limit, offset)

				this.posts.data = res.posts
				this.posts.total = res.count
			}
			catch(err) {
				Logger.error('Error fetching posts', true, err)
			}
			finally {
				this.isLoadingPosts = false
			}
		},

		async submitPost (post: ILinkPost | ILinkPostModel) {
			const streamerStore = useStreamerStore()

			try {
				if (!streamerStore.streamerId) {
					throw new Error('No streamer data fetched yet')
				}

				this.isLoadingPost = true
				this.post = post

				if ('id' in this.post) {
					await LinkApi.updatePost(this.post)
				}
				else {
					await LinkApi.createPost(this.post)
				}
				this.getPosts()
			}
			catch (err) {
				Logger.error('Error creating or updating post', false, err)
			}
			finally {
				this.isLoadingPost = false
			}
		},

		async deletePost (id: number) {
			const streamerStore = useStreamerStore()

			try {
				if (!streamerStore.streamerId) {
					throw new Error('No streamer data fetched yet')
				}

				await LinkApi.deletePost(id)
				this.getPosts()
			}
			catch (err) {
				Logger.error('Error deleting post', false, err)
			}
		},
	},
})
