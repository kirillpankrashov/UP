import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { dictData } from '@/core/api/fetchDictionary/fixtures/dictData'
import { i18n } from '@/core/i18n'
import { useDictStore } from '@/core/store'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import BannerTimeout from '../BannerTimeout.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const ElFormItemStub = {
	name: 'ElFormItem',
	template: '<div data-test="banner-timeout-form-item"><slot /></div>',
	props: ['label', 'id'],
}

const ElOptionStub = {
	name: 'ElOption',
	props: ['value', 'label'],
	template: '<option :value="value">{{ label }}</option>',
}

const ElSelectStub = {
	name: 'ElSelect',
	props: ['modelValue', 'size'],
	emits: ['update:modelValue'],
	template: `
		<select
			data-test="banner-timeout-select"
			:value="modelValue"
			@change="$emit('update:modelValue', Number($event.target.value))"
		>
			<slot />
		</select>
	`,
}

describe('Streamer Settings AdvertSettings BannerTimeout', () => {
	const factory = () => {
		const wrapper = mount(BannerTimeout, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElFormItem: ElFormItemStub,
					ElSelect: ElSelectStub,
					ElOption: ElOptionStub,
					// helper icons don't matter here
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

		expect(wrapper.find('[data-test="settings-banner-timeout"]').exists()).toBe(false)
	})

	it('renders options and selects widget frequency', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		dictStore.all = {
			...dictData,
			widgetFrequencies: [
				{ value: 5, title: 'Every 5 minutes' },
				{ value: 15, title: 'Every 15 minutes' },
			],
		} as any

		settingsStore.widget = {
			...widgetData,
			advertising: {
				...widgetData.advertising,
				frequency: 5,
			},
		} as any

		await nextTick()

		const select = wrapper.find<HTMLSelectElement>('[data-test="banner-timeout-select"]')
		expect(select.exists()).toBe(true)
		expect(select.element.value).toBe(String(5))

		const options = wrapper.findAll('option')
		expect(options.length).toBe(2)
		expect(options[0]?.text()).toBe('Every 5 minutes')
	})

	it('updates widget.advertising.frequency on select change', async () => {
		const { wrapper, settingsStore, dictStore } = factory()

		dictStore.all = {
			...dictData,
			widgetFrequencies: [
				{ value: 5, title: 'Every 5 minutes' },
				{ value: 15, title: 'Every 15 minutes' },
			],
		} as any

		settingsStore.widget = {
			...widgetData,
			advertising: {
				...widgetData.advertising,
				frequency: 5,
			},
		} as any

		await nextTick()

		const select = wrapper.find<HTMLSelectElement>('[data-test="banner-timeout-select"]')
		select.element.value = String(15)
		await select.trigger('change')
		await nextTick()

		expect(settingsStore.widget?.advertising.frequency).toBe(15)
	})
})

