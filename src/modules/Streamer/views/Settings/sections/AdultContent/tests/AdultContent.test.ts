import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import AdultContent from '../AdultContent.vue'

vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()

	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})

describe('Streamer Settings AdultContent', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(AdultContent, {
			global: {
				plugins: [createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: {
						name: 'ElFormItem',
						template: '<div data-test="el-form-item"><slot /></div>',
					},
					ElTooltip: {
						name: 'ElTooltip',
						template: '<div data-test="el-tooltip"><slot name="content" /><slot /></div>',
					},
					ElCheckbox: {
						name: 'ElCheckbox',
						template: `
							<label>
								<input
									data-test="adult-allow-checkbox"
									type="checkbox"
									:checked="modelValue"
									@change="$emit('update:modelValue', $event.target.checked)"
								/>
								<slot />
							</label>
						`,
						props: ['modelValue'],
						emits: ['update:modelValue'],
					},
				},
			},
		})

		const settingsStore = useSettingsStore()
		return { wrapper, settingsStore }
	}

	it('does not render when widget is null', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="settings-adult-content"]').exists()).toBe(false)
	})

	it('renders title/description and checkbox when widget exists', async () => {
		const { wrapper, settingsStore } = factory()

		settingsStore.widget = widgetData as any
		await nextTick()

		expect(wrapper.find('[data-test="settings-adult-content"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('settings.adultOnly.title')
		expect(wrapper.text()).toContain('settings.adultOnly.description')
		expect(wrapper.find('[data-test="adult-allow-checkbox"]').exists()).toBe(true)
	})

	it('updates widget.ssp.allowAdult on checkbox toggle', async () => {
		const { wrapper, settingsStore } = factory()

		settingsStore.widget = widgetData as any
		await nextTick()

		// fixture has allowAdult=true
		expect(settingsStore.widget?.ssp.allowAdult).toBe(true)

		const checkbox = wrapper.find('[data-test="adult-allow-checkbox"]')
		await checkbox.setValue(false)
		await nextTick()

		expect(settingsStore.widget?.ssp.allowAdult).toBe(false)
	})
})

