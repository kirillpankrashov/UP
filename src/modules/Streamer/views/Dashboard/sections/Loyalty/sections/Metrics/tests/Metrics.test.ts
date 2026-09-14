import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Platform } from '@/core/types'
import { i18n } from '@/core/i18n'
import { TextLink } from '@/components'
import type { TTier } from '@/modules/Streamer/views/Dashboard/api'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'
import type { TWidgetSettings } from '@/modules/Streamer/views/Settings/api'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { Metric } from '../components'
import Metrics from '../Metrics.vue'

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(),
	}
})

describe('Streamer Dashboard Loyalty Metrics', () => {
	const mockRouter = {
		push: vi.fn(),
	} as any

	beforeEach(() => {
		vi.mocked(useRouter).mockReturnValue(mockRouter)
	})

	const factory = (platform?: Platform ) => {
		const wrapper = mount(Metrics, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const dashboardStore = useDashboardStore()
		dashboardStore.tier.data = tierData

		const settingsStore = useSettingsStore()
		settingsStore.widget = {
			platform,
		} as TWidgetSettings

		return { wrapper, dashboardStore }
	}

	type MetricProps = {
		name: keyof Exclude<TTier, null>['current']
		success: boolean
		label: string
		value: string
	}

	const getMetric = (wrapper: ReturnType<typeof factory>['wrapper'], level: number, name: keyof Exclude<TTier, null>['current']) => {
		const metrics: VueWrapper<any>[] = wrapper.find('[data-test="level-1-metrics"]').findAllComponents(Metric)
		return metrics.find(metric => (metric.props() as MetricProps).name === name)
	}

	it('renders the correct number of levels', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)

		await nextTick()

		dashboardStore.tier.data?.levels.forEach(level => {
			expect(wrapper.find(`[data-test="level-${level.level}-metrics"]`).exists()).toBe(true)
		})
	})

	it('shows corresponding level metrics for selected level', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 2

		await nextTick()

		expect(wrapper.find('[data-test="level-2-metrics"]').classes().includes('!block')).toBe(true)
		expect(wrapper.find('[data-test="level-1-metrics"]').classes().includes('!block')).toBe(false)
		expect(wrapper.find('[data-test="level-3-metrics"]').classes().includes('!block')).toBe(false)
	})

	it('passes correct prop values to CTR metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'ctr')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('ctr')
		expect(props.success).toEqual(false)
		expect(props.label).toEqual('CTR')
		expect(props.value).toEqual('0% / 0.2%')
	})

	it('passes correct prop values to Impressions metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'impressions')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('impressions')
		expect(props.success).toEqual(false)
		expect(props.label).toEqual('Impressions')
		expect(props.value).toEqual('0 / 1000')
	})

	it('passes correct prop values to Referrals metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'referrals')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('referrals')
		expect(props.success).toEqual(true)
		expect(props.label).toEqual('Referrals')
		expect(props.value).toEqual('0 / 0')
	})

	it('passes correct prop values to Time on platform metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'daysOnPlatform')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('daysOnPlatform')
		expect(props.success).toEqual(false)
		expect(props.label).toEqual('Time on platform')
		expect(props.value).toEqual('0 / 15 days')
	})

	it('passes correct prop values to Discord metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'discord')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('discord')
		expect(props.success).toEqual(false)
		expect(props.label).toEqual('Discord')
		expect(metric?.findComponent(TextLink).exists()).toBe(true)
	})

	it('passes correct prop values to Extension metric', async () => {
		const { wrapper, dashboardStore } = factory(Platform.TWITCH)
		dashboardStore.tier.selectedLevel = 1

		await nextTick()

		const metric = getMetric(wrapper, 1, 'extension')
		const props = metric?.props() as MetricProps
		expect(props.name).toEqual('extension')
		expect(props.label).toEqual('Extension')
		expect(props.success).toEqual(true)
		expect(props.value).toEqual('Active')
		expect(metric?.findComponent(TextLink).exists()).toBe(false)
	})
})
