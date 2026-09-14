import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { PrerollAdsetStatus } from '@/core/types'
import { i18n } from '@/core/i18n'
import { prerollAdset } from '@/modules/Streamer/views/Campaigns/api/getPrerollAdsets/fixtures/prerollAdset'

import Status from '../Status.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetCard Tags Preroll Status', () => {
	const factory = (props = {}) => {
		return mount(Status, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...prerollAdset,
					...props,
				},
			},
		})
	}

	describe('Status text', () => {
		it('displays Rejected for REJECTED status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.REJECTED,
			})

			await nextTick()
			expect(wrapper.text()).toContain('Rejected')
		})

		it('displays Rejected for MISSING status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.MISSING,
			})

			await nextTick()
			expect(wrapper.text()).toContain('Rejected')
		})

		it('displays Moderation for MODERATION status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.MODERATION,
			})

			await nextTick()
			expect(wrapper.text()).toContain('Moderation')
		})

		it('displays Active for CONFIRMED status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.CONFIRMED,
			})

			await nextTick()
			expect(wrapper.text()).toContain('Active')
		})
	})

	describe('Tag type', () => {
		it('has danger type for REJECTED status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.REJECTED,
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'ElTag' }).props('type')).toBe('danger')
		})

		it('has danger type for MISSING status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.MISSING,
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'ElTag' }).props('type')).toBe('danger')
		})

		it('has warning type for MODERATION status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.MODERATION,
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'ElTag' }).props('type')).toBe('warning')
		})

		it('has success type for CONFIRMED status', async () => {
			const wrapper = factory({
				status: PrerollAdsetStatus.CONFIRMED,
			})

			await nextTick()
			expect(wrapper.findComponent({ name: 'ElTag' }).props('type')).toBe('success')
		})
	})

	it('has correct base ElTag props', async () => {
		const wrapper = factory()

		await nextTick()
		expect(wrapper.findComponent({ name: 'ElTag' }).props()).toEqual(expect.objectContaining({
			size: 'small',
			round: true,
		}))
	})
})
