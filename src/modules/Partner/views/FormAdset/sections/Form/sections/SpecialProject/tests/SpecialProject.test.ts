import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, CampaignType, CurrencyIcon, CurrencyName, Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { specialProjectAdset } from '@/modules/Partner/views/FormAdset/api/getSpecialProjectAdset/fixtures/specialProjectAdset'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import SpecialProject from '../SpecialProject.vue'

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
	'FormTitle', 'FormDescription', 'FormPlatform', 'FormFormat', 'FormFormatSettings', 'FormSchedule',
	'FormTimezone', 'FormBudget', 'FormStatus', 'FormTargetingStreamers', 'FormTargetingCountriesAuditory',
	'FormTargetingDevicesAuditory',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach((component) => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"></div>`,
		props: ['modelValue', 'disabled', 'platform', 'streamers', 'currency', 'class'],
		emits: ['update:modelValue'],
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

describe('FormAdset SpecialProject Component', () => {
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

		const wrapper = mount(SpecialProject, {
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
		expect(wrapper.find('[data-test="special-project-settings-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-targeting-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-audience-section"]').exists()).toBe(true)
	})

	it('renders status section only in edit mode', () => {
		const { wrapper: createWrapper } = factory(RouteName.ADSET_CREATE)
		expect(createWrapper.find('[data-test="special-project-status-section"]').exists()).toBe(false)

		const { wrapper: editWrapper } = factory(RouteName.ADSET_EDIT)
		expect(editWrapper.find('[data-test="special-project-status-section"]').exists()).toBe(true)
	})

	it('initializes with default model values in create mode', async () => {
		const { wrapper } = factory(RouteName.ADSET_CREATE)
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe('')
		expect(vm.model.description).toBe('')
		expect(vm.model.platform).toBe(Platform.TWITCH)
		expect(vm.model.timeZone).toBeUndefined()
	})

	it('initializes with adset data in edit mode', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = specialProjectAdset
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(specialProjectAdset.title)
		expect(vm.model.platform).toBe(specialProjectAdset.platform)
		expect(vm.model.duration).toBe(specialProjectAdset.duration)
		expect(vm.model.frequency).toBe(specialProjectAdset.frequency)
		expect(vm.model.bidCap).toBe(specialProjectAdset.bidCap)
	})

	it('passes campaign currency to FormTargetingStreamers', async () => {
		const { wrapper, formCampaignStore } = factory()
		formCampaignStore.campaignStructure = {
			advertiser: {
				wallet: {
					currency: {
						code: CurrencyName.RUB,
						flag: CurrencyIcon.RUB,
					},
				},
			},
		} as any
		await nextTick()

		const targetingStreamers = wrapper.findComponent({ name: 'FormTargetingStreamers' })
		expect(targetingStreamers.props('currency')).toEqual({
			code: CurrencyName.RUB,
			flag: CurrencyIcon.RUB,
		})
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

		formAdsetStore.adset = specialProjectAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formAdsetStore.updateAdset).toHaveBeenCalledWith({
			...vm.model,
			slug: specialProjectAdset.slug,
		})
	})

	it('changes adset status when visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore, formAdsetStore } = factory(RouteName.ADSET_EDIT)

		formAdsetStore.adset = specialProjectAdset
		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}
		vm.modelVisibleStatus = !specialProjectAdset.visible

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			specialProjectAdset.slug,
			CampaignType.SPECIAL_PROJECT,
			AdEntityType.ADSETS,
		)
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
