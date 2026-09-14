import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { useAgencyStore } from '@/modules/Partner/views/Agency/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import AgencySettings from '../AgencySettings.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

const validateMock = vi.fn()
;(globalThis as any).__agencySettingsValidateMock = validateMock
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/components', () => ({
	QuestionTooltip: {
		name: 'QuestionTooltip',
		template: '<div data-test="question-tooltip"><slot /></div>',
	},
	TextLink: {
		name: 'TextLink',
		props: ['href', 'target'],
		template: '<a data-test="text-link" :href="href" :target="target"><slot /></a>',
	},
}))

vi.mock('@/modules/Partner/views/Agency/components', () => ({
	CostInputs: {
		name: 'CostInputs',
		props: ['modelValue', 'disabled', 'currencySign', 'cpmField', 'cpaField', 'cpcField'],
		emits: ['update:modelValue'],
		template: '<div data-test="cost-inputs" />',
	},
}))

vi.mock('@/components/layouts', () => ({
	DashboardSection: {
		name: 'DashboardSection',
		props: ['title', 'noBorder'],
		template: '<section data-test="dashboard-section"><slot /></section>',
	},
	DashboardSubsection: {
		name: 'DashboardSubsection',
		props: ['title'],
		template: '<div data-test="dashboard-subsection"><slot /></div>',
	},
}))

vi.mock('@/components/element-plus', () => ({
	ElForm: {
		name: 'ElForm',
		props: ['model', 'rules'],
		emits: ['submit'],
		template: '<form data-test="el-form"><slot /></form>',
		setup: (_props: any, { expose }: any) => {
			expose({
				validate: () =>
					(globalThis as any).__agencySettingsValidateMock?.() ?? Promise.resolve(true),
			})

			return {}
		},
	},
	ElFormItem: {
		name: 'ElFormItem',
		props: ['prop'],
		template: '<div><slot /></div>',
	},
	ElCheckbox: {
		name: 'ElCheckbox',
		props: ['modelValue', 'disabled'],
		emits: ['update:modelValue'],
		template: '<label data-test="el-checkbox"><slot /></label>',
	},
	ElInput: {
		name: 'ElInput',
		props: ['modelValue', 'disabled'],
		template: '<div data-test="el-input" />',
	},
	ElSelect: {
		name: 'ElSelect',
		props: ['modelValue', 'multiple', 'valueKey', 'placeholder'],
		template: '<div data-test="el-select"><slot /></div>',
	},
	ElOption: {
		name: 'ElOption',
		props: ['label', 'value'],
		template: '<div data-test="el-option" />',
	},
	ElButton: {
		name: 'ElButton',
		props: ['disabled', 'loading', 'type', 'nativeType'],
		template: '<button data-test="el-button" :disabled="disabled" :data-loading="String(loading)"><slot /></button>',
	},
}))

