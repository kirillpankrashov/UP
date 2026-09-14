import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdFormat } from '@/core/types'
import { i18n } from '@/core/i18n'

import FormFormat from '../FormFormat.vue'

const mockFormats = [
	{ id: AdFormat.FULLSCREEN, title: 'Fullscreen', description: 'desc1', icon: 'icon1.svg' },
	{ id: AdFormat.PIP, title: 'PIP', description: 'desc2', icon: 'icon2.svg' },
	{ id: AdFormat.YANDEX_FS, title: 'Yandex FS', description: 'desc3', icon: 'icon3.svg' },
]

describe('FormAdset FormFormat', () => {
	beforeEach(() => {
		vi.resetModules()
		vi.clearAllMocks()
	})

	const factory = (model = { format: AdFormat.FULLSCREEN, formatEdit: true }, formats = mockFormats) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
			initialState: {
				dict: {
					campaigns: { formats },
				},
			},
		})

		const wrapper = mount(FormFormat, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					FormatItem: {
						template: '<div data-test="format-item-stub" @click="$emit(\'update:value\', item.id)"></div>',
						props: ['item', 'value', 'disabled'],
					},
				},
			},
			props: { modelValue: model },
		})

		return { wrapper, pinia }
	}

	it('renders all non-SSP formats as FormatItem', async () => {
		const { wrapper } = factory()

		const items = wrapper.findAll('[data-test="format-item-stub"]')

		expect(items.length).toBe(2)
	})

	it('passes value and disabled to FormatItem', () => {
		const { wrapper } = factory({ format: AdFormat.PIP, formatEdit: false })

		const items = wrapper.findAllComponents({ name: 'FormatItem' })

		items.forEach(item => {
			expect(item.props('value')).toBe(AdFormat.PIP)
			expect(item.props('disabled')).toBe(true)
		})
	})

	it('updates modelValue.format on FormatItem click', async () => {
		const { wrapper } = factory({ format: AdFormat.FULLSCREEN, formatEdit: true })

		const items = wrapper.findAll('[data-test="format-item-stub"]')

		await items[1].trigger('click')

		expect(wrapper.props('modelValue').format).toBe(AdFormat.PIP)
	})
})
