import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElLoadingDirective } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import AdsetsSidebar from '../AdsetsSidebar.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRouter: vi.fn(() => ({
			push: vi.fn(),
			currentRoute: { value: { query: {} } },
		})),
		useRoute: vi.fn(() => ({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})),
	}
})

describe('AdsetsSidebar Component', () => {
	const factory = async (props: any = {}) => {
		const wrapper = mount(AdsetsSidebar, {
			directives: {
				loading: ElLoadingDirective,
			},
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: [],
			},
			props,
		})

		const campaignsStore = useCampaignsStore()

		campaignsStore.adsetsSidebarVisisble = true
		await nextTick()
		campaignsStore.adsets.loading = false
		await nextTick()

		return { wrapper, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders the component with correct initial state', async () => {
		const { wrapper } = await factory()

		await nextTick()

		expect(wrapper.findComponent({ name: 'ElDrawer' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'ElPagination' }).exists()).toBe(true)
	})

	it('opens and closes the drawer based on adsetsSidebarVisisble', async () => {
		const { wrapper, campaignsStore } = await factory()

		const drawer = wrapper.findComponent({ name: 'ElDrawer' })

		campaignsStore.adsetsSidebarVisisble = false
		await nextTick()

		expect(drawer.props('modelValue')).toBe(false)
	})

	it('fetches data when sidebar becomes visible', async () => {
		const { campaignsStore } = await factory()

		await nextTick()

		expect(campaignsStore.fetchCollection).toHaveBeenCalledWith({
			campaignType: campaignsStore.campaignType,
			adEntityType: AdEntityType.ADSETS,
		})
	})

	// it('handles row click correctly', async () => {
	// 	const { wrapper, campaignsStore } = await factory()

	// 	campaignsStore.adsets.items = [brandAwarenessAdset]
	// 	await nextTick()

	// 	const tableRow = wrapper.find('.el-table__row')
	// 	console.log(campaignsStore.adsets.items)
	// 	await tableRow.trigger('click')

	// 	expect(useRouter().push).toHaveBeenCalled()
	// 	// expect(window.location.href).toBe('http://localhost:3000/campaign/test-campaign/group/test-adset/creative/create')
	// })

	it('changes page correctly', async () => {
		const { wrapper, campaignsStore } = await factory()

		campaignsStore.adsets.sidebarPage = 1
		campaignsStore.adsets.total = 50
		await nextTick()

		const pagination = wrapper.findComponent({ name: 'ElPagination' })
		await pagination.vm.$emit('current-change', 2)

		expect(campaignsStore.fetchCollection).toHaveBeenCalledWith({
			campaignType: campaignsStore.campaignType,
			adEntityType: AdEntityType.ADSETS,
			page: 2,
		})
	})
})
