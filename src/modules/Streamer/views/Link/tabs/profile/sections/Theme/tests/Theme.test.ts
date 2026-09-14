import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { LinkColorTheme } from '@/core/types/link'
import { i18n } from '@/core/i18n'
import { ElButton } from '@/components/element-plus'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import Theme from '../Theme.vue'

describe('Streamer Link Profile Theme', () => {
	const factory = (props = {}, profileData = null) => {
		const pinia = createTestingPinia({ createSpy: vi.fn })
		const profileStore = useLinkProfileStore()

		if (profileData) {
			profileStore.profile = profileData
		}

		const wrapper = mount(Theme, {
			global: {
				plugins: [i18n, pinia],
			},
			props: {
				...props,
			},
		})

		return { wrapper, profileStore }
	}

	it('renders theme options correctly', () => {
		const { wrapper } = factory()

		const lightThemeInput = wrapper.find('#theme-light')
		const darkThemeInput = wrapper.find('#theme-dark')

		expect(lightThemeInput.exists()).toBe(true)
		expect(darkThemeInput.exists()).toBe(true)
		expect(lightThemeInput.attributes('value')).toBe(LinkColorTheme.LIGHT)
		expect(darkThemeInput.attributes('value')).toBe(LinkColorTheme.DARK)
	})

	it('updates model when theme is selected', async () => {
		const { wrapper } = factory()

		const darkThemeInput = wrapper.find('#theme-dark')
		await darkThemeInput.setValue(true)

		expect(wrapper.vm.model).toBe(LinkColorTheme.DARK)
	})

	it('calls onSubmit when button is clicked', async () => {
		const { wrapper, profileStore } = factory()

		await wrapper.findComponent(ElButton).trigger('click')

		expect(profileStore.updateProfile).toHaveBeenCalledWith({
			theme: LinkColorTheme.LIGHT,
		})
	})

	it('sets success to true after successful submission', async () => {
		const { wrapper } = factory()

		await wrapper.findComponent(ElButton).trigger('click')
		await nextTick()

		expect(wrapper.vm.success).toBe(true)
	})

	it('resets success after timeout', async () => {
		vi.useFakeTimers()
		const { wrapper } = factory()

		await wrapper.findComponent(ElButton).trigger('click')
		await nextTick()

		expect(wrapper.vm.success).toBe(true)

		vi.advanceTimersByTime(1500)
		await nextTick()

		expect(wrapper.vm.success).toBe(false)
		vi.useRealTimers()
	})

	it('initializes model from store on mount', async () => {
		const { wrapper } = factory({}, {
			theme: LinkColorTheme.DARK,
		} as any)

		expect(wrapper.vm.model).toBe(LinkColorTheme.DARK)
	})

	it('sets model to LIGHT if store theme is undefined', async () => {
		const { wrapper, profileStore } = factory({}, {
			theme: undefined,
		} as any)

		profileStore.profile!.theme = undefined as any
		await nextTick()

		expect(wrapper.vm.model).toBe(LinkColorTheme.LIGHT)
	})
})
