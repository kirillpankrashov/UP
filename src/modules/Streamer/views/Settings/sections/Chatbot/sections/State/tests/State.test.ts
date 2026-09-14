import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import State from '../State.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const ElButtonStub = {
	name: 'ElButton',
	props: ['type', 'loading', 'size', 'plain'],
	emits: ['click'],
	template: `
		<button
			data-test="chatbot-el-button"
			:data-type="type"
			:disabled="loading"
			@click="$emit('click')"
		>
			<slot />
		</button>
	`,
}

const ElAlertStub = {
	name: 'ElAlert',
	props: ['title'],
	template: '<div data-test="chatbot-alert">{{ title }}</div>',
}

describe('Streamer Settings Chatbot State', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (widget: any) => {
		const wrapper = mount(State, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					ElButton: ElButtonStub,
					ElAlert: ElAlertStub,
				},
			},
		})

		const settingsStore = useSettingsStore()
		settingsStore.widget = widget

		return { wrapper, settingsStore }
	}

	it('when widget is null: shows connectNightbot text and no alert/send/check buttons', async () => {
		const { wrapper } = factory(null)
		await nextTick()

		// disconnect/connect button always exists
		expect(wrapper.text()).toContain('settings.chatbot.connectNightbot')

		expect(wrapper.find('[data-test="chatbot-alert"]').exists()).toBe(false)
		expect(wrapper.text()).not.toContain('settings.chatbot.sendMessage')
		expect(wrapper.text()).not.toContain('settings.chatbot.checkChatbot')
	})

	it('when connected & moderator: shows sendMessage button and does not show alert/check', async () => {
		const widget = structuredClone(widgetData)
		widget.platform = Platform.TWITCH
		widget.nightbot.twitch.connected = true
		widget.nightbot.twitch.moderator = true

		const { wrapper, settingsStore } = factory(widget)
		settingsStore.messagePreview.sending = false
		settingsStore.messagePreview.success = false

		await nextTick()

		// send message button visible
		expect(wrapper.text()).toContain('settings.chatbot.sendMessage')
		expect(wrapper.find('[data-test="chatbot-alert"]').exists()).toBe(false)
		expect(wrapper.text()).not.toContain('settings.chatbot.checkChatbot')

		// clicks sendMessagePreview
		const sendBtn = wrapper
			.findAll('[data-test="chatbot-el-button"]')
			.find(btn => btn.text().includes('settings.chatbot.sendMessage'))

		expect(sendBtn?.exists()).toBe(true)
		await sendBtn!.trigger('click')
		expect(settingsStore.sendMessagePreview).toHaveBeenCalled()
	})

	it('when connected but not moderator: shows checkChatbot button and alert', async () => {
		const widget = structuredClone(widgetData)
		widget.platform = Platform.TWITCH
		widget.nightbot.twitch.connected = true
		widget.nightbot.twitch.moderator = false

		const { wrapper, settingsStore } = factory(widget)
		settingsStore.checkingChatbot = true

		await nextTick()

		expect(wrapper.text()).toContain('settings.chatbot.checkChatbot')
		expect(wrapper.find('[data-test="chatbot-alert"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="chatbot-alert"]').text()).toContain(
			'settings.attention.chatbotDisabled.reasons.addChatbotAsModerator',
		)
		expect(wrapper.text()).not.toContain('settings.chatbot.sendMessage')

		const checkBtn = wrapper
			.findAll('[data-test="chatbot-el-button"]')
			.find(btn => btn.text().includes('settings.chatbot.checkChatbot'))

		expect(checkBtn?.exists()).toBe(true)
		await checkBtn!.trigger('click')
		expect(settingsStore.checkChatbot).toHaveBeenCalled()

		// spinner present when checkingChatbot is true (no direct data-test in component)
		expect(wrapper.find('.animate-spin').exists()).toBe(true)
	})
})

