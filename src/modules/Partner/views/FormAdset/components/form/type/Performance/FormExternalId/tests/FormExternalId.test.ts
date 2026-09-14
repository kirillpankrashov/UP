import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'

import FormExternalId from '../FormExternalId.vue'

describe('FormExternalId Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormExternalId, {
			global: {
				plugins: [i18n],
			},
			props: {
				modelValue: {
					externalId: '',
				},
				...props,
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('initializes with provided externalId', () => {
		const { wrapper } = factory({
			modelValue: {
				externalId: 'TEST-123',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('TEST-123')
	})

	it('updates model value when externalId is edited', async () => {
		const { wrapper } = factory({
			modelValue: {
				externalId: '',
			},
		})

		const input = wrapper.findComponent(ElInput)
		await input.setValue('NEW-456')

		expect(wrapper.props('modelValue').externalId).toBe('NEW-456')
	})

	it('preserves existing externalId when rerendering', async () => {
		const { wrapper } = factory({
			modelValue: {
				externalId: 'PRESERVE-789',
			},
		})

		await nextTick()

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('PRESERVE-789')
	})

	it('handles empty externalId', () => {
		const { wrapper } = factory({
			modelValue: {
				externalId: '',
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})

	it('handles undefined externalId', () => {
		const { wrapper } = factory({
			modelValue: {
				externalId: undefined,
			},
		})

		const input = wrapper.findComponent(ElInput)
		expect(input.props('modelValue')).toBe('')
	})
})
