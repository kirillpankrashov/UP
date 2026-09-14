import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType, StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { extensionAdset } from '@/modules/Partner/views/FormAdset/api/getExtensionAdset/fixtures/extensionAdset'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import Extension from '../Extension.vue'

const { mockPush } = vi.hoisted(() => ({
	mockPush: vi.fn(),
}))

vi.mock('@/modules/Partner/views/FormCampaign/api')
vi.mock('@/modules/Partner/views/FormAdset/api')
vi.mock('@/core/helpers')
vi.mock('@/core/router', () => ({
	router: {
		push: mockPush,
	},
}))
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(() => ({
			push: mockPush,
		})),
	}
})

const formComponents = [
	'FormTitle', 'FormDescription', 'FormPlatform', 'FormFormat', 'FormSchedule',
	'FormBudget', 'FormTargets', 'FormStatus', 'FormTargetingAgencies', 'FormTargetingStreamers',
	'FormTargetingLanguages', 'FormTargetingCountries', 'FormTargetingGender', 'FormTargetingAge',
	'FormTargetingAgeRestriction', 'FormTargetingTags', 'FormTargetingCountriesAuditory',
	'FormTargetingDevicesAuditory',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach((component) => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"></div>`,
		props: ['modelValue', 'disabled', 'platform', 'streamers', 'campaignCategory', 'class'],
		emits: ['update:modelValue', 'on-input'],
	}
})

const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div class="mock-dashboard-section"><slot /></div>',
	props: ['title', 'noBorder'],
}

const mockDashboardSubsection = {
	name: 'DashboardSubsection',
	template: '<div class="mock-dashboard-subsection"><slot /></div>',
	props: ['title'],
}

const mockAudience = {
	name: 'Audience',
	template: '<div class="mock-audience"></div>',
}

describe('FormAdset Extension Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.useFakeTimers()
	})

	const factory = (routeName = RouteName.ADSET_CREATE) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: { campaignSlug: 'test-campaign' },
			query: {},
		} as any)

		const wrapper = mount(Extension, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElForm,
					DashboardSection: mockDashboardSection,
					DashboardSubsection: mockDashboardSubsection,
					Audience: mockAudience,
					...formComponentMocks,
				},
			},
		})

		const formAdsetStore = useFormAdsetStore()
		const campaignsStore = useCampaignsStore()
		const formCampaignStore = useFormCampaignStore()

		return { wrapper, formAdsetStore, campaignsStore, formCampaignStore }
	}

	it('renders form with required sections in create mode', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-settings-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-targeting-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-audience-section"]').exists()).toBe(true)
	})

	it('renders status section only in edit mode', () => {
		const { wrapper: createWrapper } = factory(RouteName.ADSET_CREATE)
		expect(createWrapper.find('[data-test="extension-status-section"]').exists()).toBe(false)

		const { wrapper: editWrapper } = factory(RouteName.ADSET_EDIT)
		expect(editWrapper.find('[data-test="extension-status-section"]').exists()).toBe(true)
	})

	it('initializes with default model in create mode', async () => {
		const { wrapper } = factory(RouteName.ADSET_CREATE)
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe('')
		expect(vm.model.platform).toBeDefined()
		expect(vm.model.strategyPayment).toBe(StrategyPayment.PPV)
	})

	it('initializes model from adset in edit mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = extensionAdset
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(extensionAdset.title)
		expect(vm.model.description).toBe(extensionAdset.description)
		expect(vm.model.platform).toBe(extensionAdset.platform)
		expect(vm.model.format).toBe(extensionAdset.format.id)
		expect(vm.model.strategyPayment).toBe(extensionAdset.strategyPayment)
	})

	it('shows targets subsection for PPV/PPVA/CPA and hides for other strategy', async () => {
		const { wrapper } = factory(RouteName.ADSET_CREATE)
		const vm = wrapper.vm as any

		vm.model.strategyPayment = StrategyPayment.PPV
		await nextTick()
		expect(wrapper.findComponent({ name: 'FormTargets' }).exists()).toBe(true)

		vm.model.strategyPayment = StrategyPayment.CPC
		await nextTick()
		expect(wrapper.findComponent({ name: 'FormTargets' }).exists()).toBe(false)
	})

	it('calls createAdset on submit in create mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_CREATE)

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.createAdset).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateAdset on submit in edit mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = extensionAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.updateAdset).toHaveBeenCalledWith({
			...vm.model,
			slug: extensionAdset.slug,
		})
	})

	it('changes adset status when visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = extensionAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}
		vm.modelVisibleStatus = !extensionAdset.visible

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			extensionAdset.slug,
			CampaignType.EXTENSION,
			AdEntityType.ADSETS,
		)
	})

	it('calls calculateAudience on targeting input event', async () => {
		const { wrapper, formAdsetStore } = factory()

		const targetingAgencies = wrapper.findComponent({ name: 'FormTargetingAgencies' })
		await targetingAgencies.vm.$emit('on-input')

		expect(formAdsetStore.calculateAudience).toHaveBeenCalled()
	})

	it('disables agencies/languages/countries when streamers are selected without exclude', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = extensionAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.model.targeting.streamers.list = [1, 2]
		vm.model.targeting.streamers.exclude = false
		await nextTick()

		expect(wrapper.findComponent({ name: 'FormTargetingAgencies' }).props('disabled')).toBe(true)
		expect(wrapper.findComponent({ name: 'FormTargetingLanguages' }).props('disabled')).toBe(true)
		expect(wrapper.findComponent({ name: 'FormTargetingCountries' }).props('disabled')).toBe(true)
	})

	it('exposes required methods and state', () => {
		const { wrapper } = factory()
		const vm = wrapper.vm as any

		expect(typeof vm.onSubmit).toBe('function')
		expect(vm.closeAndReturnRoute).toBeDefined()
		expect(typeof vm.showCloseDialog).toBe('boolean')
		expect(typeof vm.sending).toBe('boolean')
		expect(typeof vm.success).toBe('boolean')
	})
})
