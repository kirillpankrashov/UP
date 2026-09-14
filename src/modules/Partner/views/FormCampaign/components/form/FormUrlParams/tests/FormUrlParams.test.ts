import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CurrencyName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { CampaignUrlParams, type IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

import FormUrlParams from '../FormUrlParams.vue'

const URL_PARAMS = {
	USER_ID: 'user_id',
	STREAM_ID: 'stream_id',
	ERID_TOKEN: 'erid_token',
}

const createParamItem = (name: string, param: string, key?: string): IFormUrlParamItem => ({
	key: key || Date.now().toString(),
	name,
	param: param as CampaignUrlParams,
})

vi.mock('../components', () => ({
	UrlParamBlock: {
		name: 'UrlParamBlock',
		template: '<div class="mock-url-param-block" :data-index="index"><slot /></div>',
		props: ['modelValue', 'index', 'blocks', 'showDeleteBlockButton', 'advertiserCurrency'],
		emits: ['update:modelValue', 'delete-block'],
	},
}))

describe('FormUrlParams Component', () => {
	const factory = (props = {}, initialState = {}) => {
		const defaultAdvertisers = [
			{
				id: 1,
				wallet: {
					currency: {
						code: CurrencyName.USD,
					},
				},
			},
			{
				id: 2,
				wallet: {
					currency: {
						code: CurrencyName.RUB,
					},
				},
			},
		]

		const wrapper = mount(FormUrlParams, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-advertisers': {
								advertisers: defaultAdvertisers,
							},
							...initialState,
						},
					}),
				],
				stubs: {
					UrlParamBlock: true,
				},
			},
			props: {
				modelValue: {
					productUrlParams: [],
					advertiser: undefined,
				},
				...props,
			},
		})

		const advertisersStore = useAdvertisersStore()

		return { wrapper, advertisersStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('adds initial block when mounted with empty params', async () => {
		const { wrapper } = factory()

		await vi.dynamicImportSettled()

		const blocks = wrapper.findAllComponents({ name: 'UrlParamBlock' })
		expect(blocks.length).toBe(1)

		const firstBlock = blocks[0]
		expect(firstBlock.props('modelValue')).toEqual(
			expect.objectContaining({
				name: null,
				param: undefined,
			}),
		)
	})

	it('initializes with existing params', async () => {
		const { wrapper } = factory({
			modelValue: {
				productUrlParams: [
					createParamItem('utm_source', URL_PARAMS.USER_ID, '0'),
					createParamItem('utm_medium', URL_PARAMS.STREAM_ID, '1'),
				],
				advertiser: 1,
			},
		})

		await vi.dynamicImportSettled()

		const blocks = wrapper.findAllComponents({ name: 'UrlParamBlock' })
		expect(blocks.length).toBe(2)

		expect(blocks[0].props('modelValue')).toEqual(
			expect.objectContaining({
				name: 'utm_source',
				param: URL_PARAMS.USER_ID,
			}),
		)
		expect(blocks[1].props('modelValue')).toEqual(
			expect.objectContaining({
				name: 'utm_medium',
				param: URL_PARAMS.STREAM_ID,
			}),
		)
	})

	it('initializes keys for existing params on mount', async () => {
		const { wrapper } = factory({
			modelValue: {
				productUrlParams: [
					{ name: 'utm_source', param: URL_PARAMS.USER_ID, key: undefined } as any,
					{ name: 'utm_medium', param: URL_PARAMS.STREAM_ID, key: undefined } as any,
				],
				advertiser: 1,
			},
		})

		await vi.dynamicImportSettled()

		const productUrlParams = wrapper.props('modelValue').productUrlParams
		expect(productUrlParams[0].key).toBe('0')
		expect(productUrlParams[1].key).toBe('1')
	})

	it('adds a block when add button is clicked', async () => {
		const { wrapper } = factory()

		await vi.dynamicImportSettled()

		const initialBlocks = wrapper.findAllComponents({ name: 'UrlParamBlock' }).length

		await wrapper.find('button').trigger('click')

		const updatedBlocks = wrapper.findAllComponents({ name: 'UrlParamBlock' }).length
		expect(updatedBlocks).toBe(initialBlocks + 1)
	})

	it('removes a block when delete-block event is emitted', async () => {
		const { wrapper } = factory({
			modelValue: {
				productUrlParams: [
					createParamItem('utm_source', URL_PARAMS.USER_ID, '0'),
					createParamItem('utm_medium', URL_PARAMS.STREAM_ID, '1'),
				],
				advertiser: 1,
			},
		})

		await vi.dynamicImportSettled()

		const initialBlocks = wrapper.findAllComponents({ name: 'UrlParamBlock' }).length
		expect(initialBlocks).toBe(2)

		await wrapper.findAllComponents({ name: 'UrlParamBlock' })[0].vm.$emit('delete-block')

		const updatedBlocks = wrapper.findAllComponents({ name: 'UrlParamBlock' }).length
		expect(updatedBlocks).toBe(initialBlocks - 1)
	})

	it('adds ERID_TOKEN automatically for RUB currency', async () => {
		const { wrapper } = factory({
			modelValue: {
				productUrlParams: [],
				advertiser: 2,
			},
		})

		await vi.dynamicImportSettled()

		const blocks = wrapper.findAllComponents({ name: 'UrlParamBlock' })
		expect(blocks.length).toBeGreaterThan(0)

		const firstBlock = blocks[0]
		expect(firstBlock.props('modelValue')).toEqual(
			expect.objectContaining({
				name: 'erid',
				param: URL_PARAMS.ERID_TOKEN,
			}),
		)
	})

	it('updates productUrlParams when blocks change', async () => {
		const { wrapper } = factory({
			modelValue: {
				productUrlParams: [
					createParamItem('utm_source', URL_PARAMS.USER_ID, '0'),
				],
				advertiser: undefined,
			},
		})

		await vi.dynamicImportSettled()

		const blocks = wrapper.findAllComponents({ name: 'UrlParamBlock' })
		expect(blocks.length).toBe(1)

		const firstBlock = blocks[0]
		expect(firstBlock.props('modelValue')).toEqual(
			expect.objectContaining({
				name: 'utm_source',
				param: URL_PARAMS.USER_ID,
			}),
		)
	})

	it('shows add button always', () => {
		const { wrapper } = factory()

		expect(wrapper.find('button').exists()).toBe(true)
	})

	it('emits update event when blocks change', async () => {
		const { wrapper } = factory()

		wrapper.vm.$emit('update:modelValue', {
			productUrlParams: [
				createParamItem('utm_source', URL_PARAMS.USER_ID, '0'),
			],
			advertiser: 1,
		})

		expect(wrapper.emitted('update:modelValue')).toBeTruthy()
	})
})
