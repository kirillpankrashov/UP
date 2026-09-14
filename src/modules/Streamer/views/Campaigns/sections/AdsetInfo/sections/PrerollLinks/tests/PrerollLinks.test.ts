import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PrerollAdsetStatus } from '@/core/types'
import { i18n } from '@/core/i18n'
import { prerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsetInfo/fixtures/prerollAdsetInfo'

import PrerollLinks from '../PrerollLinks.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo PrerollLinks', () => {
	const factory = (props = {}) => {
		return mount(PrerollLinks, {
			global: {
				plugins: [i18n],
				stubs: {
					LinkItem: true,
					PlusIcon: true,
				},
			},
			props: {
				adset: {
					...prerollAdsetInfo,
					...props,
				},
			},
		})
	}

	describe('Component rendering', () => {
		it('renders container with correct class and data attribute', () => {
			const wrapper = factory()

			expect(wrapper.find('[data-name="preroll-links"]').exists()).toBe(true)
			expect(wrapper.find('.mt-8').exists()).toBe(true)
		})

		it('renders "Add another video" button', () => {
			const wrapper = factory()

			const button = wrapper.find('[data-test="add-preroll-link"]')
			expect(button.exists()).toBe(true)
			expect(button.text()).toBe('Add another video')
		})
	})

	describe('VODs handling', () => {
		it('renders LinkItem for each vod', async () => {
			const wrapper = factory({
				vod: [
					{
						id: 1,
						video: 'https://youtube.com/watch?v=video1',
						status: PrerollAdsetStatus.MISSING,
					},
					{
						id: 2,
						video: 'https://youtube.com/watch?v=video2',
						status: PrerollAdsetStatus.CONFIRMED,
					},
				],
			})

			await nextTick()

			const linkItems = wrapper.findAllComponents({ name: 'LinkItem' })
			expect(linkItems).toHaveLength(2)
		})

		it('adds empty vod when there are no vods', async () => {
			const wrapper = factory({
				vod: [],
			})

			await nextTick()

			const linkItems = wrapper.findAllComponents({ name: 'LinkItem' })
			expect(linkItems).toHaveLength(1)

			const firstLinkItem = linkItems[0]
			expect(firstLinkItem.props('vod')).toEqual({
				id: null,
				video: '',
				status: PrerollAdsetStatus.MISSING,
			})
		})

		it('passes correct props to LinkItem', async () => {
			const vod = {
				id: 1,
				video: 'https://youtube.com/watch?v=video1',
				status: PrerollAdsetStatus.MISSING,
			}

			const wrapper = factory({
				slug: 'test-slug',
				vod: [vod],
			})

			await nextTick()

			const linkItem = wrapper.findComponent({ name: 'LinkItem' })
			expect(linkItem.props()).toEqual({
				adsetSlug: 'test-slug',
				vod,
				vods: [vod],
			})
		})
	})

	describe('Add button functionality', () => {
		it('adds new empty vod when clicking add button', async () => {
			const wrapper = factory({
				vod: [
					{
						id: 1,
						video: 'https://youtube.com/watch?v=video1',
						status: PrerollAdsetStatus.MISSING,
					},
				],
			})

			await nextTick()
			expect(wrapper.findAllComponents({ name: 'LinkItem' })).toHaveLength(1)

			await wrapper.find('[data-test="add-preroll-link"]').trigger('click')
			await nextTick()

			const linkItems = wrapper.findAllComponents({ name: 'LinkItem' })
			expect(linkItems).toHaveLength(2)
			expect(linkItems[1].props('vod')).toEqual({
				id: null,
				video: '',
				status: PrerollAdsetStatus.MISSING,
			})
		})

		it('disables add button when last vod is empty', async () => {
			const wrapper = factory({
				vod: [
					{
						id: null,
						video: '',
						status: PrerollAdsetStatus.MISSING,
					},
				],
			})

			await nextTick()

			const button = wrapper.find('[data-test="add-preroll-link"]')
			expect(button.attributes('disabled')).toBeDefined()
		})

		it('enables add button when last vod has id', async () => {
			const wrapper = factory({
				vod: [
					{
						id: 1,
						video: 'https://youtube.com/watch?v=video1',
						status: PrerollAdsetStatus.MISSING,
					},
				],
			})

			await nextTick()

			const button = wrapper.find('[data-test="add-preroll-link"]')
			expect(button.attributes('disabled')).toBeUndefined()
		})
	})
})
