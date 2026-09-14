import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { performanceCampaign } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/fixtures/performanceCampaign'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import type { FormSection } from '@/modules/Partner/views/FormCampaign/types'

import Performance from '../Performance.vue'

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
	'FormTitle', 'FormExternalId', 'FormDescription', 'FormCategory', 'FormSchedule',
	'FormTimezone', 'FormHolding', 'FormAdvertiser', 'FormUrlParams',
	'FormStatus', 'UplifyPixel', 'SettingsAdvice', 'FormMediaAgency', 'FormOrdMarkup',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach(component => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"><slot /></div>`,
		props: ['modelValue', 'disabled'],
		emits: ['update:modelValue'],
	}
})

describe('Performance Component', () => {
	const factory = (routeName = RouteName.CAMPAIGN_CREATE, storeState: { section?: FormSection; currentCampaignType?: CampaignType } = {}) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: {},
		} as any)

		const wrapper = mount(Performance, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElForm,
					DashboardSection,
					...formComponentMocks,
				},
			},
		})

		const formCampaignStore = useFormCampaignStore()
		if (routeName === RouteName.CAMPAIGN_EDIT) {
			formCampaignStore.campaign = performanceCampaign
		}
		if (storeState.section !== undefined) {
			formCampaignStore.section = storeState.section
		}
		if (storeState.currentCampaignType !== undefined) {
			formCampaignStore.currentCampaignType = storeState.currentCampaignType
		}

		const campaignsStore = useCampaignsStore()

		return { wrapper, formCampaignStore, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders form with all components in create mode', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)

		formComponents.forEach(component => {
			if (component !== 'FormStatus') {
				expect(wrapper.findComponent(`[data-test="${component}"]`).exists()).toBe(true)
			}
		})

		expect(wrapper.findComponent('[data-test="FormStatus"]').exists()).toBe(false)
	})

	it('renders FormStatus component in edit mode', () => {
		const { wrapper } = factory(RouteName.CAMPAIGN_EDIT)

		expect(wrapper.findComponent('[data-test="FormStatus"]').exists()).toBe(true)
	})

	it('initializes with default values in create mode', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		expect(vm.model.title).toBe('')
		expect(vm.model.externalId).toBe('')
		expect(vm.model.description).toBe('')
		expect(vm.model.category).toBeUndefined()
		expect(vm.model.timezone).toBe(0)
	})

	it('initializes with campaign data in edit mode', async () => {
		const { wrapper } = factory(RouteName.CAMPAIGN_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title).toBe(performanceCampaign.title.default)
		expect(vm.model.externalId).toBe(performanceCampaign.externalId)
		expect(vm.model.description).toBe(performanceCampaign.description)
		expect(vm.model.category).toBe(performanceCampaign.category.id)
		expect(vm.model.holding).toBe(performanceCampaign.holding.id)
		expect(vm.model.advertiser).toBe(performanceCampaign.advertiser.id)
	})

	it('has validation rules for required fields', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		const rules = vm.rules

		expect(rules.title).toBeTruthy()
		expect(rules.externalId).toBeTruthy()
		expect(rules.description).toBeTruthy()
		expect(rules.category).toBeTruthy()
		expect(rules.advertiser).toBeTruthy()
		expect(rules.holding).toBeTruthy()
		expect(rules.timezone).toBeTruthy()
		expect(rules.start).toBeTruthy()
		expect(rules.end).toBeTruthy()
	})

	it('calls createCampaign on submit in create mode', async () => {
		const { wrapper, formCampaignStore } = factory()

		const vm = wrapper.vm as any
		Object.assign(vm.model, {
			title: 'Test Performance Campaign',
			externalId: 'PF-123',
			description: 'Test Description',
			category: 1,
			holding: 2,
			advertiser: 3,
			start: '2023-01-01',
			end: '2023-12-31',
			timezone: 0,
		})

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formCampaignStore.createCampaign).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateCampaign on submit in edit mode', async () => {
		const { wrapper, formCampaignStore } = factory(RouteName.CAMPAIGN_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		vm.model.title = 'Updated Performance Title'
		vm.model.externalId = 'PF-456'

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formCampaignStore.updateCampaign).toHaveBeenCalledWith({
			...vm.model,
			slug: performanceCampaign.slug,
		})
	})

	it('changes campaign status if visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.CAMPAIGN_EDIT)

		await nextTick()

		const vm = wrapper.vm as any
		vm.modelVisibleStatus = !vm.modelVisibleStatus

		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			performanceCampaign.slug,
			CampaignType.PERFORMANCE,
			AdEntityType.CAMPAIGNS,
		)
	})
})
