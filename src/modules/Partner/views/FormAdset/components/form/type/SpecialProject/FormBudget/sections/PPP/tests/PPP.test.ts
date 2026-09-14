import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import PPP from '../PPP.vue'

interface Model {
	bidCap: number | undefined
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}

const mockElInput = {
	name: 'ElInput',
	template: `
		<div data-test="el-input">
			<slot name="prefix" />
			<input
				data-test="bid-cap-input"
				:value="modelValue"
				@input="$emit('update:modelValue', Number($event.target.value))"
			/>
		</div>
	`,
	props: ['modelValue', 'placeholder', 'size', 'type', 'min'],
	emits: ['update:modelValue'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

describe('FormAdset SpecialProject PPP Budget', () => {
	const factory = (
		model: Model = { bidCap: undefined },
		advertiserCurrency: { code: string, flag: string } | null = { code: 'USD', flag: '$' },
	) => {
		const wrapper = mount(PPP, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElFormItem: mockElFormItem,
					ElInput: mockElInput,
				},
			},
			props: {
				modelValue: model,
			},
		})

		const formCampaignStore = useFormCampaignStore()

		if (advertiserCurrency !== null) {
			formCampaignStore.campaignStructure = { advertiser: { wallet: { currency: advertiserCurrency } } } as any
		}
		else {
			formCampaignStore.campaignStructure = null
		}

		return { wrapper, formCampaignStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders budget PPP container and bid cap label', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="adset-budget-ppp-container"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-form-item"]').text()).toContain('adset.settings.form.budget.bidCap')
	})

	it('renders currency flag from campaign structure in input prefix', async () => {
		const { wrapper } = factory({ bidCap: 120 }, { code: 'EUR', flag: 'EUR' })

		await nextTick()

		expect(wrapper.text()).toContain('EUR')
	})

	it('handles missing campaign currency gracefully', async () => {
		const { wrapper } = factory({ bidCap: 120 }, null)

		await nextTick()

		expect(wrapper.find('[data-test="adset-budget-ppp-container"]').exists()).toBe(true)
		expect(wrapper.text()).not.toContain('$')
	})

	it('updates modelValue when bidCap changes from input', async () => {
		const { wrapper } = factory({ bidCap: undefined })

		await wrapper.find('[data-test="bid-cap-input"]').setValue('250')

		expect((wrapper.props('modelValue') as Model).bidCap).toBe(250)
	})

	it('updates input value when modelValue prop changes', async () => {
		const { wrapper } = factory({ bidCap: 80 })

		await wrapper.setProps({
			modelValue: { bidCap: 300 },
		})
		await nextTick()

		const input = wrapper.find<HTMLInputElement>('[data-test="bid-cap-input"]')
		expect(input.element.value).toBe('300')
	})
})
