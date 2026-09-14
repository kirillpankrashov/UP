import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { brandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getBrandAwarenessAdsetInfo/fixtures/brandAwarenessAdsetInfo'

import Description from '../Description.vue'

vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Streamer Campaigns AdsetInfo Description', () => {
	const factory = (props = {}) => {
		return mount(Description, {
			global: {
				plugins: [i18n],
			},
			props: {
				adset: {
					...brandAwarenessAdsetInfo,
					...props,
				},
			},
		})
	}

	describe('Description rendering', () => {
		it('renders adset description when available', () => {
			const wrapper = factory({
				description: 'Test description',
			})

			expect(wrapper.find('.prose').html()).toContain('<p>Test description</p>')
		})

		it('renders campaign description when adset description is not available', () => {
			const wrapper = factory({
				description: null,
				campaign: {
					description: 'Campaign description',
				},
			})

			expect(wrapper.find('.prose').html()).toContain('<p>Campaign description</p>')
		})

		it('renders fallback when no description available', () => {
			const wrapper = factory({
				description: null,
				campaign: {
					description: null,
				},
			})

			expect(wrapper.find('.prose').html()).toContain('—')
		})
	})

	describe('Markdown conversion', () => {
		it('converts markdown to HTML', () => {
			const wrapper = factory({
				description: '**Bold text** and *italic text*',
			})

			expect(wrapper.find('.prose').html()).toContain('<strong>Bold text</strong>')
			expect(wrapper.find('.prose').html()).toContain('<em>italic text</em>')
		})

		it('converts emojis', () => {
			const wrapper = factory({
				description: ':smile: :heart:',
			})

			expect(wrapper.find('.prose').html()).toContain('😄')
			expect(wrapper.find('.prose').html()).toContain('❤️')
		})

		it('converts line breaks', () => {
			const wrapper = factory({
				description: 'Line 1\nLine 2',
			})

			const html = wrapper.find('.prose').html()
			expect(html).toContain('Line 1')
			expect(html).toContain('Line 2')
			expect(html).toContain('<br>')
		})

		it('adds target="_blank" to links', () => {
			const wrapper = factory({
				description: '[Link](https://example.com)',
			})

			expect(wrapper.find('.prose').html()).toContain('<a href="https://example.com" target="_blank">')
		})
	})

	describe('XSS prevention', () => {
		it('sanitizes potentially dangerous HTML', () => {
			const wrapper = factory({
				description: '<script>alert("xss")</script><p>Safe content</p>',
			})

			expect(wrapper.find('.prose').html()).not.toContain('<script>')
			expect(wrapper.find('.prose').html()).toContain('<p>Safe content</p>')
		})

		it('allows safe HTML tags', () => {
			const wrapper = factory({
				description: '<p>Safe paragraph</p><strong>Bold text</strong>',
			})

			expect(wrapper.find('.prose').html()).toContain('<p>Safe paragraph</p>')
			expect(wrapper.find('.prose').html()).toContain('<strong>Bold text</strong>')
		})
	})

	describe('Showdown converter configuration', () => {
		it('uses correct header level', () => {
			const wrapper = factory({
				description: '# Header 1',
			})

			expect(wrapper.find('.prose').html()).toContain('<h3>')
			expect(wrapper.find('.prose').html()).not.toContain('<h1>')
		})

		it('does not generate header IDs', () => {
			const wrapper = factory({
				description: '# Header',
			})

			expect(wrapper.find('.prose').html()).not.toContain('id=')
		})

		it('handles code blocks correctly', () => {
			const wrapper = factory({
				description: '```javascript\nconst x = 1;\n```',
			})

			const html = wrapper.find('.prose').html()
			expect(html).toContain('<pre><code>')
			expect(html).toContain('const x = 1')
		})
	})
})
