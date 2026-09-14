import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount } from '@vue/test-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { email, required } from '@/core/validators'
import { PasswordReset } from '@/modules/Auth/views/PasswordReset'
import { requestNewPassword } from '@/modules/Auth/views/PasswordReset/api'

import type { TRequestNewPasswordModel } from '../api/requestNewPassword/types'

vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/PasswordReset/api')

describe('PasswordReset', () => {
	const wrapper = mount(PasswordReset, {
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
		const properties = ['email']
		expect(Object.keys(form.$props.model as object)).toEqual(properties)
	})

	it('form has corresponding validators', async () => {
		const rules: FormRules = {
			email: [ email, required ],
		}
		expect(form.$props.rules).toEqual(rules)
	})

	it('not sending api request if validation is failed', async () => {
		submitSpy.mockResolvedValueOnce(false)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(requestNewPassword).not.toBeCalled()
	})

	it('sends api request if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(requestNewPassword).toBeCalled()
	})

	it('sets sending and success statuses properly when valid form submitted', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		expect((wrapper.vm as any).sending).toBeTruthy()
		await requestNewPassword({} as TRequestNewPasswordModel)

		expect((wrapper.vm as any).success).toBeTruthy()
		expect((wrapper.vm as any).sending).toBeFalsy()
	})
})
