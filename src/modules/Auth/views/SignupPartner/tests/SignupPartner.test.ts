import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount } from '@vue/test-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { email, phoneNumber, required } from '@/core/validators'
import { SignupPartner } from '@/modules/Auth/views/SignupPartner'
import { partnerSignup } from '@/modules/Auth/views/SignupPartner/api'

import type { TPartnerSignupModel } from '../api/partnerSignup/types'

vi.mock('@/core/helpers')
vi.mock('@/modules/Auth/views/SignupPartner/api')

describe('SignupPartner', () => {
	const wrapper = mount(SignupPartner, {
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
		const properties = ['email', 'name', 'phone', 'company', 'domain']
		expect(Object.keys(form.$props.model as object)).toEqual(properties)
	})

	it('form has corresponding validators', async () => {
		const rules: FormRules = {
			email: [ required, email ],
			name: [ required ],
			phone: [ required, phoneNumber((wrapper.vm as any).isValidPhone) ],
			company: [ required ],
		}
		expect(JSON.stringify(form.$props.rules)).toEqual(JSON.stringify(rules))
	})

	it('not sending api request if validation is failed', async () => {
		submitSpy.mockResolvedValueOnce(false)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(partnerSignup).not.toBeCalled()
	})

	it('sends api request if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(partnerSignup).toBeCalled()
	})

	it('sets sending and success statuses properly when valid form submitted', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		expect((wrapper.vm as any).sending).toBeTruthy()
		await partnerSignup({} as TPartnerSignupModel)

		expect((wrapper.vm as any).success).toBeTruthy()
		expect((wrapper.vm as any).sending).toBeFalsy()
	})
})
