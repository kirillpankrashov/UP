import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { postsData } from '@/modules/Streamer/views/Link/api/getPosts/fixtures/postsData'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import Feed from '../Feed.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Posts Feed', () => {
	const factory = () => {
		const wrapper = mount(Feed, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['Post', 'ElPagination'],
			},
		})

		const postsStore = useLinkPostsStore()

		postsStore.posts.data = postsData.posts

		return { wrapper, postsStore }
	}

	it('renders posts correctly', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findAllComponents({ name: 'Post' }).length).toBe(postsData.posts.length)
	})

	it('renders pagination when there are posts', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.findComponent({ name: 'ElPagination' }).exists()).toBe(true)
	})

	it('does not render pagination when there are no posts', async () => {
		const { wrapper, postsStore } = factory()

		postsStore.posts.data = []

		await nextTick()

		expect(wrapper.findComponent({ name: 'ElPagination' }).exists()).toBe(false)
	})

	it('calls postsStore.getPosts on changePage', async () => {
		const { wrapper, postsStore } = factory()

		wrapper.vm.changePage(2)

		expect(postsStore.posts.page).toBe(2)
		expect(postsStore.getPosts).toHaveBeenCalled()
	})
})
