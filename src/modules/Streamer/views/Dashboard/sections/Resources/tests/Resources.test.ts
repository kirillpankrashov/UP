import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import Resources from '../Resources.vue'

describe('Streamer Dashboard Resources', () => {
	const wrapper = mount(Resources, {
		global: {
			plugins: [i18n, createTestingPinia({
				createSpy: vi.fn,
			})],
			stubs: ['router-link'],
		},
	})

	it('renders resource links', () => {
		const resourceLinks = wrapper.findAll('.resource-link')
		// Discord + Help Center (blog is commented out)
		expect(resourceLinks.length).toBe(2)
	})

	it('opens links in a new tab', () => {
		const resourceLinks = wrapper.findAll('.resource-link')
		resourceLinks.forEach((link) => {
			expect(link.attributes('target')).toBe('_blank')
		})
	})
})
