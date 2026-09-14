import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount } from '@vue/test-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { DomainName } from '@/core/types'
import { i18n } from '@/core/i18n'
import { birthYear, email, required } from '@/core/validators'
import StreamerSettingsForm from '@/components/StreamerSettingsForm/StreamerSettingsForm.vue'

vi.mock('@/core/helpers')

describe('StreamerSettingsForm', () => {
	const modelValue = {
		domain: DomainName.UPLIFY,
		email: '',
		language: '',
		country: '',
		gender: '',
		birthday: '',
	}

	const wrapper = mount(StreamerSettingsForm, {
		global: {
			plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			stubs: ['router-link'],
		},
		props: {
			isEditProfile: false,
			modelValue,
		},
	})

	const form = wrapper.vm.$refs.formRef as FormInstance
	const submitSpy = vi.spyOn(form, 'validate')
	const formEl: DOMWrapper<Element> = wrapper.find('.el-form')

	// beforeEach(() => {
	// 	vi.clearAllMocks()
	// })

	it('form model has corresponding props', async () => {
		const properties = [...Object.keys(modelValue)]
		expect(Object.keys(form.$props.model as object)).toEqual(properties)
	})

	it('form has corresponding validators', async () => {
		const rules: FormRules = {
			domain: [ required ],
			email: [ required, email ],
			language: [ required ],
			country: [ required ],
			gender: [ required ],
			birthday: [ required, birthYear ],
		}
		expect(JSON.stringify(form.$props.rules)).toEqual(JSON.stringify(rules))
	})

	it('not emittid onSubmit event if validation is failed', async () => {
		submitSpy.mockResolvedValueOnce(false)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(wrapper.emitted().onSubmit).not.toBeTruthy()
	})

	it('emits onSubmit if validation is successful', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')

		expect(submitSpy).toBeCalled()
		expect(wrapper.emitted().onSubmit).toBeTruthy()
	})

	it('sets sending and success statuses properly when valid form submitted', async () => {
		submitSpy.mockResolvedValueOnce(true)

		await formEl.trigger('submit')
		expect((wrapper.vm as any).sending).toBeTruthy()
		await wrapper.vm.$emit('onSubmit')

		expect((wrapper.vm as any).success).toBeTruthy()
	})
})
