import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElInput } from '@/components/element-plus'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import Telegram from '../Telegram.vue'

vi.mock('@/core/helpers')

describe('Streamer Link Profile Telegram', () => {
	const factory = (props = {}, profileData = null) => {
		const pinia = createTestingPinia({ createSpy: vi.fn })
		const profileStore = useLinkProfileStore()

		if (profileData) {
			profileStore.profile = profileData
		}

		const wrapper = mount(Telegram, {
			global: {
				plugins: [i18n, pinia],
			},
			props: {
				...props,
			},
		})

		return { wrapper, profileStore }
	}

	it('formats input value correctly', async () => {
		const { wrapper } = factory()

		const input = wrapper.find('input')
		await input.setValue('invalid@telegram!')

		expect(wrapper.vm.model.telegram).toBe('invalid@telegram')
		expect((input.element as HTMLInputElement).value).toBe('invalid@telegram')
	})

	it('disables button when input is invalid', async () => {
		const { wrapper, profileStore } = factory({}, {
			telegramChannel: null,
		} as any)

		expect(wrapper.vm.disabled).toBe(true)

		await wrapper.find('input').setValue('abc')
		expect(wrapper.vm.disabled).toBe(true)

		wrapper.vm.model.telegram = 'test'
		profileStore.profile!.telegramChannel = 'test'

		await nextTick()

		expect(wrapper.vm.disabled).toBe(true)
	})

	it('enables button when input is valid', async () => {
		const { wrapper } = factory()

		await wrapper.findComponent(ElInput).setValue('valid@telegram')
		expect(wrapper.vm.disabled).toBe(false)
	})

	it('updates model when store changes', async () => {
		const { wrapper, profileStore } = factory({}, {
			telegramChannel: 'old@telegram',
		} as any)

		profileStore.profile!.telegramChannel = 'new@telegram'
		await nextTick()

		expect(wrapper.vm.model.telegram).toBe('new@telegram')
	})
})
