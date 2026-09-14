import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount } from '@vue/test-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { required } from '@/core/validators'
import { RouteName } from '@/modules/Auth/router'
import { PasswordNew } from '@/modules/Auth/views/PasswordNew'
import { resetPassword } from '@/modules/Auth/views/PasswordNew/api'
import type { TResetPasswordModel } from '@/modules/Auth/views/PasswordNew/api/resetPassword/types'

vi.mock('vue-router')
vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/PasswordNew/api')

describe('PasswordNew', () => {
	vi.mocked(useRouter).mockReturnValue({
		push: vi.fn(),
	} as any)

	vi.mocked(useRoute).mockReturnValue({
		query: {
			token: 'test',
			email: 'test@mail.com',
		},
	} as any)

	const wrapper = mount(PasswordNew, {
		global: {
			plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			stubs: ['router-link'],
		},
	})

	const form = wrapper.vm.$refs.formRef as FormInstance
	const submitSpy = vi.spyOn(form, 'validate')
	const formEl: DOMWrapper<Element> = wrapper.find('.el-form')

	beforeEach(() => {
		vi.useFakeTimers()
		vi.resetAllMocks()
	})

	it('form model has corresponding props', async () => {
		const properties = ['token', 'email', 'password', 'passwordConfirmation']
		expect(Object.keys(form.$props.model as object)).toEqual(properties)
	})

	it('form has corresponding validators', async () => {
		const rules: FormRules = {
			password: [ required ],
			passwordConfirmation: [ required ],
		}
		expect(form.$props.rules).toEqual(rules)
	})

	it('not sending api request if validation is failed', async () => {
		submitSpy.mockResolvedValueOnce(false)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(resetPassword).not.toBeCalled()
	})

	it('sends api request if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(resetPassword).toBeCalled()
	})

	it('sets sending and success statuses properly when valid form submitted', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		expect((wrapper.vm as any).sending).toBeTruthy()
		await resetPassword({} as TResetPasswordModel)

		expect((wrapper.vm as any).success).toBeTruthy()
		expect((wrapper.vm as any).sending).toBeFalsy()
	})

	it('redirects to partner signin page after form successfully sended', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(resetPassword).toBeCalled()

		setTimeout(() => {
			expect(useRouter().push).toHaveBeenCalledWith({
				name: RouteName.PARTNER_SIGNIN,
			})
		})
	})

	it('redirects to partner signin page if route does not have query params', async () => {
		vi.mocked(useRoute).mockReturnValue({
			query: {},
		} as any)

		expect(submitSpy).not.toBeCalled()
		expect(resetPassword).not.toBeCalled()

		setTimeout(() => {
			expect(useRouter().push).toHaveBeenCalledWith({
				name: RouteName.PARTNER_SIGNIN,
			})
		})
	})
})
