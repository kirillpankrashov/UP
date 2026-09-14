import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { ElForm, type FormRules } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { required } from '@/core/validators'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import LinkName from '../LinkName.vue'

describe('Streamer Link Setup LinkName', () => {
	const factory = () => {
		const wrapper = mount(LinkName, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					CopyLink: true,
					ElInput: true,
					ElButton: true,
				},
			},
		})

		const linkProfileStore = useLinkProfileStore()
		linkProfileStore.profile = linkProfileData

		return { wrapper, linkProfileStore }
	}

	it('renders the component', () => {
		const { wrapper } = factory()

		expect(wrapper.find('[data-test="streamer-link-linkname"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
	})

	it('disables submit button if link name is invalid', async () => {
		const { wrapper } = factory()

		expect(wrapper.vm.disabled).toBeTruthy()

		wrapper.vm.model.linkName = 'abc'
		expect(wrapper.vm.disabled).toBeTruthy()

		wrapper.vm.model.linkName = 'validname'
		expect(wrapper.vm.disabled).toBeFalsy()
	})

	it('form has corresponding validators', async () => {
		const { wrapper } = factory()

		const rules: FormRules = {
			linkName: [required],
		}

		await nextTick()

		expect(wrapper.vm.rules).toEqual(rules)
	})

	it('submits the form and calls updateProfile', async () => {
		const { wrapper, linkProfileStore } = factory()

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(linkProfileStore.updateProfile).toBeCalled()
	})

	it('shows error if link name is not unique', async () => {
		const { wrapper, linkProfileStore } = factory()

		linkProfileStore.updateProfile = vi.fn().mockRejectedValue({ origin: { response: { status: 409 } } })

		wrapper.vm.model.linkName = 'duplicate'

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(linkProfileStore.updateProfile).toBeCalled()
		expect(wrapper.vm.error.linkName).not.toBe('')
	})

	it('handles general error during submission', async () => {
		const { wrapper, linkProfileStore } = factory()

		linkProfileStore.updateProfile = vi.fn().mockRejectedValue(new Error('Unknown error'))

		wrapper.vm.model.linkName = 'validname'

		const promise = wrapper.vm.onSubmit()

		await promise

		expect(linkProfileStore.updateProfile).toBeCalled()
		expect(wrapper.vm.error.linkName).not.toBe('')
	})

	it('watches for profile changes and updates the model', async () => {
		const { wrapper, linkProfileStore } = factory()

		linkProfileStore.profile!.linkName = 'existingname'

		await nextTick()

		expect(wrapper.vm.model.linkName).toBe('existingname')
	})
})
