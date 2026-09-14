import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'

import EmbedPreview from '../EmbedPreview.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Posts EmbedPreview', () => {
	const factory = (props = {}) => {
		const wrapper = mount(EmbedPreview, {
			global: {
				plugins: [i18n],
				stubs: ['router-link'],
			},
			props: {
				embed: null,
				...props,
			},
		})

		return { wrapper }
	}

	it('renders correctly', () => {
		const { wrapper } = factory({
			embed: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		})

		expect(wrapper.find('iframe').exists()).toBe(true)
		expect(wrapper.find('iframe').attributes('src')).toContain('https://www.youtube.com/embed/dQw4w9WgXcQ')
	})

	it('renders Reddit embed correctly', () => {
		const { wrapper } = factory({
			embed: 'https://www.reddit.com/r/funny/comments/abcdef',
		})

		expect(wrapper.find('blockquote.reddit-card').exists()).toBe(true)
	})

	it('renders Instagram embed correctly', () => {
		const { wrapper } = factory({
			embed: 'https://www.instagram.com/p/abcdef/',
		})

		expect(wrapper.find('blockquote.instagram-media').exists()).toBe(true)
	})

	it('renders Twitter embed correctly', () => {
		const { wrapper } = factory({
			embed: 'https://twitter.com/user/status/1234567890',
		})

		expect(wrapper.find('blockquote.twitter-tweet').exists()).toBe(true)
	})

	it('renders Spotify embed correctly', () => {
		const { wrapper } = factory({
			embed: 'https://open.spotify.com/track/abcdef',
		})

		expect(wrapper.find('iframe').exists()).toBe(true)
		expect(wrapper.find('iframe').attributes('src')).toContain('https://open.spotify.com/track/abcdef')
	})
})
