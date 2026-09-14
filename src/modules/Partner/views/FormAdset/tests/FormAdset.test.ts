import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppStore, useDictStore } from '@/core/store'
import { RouteName } from '@/modules/Partner/router'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { performanceAdset } from '@/modules/Partner/views/FormAdset/api/getPerformanceAdset/fixtures/performanceAdset'
import FormAdset from '@/modules/Partner/views/FormAdset/FormAdset.vue'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { performanceCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaignStructure/fixtures/performanceCampaignStructure'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

vi.mock('@/modules/Partner/views/FormAdset/api')
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

describe('FormAdset Component', () => {
	const mockRouter = {
		push: vi.fn(),
	}

	const factory = (routeName = RouteName.ADSET_CREATE) => {
		const initialState = {
			'app': {},
			'dict': {},
			'partner-advertisers': {},
			'partner-form-campaign': {
				campaignStructure: null,
				fetchError: false,
			},
			'partner-form-adset': {
				currentCampaignType: null,
				adset: null,
				isFetchingAdset: false,
				fetchError: false,
			},
		}

		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: {
				campaignSlug: 'PF-CMP-1748539211',
				...(routeName === RouteName.ADSET_EDIT ? { adsetSlug: 'PF-ADS-test' } : {}),
			},
			query: {},
		} as any)

		vi.mocked(useRouter).mockReturnValue({
			push: mockRouter.push,
		} as any)

		const wrapper = mount(FormAdset, {
			data() {
				return {
					isBootstraped: false,
				}
			},
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
						template: '<div class="dashboard-section"><slot /></div>',
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
			},
		})

		const appStore = useAppStore()
		const dictStore = useDictStore()
		const advertiserStore = useAdvertisersStore()
		const formCampaignStore = useFormCampaignStore()
		const formAdsetStore = useFormAdsetStore()

		formCampaignStore.campaignStructure = performanceCampaignStructure

		if (routeName === RouteName.ADSET_EDIT) {
			formAdsetStore.adset = performanceAdset
		}
		else {
			formAdsetStore.adset = null
		}

		const setBootstraped = async () => {
			await wrapper.setData({ isBootstraped: true })
		}

		return {
			wrapper,
			appStore,
			dictStore,
			advertiserStore,
			formCampaignStore,
			formAdsetStore,
			mockRouter,
			setBootstraped,
		}
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('shows loading state before bootstrapping', async () => {
		const { wrapper } = factory()

		expect(wrapper.classes()).toContain('h-screen')
		expect(wrapper.classes()).toContain('overflow-hidden')

		expect(wrapper.find('[data-test="form-adset-form"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-adset-actions"]').exists()).toBe(true)
	})

	it('loads necessary data on mount in create mode', async () => {
		const { formAdsetStore, formCampaignStore } = factory()

		formAdsetStore.fetchAdset = vi.fn()
		formCampaignStore.fetchCampaignStructure = vi.fn()

		expect(formAdsetStore.fetchAdset).not.toHaveBeenCalled()
		expect(formCampaignStore.fetchCampaignStructure).not.toHaveBeenCalled()
	})

	it('renders Form and Actions components when bootstrapped in create mode', async () => {
		const { wrapper, setBootstraped } = factory()

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-form"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-adset-actions"]').exists()).toBe(true)
	})

	it('renders components in edit mode when bootstrapped', async () => {
		const { wrapper, setBootstraped } = factory(RouteName.ADSET_EDIT)

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-form"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-adset-actions"]').exists()).toBe(true)
	})

	it('triggers form submission when Actions emits on-submit', async () => {
		const { wrapper, setBootstraped } = factory()

		await setBootstraped()
		await nextTick()

		await wrapper.findComponent({ name: 'Actions' }).vm.$emit('on-submit')

		expect(wrapper.findComponent({ name: 'Actions' }).emitted('on-submit')).toBeTruthy()
	})

	it('navigates to adsets list when close button is clicked in create mode', async () => {
		const { wrapper, mockRouter } = factory()

		await wrapper.find('.close-btn').trigger('click')

		expect(mockRouter.push).toHaveBeenCalledWith({
			name: RouteName.BRAND_AWARENESS_ADSETS,
		})
	})

	it('displays adset title when available', async () => {
		const { wrapper, setBootstraped } = factory(RouteName.ADSET_EDIT)

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-title"]').text()).toContain(performanceAdset.title)
	})

	it('displays default title when adset has no title in edit mode', async () => {
		const { wrapper, setBootstraped, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = {
			...performanceAdset,
			title: '',
		}

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-title"]').text()).toContain('adset.defaultName')
	})

	it('displays default new title in create mode', async () => {
		const { wrapper, setBootstraped } = factory()

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-title"]').text()).toContain('adset.defaultNameNew')
	})

	it('shows fetch error screen when campaign structure failed to load', async () => {
		const { wrapper, setBootstraped, formCampaignStore } = factory()

		formCampaignStore.fetchError = true

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-fetch-error"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-adset-form"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="form-adset-actions"]').exists()).toBe(false)
	})

	it('shows fetch error screen when adset failed to load in edit mode', async () => {
		const { wrapper, setBootstraped, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.fetchError = true

		await setBootstraped()
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-fetch-error"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="form-adset-form"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="form-adset-actions"]').exists()).toBe(false)
	})

	it('retry triggers campaign structure and adset fetch in edit mode', async () => {
		const { wrapper, setBootstraped, formCampaignStore, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formCampaignStore.fetchCampaignStructure = vi.fn().mockResolvedValue(undefined)
		formAdsetStore.fetchAdset = vi.fn().mockResolvedValue(undefined)
		formCampaignStore.fetchError = true

		await setBootstraped()
		await nextTick()

		await wrapper.find('[data-test="form-adset-fetch-retry"]').trigger('click')
		await nextTick()

		expect(formCampaignStore.fetchCampaignStructure).toHaveBeenCalledWith('PF-CMP-1748539211')
		expect(formAdsetStore.fetchAdset).toHaveBeenCalledWith('PF-ADS-test')
	})

	it('retry triggers only campaign structure fetch in create mode', async () => {
		const { wrapper, setBootstraped, formCampaignStore, formAdsetStore } = factory()

		formCampaignStore.fetchCampaignStructure = vi.fn().mockResolvedValue(undefined)
		formAdsetStore.fetchAdset = vi.fn().mockResolvedValue(undefined)
		formCampaignStore.fetchError = true

		await setBootstraped()
		await nextTick()

		await wrapper.find('[data-test="form-adset-fetch-retry"]').trigger('click')
		await nextTick()

		expect(formCampaignStore.fetchCampaignStructure).toHaveBeenCalledWith('PF-CMP-1748539211')
		expect(formAdsetStore.fetchAdset).not.toHaveBeenCalled()
	})
})
