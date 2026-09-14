import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { agency } from '@/modules/Partner/views/Agency/api/getAgency/fixtures/agency'
import { streamerInfo } from '@/modules/Partner/views/Agency/api/getStreamerInfo/fixtures/streamerInfo'
import { streamers } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'
import { useAgencyStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import StreamerSettings from '../StreamerSettings.vue'

const validateMock = vi.fn()
;(globalThis as any).__streamerSettingsValidateMock = validateMock

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, params?: Record<string, string>) =>
			params?.streamer ? `${key}:${params.streamer}` : key,
	}),
}))

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Agency/api')

vi.mock('@/components/element-plus', () => ({
	ElDrawer: {
		name: 'ElDrawer',
		props: ['modelValue', 'beforeClose', 'title', 'direction', 'size'],
		template: `
			<div data-test="el-drawer">
				<button
					data-test="streamer-settings-drawer-before-close"
					type="button"
					@click="beforeClose && beforeClose()"
				>
					x
				</button>
				<slot />
			</div>
		`,
	},
	ElForm: {
		name: 'ElForm',
		props: ['model', 'rules', 'validateOnRuleChange'],
		emits: ['submit'],
		template: '<form data-test="el-form"><slot /></form>',
		setup: (_props: any, { expose }: any) => {
			expose({
				validate: () =>
					(globalThis as any).__streamerSettingsValidateMock?.() ?? Promise.resolve(true),
			})
			return {}
		},
	},
	ElButton: {
		name: 'ElButton',
		props: ['loading', 'disabled', 'type', 'nativeType', 'class'],
		template:
			'<button data-test="el-button" :disabled="disabled" :data-loading="String(loading)"><slot /></button>',
	},
}))

vi.mock('@/components/layouts', () => ({
	DashboardSubsection: {
		name: 'DashboardSubsection',
		props: ['title'],
		template:
			'<div data-test="dashboard-subsection"><div data-test="dashboard-subsection-title">{{ title }}</div><slot /></div>',
	},
}))

vi.mock('@/modules/Partner/views/Agency/components', () => ({
	CostInputs: {
		name: 'CostInputs',
		props: ['modelValue', 'disabled', 'currencySign', 'streamer', 'cpmField', 'cpaField', 'cpcField'],
		emits: ['update:modelValue'],
		template: '<div data-test="cost-inputs" />',
	},
}))

