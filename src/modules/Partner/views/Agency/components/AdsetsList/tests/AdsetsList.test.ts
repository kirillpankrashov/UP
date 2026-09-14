import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import AdsetsList from '../AdsetsList.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/components/element-plus', () => ({
	ElSelect: {
		name: 'ElSelect',
		props: ['modelValue'],
		template: '<div data-test="el-select"><slot name="label" :label="modelValue" :value="modelValue" /><slot /></div>',
	},
	ElOption: {
		name: 'ElOption',
		props: ['label', 'value'],
		template: '<div />',
	},
	ElPagination: {
		name: 'ElPagination',
		props: ['currentPage'],
		template: '<button data-test="el-pagination" @click="$emit(\'current-change\', currentPage + 1)" />',
	},
}))

vi.mock('@/components/layouts', () => ({
	DashboardSection: {
		name: 'DashboardSection',
		template: `
			<div data-test="dashboard-section">
				<div data-test="dashboard-left"><slot name="left" /></div>
				<div data-test="dashboard-body"><slot /></div>
			</div>
		`,
	},
}))

describe('Partner Agency AdsetsList Component', () => {
	const createStoreMock = (dataLength: number, options?: { isFetchingData?: boolean }) => {
		const data = dataLength ? adsetsActiveData.data.slice(0, dataLength) : []

		return {
			isFetchingData: options?.isFetchingData ?? false,
			adsets: {
				data,
				perPage: adsetsActiveData.perPage,
				page: 5,
				total: adsetsActiveData.total,
			},
			setTypeCompany: vi.fn(),
			getAdsets: vi.fn(),
		} as any
	}

	const createWrapper = (props?: any) => {
		const store = props?.adsetsStore ?? createStoreMock(0)

		return mount(AdsetsList, {
			props: {
				title: 'Test Title',
				description: 'Test Description',
				adsetsStore: store,
			},
			global: {
				stubs: {
					AdsetCard: {
						name: 'AdsetCard',
						props: ['adset', 'adsetsStore'],
						template: '<div data-test="adset-card">{{ adset.id }}</div>',
					},
					AdsetsListSkeleton: {
						name: 'AdsetsListSkeleton',
						template: `
							<div data-test="partner-agency-adsets-list-skeleton">
								<div v-for="i in 5" :key="i" data-test="adset-card-skeleton-stub" />
							</div>
						`,
					},
				},
			},
		})
	}

	it('renders title and description', () => {
		const wrapper = createWrapper()

		expect(wrapper.text()).toContain('Test Title')
		expect(wrapper.text()).toContain('Test Description')
	})

	it('shows empty state when there are no adsets', () => {
		const wrapper = createWrapper({ adsetsStore: createStoreMock(0) })

		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.campaigns.none')
	})

	it('shows list skeleton with five card placeholders while fetching and list is empty', async () => {
		const wrapper = createWrapper({ adsetsStore: createStoreMock(0, { isFetchingData: true }) })

		await nextTick()

		expect(wrapper.find('[data-test="partner-agency-adsets-list-skeleton"]').exists()).toBe(true)
		expect(wrapper.findAll('[data-test="adset-card-skeleton-stub"]')).toHaveLength(5)
		expect(wrapper.find('[data-test="el-pagination"]').exists()).toBe(false)
		expect(wrapper.text()).not.toContain('creators.campaigns.none')
	})

	it('renders AdsetCard for each adset', () => {
		const store = createStoreMock(2)
		const wrapper = createWrapper({ adsetsStore: store })

		const cards = wrapper.findAll('[data-test="adset-card"]')
		expect(cards).toHaveLength(2)
		expect(cards[0].text()).toBe(String(store.adsets.data[0].id))
	})

	it('calls getAdsets with selected page on pagination change', async () => {
		const store = createStoreMock(2)
		const wrapper = createWrapper({ adsetsStore: store })

		await wrapper.find('[data-test="el-pagination"]').trigger('click')

		// ElPagination stub emits currentPage + 1
		expect(store.getAdsets).toHaveBeenCalledWith(store.adsets.page + 1)
	})

	it('calls setTypeCompany and resets page to 1 on type change', () => {
		const store = createStoreMock(2)
		const wrapper = createWrapper({ adsetsStore: store })

		;(wrapper.vm as any).onTypeChange(CampaignType.PERFORMANCE)

		expect(store.setTypeCompany).toHaveBeenCalledWith(CampaignType.PERFORMANCE)
		expect(store.getAdsets).toHaveBeenCalledWith(1)
	})
})

