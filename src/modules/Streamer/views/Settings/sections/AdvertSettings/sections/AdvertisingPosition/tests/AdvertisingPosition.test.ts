import { h, nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdvertisingPosition } from '@/core/types'
import { dictData } from '@/core/api/fetchDictionary/fixtures/dictData'
import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import type { IDictState } from '@/core/store/dict'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import AdvertisingPositionComponent from '../AdvertisingPosition.vue'


vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()
	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})

const ElFormItemStub = {
	name: 'ElFormItem',
	props: ['label', 'id'],
	template: `
		<div data-test="advertising-position-form-item">
			<span data-test="advertising-position-label">{{ label }}</span>
			<slot />
		</div>
	`,
}

const ElOptionStub = {
	name: 'ElOption',
	props: ['value', 'label', 'dataTest'],
	template: '<option :value="value" :data-test="dataTest">{{ label }}</option>',
}

const ElSelectStub = {
	name: 'ElSelect',
	// element-plus v-model uses modelValue + update:modelValue
	props: {
		modelValue: {
			type: [String, Number],
			default: '',
		},
	},
	emits: ['update:modelValue'],
	template: `
		<select
			data-test="advertising-position-select"
			:value="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
		>
			<slot />
		</select>
	`,
}

describe('Streamer Settings AdvertSettings AdvertisingPosition', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(AdvertisingPositionComponent, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: ElFormItemStub,
					ElSelect: ElSelectStub,
					ElOption: ElOptionStub,
				},
			},
		})

		const settingsStore = useSettingsStore()
		const dictStore = useDictStore()

		return { wrapper, settingsStore, dictStore }
	}

	it('does not render when widget is null', async () => {
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="advertising-position-form-item"]').exists()).toBe(false)
	})

	it('renders options from dictStore and selects current widget position', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		settingsStore.widget = widgetData as any

		dictStore.all = dictData as any as IDictState['all']

		await nextTick()

		const select = wrapper.find<HTMLSelectElement>('[data-test="advertising-position-select"]')
		expect(select.exists()).toBe(true)
		expect((select.element as HTMLSelectElement).value).toBe(AdvertisingPosition.RIGHT_TOP_CORNER)

		expect(wrapper.find(`option[data-test="${AdvertisingPosition.LEFT_TOP_CORNER}"]`).exists()).toBe(true)
		expect(wrapper.find(`option[data-test="${AdvertisingPosition.RIGHT_BOTTOM_CORNER}"]`).exists()).toBe(true)
	})

	it('updates widget.advertising.position when selecting another option', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		settingsStore.widget = widgetData as any

		dictStore.all = dictData as any as IDictState['all']

		await nextTick()

		const select = wrapper.find<HTMLSelectElement>('[data-test="advertising-position-select"]')
		select.element.value = AdvertisingPosition.LEFT_TOP_CORNER
		expect(select.element.value).toBe(AdvertisingPosition.LEFT_TOP_CORNER)
		await select.trigger('change')
		await nextTick()

		expect(settingsStore.widget?.advertising.position).toBe(AdvertisingPosition.LEFT_TOP_CORNER)
	})
})

