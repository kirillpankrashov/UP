import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { EmailVerification } from '@/modules/Auth/views/EmailVerification'
import { verifyEmail } from '@/modules/Auth/views/EmailVerification/api'

vi.mock('vue-router')
vi.mock('@/modules/Auth/views/EmailVerification/api')

describe('EmailVerification', () => {
	const factory = (query: any = { token: 'test' }) => {
		vi.mocked(useRoute).mockReturnValue({
			query,
		} as any)

		const wrapper = mount(EmailVerification, {
			global: {
				plugins: [i18n],
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	it('sends api call if token provided', async () => {
		factory()

		expect(verifyEmail).toHaveBeenCalled()
	})

	it('redirects to index after successful verification', async () => {
		global.window = Object.create(window)
		Object.defineProperty(window, 'location', {
			value: {
				href: 'http://dummy.com',
			},
			writable: true,
		})

		factory()

		setTimeout(() => {
			expect(window.location.href).toEqual('/')
		})
	})

	it('api not calling if not token provided in query', async () => {
		factory({})

		expect(verifyEmail).not.toHaveBeenCalled()
	})

	it('shows error message if no token provided', async () => {
		const { wrapper } = factory({})

		const ERROR_TEXT = 'Your email verified';
		(wrapper.vm as any).error = ERROR_TEXT
		await nextTick()
		expect(wrapper.find('[data-test="page-text"]').text()).toBe(`${ERROR_TEXT}`)
	})
})
