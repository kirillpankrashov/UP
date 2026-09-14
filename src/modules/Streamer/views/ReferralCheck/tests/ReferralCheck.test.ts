import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { messages } from '@/modules/Streamer/views/ReferralCheck/locales'

import ReferralCheck from '../ReferralCheck.vue'

const getByPath = (obj: any, path: string) => {
	return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

vi.mock('@/core/hooks', async () => {
	return {
		useLocale: () => ({
			t: (key: string) => {
				const value = getByPath(messages.en, key)
				return value ?? key
			},
		}),
	}
})

describe('Streamer ReferralCheck ReferralCheck', () => {
	let locationHrefBackup: string

	beforeEach(() => {
		locationHrefBackup = window.location.href
		Object.defineProperty(window, 'location', {
			writable: true,
			value: {
				href: 'http://example.test/',
			},
		})
	})

	afterEach(() => {
		Object.defineProperty(window, 'location', {
			writable: true,
			value: {
				href: locationHrefBackup,
			},
		})
	})

	const factory = () => {
		return mount(ReferralCheck, {
			global: {
				plugins: [i18n],
				stubs: {
					AppLogo: {
						name: 'AppLogo',
						template: '<div data-test="app-logo"><slot /></div>',
					},
					ElButton: {
						name: 'ElButton',
						template: '<button data-test="referral-check-btn" :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
						props: ['disabled', 'loading', 'type', 'size'],
					},
				},
			},
		})
	}

	it('renders title, HTML text, and button text', async () => {
		const wrapper = factory()
		await nextTick()

		expect(wrapper.find('h1').text()).toBe(messages.en.referralCheck.title)

		const p = wrapper.find('p')
		expect(p.exists()).toBe(true)
		expect(p.html()).toContain('Contact with us')
		expect(p.find('a').attributes('href')).toBe('https://discord.gg/EntbmDUxaZ')

		const btn = wrapper.find('[data-test="referral-check-btn"]')
		expect(btn.text()).toContain(messages.en.referralCheck.btnText)
	})

	it('navigates to home on button click', async () => {
		const wrapper = factory()
		await nextTick()

		await wrapper.find('[data-test="referral-check-btn"]').trigger('click')

		expect(window.location.href).toBe('/')
	})
})

