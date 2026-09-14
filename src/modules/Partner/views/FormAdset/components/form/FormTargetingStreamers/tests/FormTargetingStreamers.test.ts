import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { AdFormat, Platform, StrategyPayment } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { type ITargetingStreamer } from '@/modules/Partner/views/FormAdset/types'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import FormTargetingStreamers from '../FormTargetingStreamers.vue'

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div v-bind="$attrs">{{ label }}<slot /></div>',
	props: ['label', 'prop'],
}
const mockElSelect = {
	name: 'ElSelect',
	template: '<select v-bind="$attrs" :disabled="disabled" :placeholder="placeholder" :tag-type="tagType" :loading="loading" multiple><slot /></select>',
	props: ['modelValue', 'placeholder', 'disabled', 'size', 'multiple', 'filterable', 'remote', 'tagType', 'loading', 'remoteMethod'],
	emits: ['change'],
}
const mockElCheckbox = {
	name: 'ElCheckbox',
	template: '<label v-bind="$attrs"><input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" /><span><slot /></span></label>',
	props: ['modelValue'],
	emits: ['update:modelValue'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option v-bind="$attrs" :value="value">{{ label }}<slot /></option>',
	props: ['value', 'label'],
}
const mockSocialIcon = {
	name: 'SocialIcon',
	template: '<div class="mock-social-icon"></div>',
	props: ['platform'],
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: vi.fn((key) => key) }),
	useCurrency: () => ({
		convertCurrency: vi.fn((amount) => amount),
		formatCurrency: vi.fn((amount) => `$${amount}`),
	}),
}))

vi.mock('@/modules/Partner/views/FormAdset/api')

