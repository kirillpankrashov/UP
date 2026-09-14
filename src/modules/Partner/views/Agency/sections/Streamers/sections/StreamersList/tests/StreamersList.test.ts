import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAppStore } from '@/core/store'
import type { IStreamer } from '@/modules/Partner/views/Agency/api'
import { streamers } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'
import { useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import StreamersList from '../StreamersList.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number, _withCents?: boolean, currency?: string) =>
			currency ? `FMT-${value}-${currency}` : `FMT-${value}`,
	}),
}))

vi.mock('moment', () => {
	const fn = (input: string) => ({
		locale: () => ({
			format: (_fmt: string) => `MOCK-DATE(${input})`,
		}),
	})
	return { default: fn }
})

const tableColumnSlotCtx: { row: IStreamer | null } = { row: null }

const ElTableColumnStub = {
	name: 'ElTableColumn',
	props: ['label', 'width'],
	setup (_props: unknown, { slots }: { slots: any }) {
		return () => {
			const row = tableColumnSlotCtx.row
			if (!row || !slots.default) return null
			return slots.default({ row })
		}
	},
}

const ElTableStub = {
	name: 'ElTable',
	template: '<div data-test="el-table"><slot /></div>',
}

describe('Partner Agency Streamers StreamersList Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		tableColumnSlotCtx.row = null
	})

	const factory = (opts?: {
		data?: IStreamer[]
		total?: number
		perPage?: number
		page?: number
		isFetchingStreamers?: boolean
		isFetchingStreamerInfo?: boolean
		isFetchingStreamerAdsets?: boolean
		isFormUpdating?: boolean
	}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		useAppStore()
		const streamersStore = useAgencyStreamersStore(pinia)

		const data = opts?.data ?? streamers.data
		streamersStore.streamers.data = data
		streamersStore.streamers.total = opts?.total ?? streamers.total
		streamersStore.streamers.perPage = opts?.perPage ?? streamers.perPage
		streamersStore.streamers.page = opts?.page ?? 1
		streamersStore.streamers.loading = false
		streamersStore.streamers.isFetched = true
		streamersStore.isFetchingStreamers = opts?.isFetchingStreamers ?? false
		streamersStore.isFetchingStreamerInfo = opts?.isFetchingStreamerInfo ?? false
		streamersStore.isFetchingStreamerAdsets = opts?.isFetchingStreamerAdsets ?? false
		streamersStore.isFormUpdating = opts?.isFormUpdating ?? false

		tableColumnSlotCtx.row = data[0] ?? null

		const wrapper = mount(StreamersList, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					ElTable: ElTableStub,
					ElTableColumn: ElTableColumnStub,
					StreamerStatus: {
						name: 'StreamerStatus',
						props: ['streamer'],
						template: '<div data-test="streamer-status-stub" />',
					},
					StreamersListSkeleton: {
						name: 'StreamersListSkeleton',
						template: '<div data-test="streamers-list-skeleton-stub" />',
					},
					CreativeIcon: { template: '<span data-test="creative-icon" />' },
					GearIcon: { template: '<span data-test="gear-icon" />' },
				},
			},
		})

		return { wrapper, streamersStore }
	}

	it('shows empty state when streamers list is empty', async () => {
		const { wrapper } = factory({ data: [] })
		await nextTick()

		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.creatorsTable.none')
	})

	it('shows skeleton while streamers are loading', async () => {
		const { wrapper } = factory({
			data: [],
			isFetchingStreamers: true,
		})
		await nextTick()

		expect(wrapper.find('[data-test="streamers-list-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(false)
		expect(wrapper.text()).not.toContain('creators.creatorsTable.none')
	})

	it('keeps table visible and hides skeleton while loading more', async () => {
		const { wrapper } = factory({
			data: streamers.data.slice(0, 10),
			total: 11,
			perPage: 10,
			page: 1,
			isFetchingStreamers: true,
		})
		await nextTick()

		expect(wrapper.find('[data-test="streamers-list-skeleton-stub"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(true)
	})

	it('renders table with first row data from store', async () => {
		const row = streamers.data[0]!
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(true)
		expect(wrapper.text()).toContain(`${row.name} (${row.id})`)
		expect(wrapper.text()).toContain(`MOCK-DATE(${row.lastActivity})`)
		expect(wrapper.text()).toContain(`FMT-${row.wallet.balance}-${row.wallet.currency}`)
		expect(wrapper.text()).toContain(String(row.campaigns))
		expect(wrapper.find('[data-test="streamer-status-stub"]').exists()).toBe(true)
	})

	it('creative button calls fetchStreamerAdsets with row id', async () => {
		const row = streamers.data[0]!
		const { wrapper, streamersStore } = factory()
		await nextTick()

		const creativeBtn = wrapper.findAll('button.group.shrink-0.cursor-pointer')[0]!
		await creativeBtn.trigger('click')

		expect(streamersStore.fetchStreamerAdsets).toHaveBeenCalledTimes(1)
		expect(streamersStore.fetchStreamerAdsets).toHaveBeenCalledWith(row.id)
	})

	it('gear button calls fetchStreamerInfo with row id', async () => {
		const row = streamers.data[0]!
		const { wrapper, streamersStore } = factory()
		await nextTick()

		const gearBtn = wrapper.findAll('button.group.shrink-0.cursor-pointer')[1]!
		await gearBtn.trigger('click')

		expect(streamersStore.fetchStreamerInfo).toHaveBeenCalledTimes(1)
		expect(streamersStore.fetchStreamerInfo).toHaveBeenCalledWith(row.id)
	})

	it('shows load more and calls fetchStreamers(next page, true) when clicked', async () => {
		const { wrapper, streamersStore } = factory({
			total: 25,
			perPage: 10,
			page: 1,
		})
		await nextTick()

		const loadMore = wrapper.findAll('button').find(b => b.text().includes('button.loadMore'))
		expect(loadMore).toBeTruthy()

		await loadMore!.trigger('click')

		expect(streamersStore.fetchStreamers).toHaveBeenCalledTimes(1)
		expect(streamersStore.fetchStreamers).toHaveBeenCalledWith(2, true)
	})

	it('hides load more when current page is last', async () => {
		const loadedStreamers = streamers.data.slice(0, 10)

		const { wrapper } = factory({
			data: loadedStreamers,
			total: loadedStreamers.length,
			perPage: 10,
			page: 1,
		})
		await nextTick()

		expect(wrapper.findAll('button').find(b => b.text().includes('button.loadMore'))).toBeFalsy()
	})

	it('shows load more when total is greater than loaded items', async () => {
		const { wrapper } = factory({
			data: streamers.data.slice(0, 10),
			total: 11,
			perPage: 10,
			page: 1,
		})
		await nextTick()

		expect(wrapper.findAll('button').find(b => b.text().includes('button.loadMore'))).toBeTruthy()
	})
})
