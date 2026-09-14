import { inject, nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import * as FormAdsetApi from '@/modules/Partner/views/FormAdset/api'
import { streamers as streamersFixture } from '@/modules/Partner/views/FormAdset/api/searchStreamers/fixtures/streamers'

import FormTargetingStreamers from '../FormTargetingStreamers.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({ t: (key: string) => key }),
	useCurrency: () => ({ formatCurrency: (value: number) => `$${value}` }),
}))
vi.mock('@/modules/Partner/views/FormAdset/api')

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="adset-form-targeting-streamers-item"><slot /></div>',
	props: ['label', 'prop'],
}
const TableRowProvider = {
	name: 'TableRowProvider',
	props: ['row'],
	provide(this: any) {
		return { tableRow: this.row }
	},
	template: '<slot />',
}
const mockElTable = {
	name: 'ElTable',
	components: { TableRowProvider },
	template: `
		<table class="el-table">
			<tbody>
				<tr v-for="(row, i) in data" :key="i">
					<td colspan="3"><TableRowProvider :row="row"><slot /></TableRowProvider></td>
				</tr>
			</tbody>
		</table>
	`,
	props: ['data', 'size'],
}
const mockElTableColumn = {
	name: 'ElTableColumn',
	template: '<span><slot :row="row" /></span>',
	props: ['label', 'prop', 'width', 'align'],
	setup() {
		return { row: inject('tableRow', () => ({})) }
	},
}
const mockElSelect = {
	name: 'ElSelect',
	template: `
		<div>
			<input
				data-test="adset-form-targeting-streamers-select-input"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="(e) => remoteMethod?.(e.target?.value)"
			/>
			<slot />
		</div>
	`,
	props: ['modelValue', 'placeholder', 'disabled', 'loading', 'remoteMethod', 'size', 'remote', 'filterable', 'clearable'],
	emits: ['update:modelValue'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<div :data-test="`adset-form-targeting-streamers-option-${value}`" @click="$emit(\'select\', value)">{{ label }}</div>',
	props: ['value', 'label'],
	emits: ['select'],
}
const mockElInputNumber = {
	name: 'ElInputNumber',
	template: '<input type="number" data-test="adset-form-targeting-streamers-price" :value="modelValue" :disabled="disabled" @input="(e) => $emit(\'update:modelValue\', e.target?.value ? Number(e.target.value) : undefined)" />',
	props: ['modelValue', 'min', 'disabled', 'precision', 'controls', 'size'],
	emits: ['update:modelValue'],
}
const mockElButton = {
	name: 'ElButton',
	template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
	props: ['type', 'disabled', 'size', 'link'],
	emits: ['click'],
}
const mockSocialIcon = {
	name: 'SocialIcon',
	template: '<span class="social-icon" />',
	props: ['platform'],
}

describe('FormAdset SpecialProject FormTargetingStreamers Component', () => {
	const defaultModel = () => ({ targeting: { streamers: [] } })
	const defaultProps = () => ({
		platform: Platform.TWITCH,
		disabled: false,
	})

	const factory = (model: any = defaultModel(), propsOverrides = {}) => {
		const wrapper = mount(FormTargetingStreamers, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElFormItem: mockElFormItem,
					ElTable: mockElTable,
					ElTableColumn: mockElTableColumn,
					ElSelect: mockElSelect,
					ElOption: mockElOption,
					ElInputNumber: mockElInputNumber,
					ElButton: mockElButton,
					SocialIcon: mockSocialIcon,
				},
			},
			props: {
				modelValue: typeof model === 'function' ? model() : model,
				...defaultProps(),
				...propsOverrides,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		;(FormAdsetApi.searchStreamers as Mock).mockResolvedValue(streamersFixture)
	})

	it('renders form item and streamer select', () => {
		const { wrapper } = factory()
		expect(wrapper.find('[data-test="adset-form-targeting-streamers-item"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]').exists()).toBe(true)
	})

	it('does not render table when streamers list is empty', () => {
		const { wrapper } = factory()
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
	})

	it('renders table with streamer rows when streamers has items', async () => {
		const model = { targeting: { streamers: [{ id: 1320, price: 50 }] } }
		const { wrapper } = factory(model)
		await nextTick()
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
		// Name shows as #id when streamer not in knownStreamers (no search was run)
		expect(wrapper.text()).toContain('#1320')
		expect(wrapper.text()).toContain('$50')
	})

	it('disables select and add button when disabled=true', () => {
		const { wrapper } = factory(defaultModel(), { disabled: true })
		const selectInput = wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]')
		expect(selectInput.attributes('disabled')).toBeDefined()
		const buttons = wrapper.findAllComponents({ name: 'ElButton' })
		const addBtn = buttons.find(b => b.text().includes('adset.targeting.form.streamers.addBtn'))
		expect(addBtn?.props('disabled')).toBe(true)
	})

	it('calls searchStreamers when remote method is triggered with query length >= 3', async () => {
		vi.useFakeTimers()
		const { wrapper } = factory()
		const input = wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]')
		await input.setValue('twitch')
		await vi.advanceTimersByTimeAsync(500)
		await nextTick()
		expect(FormAdsetApi.searchStreamers).toHaveBeenCalledWith(Platform.TWITCH, { query: 'twitch' }, true)
		vi.useRealTimers()
	})

	it('does not call searchStreamers when query length < 3', async () => {
		vi.useFakeTimers()
		const { wrapper } = factory()
		const input = wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]')
		await input.setValue('ab')
		await vi.advanceTimersByTimeAsync(500)
		await nextTick()
		expect(FormAdsetApi.searchStreamers).not.toHaveBeenCalled()
		vi.useRealTimers()
	})

	it('does not call searchStreamers when disabled', async () => {
		vi.useFakeTimers()
		const { wrapper } = factory(defaultModel(), { disabled: true })
		const input = wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]')
		await input.setValue('twitch')
		await vi.advanceTimersByTimeAsync(500)
		await nextTick()
		expect(FormAdsetApi.searchStreamers).not.toHaveBeenCalled()
		vi.useRealTimers()
	})

	it('adds streamer when select has value, price is set, and add is clicked', async () => {
		vi.useFakeTimers()
		const model = { targeting: { streamers: [] } }
		const { wrapper } = factory(model)
		// Trigger search so options exist
		const input = wrapper.find('[data-test="adset-form-targeting-streamers-select-input"]')
		await input.setValue('sokoliurii')
		await vi.advanceTimersByTimeAsync(500)
		await nextTick()
		// Set select value (simulate choosing option 1320)
		const select = wrapper.findComponent({ name: 'ElSelect' })
		await select.vm.$emit('update:modelValue', 1320)
		await nextTick()
		// Set price
		const priceInput = wrapper.find('[data-test="adset-form-targeting-streamers-price"]')
		await priceInput.setValue(100)
		await nextTick()
		// Click add
		const buttons = wrapper.findAllComponents({ name: 'ElButton' })
		const addBtn = buttons.find(b => b.text().includes('adset.targeting.form.streamers.addBtn'))
		await addBtn?.trigger('click')
		await nextTick()
		expect(wrapper.props('modelValue').targeting.streamers).toEqual([{ id: 1320, price: 100 }])
		vi.useRealTimers()
	})

	it('does not add duplicate streamer', async () => {
		const model = { targeting: { streamers: [{ id: 1320, price: 50 }] } }
		const { wrapper } = factory(model)
		const select = wrapper.findComponent({ name: 'ElSelect' })
		await select.vm.$emit('update:modelValue', 1320)
		await nextTick()
		const priceInput = wrapper.find('[data-test="adset-form-targeting-streamers-price"]')
		await priceInput.setValue(99)
		await nextTick()
		const buttons = wrapper.findAllComponents({ name: 'ElButton' })
		const addBtn = buttons.find(b => b.text().includes('adset.targeting.form.streamers.addBtn'))
		await addBtn?.trigger('click')
		await nextTick()
		expect(wrapper.props('modelValue').targeting.streamers).toHaveLength(1)
		expect(wrapper.props('modelValue').targeting.streamers[0]).toEqual({ id: 1320, price: 50 })
	})

	it('removes streamer when remove button is clicked', async () => {
		const model = { targeting: { streamers: [{ id: 1320, price: 50 }] } }
		const { wrapper } = factory(model)
		await nextTick()
		const removeBtn = wrapper.findComponent({ name: 'ElTable' }).findComponent({ name: 'ElButton' })
		await removeBtn.trigger('click')
		await nextTick()
		expect(wrapper.props('modelValue').targeting.streamers).toHaveLength(0)
	})

	it('add button is disabled when no streamer or price selected', async () => {
		const { wrapper } = factory()
		const buttons = wrapper.findAllComponents({ name: 'ElButton' })
		const addBtn = buttons.find(b => b.text().includes('adset.targeting.form.streamers.addBtn'))
		expect(addBtn?.props('disabled')).toBe(true)
	})

	it('shows streamer name as #id when not in knownStreamers', async () => {
		const model = { targeting: { streamers: [{ id: 9999, price: 10 }] } }
		const { wrapper } = factory(model)
		await nextTick()
		expect(wrapper.text()).toContain('#9999')
		expect(wrapper.text()).toContain('$10')
	})
})
