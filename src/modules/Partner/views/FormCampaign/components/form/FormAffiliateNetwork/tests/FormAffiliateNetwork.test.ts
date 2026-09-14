import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'

import FormAffiliateNetwork from '../FormAffiliateNetwork.vue'

describe('FormAffiliateNetwork Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormAffiliateNetwork, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: {
									affiliateNetworks: [
										{ id: 1, title: 'Network 1' },
										{ id: 2, title: 'Network 2' },
										{ id: 3, title: 'Network 3' },
									],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					affiliateNetwork: undefined,
				},
				...props,
			},
		})

		const dictStore = useDictStore()

		return { wrapper, dictStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders component correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-name="partner-form-campaign-affiliate-network"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
		expect(wrapper.findComponent(ElSelect).exists()).toBe(true)
	})

	it('renders description text', () => {
		const { wrapper } = factory()

		expect(wrapper.find('._text-m-regular').exists()).toBe(true)
	})

	it('renders "not selected" option with value -1', () => {
		const { wrapper } = factory()

		const options = wrapper.findAllComponents(ElOption)
		const notSelectedOption = options[0]

		expect(notSelectedOption.props('value')).toBe(-1)
	})

	it('renders affiliate networks from store', async () => {
		const { wrapper } = factory()

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		// +1 because of "not selected" option
		expect(options).toHaveLength(4)

		// Check network options (skip first "not selected" option)
		const networkOptions = options.slice(1)
		expect(networkOptions[0].props('label')).toBe('Network 1')
		expect(networkOptions[1].props('label')).toBe('Network 2')
		expect(networkOptions[2].props('label')).toBe('Network 3')
	})

	it('updates model value when network is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				affiliateNetwork: undefined,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		await select.setValue(1)

		await nextTick()

		expect(wrapper.props('modelValue')).toEqual({
			affiliateNetwork: 1,
		})
	})

	it('sets correct value-key prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('valueKey')).toBe('id')
	})

	it('sets filterable prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('filterable')).toBe(true)
	})

	it('preserves selected network when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				affiliateNetwork: 2,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(2)
	})

	it('handles empty affiliate networks array', async () => {
		const wrapper = mount(FormAffiliateNetwork, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: {
									affiliateNetworks: [],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					affiliateNetwork: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		// Should only have "not selected" option
		expect(options).toHaveLength(1)
		expect(options[0].props('value')).toBe(-1)
	})

	it('handles undefined campaigns in store', async () => {
		const wrapper = mount(FormAffiliateNetwork, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: undefined,
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					affiliateNetwork: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		// Should only have "not selected" option
		expect(options).toHaveLength(1)
		expect(options[0].props('value')).toBe(-1)
	})
})