describe('Partner Agency Overview AgencySettings Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		validateMock.mockReset()
		vi.useRealTimers()
	})

	const makeAgencyData = (overrides: Record<string, any> = {}) => {
		return {
			id: 1,
			title: 'Agency',
			description: 'desc',
			streamersParticipate: false,
			useDarkMarket: false,
			commission: 12,
			cpm: {
				internalCpa: null,
				internalCpc: null,
				internalCpm: {},
				externalCpa: null,
				externalCpc: null,
				externalCpm: {},
				darkMarketInternalCpa: null,
				darkMarketInternalCpc: null,
				darkMarketInternalCpm: {},
				darkMarketExternalCpa: null,
				darkMarketExternalCpc: null,
				darkMarketExternalCpm: {},
			},
			ignoredCategories: [],
			wallet: {
				icon: 'USD',
			},
			billingRequisites: {
				name: 'Name',
				email: 'a@b.com',
				address: '',
				phone: '',
				bankName: '',
				bankAccountName: '',
				bankAccountHolderAddress: '',
				bankAddress: '',
				bankAccountNumber: '',
				swiftCode: '',
				routingNumber: '',
			},
			...overrides,
		}
	}

	const factory = (agencyData: any | null, { isAdmin = true, categories = [] as any[] } = {}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency': {
					isFetchingData: false,
					data: agencyData,
					disabled: {
						internaleCpm: false,
						externalCpm: false,
						darkMarketInternalCpm: false,
						darkMarketExternalCpm: false,
					},
					isFormUpdating: false,
				},
				partner: {
					isFetching: false,
					profile: isAdmin ? { roleExtended: true } : { roleExtended: false },
				},
				dict: {
					isFetching: false,
					all: {
						campaignsCategories: categories,
					},
					campaigns: null,
				},
			},
		})

		const agencyStore = useAgencyStore(pinia)
		const partnerStore = usePartnerStore(pinia)
		const dictStore = useDictStore(pinia)

		partnerStore.profile = pinia.state.value.partner.profile
		dictStore.all = pinia.state.value.dict.all

		const wrapper = mount(AgencySettings, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					AgencySettingsSkeleton: {
						name: 'AgencySettingsSkeleton',
						template: '<div data-test="agency-settings-skeleton-stub" />',
					},
				},
			},
		})

		return { wrapper, agencyStore }
	}

	it('does not render form when agencyStore.data is null', async () => {
		const { wrapper } = factory(null)

		await nextTick()

		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="el-button"]').exists()).toBe(false)
	})

	it('renders skeleton while agency data is loading', async () => {
		const agencyData = makeAgencyData()
		const { wrapper, agencyStore } = factory(agencyData)
		agencyStore.isFetchingData = true
		await nextTick()

		expect(wrapper.find('[data-test="agency-settings-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)
	})

	it('renders cost inputs based on streamersParticipate/useDarkMarket', async () => {
		const { wrapper: w1 } = factory(makeAgencyData({ streamersParticipate: false, useDarkMarket: false }))
		await nextTick()
		expect(w1.findAll('[data-test="cost-inputs"]')).toHaveLength(1)

		const { wrapper: w2 } = factory(makeAgencyData({ streamersParticipate: true, useDarkMarket: false }))
		await nextTick()
		expect(w2.findAll('[data-test="cost-inputs"]')).toHaveLength(2)

		const { wrapper: w3 } = factory(makeAgencyData({ streamersParticipate: true, useDarkMarket: true }))
		await nextTick()
		expect(w3.findAll('[data-test="cost-inputs"]')).toHaveLength(4)
	})

	it('submit – invalid form logs validation error and keeps button disabled', async () => {
		vi.useFakeTimers()
		validateMock.mockImplementation(() => Promise.resolve(false))
		expect((globalThis as any).__agencySettingsValidateMock).toBe(validateMock)
		expect(await validateMock()).toBe(false)

		const agencyData = makeAgencyData({ streamersParticipate: true, useDarkMarket: true })
		const { wrapper, agencyStore } = factory(agencyData)

		await nextTick()

		const elForm = wrapper.findComponent({ name: 'ElForm' })
		expect(elForm.exists()).toBe(true)
		const validateResult = await (elForm.vm as any).validate()
		expect(validateResult).toBe(false)

		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeUndefined()

		const submitPromise = (wrapper.vm as any).onSubmit()
		await vi.advanceTimersByTimeAsync(2000)
		await submitPromise
		await nextTick()

		const { Logger } = await import('@/core/helpers')
		expect(validateMock).toHaveBeenCalled()
		expect(Logger.error).toHaveBeenCalledWith('Validation error')
		expect(agencyStore.updateData).not.toHaveBeenCalled()
		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeDefined()
	})

	it('submit – valid form calls updateData and resets success after 2000ms', async () => {
		vi.useFakeTimers()
		validateMock.mockImplementation(() => Promise.resolve(true))

		const agencyData = makeAgencyData({ streamersParticipate: true, useDarkMarket: false, commission: 33, ignoredCategories: [1, 2] })
		const { wrapper, agencyStore } = factory(agencyData)

		await nextTick()

		const elForm = wrapper.findComponent({ name: 'ElForm' })
		expect(elForm.exists()).toBe(true)
		const validateResult = await (elForm.vm as any).validate()
		expect(validateResult).toBe(true)

		const submitPromise = (wrapper.vm as any).onSubmit()

		await nextTick()

		expect(agencyStore.updateData).toHaveBeenCalled()
		expect(validateMock).toHaveBeenCalled()
		expect(agencyStore.updateData).toHaveBeenCalledWith(
			expect.objectContaining({
				streamersParticipate: agencyData.streamersParticipate,
				useDarkMarket: agencyData.useDarkMarket,
				commission: agencyData.commission,
				ignoredCategories: agencyData.ignoredCategories,
			}),
		)

		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeDefined()

		await vi.advanceTimersByTimeAsync(2000)
		await submitPromise
		await nextTick()

		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeUndefined()
	})

	it('submit – updateData error logs error and stops sending', async () => {
		vi.useFakeTimers()
		validateMock.mockImplementation(() => Promise.resolve(true))

		const agencyData = makeAgencyData({ streamersParticipate: false, useDarkMarket: false })
		const { wrapper, agencyStore } = factory(agencyData)

		const err = new Error('boom')
		agencyStore.updateData = vi.fn().mockRejectedValueOnce(err)

		await nextTick()

		await (wrapper.vm as any).onSubmit()
		await nextTick()

		const { Logger } = await import('@/core/helpers')
		expect(Logger.error).toHaveBeenCalledWith('Error saving agency settings', true, err)
		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeUndefined()
	})
})

