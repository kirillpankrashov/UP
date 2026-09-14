import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'
import { CopyLink } from '@/components'

import OptionLink from '../OptionLink.vue'

import EyeIcon from '@/assets/img/icons/eye.svg'

describe('Streamer Settings WidgetLink OptionLink', () => {
	const factory = (props: any) => {
		const wrapper = mount(OptionLink, {
			global: {
				plugins: [i18n],
				stubs: ['router-link'],
			},
			props,
		})

		return { wrapper }
	}

	it('input field properly shows url', async () => {
		const url = 'http://example.com'

		const { wrapper } = factory({
			url,
		})

		await nextTick()

		expect(wrapper.find('[data-test="settings-widgetlink-option-link-input"]').html().includes(url)).toBe(true)
	})

	it('CopyLink component has correct url passed to its props', async () => {
		const url = 'http://example.com'

		const { wrapper } = factory({
			url,
		})

		await nextTick()

		expect(wrapper.findComponent(CopyLink).props().link).toBe(url)
	})

	it('switches icons on click', async () => {
		const url = 'http://example.com'

		const { wrapper } = factory({
			url,
		})

		await nextTick()

		const showIcon = wrapper.findComponent(EyeIcon)

		expect(showIcon.exists()).toBe(true)

		await showIcon.trigger('click')

		expect(showIcon.exists()).toBe(false)
	})
})
