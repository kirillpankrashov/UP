import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { brandAwarenessAdset } from '@/modules/Partner/views/FormAdset/api/getBrandAwarenessAdset/fixtures/brandAwarenessAdset'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import BrandAwareness from '../BrandAwareness.vue'

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

// Mock form components
const formComponents = [
	'FormTitle', 'FormDescription', 'FormPlatform', 'FormFormat', 'FormSchedule', 'FormViewTime',
	'FormTimezone', 'FormBudget', 'FormTargets', 'FormFrequency', 'FormStatus',
	'FormStreamerDayLimit',
	'FormTargetingAgencies', 'FormTargetingStreamers', 'FormTargetingLanguages',
	'FormTargetingCountries', 'FormTargetingGender', 'FormTargetingAge',
	'FormTargetingAgeRestriction', 'FormTargetingTags', 'FormTargetingCountriesAuditory',
	'FormTargetingDevicesAuditory', 'FormAlertAnimation', 'FormAlertText',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach(component => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"></div>`,
		props: ['modelValue', 'disabled', 'platform', 'streamers', 'campaignCategory', 'file'],
		emits: ['update:modelValue', 'onInput'],
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

describe('BrandAwareness Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (routeName = RouteName.ADSET_CREATE) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: { campaignSlug: 'test-campaign' },
			query: {},
		} as any)

		const wrapper = mount(BrandAwareness, {
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

		return { wrapper, formAdsetStore, campaignsStore }
	}

	it('renders form with all required sections in create mode', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-settings-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-targeting-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-audience-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="FormStreamerDayLimit"]').exists()).toBe(true)
	})

	it('does not render status section in create mode', () => {
		const { wrapper } = factory(RouteName.ADSET_CREATE)

		expect(wrapper.find('[data-test="brand-awareness-status-section"]').exists()).toBe(false)
	})

	it('renders status section in edit mode', () => {
		const { wrapper } = factory(RouteName.ADSET_EDIT)

		expect(wrapper.find('[data-test="brand-awareness-status-section"]').exists()).toBe(true)
	})

	it('initializes with default model values in create mode', async () => {
		const { wrapper } = factory()

		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe('')
		expect(vm.model.description).toBe('')
		expect(vm.model.platform).toBeDefined()
		expect(vm.model.format).toBeDefined()
		expect(vm.model.streamerDayLimit).toBeUndefined()
	})

	it('initializes with adset data in edit mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = brandAwarenessAdset
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(brandAwarenessAdset.title)
		expect(vm.model.description).toBe(brandAwarenessAdset.description)
		expect(vm.model.platform).toBe(brandAwarenessAdset.platform)
		expect(vm.model.format).toBe(brandAwarenessAdset.format.id)
		expect(vm.model.streamerDayLimit).toBeUndefined()
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

		formAdsetStore.adset = brandAwarenessAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.updateAdset).toHaveBeenCalledWith({
			...vm.model,
			slug: brandAwarenessAdset.slug,
		})
	})

	it('handles form validation error', async () => {
		const { wrapper, formAdsetStore } = factory()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(false),
		}

		await vm.onSubmit()

		expect(formAdsetStore.createAdset).not.toHaveBeenCalled()
		expect(formAdsetStore.updateAdset).not.toHaveBeenCalled()
	})

	it('changes adset status when visibility changes in edit mode', async () => {
		const { wrapper, campaignsStore, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = brandAwarenessAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		// Change visibility status
		vm.modelVisibleStatus = !brandAwarenessAdset.visible

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			brandAwarenessAdset.slug,
			CampaignType.BRAND_AWARENESS,
			AdEntityType.ADSETS,
		)
	})

	it('calls calculateAudience when targeting components emit onInput', async () => {
		const { wrapper, formAdsetStore } = factory()

		const targetingComponent = wrapper.findComponent({ name: 'FormTargetingAgencies' })
		await targetingComponent.vm.$emit('onInput')

		expect(formAdsetStore.calculateAudience).toHaveBeenCalled()
	})

	it('exposes required methods and properties', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		expect(typeof vm.onSubmit).toBe('function')
		expect(vm.closeAndReturnRoute).toBeDefined()
		expect(typeof vm.showCloseDialog).toBe('boolean')
		expect(typeof vm.sending).toBe('boolean')
		expect(typeof vm.success).toBe('boolean')
	})
})
