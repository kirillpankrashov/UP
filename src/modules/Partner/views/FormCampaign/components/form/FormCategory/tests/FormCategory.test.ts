import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { ElOption, ElSelect } from '@/components/element-plus'

import FormCategory from '../FormCategory.vue'

describe('FormCategory Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormCategory, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								all: {
									campaignsCategories: [
										{ id: 1, title: 'Category 1' },
										{ id: 2, title: 'Category 2' },
										{ id: 3, title: 'Category 3' },
									],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					category: undefined,
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

	it('renders categories from store', async () => {
		const { wrapper } = factory()

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(3)
		expect(options[0].props('label')).toBe('Category 1')
		expect(options[1].props('label')).toBe('Category 2')
		expect(options[2].props('label')).toBe('Category 3')
	})

	it('updates model value when category is selected', async () => {
		const { wrapper } = factory({
			modelValue: {
				category: undefined,
			},
		})

		const select = wrapper.findComponent(ElSelect)
		await select.setValue(1)

		await nextTick()

		expect(wrapper.props('modelValue')).toEqual({
			category: 1,
		})
	})

	it('sets correct value-key prop for ElSelect', () => {
		const { wrapper } = factory()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('valueKey')).toBe('id')
	})

	it('preserves selected category when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				category: 2,
			},
		})

		await nextTick()

		const select = wrapper.findComponent(ElSelect)
		expect(select.props('modelValue')).toBe(2)
	})

	it('handles empty categories array', async () => {
		const wrapper = mount(FormCategory, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								all: {
									campaignsCategories: [],
								},
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					category: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})

	it('handles undefined categories in store', async () => {
		const wrapper = mount(FormCategory, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								all: undefined,
							},
						},
					}),
				],
			},
			props: {
				modelValue: {
					category: undefined,
				},
			},
		})

		await nextTick()

		const options = wrapper.findAllComponents(ElOption)
		expect(options).toHaveLength(0)
	})
})
