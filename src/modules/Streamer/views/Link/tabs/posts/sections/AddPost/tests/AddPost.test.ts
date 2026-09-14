import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import AddPost from '../AddPost.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Posts AddPost', () => {
	const factory = (props = {}) => {
		const wrapper = mount(AddPost, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const postsStore = useLinkPostsStore()

		return { wrapper, postsStore }
	}

	it('calls addPost method on button click', async () => {
		const { wrapper, postsStore } = factory()

		await wrapper.find('[data-test="link-posts-add-new-btn"]').trigger('click')

		expect(postsStore.post).toBeNull()
		expect(postsStore.sidebarVisible).toBe(true)
	})
})
