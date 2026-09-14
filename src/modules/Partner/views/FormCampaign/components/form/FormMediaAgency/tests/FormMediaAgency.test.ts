import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'

import FormMediaAgency from '../FormMediaAgency.vue'

describe('FormMediaAgency Component', () => {
	const factory = (props = {}, customState = {}) => {
		const initialState = {
			dict: {
				campaigns: {
					mediaAgencies: [
						{ id: 1, title: 'Agency 1' },
						{ id: 2, title: 'Agency 2' },
						{ id: 3, title: 'Agency 3' },
					],
				},
			},
			...customState,
		}

		const wrapper = mount(FormMediaAgency, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState,
					}),
				],
			},
			props: {
				modelValue: {
					mediaAgency: undefined,
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

		expect(wrapper.find('[data-name="partner-form-campaign-media-agency"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElFormItem).exists()).toBe(true)
		expect(wrapper.findComponent(ElSelect).exists()).toBe(true)
	})

	it('renders media agencies from store', async () => {
		const { wrapper } = factory()

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(3)
		expect(options[0].props('label')).toBe('Agency 1')
		expect(options[1].props('label')).toBe('Agency 2')
		expect(options[2].props('label')).toBe('Agency 3')
	})

	it('updates model value when agency is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				mediaAgency: undefined,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		await select.setValue(2)

		await nextTick()

		expect(wrapper.props('modelValue')).toEqual({
			mediaAgency: 2,
		})
	})

	it('sets correct value-key prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('valueKey')).toBe('id')
	})

	it('sets filterable and clearable props for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('filterable')).toBe(true)
		expect(select.props('clearable')).toBe(true)
	})

	it('sets no-data-text prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('noDataText')).toBeDefined()
	})

	it('preserves selected agency when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				mediaAgency: 3,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(3)
	})

	it('handles empty media agencies array', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: {
					mediaAgencies: [],
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined campaigns in store', async () => {
		const { wrapper } = factory({}, {
			dict: {
				campaigns: undefined,
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})
})
