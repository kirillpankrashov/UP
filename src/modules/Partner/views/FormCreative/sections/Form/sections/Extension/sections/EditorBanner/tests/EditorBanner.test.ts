import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import EditorBanner from '../EditorBanner.vue'

vi.mock('vue-codemirror', () => ({
	Codemirror: {
		name: 'Codemirror',
		template: '<div data-test="codemirror"></div>',
		props: ['modelValue', 'extensions'],
		emits: ['update:modelValue'],
	},
}))

vi.mock('@codemirror/lang-css', () => ({
	css: vi.fn(() => []),
}))

const mockPreviewExtensionBanner = {
	name: 'PreviewExtensionBanner',
	template: '<div data-test="preview-extension-banner"></div>',
	props: ['panel'],
}

describe('FormCreative Extension EditorBanner Component', () => {
	const factory = (panel: any) =>
		mount(EditorBanner, {
			global: {
				stubs: {
					PreviewExtensionBanner: mockPreviewExtensionBanner,
				},
			},
			props: {
				modelValue: {
					panel,
				},
			},
		})

	it('renders nothing when panel is undefined', () => {
		const wrapper = factory(undefined)

		expect(wrapper.html()).toBe('<!--v-if-->')
		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="preview-extension-banner"]').exists()).toBe(false)
	})

	it('renders codemirror and preview when panel exists', () => {
		const panel = {
			banner1: null,
			banner2: null,
			styles: '.banner { color: red; }',
		}
		const wrapper = factory(panel)

		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preview-extension-banner"]').exists()).toBe(true)
	})

	it('passes panel.styles into codemirror modelValue', () => {
		const panel = {
			banner1: null,
			banner2: null,
			styles: '.banner { color: blue; }',
		}
		const wrapper = factory(panel)
		const codemirror = wrapper.findComponent({ name: 'Codemirror' })

		expect(codemirror.props('modelValue')).toBe('.banner { color: blue; }')
		expect(codemirror.props('extensions')).toHaveLength(1)
	})

	it('passes full panel object to preview component', () => {
		const panel = {
			banner1: { basename: 'b1.png', path: 'https://cdn/b1.png' },
			banner2: { basename: 'b2.png', path: 'https://cdn/b2.png' },
			styles: '.banner { color: green; }',
		}
		const wrapper = factory(panel)
		const preview = wrapper.findComponent({ name: 'PreviewExtensionBanner' })

		expect(preview.props('panel')).toEqual(panel)
	})

	it('updates codemirror value when panel styles change', async () => {
		const wrapper = factory({
			banner1: null,
			banner2: null,
			styles: '.banner { color: black; }',
		})

		await wrapper.setProps({
			modelValue: {
				panel: {
					banner1: null,
					banner2: null,
					styles: '.banner { color: white; }',
				},
			},
		})
		await nextTick()

		const codemirror = wrapper.findComponent({ name: 'Codemirror' })
		expect(codemirror.props('modelValue')).toBe('.banner { color: white; }')
	})
})
