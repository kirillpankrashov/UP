import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount } from '@vue/test-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { setToken } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { email, required } from '@/core/validators'
import { SigninPartner } from '@/modules/Auth/views/SigninPartner'
import { partnerSignin } from '@/modules/Auth/views/SigninPartner/api'

import type { TPartnerSigninModel } from '../api/partnerSignin/types'

vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/SigninPartner/api')

describe('SigninPartner', () => {
	const wrapper = mount(SigninPartner, {
		global: {
			plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			stubs: ['router-link'],
		},
	})

	const form = wrapper.vm.$refs.formRef as FormInstance
	const submitSpy = vi.spyOn(form, 'validate')
	const formEl: DOMWrapper<Element> = wrapper.find('.el-form')

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('form model has corresponding props', async () => {
		const properties = ['login', 'password']
		expect(Object.keys(form.$props.model as object)).toEqual(properties)
	})

	it('form has corresponding validators', async () => {
		const rules: FormRules = {
			login: [required, email],
			password: [required],
		}
		expect(form.$props.rules).toEqual(rules)
	})

	it('not sending api request if validation is failed', async () => {
		submitSpy.mockResolvedValueOnce(false)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(partnerSignin).not.toBeCalled()
	})

	it('sends api request if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(partnerSignin).toBeCalled()
	})

	it('api responses with a token', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		await expect(partnerSignin({} as TPartnerSigninModel)).resolves.toStrictEqual({
			token: '24705|LyXzIa9suGVq2zUWFi5ZLpGjxurwGLdaz2NPrOiWd3400346',
		})
	})

	it('calls setToken function if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		await partnerSignin({} as TPartnerSigninModel)

		expect(setToken).toBeCalled()
	})

	it('sets success status to true if form successfully sended', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		await partnerSignin({} as TPartnerSigninModel)

		expect((wrapper.vm as any).success).toBeTruthy()
	})

	it('redirects to index if form successfully sended', async () => {
		global.window = Object.create(window)
		Object.defineProperty(window, 'location', {
			value: {
				href: 'http://dummy.com',
			},
			writable: true,
		})

		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		await partnerSignin({} as TPartnerSigninModel)

		expect(window.location.href).toEqual('/')
	})
})
