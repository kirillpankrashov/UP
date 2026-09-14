import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import AdsetStreamers from '../AdsetStreamers.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, params?: { title?: string }) => {
			if (params?.title) return `${key}:${params.title}`
			return key
		},
	}),
	useCurrency: () => ({
		formatCurrency: (value: number) => `FMT-${value}`,
	}),
}))

vi.mock('@/components/element-plus', () => ({
	ElDrawer: {
		name: 'ElDrawer',
		props: ['modelValue', 'title', 'direction', 'size'],
		template: `
			<div data-test="drawer" :data-title="title">
				<slot />
			</div>
		`,
	},
	ElTable: {
		name: 'ElTable',
		props: ['data'],
		template: `
			<div>
				<div v-for="row in data" :key="row.nickname" data-test="table-row">
					{{ row.nickname }}
				</div>
				<slot />
			</div>
		`,
	},
	ElTableColumn: {
		name: 'ElTableColumn',
		template: '<div />',
		props: ['label', 'width'],
	},
	ElSwitch: {
		name: 'ElSwitch',
		template: '<div data-test="el-switch" />',
		props: ['disabled', 'modelValue'],
	},
	ElPagination: {
		name: 'ElPagination',
		props: ['currentPage'],
		template: `
			<button
				data-test="el-pagination"
				@click="$emit('current-change', currentPage + 1)"
			/>
		`,
	},
}))

describe('Partner Agency AdsetStreamers', () => {
	const createStoreMock = (options?: {
		slug?: string | null
		title?: string
		rows?: Array<any>
		perPage?: number
		page?: number
		total?: number
		isFetchingData?: boolean
	}) => {
		const rows = options?.rows ?? []
		const slug = options?.slug === undefined ? 'streamers-slug' : options?.slug
		const title = options?.title ?? 'Creators title'

		return {
			adsetTitle: title,
			adsetSlug: slug,
			isFetchingData: options?.isFetchingData ?? false,
			adsetStreamers: {
				data: rows,
				perPage: options?.perPage ?? 10,
				page: options?.page ?? 1,
				total: options?.total ?? rows.length,
			},
			getStreamers: vi.fn(),
		} as any
	}

	const factory = (store: any) => {
		return mount(AdsetStreamers, {
			props: {
				modelValue: false,
				adsetsStore: store,
			},
			global: {
				stubs: {
					AdsetStreamersSkeleton: {
						name: 'AdsetStreamersSkeleton',
						template: '<div data-test="adset-streamers-skeleton" />',
					},
				},
			},
		})
	}

	it('renders none state when there are no streamers', async () => {
		const store = createStoreMock({ rows: [] })
		const wrapper = factory(store)

		// adsetStreamers empty -> no table, pagination
		expect(wrapper.findAll('[data-test="table-row"]')).toHaveLength(0)
		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.stats.none')
	})

	it('shows skeleton while fetching and streamers list is empty', async () => {
		const store = createStoreMock({ rows: [], isFetchingData: true })
		const wrapper = factory(store)

		await nextTick()

		expect(wrapper.find('[data-test="adset-streamers-skeleton"]').exists()).toBe(true)
		expect(wrapper.findAll('[data-test="table-row"]')).toHaveLength(0)
		expect(wrapper.text()).not.toContain('creators.stats.none')
	})

	it('renders table rows and pagination when streamers exist', async () => {
		const rows = [
			{
				nickname: 'nick-1',
				revenue: 10,
				currency: 'USD',
				impressions: 100,
				averageCtr: 0.2,
				dailyCtr: 0.4,
				status: 'active',
			},
			{
				nickname: 'nick-2',
				revenue: 11,
				currency: 'USD',
				impressions: 200,
				averageCtr: 0.1,
				dailyCtr: 0.2,
				status: 'active',
			},
		]

		const store = createStoreMock({ rows, page: 2, total: 2 })
		const wrapper = factory(store)

		expect(wrapper.findAll('[data-test="table-row"]')).toHaveLength(2)
		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(true)
	})

	it('calls getStreamers(slug, nextPage) on pagination change', async () => {
		const store = createStoreMock({ rows: [{ nickname: 'nick-1' }], page: 1, slug: 's1' })
		const wrapper = factory(store)

		await wrapper.find('[data-test="el-pagination"]').trigger('click')
		expect(store.getStreamers).toHaveBeenCalledWith('s1', 2)
	})

	it('does not call getStreamers when adsetSlug is null', async () => {
		const store = createStoreMock({ rows: [{ nickname: 'nick-1' }], page: 1, slug: null })
		const wrapper = factory(store)

		await wrapper.find('[data-test="el-pagination"]').trigger('click')
		expect(store.getStreamers).not.toHaveBeenCalled()
	})

	it('sets drawer title from adsetTitle', () => {
		const store = createStoreMock({ title: 'My creators title' })
		const wrapper = factory(store)

		const drawer = wrapper.find('[data-test="drawer"]')
		expect(drawer.attributes('data-title')).toBe('creators.campaignCreators.title:My creators title')
	})
})

