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
import { prerollAdset } from '@/modules/Partner/views/FormAdset/api/getPrerollAdset/fixtures/prerollAdset'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import Preroll from '../Preroll.vue'

vi.mock('@/core/helpers')
vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(() => ({
			push: vi.fn(),
		})),
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const formComponents = [
	'FormTitle', 'FormDescription', 'FormPlatform', 'FormFormat',
	'FormSchedule', 'FormBudget', 'FormTargets', 'FormTargetingStreamers',
	'FormTargetingLanguages', 'FormTargetingCountries', 'FormTargetingTags',
	'FormTargetingCountriesAuditory', 'FormTargetingDevicesAuditory',
	'FormProductUrl', 'FormVideoText', 'FormPixel', 'FormPixelScript',
	'FormCreative', 'FormStatus', 'FormLegals',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach(component => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"><slot /></div>`,
		props: ['modelValue', 'disabled', 'file', 'options', 'platform', 'streamers', 'campaignCategory', 'currency', 'legalCompliance'],
		emits: ['update:modelValue', 'file-delete'],
	}
})

const mockAdvice = {
	name: 'Advice',
	template: '<div data-test="Advice"><slot /></div>',
	props: ['title', 'type'],
}

const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div data-test="DashboardSection"><slot /></div>',
	props: ['title', 'noBorder'],
}

const mockDashboardSubsection = {
	name: 'DashboardSubsection',
	template: '<div data-test="DashboardSubsection"><slot /></div>',
	props: ['title'],
}

describe('FormAdset Preroll Component', () => {
	const factory = (routeName = RouteName.ADSET_CREATE) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: { campaignSlug: 'VOD-CMP-1748539211' },
			query: {},
		} as any)

		const wrapper = mount(Preroll, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElForm,
					...formComponentMocks,
					Advice: mockAdvice,
					DashboardSection: mockDashboardSection,
					DashboardSubsection: mockDashboardSubsection,
				},
			},
		})

		const formAdsetStore = useFormAdsetStore()
		const campaignsStore = useCampaignsStore()

		// Setup store state based on route
		if (routeName === RouteName.ADSET_EDIT) {
			formAdsetStore.adset = prerollAdset
		}
		else {
			formAdsetStore.adset = null
		}

		return { wrapper, formAdsetStore, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders form with all components in create mode', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-settings-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-targeting-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-audience-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-chatbot-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-analytics-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-preview-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preroll-status-section"]').exists()).toBe(false)
	})

	it('renders FormStatus component in edit mode', () => {
		const { wrapper } = factory(RouteName.ADSET_EDIT)

		expect(wrapper.find('[data-test="preroll-status-section"]').exists()).toBe(true)
	})

	it('initializes with default values in create mode', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe('')
		expect(vm.model.description).toBe('')
		expect(vm.model.platform).toBe('twitch')
		expect(vm.model.format).toBe('interactive')
		expect(vm.model.videoDescriptionText).toBe('')
	})

	it('initializes with adset data in edit mode', async () => {
		const { wrapper } = factory(RouteName.ADSET_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(prerollAdset.title)
		expect(vm.model.description).toBe(prerollAdset.description)
		expect(vm.model.platform).toBe(prerollAdset.platform)
		expect(vm.model.format).toBe(prerollAdset.format.id)
		expect(vm.model.videoDescriptionText).toBe(prerollAdset.videoDescriptionText)
	})

	it('has validation rules for required fields', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		const rules = vm.rules

		expect(rules['title.default']).toBeTruthy()
		expect(rules['dates.start']).toBeTruthy()
		expect(rules['dates.end']).toBeTruthy()
		expect(rules.payableType).toBeTruthy()
		expect(rules['productUrl.general']).toBeTruthy()
		expect(rules.videoDescriptionText).toBeTruthy()
		expect(rules.unit).toBeTruthy()
	})

	it('calls createAdset on submit in create mode', async () => {
		const { wrapper, formAdsetStore } = factory()

		const vm = wrapper.vm as any
		Object.assign(vm.model, {
			title: { default: 'Test Preroll Adset' },
			description: 'Test Description',
			dates: { start: '2023-01-01', end: '2023-12-31' },
			payableType: 'impressions',
			productUrl: { general: 'https://example.com' },
			videoDescriptionText: 'Test video description',
			unit: 'test.mp4',
		})

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.createAdset).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateAdset on submit in edit mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		vm.model.title.default = 'Updated Preroll Title'
		vm.model.videoDescriptionText = 'Updated video description'

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.updateAdset).toHaveBeenCalledWith({
			...vm.model,
			slug: prerollAdset.slug,
		})
	})

	it('changes adset status if visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.ADSET_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		vm.modelVisibleStatus = !vm.modelVisibleStatus

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			prerollAdset.slug,
			CampaignType.PREROLL,
			AdEntityType.ADSETS,
		)
	})
})
