import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import FormDescription from '../FormDescription.vue'

const mockMdEditor = {
	name: 'v-md-editor',
	template: '<div class="mock-md-editor"><slot></slot></div>',
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		height: String,
		leftToolbar: String,
		rightToolbar: String,
		mode: String,
		placeholder: String,
	},
	emits: ['update:modelValue'],
}

describe('FormDescription Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormDescription, {
			global: {
				plugins: [i18n],
				stubs: {
					'v-md-editor': mockMdEditor,
				},
			},
			props: {
				modelValue: {
					description: '',
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('sets correct props for markdown editor', () => {
		const { wrapper } = factory()

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		expect(mdEditor.props('height')).toBe('400px')
		expect(mdEditor.props('leftToolbar')).toBe('h bold italic strikethrough quote emoji | ul ol hr | link')
		expect(mdEditor.props('rightToolbar')).toBe('fullscreen')
		expect(mdEditor.props('mode')).toBe('editable')
		expect(mdEditor.props('placeholder')).toBeTruthy()
	})

	it('initializes with provided description', () => {
		const { wrapper } = factory({
			modelValue: {
				description: '# Test Description',
			},
		})

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		expect(mdEditor.props('modelValue')).toBe('# Test Description')
	})

	it('updates model value when description is edited', async () => {
		const { wrapper } = factory({
			modelValue: {
				description: '',
			},
		})

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		await mdEditor.setValue('# New content')

		expect(wrapper.props('modelValue').description).toBe('# New content')
	})

	it('preserves existing description when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				description: '# Initial content',
			},
		})

		await nextTick()

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		expect(mdEditor.props('modelValue')).toBe('# Initial content')
	})

	it('handles empty description', () => {
		const { wrapper } = factory({
			modelValue: {
				description: '',
			},
		})

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		expect(mdEditor.props('modelValue')).toBe('')
	})

	it('handles undefined description', () => {
		const { wrapper } = factory({
			modelValue: {
				description: undefined,
			},
		})

		const mdEditor = wrapper.findComponent({ name: 'v-md-editor' })
		expect(mdEditor.props('modelValue')).toBe('')
	})
})
