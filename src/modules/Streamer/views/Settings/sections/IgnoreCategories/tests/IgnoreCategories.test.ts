import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { dictData } from '@/core/api/fetchDictionary/fixtures/dictData'
import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import type { IDictState } from '@/core/store/dict'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import IgnoreCategories from '../IgnoreCategories.vue'

vi.mock('@/core/hooks', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/core/hooks')>()

	return {
		...actual,
		useLocale: () => ({
			t: (key: string) => key,
		}),
	}
})

const ElSelectStub = {
	name: 'ElSelect',
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: `
		<select
			data-test="ignore-categories-select"
			multiple
			:value="modelValue"
			@change="$emit('update:modelValue', Array.from($event.target.selectedOptions).map(o => Number(o.value)))"
		>
			<slot />
		</select>
	`,
}

const ElOptionStub = {
	name: 'ElOption',
	props: ['value', 'label'],
	template: '<option :value="value">{{ label }}</option>',
}

describe('Streamer Settings IgnoreCategories', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(IgnoreCategories, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
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

		expect(wrapper.find('[data-test="ignore-categories-select"]').exists()).toBe(false)
	})

	it('renders options from dictStore when widget exists', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		settingsStore.widget = widgetData as any
		dictStore.all = dictData as any as IDictState['all']

		await nextTick()

		const options = wrapper.findAll('option')
		expect(options.length).toBe((dictData.campaignsCategories || []).length)
	})

	it('updates widget.ignoreCategories when selections change', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		settingsStore.widget = widgetData as any
		dictStore.all = dictData as any as IDictState['all']

		await nextTick()

		const categoryIds = dictData.campaignsCategories.slice(0, 2).map(c => c.id)
		const select = wrapper.find<HTMLSelectElement>('[data-test="ignore-categories-select"]')
		const opts = select.element.options

		for (let i = 0; i < opts.length; i++) {
			const val = Number(opts[i].value)
			opts[i].selected = categoryIds.includes(val)
		}

		await select.trigger('change')
		await nextTick()

		expect(settingsStore.widget?.ignoreCategories).toEqual(categoryIds)
	})
})

