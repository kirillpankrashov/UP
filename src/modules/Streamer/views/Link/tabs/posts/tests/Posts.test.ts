import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import Posts from '../Posts.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Posts', () => {
	const factory = () => {
		const wrapper = mount(Posts, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link', 'AddPost', 'Feed', 'PostForm'],
			},
		})

		const postsStore = useLinkPostsStore()

		return { wrapper, postsStore }
	}

	it('renders correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent({ name: 'AddPost' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Feed' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'PostForm' }).exists()).toBe(true)
	})

	it('fetches posts on mount', () => {
		const { postsStore } = factory()

		expect(postsStore.getPosts).toHaveBeenCalled()
	})
})
