import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import EditorGallery from '../EditorGallery.vue'

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

const mockPreviewExtensionGallery = {
	name: 'PreviewExtensionGallery',
	template: '<div data-test="preview-extension-gallery"></div>',
	props: ['gallery'],
}

describe('FormCreative Extension EditorGallery Component', () => {
	const factory = (gallery: any) =>
		mount(EditorGallery, {
			global: {
				stubs: {
					PreviewExtensionGallery: mockPreviewExtensionGallery,
				},
			},
			props: {
				modelValue: {
					gallery,
				},
			},
		})

	it('renders nothing when gallery is undefined', () => {
		const wrapper = factory(undefined)

		expect(wrapper.html()).toBe('<!--v-if-->')
		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="preview-extension-gallery"]').exists()).toBe(false)
	})

	it('renders codemirror and preview when gallery exists', () => {
		const gallery = {
			list: [],
			styles: '.gallery { color: red; }',
		}
		const wrapper = factory(gallery)

		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="preview-extension-gallery"]').exists()).toBe(true)
	})

	it('passes gallery.styles into codemirror modelValue', () => {
		const gallery = {
			list: [],
			styles: '.gallery { color: blue; }',
		}
		const wrapper = factory(gallery)
		const codemirror = wrapper.findComponent({ name: 'Codemirror' })

		expect(codemirror.props('modelValue')).toBe('.gallery { color: blue; }')
		expect(codemirror.props('extensions')).toHaveLength(1)
	})

	it('passes full gallery object to preview component', () => {
		const gallery = {
			list: [
				{ id: '1', path: 'https://cdn/1.png' },
				{ id: '2', path: 'https://cdn/2.png' },
			],
			styles: '.gallery { color: green; }',
		}
		const wrapper = factory(gallery)
		const preview = wrapper.findComponent({ name: 'PreviewExtensionGallery' })

		expect(preview.props('gallery')).toEqual(gallery)
	})

	it('updates codemirror value when gallery styles change', async () => {
		const wrapper = factory({
			list: [],
			styles: '.gallery { color: black; }',
		})

		await wrapper.setProps({
			modelValue: {
				gallery: {
					list: [],
					styles: '.gallery { color: white; }',
				},
			},
		})
		await nextTick()

		const codemirror = wrapper.findComponent({ name: 'Codemirror' })
		expect(codemirror.props('modelValue')).toBe('.gallery { color: white; }')
	})
})
