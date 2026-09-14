import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import StreamDelay from '../StreamDelay.vue'

vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()
	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})

const ElFormStub = {
	name: 'ElForm',
	template: '<form data-test="stream-delay-el-form"><slot /></form>',
}

const ElFormItemStub = {
	name: 'ElFormItem',
	props: ['label'],
	template: `
		<div data-test="stream-delay-el-form-item">
			<span data-test="stream-delay-label">{{ label }}</span>
			<slot />
		</div>
	`,
}

const ElInputNumberStub = {
	name: 'ElInputNumber',
	inheritAttrs: false,
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: `
		<input
			data-test="stream-delay-input"
			type="number"
			:value="modelValue"
			@input="$emit('update:modelValue', Number($event.target.value))"
		/>
	`,
}

describe('Streamer Settings StreamDelay', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(StreamDelay, {
			global: {
				plugins: [createTestingPinia({ createSpy: vi.fn }), i18n],
				stubs: {
					ElForm: ElFormStub,
					ElFormItem: ElFormItemStub,
					ElInputNumber: ElInputNumberStub,
				},
			},
		})

		const settingsStore = useSettingsStore()

		return { wrapper, settingsStore }
	}

	it('does not render when widget is null', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="settings-stream-delay-section"]').exists()).toBe(false)
	})

	it('renders input and updates widget.stream.delay on change', async () => {
		const { wrapper, settingsStore } = factory()
		settingsStore.widget = widgetData as any
		await nextTick()

		const input = wrapper.find<HTMLInputElement>('[data-test="stream-delay-input"]')
		expect(input.exists()).toBe(true)
		expect(input.element.value).toBe(String(widgetData.stream.delay))

		await input.setValue('45')
		await nextTick()

		expect(settingsStore.widget?.stream.delay).toBe(45)
	})
})

