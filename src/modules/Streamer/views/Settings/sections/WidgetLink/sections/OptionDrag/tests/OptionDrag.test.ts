import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'

import OptionDrag from '../OptionDrag.vue'

describe('Streamer Settings WidgetLink OptionDrag', () => {
	const factory = (props: any) => {
		const wrapper = mount(OptionDrag, {
			global: {
				plugins: [i18n],
				stubs: ['router-link'],
			},
			props,
		})

		return { wrapper }
	}

	it('drag link has correct href attribute', async () => {
		const { wrapper } = factory({
			url: 'http://example.com',
		})

		await nextTick()

		const link = 'http://example.com/?layer-name=Uplify&layer-width=1920&layer-height=1080'

		expect(wrapper.find('[data-test="settings-widgetlink-option-drag-link"]').attributes().href).toBe(link)
	})
})
