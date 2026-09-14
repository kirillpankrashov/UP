import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { billing as billingDataFixture } from '@/modules/Partner/views/Agency/api/getBilling/fixtures/billing'

import Form from '../Form.vue'

const validateMock = vi.fn()

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/core/helpers')

vi.mock('@/components/layouts', () => ({
	DashboardSection: {
		name: 'DashboardSection',
		props: ['title', 'noBorder'],
		template: '<div data-test="dashboard-section"><slot name="title" /><slot /></div>',
	},
}))

vi.mock('@/components/element-plus', () => {
	return {
		ElForm: {
			name: 'ElForm',
			template: '<form data-test="el-form" @submit.prevent="$emit(\'submit\')"><slot /></form>',
		},
		ElFormItem: {
			name: 'ElFormItem',
			props: ['label', 'prop'],
			template: '<div><slot /></div>',
		},
		ElInput: {
			name: 'ElInput',
			props: ['modelValue', 'placeholder', 'disabled', 'size', 'class'],
			template: `
				<div>
					<slot name="prefix" />
					<input
						data-test="el-input-inner"
						:placeholder="placeholder"
						:disabled="disabled"
						:value="modelValue"
						@input="$emit('update:modelValue', $event.target.value)"
					/>
				</div>
			`,
		},
		ElButton: {
			name: 'ElButton',
			props: ['loading', 'disabled', 'type', 'nativeType', 'class'],
			template: '<button data-test="el-button" type="submit"><slot /></button>',
		},
		ElSkeleton: {
			name: 'ElSkeleton',
			props: ['loading', 'animated'],
			template: '<div data-test="el-skeleton"><slot name="template" /></div>',
		},
		ElSkeletonItem: {
			name: 'ElSkeletonItem',
			props: ['variant', 'class', 'style'],
			template: '<span data-test="el-skeleton-item" />',
		},
	}
})

describe('Agency Billing Form', () => {
	const mountWithStore = (opts?: {
		billing: any | null
	}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency-billing': {
					isFetchingData: false,
					isFormUpdating: false,
					billing: opts?.billing ?? billingDataFixture,
					invoices: {
						total: 0,
						perPage: 0,
						page: 0,
						data: [],
						loading: false,
						isFetched: false,
					},
				},
			},
		})

		return mount(Form, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					// keep element-plus stubs from vi.mock
				},
			},
		})
	}

	beforeEach(() => {
		vi.clearAllMocks()
		validateMock.mockReset()
	})

	it('shows skeleton while billing data is fetching', async () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				'partner-agency-billing': {
					isFetchingData: true,
					isFormUpdating: false,
					billing: null,
					invoices: {
						total: 0,
						perPage: 0,
						page: 0,
						data: [],
						loading: false,
						isFetched: false,
					},
				},
			},
		})

		const wrapper = mount(Form, {
			global: {
				plugins: [i18n, pinia],
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="agency-billing-form-skeleton"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)
	})

	it('initializes model from billingStore.billing on mount', async () => {
		const wrapper = mountWithStore({ billing: billingDataFixture })

		await nextTick()

		const inputValues = wrapper.findAll('[data-test="el-input-inner"]').map(el => (el.element as HTMLInputElement).value)
		// Проверяем хотя бы пару полей, чтобы убедиться, что dataToModel работает
		expect(inputValues).toContain(billingDataFixture.name)
		expect(inputValues).toContain(billingDataFixture.email)
	})

	it('submits on valid form and updates billing data', async () => {
		vi.useFakeTimers()
		validateMock.mockResolvedValueOnce(true)

		const wrapper = mountWithStore({ billing: billingDataFixture })
		await nextTick()

		// Подменяем action updateData, чтобы не тащить API
		const billingStore = (wrapper.vm as any).billingStore
		billingStore.updateData = vi.fn().mockResolvedValueOnce(undefined)

		// Подменяем validate() у formRef, чтобы не зависеть от реального element-plus
		const formRefProxy = (wrapper.vm as any).formRef
		if (formRefProxy?.value) {
			formRefProxy.value.validate = validateMock
		}
		else {
			formRefProxy.validate = validateMock
		}

		const submitPromise = (wrapper.vm as any).onSubmit()
		await nextTick()

		expect(validateMock).toHaveBeenCalledTimes(1)
		expect(billingStore.updateData).toHaveBeenCalled()

		// Компонент держит sending=true во время ожидания
		expect((wrapper.vm as any).sending).toBe(true)

		// Успешный сценарий ждет 2000ms, затем success -> false
		await vi.advanceTimersByTimeAsync(2000)
		await submitPromise

		expect((wrapper.vm as any).success).toBe(false)
		expect((wrapper.vm as any).sending).toBe(false)

		vi.useRealTimers()
	})

	it('does not submit when form validation fails', async () => {
		validateMock.mockResolvedValueOnce(false)

		const wrapper = mountWithStore({ billing: billingDataFixture })
		await nextTick()

		const billingStore = (wrapper.vm as any).billingStore
		billingStore.updateData = vi.fn().mockResolvedValueOnce(undefined)

		const formRefProxy = (wrapper.vm as any).formRef
		if (formRefProxy?.value) {
			formRefProxy.value.validate = validateMock
		}
		else {
			formRefProxy.validate = validateMock
		}
		await (wrapper.vm as any).onSubmit()

		expect(billingStore.updateData).not.toHaveBeenCalled()

		const { Logger } = await import('@/core/helpers')
		expect(Logger.error).toHaveBeenCalledWith('Validation error')
	})
})

