import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { FormInstance } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import About from '../About.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Profile About', () => {
	const factory = (props = {}) => {
		const wrapper = mount(About, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const profileStore = useLinkProfileStore()
		profileStore.profile = linkProfileData

		return { wrapper, profileStore }
	}

	it('updates markup when model.about changes', async () => {
		const { wrapper, profileStore } = factory()

		profileStore.profile!.about = 'New about text'

		await nextTick()

		expect(wrapper.vm.markup).toContain('<p>New about text</p>')
	})

	it('calls onSubmit and updates profile on form submit', async () => {
		const { wrapper, profileStore } = factory()

		await nextTick()

		const form = wrapper.vm.$refs.formRef as FormInstance
		const validateSpy = vi.spyOn(form, 'validate').mockResolvedValueOnce(true)

		const formEl = wrapper.find('.el-form')
		await formEl.trigger('submit')

		expect(validateSpy).toHaveBeenCalled()
		expect(profileStore.updateProfile).toHaveBeenCalled()
	})
})
