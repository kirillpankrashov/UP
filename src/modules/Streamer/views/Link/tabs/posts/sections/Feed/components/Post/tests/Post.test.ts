import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { describe, expect, it, vi } from 'vitest'

import type { ILinkPost } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import Post from '../Post.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

const TEST_POST: ILinkPost = {
	id: 1,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	content: 'Hello **world**!',
	embed: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}

describe('Streamer Link Posts Post', () => {
	const factory = (props = {}) => {
		const wrapper = mount(Post, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link', 'EmbedPreview', 'ElPopover'],
			},
			props: {
				post: TEST_POST,
				...props,
			},
		})

		const postsStore = useLinkPostsStore()
		const appStore = useAppStore()

		return { wrapper, postsStore, appStore }
	}

	it('renders correctly with markup and embed', async () => {
		const { wrapper } = factory({
			post: TEST_POST,
		})

		await nextTick()

		expect(wrapper.find('[data-test="post-markup"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="post-embed"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'EmbedPreview' }).exists()).toBe(true)
	})

	it('displays formatted date', () => {
		const { wrapper, appStore } = factory({
			post: TEST_POST,
		})

		const formattedDate = moment(TEST_POST.createdAt).locale(appStore.appLocale).format('LLL')
		expect(wrapper.find('[data-test="post-date"]').text()).toContain(formattedDate)
	})

	it('sets postStore.post to selected post when onEdit called', async () => {
		const { wrapper, postsStore } = factory({
			post: TEST_POST,
		})

		wrapper.vm.onEdit()

		expect(postsStore.post).toEqual(wrapper.props().post)
		expect(postsStore.sidebarVisible).toBe(true)
	})

	it('calls postStore.deletePost method when onDelete called', async () => {
		const { wrapper, postsStore } = factory({
			post: TEST_POST,
		})

		wrapper.vm.onDelete()

		expect(postsStore.deletePost).toHaveBeenCalledWith(TEST_POST.id)
	})
})
