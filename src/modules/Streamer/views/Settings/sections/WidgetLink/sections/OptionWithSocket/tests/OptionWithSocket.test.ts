import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import OptionWithSocket from '../OptionWithSocket.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/assets/img/icons/eye.svg', () => ({
	default: {
		name: 'EyeIcon',
		emits: ['click'],
		template: '<button type="button" data-test="eye-icon" @click="$emit(\'click\')" />',
	},
}))

vi.mock('@/assets/img/icons/eye-close.svg', () => ({
	default: {
		name: 'EyeClosedIcon',
		emits: ['click'],
		template: '<button type="button" data-test="eye-closed-icon" @click="$emit(\'click\')" />',
	},
}))

describe('Streamer Settings WidgetLink OptionWithSocket Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const CollapseStub = {
		name: 'Collapse',
		props: ['label'],
		template: '<div data-test="collapse-stub"><slot /></div>',
	}

	const TextLinkStub = {
		name: 'TextLink',
		props: ['href'],
		template: '<a data-test="text-link" :href="href"><slot /></a>',
	}

	const CopyLinkStub = {
		name: 'CopyLink',
		props: ['link'],
		template: '<div data-test="copy-link">{{ link }}</div>',
	}

	const ElAlertStub = {
		name: 'ElAlert',
		props: ['title'],
		template: '<div data-test="el-alert">{{ title }}</div>',
	}

	const ElFormStub = {
		name: 'ElForm',
		template: '<form data-test="el-form"><slot /></form>',
	}

	const ElFormItemStub = {
		name: 'ElFormItem',
		props: ['label'],
		template: '<div data-test="el-form-item"><span data-test="el-form-item-label">{{ label }}</span><slot /></div>',
	}

	const ElInputStub = {
		name: 'ElInput',
		inheritAttrs: false,
		props: {
			modelValue: {
				type: [String, Number],
				default: '',
			},
			type: {
				type: String,
				default: 'text',
			},
		},
		emits: ['update:modelValue'],
		template: `
			<input
				:data-test="type === 'password' ? 'obs-pass-input' : 'obs-port-input'"
				:type="type"
				:value="modelValue"
				@input="$emit('update:modelValue', type === 'number' ? Number($event.target.value) : $event.target.value)"
			/>
		`,
	}

	const factory = () => {
		const widget = structuredClone(widgetData)
		const wrapper = mount(OptionWithSocket, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							settings: {
								widget,
							},
						},
					}),
				],
				stubs: {
					Collapse: CollapseStub,
					TextLink: TextLinkStub,
					CopyLink: CopyLinkStub,
					ElAlert: ElAlertStub,
					ElForm: ElFormStub,
					ElFormItem: ElFormItemStub,
					ElInput: ElInputStub,
				},
			},
		})

		const settingsStore = useSettingsStore()

		return { wrapper, settingsStore }
	}

	it('renders widget.url in link input, shows blur state and eye icon', async () => {
		const { wrapper } = factory()
		await nextTick()

		const linkInput = wrapper.find('[data-test="settings-widgetlink-option-link-input"]')
		expect(linkInput.exists()).toBe(true)
		expect(linkInput.text()).toBe(widgetData.url)
		expect(linkInput.classes()).toContain('blur-sm')

		expect(wrapper.find('[data-test="eye-icon"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="eye-closed-icon"]').exists()).toBe(false)

		const copyLink = wrapper.find('[data-test="copy-link"]')
		expect(copyLink.text()).toBe(widgetData.url)
	})

	it('toggles blur state via eye icon click', async () => {
		const { wrapper } = factory()
		await nextTick()

		await wrapper.find('[data-test="eye-icon"]').trigger('click')
		await nextTick()

		const linkInput = wrapper.find('[data-test="settings-widgetlink-option-link-input"]')
		expect(linkInput.classes()).not.toContain('blur-sm')

		expect(wrapper.find('[data-test="eye-icon"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="eye-closed-icon"]').exists()).toBe(true)
	})

	it('updates obsWebSocket.pass and obsWebSocket.port in store', async () => {
		const { wrapper, settingsStore } = factory()
		await nextTick()

		const passInput = wrapper.find<HTMLInputElement>('[data-test="obs-pass-input"]')
		await passInput.setValue('new-pass')
		await nextTick()
		expect(settingsStore.widget?.obsWebSocket.pass).toBe('new-pass')

		const portInput = wrapper.find<HTMLInputElement>('[data-test="obs-port-input"]')
		await portInput.setValue('9999')
		await nextTick()
		expect(settingsStore.widget?.obsWebSocket.port).toBe(9999)
	})
})

