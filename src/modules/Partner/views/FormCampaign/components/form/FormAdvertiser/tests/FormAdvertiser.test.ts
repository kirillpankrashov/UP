import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'

import FormAdvertiser from '../FormAdvertiser.vue'

vi.mock('@/core/helpers')

describe('FormAdvertiser Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormAdvertiser, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-advertisers': {
								advertisers: [
									{ id: 1, title: 'Advertiser 1', holding: { id: 1 } },
									{ id: 2, title: 'Advertiser 2', holding: { id: 1 } },
									{ id: 3, title: 'Advertiser 3', holding: { id: 2 } },
								],
							},
						},
					}),
				],
				stubs: {
				},
			},
			props: {
				modelValue: {
					advertiser: undefined,
					holding: undefined,
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

	it('renders component correctly', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
		expect(wrapper.findComponent(ElSelect).exists()).toBe(true)
	})

	it('disables select when no holding selected', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('disabled')).toBe(true)
	})

	it('enables select when holding is selected', () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: undefined,
				holding: 1,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('disabled')).toBe(false)
	})

	it('filters advertisers by selected holding', async () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: undefined,
				holding: 1,
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(2)
		expect(options[0].props('value')).toBe(1)
		expect(options[1].props('value')).toBe(2)
	})

	it('updates model value when advertiser is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: undefined,
				holding: 1,
			},
		})

		const select = wrapper.findComponent(ElSelect)

		await select.setValue(1)

		await nextTick()

		expect(wrapper.props('modelValue')).toEqual({
			advertiser: 1,
			holding: 1,
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

	it('displays correct advertiser titles in options', async () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: undefined,
				holding: 1,
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options[0].props('label')).toBe('Advertiser 1')
		expect(options[1].props('label')).toBe('Advertiser 2')
	})

	it('preserves selected advertiser when holding matches', async () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: 1,
				holding: 1,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(1)
	})

	it('clears selected advertiser when holding changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				advertiser: 1,
				holding: 1,
			},
		})

		await wrapper.setProps({
			modelValue: {
				advertiser: 1,
				holding: 2,
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(1)
		expect(options[0].props('value')).toBe(3)
	})
})
