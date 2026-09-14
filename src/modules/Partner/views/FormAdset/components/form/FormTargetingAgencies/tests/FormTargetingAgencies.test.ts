import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { brandAwarenessCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaignStructure/fixtures/brandAwarenessCampaignStructure'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
	useCurrency: () => ({
		convertCurrency: (value: number) => value,
		formatCurrency: (value: number) => `$${value}`,
	}),
}))

import FormTargetingAgencies from '../FormTargetingAgencies.vue'

const returnMockAgency = (id: number, basePrice: number, currency: CurrencyName) => ({
	id,
	title: 'Test Agency',
	useDarkMarket: false,
	internalCpm: {
		min: {
			[AdFormat.ADMNG]: basePrice,
			[AdFormat.CHATBOT_TEXT]: basePrice,
			[AdFormat.PREROLL]: basePrice,
			[AdFormat.YANDEX_PF]: basePrice,
			[AdFormat.YANDEX_TEXT]: basePrice,
			[AdFormat.YOUTUBE_TEXT]: basePrice,
			[AdFormat.FULLSCREEN]: basePrice,
			[AdFormat.PIP]: basePrice,
			[AdFormat.LEADERBOARD]: basePrice,
			[AdFormat.CUSTOM]: basePrice,
			[AdFormat.YANDEX_FS]: basePrice,
			[AdFormat.INTERACTIVE]: basePrice,
			[AdFormat.EXT_QUIZ]: basePrice,
			[AdFormat.EXT_BANNER]: basePrice,
		},
		max: {
			[AdFormat.ADMNG]: basePrice,
			[AdFormat.CHATBOT_TEXT]: basePrice,
			[AdFormat.PREROLL]: basePrice,
			[AdFormat.YANDEX_PF]: basePrice,
			[AdFormat.YANDEX_TEXT]: basePrice,
			[AdFormat.YOUTUBE_TEXT]: basePrice,
			[AdFormat.FULLSCREEN]: basePrice,
			[AdFormat.PIP]: basePrice,
			[AdFormat.LEADERBOARD]: basePrice,
			[AdFormat.CUSTOM]: basePrice,
			[AdFormat.YANDEX_FS]: basePrice,
			[AdFormat.INTERACTIVE]: basePrice,
			[AdFormat.EXT_QUIZ]: basePrice,
			[AdFormat.EXT_BANNER]: basePrice,
		},
	},
	externalCpm: {
		min: {
			[AdFormat.ADMNG]: basePrice,
			[AdFormat.CHATBOT_TEXT]: basePrice,
			[AdFormat.PREROLL]: basePrice,
			[AdFormat.YANDEX_PF]: basePrice,
			[AdFormat.YANDEX_TEXT]: basePrice,
			[AdFormat.YOUTUBE_TEXT]: basePrice,
			[AdFormat.FULLSCREEN]: basePrice,
			[AdFormat.PIP]: basePrice,
			[AdFormat.LEADERBOARD]: basePrice,
			[AdFormat.CUSTOM]: basePrice,
			[AdFormat.YANDEX_FS]: basePrice,
			[AdFormat.INTERACTIVE]: basePrice,
			[AdFormat.EXT_QUIZ]: basePrice,
			[AdFormat.EXT_BANNER]: basePrice,
		},
		max: {
			[AdFormat.ADMNG]: basePrice,
			[AdFormat.CHATBOT_TEXT]: basePrice,
			[AdFormat.PREROLL]: basePrice,
			[AdFormat.YANDEX_PF]: basePrice,
			[AdFormat.YANDEX_TEXT]: basePrice,
			[AdFormat.YOUTUBE_TEXT]: basePrice,
			[AdFormat.FULLSCREEN]: basePrice,
			[AdFormat.PIP]: basePrice,
			[AdFormat.LEADERBOARD]: basePrice,
			[AdFormat.CUSTOM]: basePrice,
			[AdFormat.YANDEX_FS]: basePrice,
			[AdFormat.INTERACTIVE]: basePrice,
			[AdFormat.EXT_QUIZ]: basePrice,
			[AdFormat.EXT_BANNER]: basePrice,
		},
	},
	currency,
})

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div><slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select :disabled="disabled" :placeholder="placeholder" multiple><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'multiple', 'filterable', 'tagType'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option :value="value" :data-test="dataTest">{{ label }}</option>',
	props: ['value', 'label'],
	setup(props: any, { attrs }: any) {
		return { dataTest: attrs['data-test'] }
	},
}
const mockElAlert = {
	name: 'ElAlert',
	template: '<div :data-test="dataTest"><slot /></div>',
	props: ['title', 'type', 'showIcon', 'closable', 'dataTest'],
}

describe('FormAdset FormTargetingAgencies', () => {
	const factory = async (model = { targeting: { agencies: [] }, format: AdFormat.CHATBOT_TEXT, bidCap: 100 }, disabled = false) => {
		const wrapper = mount(FormTargetingAgencies, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElOption: mockElOption,
					ElAlert: mockElAlert,
				},
			},
			props: { modelValue: model, disabled },
		})

		const dictStore = useDictStore()
		dictStore.campaigns = {
			agencies: [
				returnMockAgency(1, 100, CurrencyName.USD),
				returnMockAgency(2, 200, CurrencyName.EUR),
			],
		} as any

		const partnerStore = usePartnerStore()
		partnerStore.profile = {
			agency: { id: 1 },
		} as any

		const formCampaignStore = useFormCampaignStore()
		formCampaignStore.campaignStructure = brandAwarenessCampaignStructure

		await nextTick()

		return wrapper
	}

	it('renders select, options, and form item', async () => {
		const wrapper = await factory()
		expect(wrapper.find('[data-test="adset-form-targeting-agencies-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-agencies-select"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-agencies-option-1"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-agencies-option-2"]').exists()).toBe(true)
	})

	it('disables select when disabled=true', async () => {
		const wrapper = await factory(undefined, true)
		await nextTick()
		const select = wrapper.find('[data-test="adset-form-targeting-agencies-select"]')
		expect(select.attributes('disabled')).toBeDefined()
	})

	it('emits onInput when select changes', async () => {
		const wrapper = await factory()
		await wrapper.find('[data-test="adset-form-targeting-agencies-select"]').trigger('change')
		expect(wrapper.emitted('onInput')).toBeTruthy()
	})

	it('does not show warning alert by default', async () => {
		const wrapper = await factory()
		expect(wrapper.find('[data-test="adset-form-targeting-agencies-warning"]').exists()).toBe(false)
	})
})
