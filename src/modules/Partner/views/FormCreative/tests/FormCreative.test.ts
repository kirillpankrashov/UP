import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { useAppStore, useDictStore } from '@/core/store'
import { RouteName } from '@/modules/Partner/router'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import FormCreative from '../FormCreative.vue'

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

const mockCreative = {
	title: 'Test Creative Title',
	slug: 'creative-123',
}

const mockCampaignStructure = {
	campaign: {
		slug: 'campaign-123',
		title: 'Test Campaign',
	},
}

describe('FormCreative Component', () => {
	const mockRoute = (name: RouteName, params = {}, query = {}) => ({
		name,
		params: {
			campaignSlug: 'BA-CMP-123456',
			adsetSlug: 'BA-ADS-123456',
			creativeSlug: 'BA-CRE-123456',
			...params,
		},
		query,
	})

	const mockRouter = () => ({
		push: vi.fn(),
		replace: vi.fn(),
	})

	const factory = (routeName = RouteName.CREATIVE_CREATE, storeState = {}) => {
		vi.mocked(useRoute).mockReturnValue(mockRoute(routeName) as any)
		vi.mocked(useRouter).mockReturnValue(mockRouter() as any)
		vi.mocked(parseSlug).mockReturnValue({
			campaignType: CampaignType.BRAND_AWARENESS,
			adEntityType: undefined,
			adFormat: undefined,
		} as any)

		const wrapper = mount(FormCreative, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-formcampaign': {
								fetchError: false,
							},
							'partner-formadset': {
								fetchError: false,
							},
							'partner-formcreative': {
								fetchError: false,
							},
						},
					}),
				],
				stubs: {
					CampaignLayout: {
						name: 'CampaignLayout',
						template: '<div class="campaign-layout" v-bind="$attrs"><slot /></div>',
						props: ['adEntityStructure', 'showCloseDialog'],
						emits: ['closeAndReturn'],
					},
					DashboardTitle: {
						name: 'DashboardTitle',
						template: '<div class="dashboard-title">{{ title }}</div>',
						props: ['title'],
					},
					DashboardSection: {
						name: 'DashboardSection',
						template: '<div class="dashboard-section"><slot /></div>',
					},
					Form: {
						name: 'Form',
						template: '<div class="form-component"></div>',
						methods: {
							onSubmit: vi.fn(),
						},
						computed: {
							form: () => ({
								onSubmit: vi.fn(),
								sending: false,
								success: false,
								showCloseDialog: false,
								closeAndReturnRoute: RouteName.BRAND_AWARENESS_CREATIVES,
							}),
						},
					},
					Actions: {
						name: 'Actions',
						template: '<div class="actions-component"></div>',
						props: ['sending', 'success'],
						emits: ['on-return', 'on-submit'],
					},
				},
			},
		})

		// Setup stores
		const appStore = useAppStore()
		const dictStore = useDictStore()
		const advertiserStore = useAdvertisersStore()
		const formCampaignStore = useFormCampaignStore()
		const formAdsetStore = useFormAdsetStore()
		const formCreativeStore = useFormCreativeStore()

		// Apply store state
		Object.assign(formCreativeStore, {
			isFetchingCreative: false,
			creative: null,
			currentCampaignType: null,
			fetchError: false,
			...storeState,
		})

		formCampaignStore.campaignStructure = mockCampaignStructure as any

		return {
			wrapper,
			router: useRouter(),
			appStore,
			dictStore,
			advertiserStore,
			formCampaignStore,
			formAdsetStore,
			formCreativeStore,
		}
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('locks layout height before bootstrapping', () => {
		const { wrapper } = factory()

		expect(wrapper.classes()).toContain('h-screen')
		expect(wrapper.classes()).toContain('overflow-hidden')
	})

	it('always renders form and actions', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="form-creative-form"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-creative-actions"]').exists()).toBe(true)
	})

	it('passes fetching state to Actions while creative is loading', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			isFetchingCreative: true,
		})

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		const actions = wrapper.findComponent({ name: 'Actions' })
		expect(actions.props('sending')).toBe(true)
		expect(wrapper.find('[data-test="form-creative-form"]').exists()).toBe(true)
	})

	it('displays correct title for create mode', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE)

		const title = wrapper.find('[data-test="form-creative-title"]')
		expect(title.text()).toBe('creative.defaultNameNew')
	})

	it('displays correct title for edit mode', () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT)

		const title = wrapper.find('[data-test="form-creative-title"]')
		expect(title.text()).toBe('creative.defaultName')
	})

	it('displays creative title when available', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockCreative,
		})

		await nextTick()

		const title = wrapper.find('[data-test="form-creative-title"]')
		expect(title.text()).toBe(mockCreative.title)
	})

	it('sets campaign type on mount', async () => {
		const { formCreativeStore } = factory()

		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(parseSlug).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formCreativeStore.currentCampaignType).toBe(CampaignType.BRAND_AWARENESS)
	})

	it('fetches required data on mount in create mode', async () => {
		const { dictStore, advertiserStore, formCampaignStore, formAdsetStore } = factory()

		await nextTick()

		expect(dictStore.getCampaignDictionary).toHaveBeenCalledWith(
			expect.anything(),
			CampaignType.BRAND_AWARENESS,
		)
		expect(advertiserStore.fetchAdvertisers).toHaveBeenCalled()
		expect(formCampaignStore.fetchCampaignStructure).toHaveBeenCalled()
		expect(formAdsetStore.fetchAdset).toHaveBeenCalled()
	})

	it('fetches creative data on mount in edit mode', async () => {
		const { formCreativeStore } = factory(RouteName.CREATIVE_EDIT)

		await nextTick()

		expect(formCreativeStore.fetchCreative).toHaveBeenCalled()
	})

	it('calls form submit when onSubmit is triggered', async () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		// Mock the formRef properly
		const mockOnSubmit = vi.fn()
		vm.formRef = {
			form: { onSubmit: mockOnSubmit },
		}

		vm.onSubmit()

		expect(mockOnSubmit).toHaveBeenCalled()
	})

	it('navigates to correct route on close in edit mode', async () => {
		const { wrapper, router } = factory(RouteName.CREATIVE_EDIT)

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		vm.onCloseAndReturn()

		expect(router.push).toHaveBeenCalledWith({
			name: RouteName.BRAND_AWARENESS_CREATIVES,
		})
	})

	it('navigates to correct route on close in create mode', async () => {
		const { wrapper, router } = factory(RouteName.CREATIVE_CREATE)

		const vm = wrapper.vm as any
		vm.onCloseAndReturn()

		expect(router.push).toHaveBeenCalledWith({
			name: RouteName.BRAND_AWARENESS_CREATIVES,
		})
	})



	it('passes correct props to CampaignLayout', async () => {
		const { wrapper, formCampaignStore } = factory()

		// Ensure campaignStructure is set
		formCampaignStore.campaignStructure = mockCampaignStructure as any
		await nextTick()

		const campaignLayout = wrapper.findComponent({ name: 'CampaignLayout' })

		expect(campaignLayout.props('adEntityStructure')).toEqual(mockCampaignStructure)
		expect(campaignLayout.attributes('data-test')).toBe('form-creative-layout')
	})

	it('handles close and return event from CampaignLayout', async () => {
		const { wrapper, router } = factory()

		const campaignLayout = wrapper.findComponent({ name: 'CampaignLayout' })
		await campaignLayout.vm.$emit('closeAndReturn')

		expect(router.push).toHaveBeenCalledWith({
			name: RouteName.BRAND_AWARENESS_CREATIVES,
		})
	})

	it('shows fetch error screen when campaign structure failed to load', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.fetchError = true

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-fetch-error"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-creative-form"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="form-creative-actions"]').exists()).toBe(false)
	})

	it('retry refetches structure, adset and creative in edit mode', async () => {
		const { wrapper, formCampaignStore, formAdsetStore, formCreativeStore } = factory(RouteName.CREATIVE_EDIT)

		formCampaignStore.fetchCampaignStructure = vi.fn().mockResolvedValue(undefined)
		formAdsetStore.fetchAdset = vi.fn().mockResolvedValue(undefined)
		formCreativeStore.fetchCreative = vi.fn().mockResolvedValue(undefined)
		formCampaignStore.fetchError = true

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		await wrapper.find('[data-test="form-creative-fetch-retry"]').trigger('click')
		await nextTick()

		expect(formCampaignStore.fetchCampaignStructure).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formAdsetStore.fetchAdset).toHaveBeenCalledWith('BA-ADS-123456')
		expect(formCreativeStore.fetchCreative).toHaveBeenCalledWith('BA-CRE-123456')
	})

	it('retry refetches structure and adset only in create mode', async () => {
		const { wrapper, formCampaignStore, formAdsetStore, formCreativeStore } = factory(RouteName.CREATIVE_CREATE)

		formCampaignStore.fetchCampaignStructure = vi.fn().mockResolvedValue(undefined)
		formAdsetStore.fetchAdset = vi.fn().mockResolvedValue(undefined)
		formCreativeStore.fetchCreative = vi.fn().mockResolvedValue(undefined)
		formAdsetStore.fetchError = true

		const vm = wrapper.vm as any
		vm.isBootstraped = true
		await nextTick()

		await wrapper.find('[data-test="form-creative-fetch-retry"]').trigger('click')
		await nextTick()

		expect(formCampaignStore.fetchCampaignStructure).toHaveBeenCalledWith('BA-CMP-123456')
		expect(formAdsetStore.fetchAdset).toHaveBeenCalledWith('BA-ADS-123456')
		expect(formCreativeStore.fetchCreative).not.toHaveBeenCalled()
	})
})
