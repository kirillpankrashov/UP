import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'

import FormPlatform from '../FormPlatform.vue'

const mockElSelect = {
	name: 'ElSelect',
	template: '<select data-test="el-select"><slot name="prefix" /><slot /></select>',
	props: ['modelValue', 'popperClass', 'size'],
}
const mockElOption = {
	name: 'ElOption',
	template: '<option data-test="el-option"><slot /></option>',
	props: ['label', 'value'],
}
const mockSocialIcon = {
	name: 'SocialIcon',
	template: '<svg data-test="social-icon"></svg>',
	props: ['platform', 'classes'],
}

describe('FormAdset FormPlatform', () => {
	const basePlatforms = {
		[Platform.TWITCH]: 'Twitch',
		[Platform.YOUTUBE]: 'YouTube',
		[Platform.TROVO]: 'Trovo',
		[Platform.VK_PLAY]: 'VK Play',
	}
	const factory = (modelValue = { platform: Platform.TWITCH }, platforms = basePlatforms) => {
		return mount(FormPlatform, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							dict: {
								campaigns: { platforms },
							},
						},
					}),
				],
				stubs: {
					ElSelect: mockElSelect,
					ElOption: mockElOption,
					SocialIcon: mockSocialIcon,
				},
			},
			props: { modelValue },
		})
	}

	it('renders ElSelect and ElOption for each platform', () => {
		const wrapper = factory()
		expect(wrapper.findComponent({ name: 'ElSelect' }).exists()).toBe(true)
		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options.length).toBe(Object.keys(basePlatforms).length)
	})

	it('passes v-model and popperClass to ElSelect', () => {
		const wrapper = factory({ platform: Platform.YOUTUBE })
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props().modelValue).toBe(Platform.YOUTUBE)
	})

	it('passes label and value to ElOption', () => {
		const wrapper = factory()
		const options = wrapper.findAllComponents({ name: 'ElOption' })
		expect(options[0].props().label).toBe('Twitch')
		expect(options[0].props().value).toBe(Platform.TWITCH)
		expect(options[1].props().label).toBe('YouTube')
		expect(options[1].props().value).toBe(Platform.YOUTUBE)
	})

	it('renders SocialIcon in prefix slot and in each option', () => {
		const wrapper = factory()
		expect(wrapper.findComponent({ name: 'SocialIcon' }).exists()).toBe(true)
		const options = wrapper.findAllComponents({ name: 'ElOption' })
		options.forEach(option => {
			expect(option.findComponent({ name: 'SocialIcon' }).exists()).toBe(true)
		})
	})

	it('updates v-model when modelValue.platform changes', async () => {
		const wrapper = factory({ platform: Platform.TWITCH })
		await wrapper.setProps({ modelValue: { platform: Platform.YOUTUBE } })
		const select = wrapper.findComponent({ name: 'ElSelect' })
		expect(select.props().modelValue).toBe(Platform.YOUTUBE)
	})
})