describe('Partner Agency Streamers StreamerSettings Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		validateMock.mockReset()
	})

	const factory = (opts?: {
		isAdmin?: boolean
		agencyOverrides?: Partial<typeof agency>
		streamerInfoOverride?: typeof streamerInfo | null
	}) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamersStore = useAgencyStreamersStore(pinia)
		const agencyStore = useAgencyStore(pinia)
		const partnerStore = usePartnerStore(pinia)

		streamersStore.settingsSidebarVisible = true
		streamersStore.isFetchingStreamerInfo = false

		const streamer = streamers.data[0]!
		streamersStore.streamerId = streamer.id
		streamersStore.streamers.data = [streamer] as any

		streamersStore.streamerInfo =
			typeof opts?.streamerInfoOverride !== 'undefined' ? opts!.streamerInfoOverride : streamerInfo

		agencyStore.data = { ...agency, ...opts?.agencyOverrides } as any

		partnerStore.profile = { roleExtended: opts?.isAdmin ?? true } as any

		const wrapper = mount(StreamerSettings, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					StreamerSettingsSkeleton: {
						name: 'StreamerSettingsSkeleton',
						template: '<div data-test="streamer-settings-skeleton-stub" />',
					},
				},
			},
		})

		return { wrapper, streamersStore, agencyStore, partnerStore }
	}

	it('does not render form when agencyStore.data is null', async () => {
		const pinia = createTestingPinia({ createSpy: vi.fn })
		const streamersStore = useAgencyStreamersStore(pinia)
		const agencyStore = useAgencyStore(pinia)
		const partnerStore = usePartnerStore(pinia)

		streamersStore.settingsSidebarVisible = true
		streamersStore.streamerId = streamers.data[0]!.id
		streamersStore.streamers.data = [streamers.data[0]!] as any
		streamersStore.streamerInfo = streamerInfo

		agencyStore.data = null
		partnerStore.profile = { roleExtended: true } as any

		const wrapper = mount(StreamerSettings, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					StreamerSettingsSkeleton: {
						name: 'StreamerSettingsSkeleton',
						template: '<div data-test="streamer-settings-skeleton-stub" />',
					},
				},
			},
		})

		await nextTick()

		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="cost-inputs"]').exists()).toBe(false)
	})

	it('renders skeleton while streamer info is loading', async () => {
		const { wrapper, streamersStore } = factory()
		streamersStore.isFetchingStreamerInfo = true
		await nextTick()

		expect(wrapper.find('[data-test="streamer-settings-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)
	})

	it('renders 1/2/4 CostInputs depending on streamersParticipate/useDarkMarket', async () => {
		validateMock.mockResolvedValue(true)

		const { wrapper: w1 } = factory({ agencyOverrides: { streamersParticipate: false, useDarkMarket: false } })
		await nextTick()
		expect(w1.findAll('[data-test="cost-inputs"]')).toHaveLength(1)

		const { wrapper: w2 } = factory({ agencyOverrides: { streamersParticipate: true, useDarkMarket: false } })
		await nextTick()
		expect(w2.findAll('[data-test="cost-inputs"]')).toHaveLength(2)

		const { wrapper: w3 } = factory({ agencyOverrides: { streamersParticipate: true, useDarkMarket: true } })
		await nextTick()
		expect(w3.findAll('[data-test="cost-inputs"]')).toHaveLength(4)
	})

	it('renders streamer name in description text', async () => {
		const streamerName = streamers.data[0]!.name
		validateMock.mockResolvedValue(true)

		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.text()).toContain(`creators.settings.custom.descr:${streamerName}`)
	})

	it('before-close sets settingsSidebarVisible=false', async () => {
		validateMock.mockResolvedValue(true)

		const { wrapper, streamersStore } = factory()
		await nextTick()

		await wrapper
			.find('[data-test="streamer-settings-drawer-before-close"]')
			.trigger('click')
		await nextTick()

		expect(streamersStore.settingsSidebarVisible).toBe(false)
	})

	it('submit – invalid form logs validation error and does not submit', async () => {
		vi.useFakeTimers()
		validateMock.mockResolvedValueOnce(false)

		const { wrapper, streamersStore } = factory()
		await nextTick()

		const submitPromise = (wrapper.vm as any).onSubmit()
		await submitPromise
		await nextTick()

		const { Logger } = await import('@/core/helpers')

		expect(validateMock).toHaveBeenCalledTimes(1)
		expect(Logger.error).toHaveBeenCalledWith('Validation error')
		expect(streamersStore.updateStreamerInfo).not.toHaveBeenCalled()

		// Component keeps `sending=true` when validation fails (no finally block).
		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeDefined()

		vi.useRealTimers()
	})

	it('submit – valid form calls updateStreamerInfo and resets success after 2000ms', async () => {
		vi.useFakeTimers()
		validateMock.mockResolvedValueOnce(true)

		const { wrapper, streamersStore } = factory()
		await nextTick()

		const submitPromise = (wrapper.vm as any).onSubmit()
		expect(streamersStore.updateStreamerInfo).not.toHaveBeenCalled()

		await vi.advanceTimersByTimeAsync(2000)
		await submitPromise
		await nextTick()

		expect(streamersStore.updateStreamerInfo).toHaveBeenCalledTimes(1)
		expect(streamersStore.updateStreamerInfo).toHaveBeenCalledWith(
			expect.objectContaining({
				internalCpm: streamerInfo.internalCpm,
				externalCpm: streamerInfo.externalCpm,
			}),
		)

		expect(wrapper.find('[data-test="el-button"]').attributes('disabled')).toBeUndefined()

		vi.useRealTimers()
	})

	it('watch – updates CostInputs model when streamerInfo changes', async () => {
		validateMock.mockResolvedValue(true)

		const { wrapper, streamersStore } = factory({
			agencyOverrides: { streamersParticipate: false, useDarkMarket: false },
			streamerInfoOverride: null,
		})
		await nextTick()

		expect(wrapper.find('[data-test="el-form"]').exists()).toBe(false)

		streamersStore.streamerInfo = streamerInfo
		await nextTick()

		const costInputs = wrapper.findAllComponents({ name: 'CostInputs' })
		expect(costInputs).toHaveLength(1)

		const modelValue = costInputs[0]!.props('modelValue') as any
		expect(modelValue.cpm).toEqual(expect.objectContaining(streamerInfo))
	})
})

