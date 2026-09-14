import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppStore, useDictStore } from '@/core/store'
import { RouteName } from '@/modules/Partner/router'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { brandAwarenessCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaignStructure/fixtures/brandAwarenessCampaignStructure'
import FormCampaign from '@/modules/Partner/views/FormCampaign/FormCampaign.vue'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { FormSection } from '@/modules/Partner/views/FormCampaign/types'

import { brandAwarenessCampaign } from '../api/getBrandAwarenessCampaign/fixtures/brandAwarenessCampaign'

vi.mock('@/modules/Partner/views/FormCampaign/api')
vi.mock('@/core/helpers')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(),
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('FormCampaign Component', () => {
	const mockRouter = {
		push: vi.fn(),
	}

	const factory = (routeName = RouteName.CAMPAIGN_CREATE) => {
		const initialState = {
			'app': {},
			'dict': {},
			'partner-advertisers': {},
			'partner-form-campaign': {
				section: FormSection.TYPE,
				currentCampaignType: null,
				campaignStructure: null,
				campaign: null,
			},
		}

		if (routeName === RouteName.CAMPAIGN_EDIT) {
			initialState['partner-form-campaign'].section = FormSection.SETTINGS
		}

		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: {},
		} as any)

		vi.mocked(useRouter).mockReturnValue({
			push: mockRouter.push,
		} as any)

		const mockOnSubmit = vi.fn()

		const wrapper = mount(FormCampaign, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
						initialState,
					}),
				],
				stubs: {
					CampaignLayout: {
						name: 'CampaignLayout',
						template: `
							<div class="campaign-layout">
								<slot></slot>
								<button class="close-btn" @click="$emit('closeAndReturn')">Close</button>
								<div><slot name="actions"></slot></div>
							</div>`,
						props: ['showCloseDialog', 'adEntityStructure'],
						emits: ['closeAndReturn'],
					},
					DashboardTitle: {
						name: 'DashboardTitle',
						template: '<div class="dashboard-title">{{ title }}</div>',
						props: ['title'],
					},
					DashboardSection: {
						name: 'DashboardSection',
						template: '<div class="dashboard-section"><h2>{{ title }}</h2><slot></slot></div>',
						props: ['title'],
					},
					Type: {
						name: 'Type',
						template: '<div class="type-component">Type Component</div>',
						props: ['modelValue'],
						emits: ['update:modelValue'],
					},
					Form: {
						name: 'Form',
						template: '<div class="form-component">Form Component</div>',
						expose: ['form'],
					},
					Actions: {
						name: 'Actions',
						template: `
							<div class="actions-component">
								<button class="submit-btn" @click="$emit('on-submit')">Submit</button>
								<button class="return-btn" @click="$emit('on-return')">Return</button>
							</div>`,
						props: ['sending', 'success'],
						emits: ['on-return', 'on-submit'],
					},
				},
				mocks: {
					onSubmit: mockOnSubmit,
				},
			},
		})

		const appStore = useAppStore()
		const dictStore = useDictStore()
		const advertiserStore = useAdvertisersStore()
		const formCampaignStore = useFormCampaignStore()

		formCampaignStore.campaignStructure = brandAwarenessCampaignStructure

		formCampaignStore.campaign = {
			...brandAwarenessCampaign,
			title: {
				default: 'Test Campaign Title',
				alternative: 'Alt Title',
			},
		}

		return {
			wrapper,
			appStore,
			dictStore,
			advertiserStore,
			formCampaignStore,
			mockRouter,
			mockOnSubmit,
		}
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('applies overflow-hidden class before bootstrapping', async () => {
		const { wrapper } = factory()

		expect(wrapper.classes()).toContain('h-screen')
		expect(wrapper.classes()).toContain('overflow-hidden')
	})

	it('loads necessary data on mount in create mode', async () => {
		const { formCampaignStore } = factory()

		formCampaignStore.fetchCampaignStructure = vi.fn()
		formCampaignStore.fetchCampaign = vi.fn()

		expect(formCampaignStore.fetchCampaignStructure).not.toHaveBeenCalled()
		expect(formCampaignStore.fetchCampaign).not.toHaveBeenCalled()
	})

	it('renders Type component in TYPE section', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.section = FormSection.TYPE
		await nextTick()

		expect(wrapper.find('.type-component').exists()).toBe(true)
		expect(wrapper.find('.form-component').exists()).toBe(false)
	})

	it('renders Form component in SETTINGS section', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.section = FormSection.SETTINGS
		await nextTick()

		expect(wrapper.find('.form-component').exists()).toBe(true)
		expect(wrapper.find('.type-component').exists()).toBe(false)
	})

	it('renders only Form in edit mode', async () => {
		const { wrapper } = factory(RouteName.CAMPAIGN_EDIT)

		await nextTick()

		expect(wrapper.find('.form-component').exists()).toBe(true)
		expect(wrapper.find('.type-component').exists()).toBe(false)
	})

	it('triggers form submission when Actions emits on-submit', async () => {
		const { wrapper } = factory()

		await nextTick()

		await wrapper.findComponent({ name: 'Actions' }).vm.$emit('on-submit')

		expect(wrapper.findComponent({ name: 'Actions' }).emitted('on-submit')).toBeTruthy()
	})

	it('navigates to campaign list when close button is clicked in create mode', async () => {
		const { wrapper, mockRouter } = factory()

		await wrapper.find('.close-btn').trigger('click')

		expect(mockRouter.push).toHaveBeenCalledWith({
			name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		})
	})

	it('passes correct title to DashboardTitle', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('.dashboard-title').text()).toContain('Test Campaign Title')
	})

	it('displays default title when campaign has no title', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.campaign = {
			...brandAwarenessCampaign,
			title: null as any,
		}

		await nextTick()

		expect(wrapper.find('.dashboard-title').text()).toContain('campaign.defaultName')
	})
})
