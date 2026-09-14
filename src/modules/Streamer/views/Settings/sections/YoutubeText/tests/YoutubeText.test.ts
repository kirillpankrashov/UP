import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import YoutubeText from '../YoutubeText.vue'

const getYouTubeVideoIdCalls: string[] = []
function getYouTubeVideoIdFn (url: string) {
	getYouTubeVideoIdCalls.push(url)
	// very small parser for test purposes
	const match = url.match(/v=([^&]+)/)
	return match?.[1].trim() || url
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useYoutube: () => ({
		getYouTubeVideoId: getYouTubeVideoIdFn,
		isYouTubeLink: () => true,
	}),
}))

const TextLinkStub = {
	name: 'TextLink',
	props: ['href', 'target'],
	template: '<a data-test="youtube-text-link" :href="href"><slot /></a>',
}

const HelpIconStub = {
	name: 'HelpIcon',
	template: '<span data-test="help-icon" />',
}

const ElTooltipStub = {
	name: 'ElTooltip',
	template: `
		<div data-test="youtube-tooltip">
			<slot name="content" />
			<slot />
		</div>
	`,
}

const ElFormStub = {
	name: 'ElForm',
	props: ['model', 'rules', 'labelPosition'],
	setup (_props: any, { expose }: any) {
		expose({
			validate: validateSpyMock,
		})
	},
	template: '<form data-test="el-form-stub"><slot /></form>',
}

const ElFormItemStub = {
	name: 'ElFormItem',
	props: ['label', 'prop'],
	template: `
		<div data-test="el-form-item-stub">
			<slot name="label" />
			<slot />
		</div>
	`,
}

const ElCheckboxStub = {
	name: 'ElCheckbox',
	props: ['modelValue', 'disabled'],
	emits: ['update:modelValue', 'change'],
	template: `
		<div>
			<input
				data-test="youtube-text-checkbox"
				type="checkbox"
				:checked="modelValue"
				:disabled="disabled"
				@change="$emit('update:modelValue', $event.target.checked); $emit('change', $event.target.checked)"
			/>
			<slot />
		</div>
	`,
}

// Note: v-model is done via `modelValue` + `update:modelValue` here.
const ElInputStub = {
	name: 'ElInput',
	inheritAttrs: true,
	props: ['modelValue', 'disabled', 'type', 'autosize'],
	emits: ['update:modelValue', 'input'],
	template: `
		<textarea
			data-test="settings-youtube-text-input"
			:disabled="disabled"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value); $emit('input', $event.target.value)"
		/>
	`,
}

let validateSpyMock: ReturnType<typeof vi.fn>

describe('Streamer Settings YoutubeText Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		getYouTubeVideoIdCalls.length = 0
		validateSpyMock = vi.fn(() => true)
		vi.useFakeTimers()
	})

	// Keep timers isolated per suite
	afterEach(() => {
		vi.clearAllTimers()
		vi.useRealTimers()
	})

	const factory = (profileOverrides: any = {}, widget: typeof widgetData | null = widgetData) => {
		const streamerProfile = {
			...profileData,
			language: Locale.RU,
			youtubeTextActive: true,
			...profileOverrides,
		}

		const wrapper = mount(YoutubeText, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							settings: {
								widget,
								youtubeText: {
									blacklist: '',
									sending: false,
									success: false,
								},
							},
							streamer: {
								profile: streamerProfile,
							},
						},
					}),
				],
				stubs: {
					TextLink: TextLinkStub,
					HelpIcon: HelpIconStub,
					ElTooltip: ElTooltipStub,
					ElForm: ElFormStub,
					ElFormItem: ElFormItemStub,
					ElCheckbox: ElCheckboxStub,
					ElInput: ElInputStub,
				},
			},
		})

		const streamerStore = useStreamerStore()
		const settingsStore = useSettingsStore()

		return { wrapper, streamerStore, settingsStore }
	}

	it('does not render when youtubeText is not visible', async () => {
		const { wrapper, settingsStore } = factory({ youtubeTextActive: false })

		await nextTick()

		expect(wrapper.find('[data-test="settings-youtube-text-section"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="settings-youtube-text-input"]').exists()).toBe(false)
		expect(settingsStore.fetchYoutubeTextBlackList).not.toHaveBeenCalled()
	})

	it('fetches blacklist on mount when visible is true', async () => {
		const { wrapper, settingsStore } = factory({ youtubeTextActive: true })

		await nextTick()

		expect(wrapper.find('[data-test="settings-youtube-text-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="settings-youtube-text-input"]').exists()).toBe(true)
		expect(settingsStore.fetchYoutubeTextBlackList).toHaveBeenCalled()
	})

	it('toggles youtubeTextActive via checkbox and triggers fetch when enabled', async () => {
		const { wrapper, settingsStore } = factory({ youtubeTextActive: true })

		await nextTick()

		const checkbox = wrapper.find<HTMLInputElement>('[data-test="youtube-text-checkbox"]')
		expect(checkbox.exists()).toBe(true)

		// fetch is called on mount when visible=true; isolate subsequent call
		;(settingsStore.fetchYoutubeTextBlackList as any).mockClear()

		checkbox.element.checked = true
		await checkbox.trigger('change')
		vi.advanceTimersByTime(2000)
		await nextTick()

		expect(settingsStore.toggleYoutubeText).toHaveBeenCalledWith(true)
		expect(settingsStore.fetchYoutubeTextBlackList).toHaveBeenCalled()
	})

	it('updates blacklist after debounce, validates form, and converts youtube urls to ids', async () => {
		const { wrapper, settingsStore } = factory({ youtubeTextActive: true })

		await nextTick()

		// Make textarea enabled for the test
		const textarea = wrapper.find<HTMLTextAreaElement>('[data-test="settings-youtube-text-input"]')
		await textarea.setValue(' https://youtube.com/watch?v=aaa\n https://youtube.com/watch?v=bbb \n\n https://youtube.com/watch?v=ccc ')

		vi.advanceTimersByTime(2000)
		await nextTick()

		expect(validateSpyMock).toHaveBeenCalled()
		expect(settingsStore.updateYoutubeTextBlackList).toHaveBeenCalledWith('aaa,bbb,ccc')
		expect(getYouTubeVideoIdCalls.length).toBeGreaterThan(0)
	})
})