describe('FormAdset FormTargetingStreamers', () => {
	const mockStreamers = [
		{
			id: 1,
			name: 'Streamer 1',
			platform: { name: Platform.TWITCH, avatar: 'avatar1.jpg' },
		},
		{
			id: 2,
			name: 'Streamer 2',
			platform: { name: Platform.YOUTUBE, avatar: 'avatar2.jpg' },
		},
	] as ITargetingStreamer[]

	const factory = async (
		model: any = { targeting: { streamers: { list: [], exclude: false }, agencies: [] }, format: AdFormat.FULLSCREEN },
		props = {},
		disabled = false,
	) => {
		const wrapper = mount(FormTargetingStreamers, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElSelect: mockElSelect,
					ElCheckbox: mockElCheckbox,
					ElOption: mockElOption,
					SocialIcon: mockSocialIcon,
				},
			},
			props: {
				modelValue: model,
				campaignCategory: 'Test Category',
				streamers: mockStreamers,
				platform: Platform.TWITCH,
				disabled,
				...props,
			},
		})

		const dictStore = useDictStore()
		dictStore.campaigns = { agencies: [] } as any
		dictStore.all = {
			campaignsCategories: [{ title: 'Test Category', darkMarket: false }],
		} as any

		const partnerStore = usePartnerStore()
		partnerStore.profile = {
			agency: { id: 1 },
		} as any

		const formCampaignStore = useFormCampaignStore()
		formCampaignStore.campaignStructure = {
			advertiser: { wallet: { currency: { code: 'USD' } } },
		} as any

		await nextTick()

		return wrapper
	}

	it('disables select when disabled=true', async () => {
		const wrapper = await factory(undefined, {}, true)
		const select = wrapper.find('[data-test="adset-form-targeting-streamers-select"]')
		expect(select.attributes('disabled')).toBeDefined()
	})

	it('shows default label when no streamers selected', async () => {
		const wrapper = await factory()
		expect(wrapper.text()).toContain('adset.targeting.form.streamers.label')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.exceptSelected')
		expect(wrapper.text()).not.toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "only selected" label when streamers selected and exclude=false', async () => {
		const wrapper = await factory({
			targeting: { streamers: { list: [1, 2], exclude: false }, agencies: [] },
			format: AdFormat.FULLSCREEN,
		} as any)
		expect(wrapper.text()).toContain('adset.targeting.form.streamers.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.onlySelected')
	})

	it('shows "except selected" label when streamers selected and exclude=true', async () => {
		const wrapper = await factory({
			targeting: { streamers: { list: [1], exclude: true }, agencies: [] },
			format: AdFormat.FULLSCREEN,
		} as any)
		expect(wrapper.text()).toContain('adset.targeting.form.streamers.label')
		expect(wrapper.text()).toContain('adset.targeting.addition.exceptSelected')
	})

	it('sets tag-type to success when exclude=false', async () => {
		const wrapper = await factory({
			targeting: { streamers: { list: [], exclude: false }, agencies: [] },
			format: AdFormat.FULLSCREEN,
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('success')
	})

	it('sets tag-type to danger when exclude=true', async () => {
		const wrapper = await factory({
			targeting: { streamers: { list: [], exclude: true }, agencies: [] },
			format: AdFormat.FULLSCREEN,
		})
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('tagType')).toBe('danger')
	})

	it('emits onInput when select changes', async () => {
		const wrapper = await factory()
		const select = wrapper.findComponent({ name: 'ElSelect' })
		await select.vm.$emit('change', [1, 2])
		expect(wrapper.emitted('onInput')).toBeTruthy()
		expect(wrapper.emitted('onInput')![0][0]).toEqual([1, 2])
	})

	it('renders streamer options with correct attributes', async () => {
		const wrapper = await factory()
		const option1 = wrapper.find('[data-test="adset-form-targeting-streamers-option-1"]')
		const option2 = wrapper.find('[data-test="adset-form-targeting-streamers-option-2"]')

		expect(option1.attributes('value')).toBe('1')
		expect(option2.attributes('value')).toBe('2')
		expect(option1.text()).toContain('Streamer 1')
		expect(option2.text()).toContain('Streamer 2')
	})

	it('shows loading state', async () => {
		const wrapper = await factory()
		const vm = wrapper.vm as any
		vm.loading = true
		await nextTick()

		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props('loading')).toBe(true)
	})

	describe('formatStreamerName and price display', () => {
		const mockStreamersWithCpm = [
			{
				id: 1,
				name: 'Streamer 1',
				platform: { name: Platform.TWITCH, avatar: 'avatar1.jpg' },
				cpm: {
					internalCpm: { [AdFormat.FULLSCREEN]: '100' },
					externalCpm: { [AdFormat.FULLSCREEN]: '150' },
					darkMarketInternalCpm: { [AdFormat.FULLSCREEN]: '200' },
					darkMarketExternalCpm: { [AdFormat.FULLSCREEN]: '250' },
					internalCpa: '10',
					externalCpa: '15',
					darkMarketInternalCpa: '20',
					darkMarketExternalCpa: '25',
					internalCpc: '1',
					externalCpc: '1.5',
					darkMarketInternalCpc: '2',
					darkMarketExternalCpc: '2.5',
				},
				agency: {
					id: 1,
					cpm: {
						internalCpm: { [AdFormat.FULLSCREEN]: '80' },
						externalCpm: { [AdFormat.FULLSCREEN]: '120' },
						darkMarketInternalCpm: { [AdFormat.FULLSCREEN]: '180' },
						darkMarketExternalCpm: { [AdFormat.FULLSCREEN]: '220' },
						internalCpa: '8',
						externalCpa: '12',
						darkMarketInternalCpa: '18',
						darkMarketExternalCpa: '22',
						internalCpc: '0.8',
						externalCpc: '1.2',
						darkMarketInternalCpc: '1.8',
						darkMarketExternalCpc: '2.2',
					},
				},
			},
			{
				id: 2,
				name: 'Streamer 2',
				platform: { name: Platform.YOUTUBE, avatar: 'avatar2.jpg' },
				cpm: {
					internalCpm: { [AdFormat.FULLSCREEN]: '50' },
					externalCpm: { [AdFormat.FULLSCREEN]: '75' },
					internalCpa: '5',
					externalCpa: '7.5',
					internalCpc: '0.5',
					externalCpc: '0.75',
				},
				agency: {
					id: 2,
					cpm: {
						internalCpm: { [AdFormat.FULLSCREEN]: '40' },
						externalCpm: { [AdFormat.FULLSCREEN]: '60' },
						internalCpa: '4',
						externalCpa: '6',
						internalCpc: '0.4',
						externalCpc: '0.6',
					},
				},
			},
		] as unknown as ITargetingStreamer[]

		const factoryWithCpm = async (
			model: any = { targeting: { streamers: { list: [], exclude: false }, agencies: [] }, format: AdFormat.FULLSCREEN },
			props = {},
			storeConfig: { darkMarket?: boolean; partnerAgencyId?: number; advertiserCurrency?: string | null } = {},
		) => {
			const wrapper = mount(FormTargetingStreamers, {
				global: {
					plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
					stubs: {
						ElFormItem: mockElFormItem,
						ElSelect: mockElSelect,
						ElCheckbox: mockElCheckbox,
						ElOption: mockElOption,
						SocialIcon: mockSocialIcon,
					},
				},
				props: {
					modelValue: model,
					campaignCategory: 'Test Category',
					streamers: mockStreamersWithCpm,
					platform: Platform.TWITCH,
					disabled: false,
					...props,
				},
			})

			// Setup stores with configurable data
			const dictStore = useDictStore()
			dictStore.campaigns = {
				agencies: [
					{ id: 1, currency: 'USD' },
					{ id: 2, currency: 'EUR' },
				],
			} as any
			dictStore.all = {
				campaignsCategories: [
					{ title: 'Test Category', darkMarket: storeConfig.darkMarket || false },
				],
			} as any

			const partnerStore = usePartnerStore()
			partnerStore.profile = {
				agency: {
					id: storeConfig.partnerAgencyId || 1,
				},
			} as any

			const formCampaignStore = useFormCampaignStore()
			formCampaignStore.campaignStructure = {
				advertiser: {
					wallet: {
						currency: {
							code: storeConfig.advertiserCurrency || 'USD',
						},
					},
				},
			} as any

			await nextTick()

			return wrapper
		}

		it('adds price to streamer name when partner is same agency (internal CPM)', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.PPV,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Стример с agency.id = 1 должен использовать internalCpm
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($100)')
		})

		it('adds price to streamer name when partner is different agency (external CPM)', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.PPV,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Стример с agency.id = 2 должен использовать externalCpm
			const streamer2 = formattedStreamers.find((s: any) => s.id === 2)
			expect(streamer2.name).toBe('Streamer 2 ($75)')
		})

		it('uses dark market CPM when category is dark market', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.PPV,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: true },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Должен использовать darkMarketInternalCpm для того же агентства
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($200)')
		})

		it('falls back to agency CPM when streamer CPM is not available', async () => {
			const streamersWithoutCpm = [{
				id: 3,
				name: 'Streamer 3',
				platform: { name: Platform.TWITCH, avatar: 'avatar3.jpg' },
				cpm: {}, // Пустой объект cpm, чтобы функция не вышла раньше времени
				agency: {
					id: 1,
					cpm: {
						internalCpm: { [AdFormat.FULLSCREEN]: '90' },
						externalCpm: { [AdFormat.FULLSCREEN]: '130' },
					},
				},
			}]

			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.PPV,
				},
				{ streamers: streamersWithoutCpm },
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(streamersWithoutCpm)

			// Должен использовать agency.cpm.internalCpm
			const streamer3 = formattedStreamers.find((s: any) => s.id === 3)
			expect(streamer3.name).toBe('Streamer 3 ($90)')
		})

		it('does not add price when no CPM data available', async () => {
			const streamersWithoutAnyCpm = [{
				id: 4,
				name: 'Streamer 4',
				platform: { name: Platform.TWITCH, avatar: 'avatar4.jpg' },
				agency: { id: 1 },
			}]

			const wrapper = await factoryWithCpm(
				{ targeting: { streamers: { list: [], exclude: false }, agencies: [] }, format: AdFormat.FULLSCREEN },
				{ streamers: streamersWithoutAnyCpm },
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(streamersWithoutAnyCpm)

			// Имя должно остаться без изменений
			const streamer4 = formattedStreamers.find((s: any) => s.id === 4)
			expect(streamer4.name).toBe('Streamer 4')
		})

		it('does not add price when advertiser currency is not available', async () => {
			const wrapper = await factoryWithCpm(
				{ targeting: { streamers: { list: [], exclude: false }, agencies: [] }, format: AdFormat.FULLSCREEN },
				{},
				{ partnerAgencyId: 1, advertiserCurrency: null, darkMarket: false },
			)

			const vm = wrapper.vm as any

			// Устанавливаем advertiserCurrency как undefined
			vm.campaignStructure.advertiser.wallet.currency.code = undefined
			await nextTick()

			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Имена должны остаться без изменений
			expect(formattedStreamers[0].name).toBe('Streamer 1')
			expect(formattedStreamers[1].name).toBe('Streamer 2')
		})

		it('does not duplicate price if already present in name', async () => {
			const streamersWithPriceInName = [{
				id: 5,
				name: 'Streamer 5 ($100)',
				platform: { name: Platform.TWITCH, avatar: 'avatar5.jpg' },
				cpm: {
					internalCpm: { [AdFormat.FULLSCREEN]: '100' },
				},
				agency: {
					id: 1,
					cpm: {
						internalCpm: { [AdFormat.FULLSCREEN]: '100' },
					},
				},
			}]

			const wrapper = await factoryWithCpm(
				{ targeting: { streamers: { list: [], exclude: false }, agencies: [] }, format: AdFormat.FULLSCREEN },
				{ streamers: streamersWithPriceInName },
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(streamersWithPriceInName)

			const streamer5 = formattedStreamers.find((s: any) => s.id === 5)
			expect(streamer5.name).toBe('Streamer 5 ($100)')
		})

		it('displays formatted streamers in list computed property', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.PPV,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const listItems = vm.list

			const streamer1 = listItems.find((s: any) => s.id === 1)
			const streamer2 = listItems.find((s: any) => s.id === 2)

			expect(streamer1.name).toBe('Streamer 1 ($100)')
			expect(streamer2.name).toBe('Streamer 2 ($75)')
		})

		it('uses CPA pricing when strategyPayment is CPA', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPA,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Должен использовать internalCpa для того же агентства
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($10)')

			// Должен использовать externalCpa для другого агентства
			const streamer2 = formattedStreamers.find((s: any) => s.id === 2)
			expect(streamer2.name).toBe('Streamer 2 ($7.5)')
		})

		it('uses CPC pricing when strategyPayment is CPC', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPC,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Должен использовать internalCpc для того же агентства
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($1)')

			// Должен использовать externalCpc для другого агентства
			const streamer2 = formattedStreamers.find((s: any) => s.id === 2)
			expect(streamer2.name).toBe('Streamer 2 ($0.75)')
		})

		it('uses dark market CPA pricing when strategyPayment is CPA and category is dark market', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPA,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: true },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Должен использовать darkMarketInternalCpa для того же агентства
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($20)')
		})

		it('uses dark market CPC pricing when strategyPayment is CPC and category is dark market', async () => {
			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPC,
				},
				{},
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: true },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(mockStreamersWithCpm)

			// Должен использовать darkMarketInternalCpc для того же агентства
			const streamer1 = formattedStreamers.find((s: any) => s.id === 1)
			expect(streamer1.name).toBe('Streamer 1 ($2)')
		})

		it('falls back to agency CPA when streamer CPA is not available', async () => {
			const streamersWithoutCpa = [{
				id: 3,
				name: 'Streamer 3',
				platform: { name: Platform.TWITCH, avatar: 'avatar3.jpg' },
				cpm: {}, // Пустой объект cpm
				agency: {
					id: 1,
					cpm: {
						internalCpa: '9',
						externalCpa: '13',
					},
				},
			}]

			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPA,
				},
				{ streamers: streamersWithoutCpa },
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(streamersWithoutCpa)

			// Должен использовать agency.cpm.internalCpa
			const streamer3 = formattedStreamers.find((s: any) => s.id === 3)
			expect(streamer3.name).toBe('Streamer 3 ($9)')
		})

		it('falls back to agency CPC when streamer CPC is not available', async () => {
			const streamersWithoutCpc = [{
				id: 4,
				name: 'Streamer 4',
				platform: { name: Platform.TWITCH, avatar: 'avatar4.jpg' },
				cpm: {}, // Пустой объект cpm
				agency: {
					id: 1,
					cpm: {
						internalCpc: '0.9',
						externalCpc: '1.3',
					},
				},
			}]

			const wrapper = await factoryWithCpm(
				{
					targeting: { streamers: { list: [], exclude: false }, agencies: [] },
					format: AdFormat.FULLSCREEN,
					strategyPayment: StrategyPayment.CPC,
				},
				{ streamers: streamersWithoutCpc },
				{ partnerAgencyId: 1, advertiserCurrency: 'USD', darkMarket: false },
			)

			const vm = wrapper.vm as any
			const formattedStreamers = vm.formatStreamerName(streamersWithoutCpc)

			// Должен использовать agency.cpm.internalCpc
			const streamer4 = formattedStreamers.find((s: any) => s.id === 4)
			expect(streamer4.name).toBe('Streamer 4 ($0.9)')
		})
	})
})
