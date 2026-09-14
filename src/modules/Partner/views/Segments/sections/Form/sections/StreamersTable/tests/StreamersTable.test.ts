import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import type { ISegmentStreamer } from '@/modules/Partner/views/Segments/api'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

import StreamersTable from '../StreamersTable.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Segments/api')
vi.mock('vue-router', () => ({
	useRoute: vi.fn(() => ({ query: {} })),
	useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
}))

describe('Partner Segments StreamersTable', () => {
	const mockStreamers: ISegmentStreamer[] = [
		{ id: 1, name: 'Streamer 1', lastActivityAt: '2024-03-20T10:00:00Z' },
		{ id: 2, name: 'Streamer 2', lastActivityAt: undefined },
		{ id: 3, name: 'Streamer 3', lastActivityAt: '2024-03-19T15:30:00Z' },
	]

	const factory = () => {
		const wrapper = mount(StreamersTable, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							app: {
								appLocale: Locale.EN,
							},
							'partner-segments': {
								segment: {
									data: {
										id: 1,
										title: 'Test Segment',
										icon: 'test-icon',
										streamers: mockStreamers,
									},
								},
							},
						},
					}),
				],
			},
		})

		const segmentsStore = useSegmentsStore()
		const appStore = useAppStore()

		return { wrapper, segmentsStore, appStore }
	}

	it('passes correct data to table component', async () => {
		const { wrapper } = factory()
		await nextTick()

		const table = wrapper.findComponent({ name: 'el-table' })

		expect(table.exists()).toBe(true)
		expect(table.props('data')).toHaveLength(mockStreamers.length)
	})

	// it('formats date in table column according to app locale', async () => {
	// 	const { wrapper, appStore } = factory()
	// 	appStore.appLocale = Locale.EN
	// 	await nextTick()

	// 	const formattedDate = moment(mockStreamers[0].lastActivityAt).locale(Locale.EN).format('l')
	// 	expect(wrapper.html()).toContain(formattedDate)
	// })

	it('configures pagination with correct props', async () => {
		const { wrapper } = factory()
		await nextTick()

		const pagination = wrapper.findComponent({ name: 'el-pagination' })

		expect(pagination.props()).toMatchObject({
			layout: 'prev, pager, next',
			total: mockStreamers.length,
			pageSize: 10,
			currentPage: 1,
		})
	})
})
