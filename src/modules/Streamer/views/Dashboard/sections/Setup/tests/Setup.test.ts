import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { Advice } from '@/components'
import { RouteName } from '@/modules/Streamer/router'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { checkListData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/checkListData'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { widgetData } from '@/modules/Streamer/views/Settings/api/getWidget/fixtures/widgetData'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { Step } from '../components'
import Setup from '../Setup.vue'

vi.mock('@/core/consts', () => ({
	LINK_ENABLED: true,
}))
vi.mock('@/modules/Streamer/views/Dashboard/api')

describe('Streamer Dashboard Setup', () => {
	const factory = (props: any) => {
		const wrapper = mount(Setup, {
			directives: {
				loading: ElLoadingDirective,
			},
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const streamerStore = useStreamerStore()
		const dashboardStore = useDashboardStore()
		const settingsStore = useSettingsStore()
		streamerStore.profile = profileData
		dashboardStore.checklist = checkListData
		settingsStore.widget = {
			...widgetData,
			extensionEnabled: true,
		}

		return { wrapper, streamerStore, dashboardStore, settingsStore }
	}

	const getStep = (wrapper: ReturnType<typeof factory>['wrapper'], indexId: number) => {
		const steps = wrapper.findAllComponents(Step)
		return steps.find(step => step.props().indexId === indexId)
	}

	it('calculates the correct hintText', async () => {
		const { wrapper } = factory({})

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-setup-steps-left"]').text()).toBe('0 steps left')
	})

	it('calculates the correct hintText', async () => {
		const { wrapper, dashboardStore } = factory({})

		dashboardStore.checklist = {
			close: false,
			completed: true,
			filledProfile: true,
			configuredWidget: true,
			connectedChatbot: false,
			goalCreated: false,
			displayedAd: false,
		}

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-setup-steps-left"]').text()).toBe('3 steps left · About 15 min')
	})

	it('calculates the correct hintText with disabled freemium', async () => {
		const { wrapper, dashboardStore, streamerStore } = factory({})

		streamerStore.profile = {
			...profileData,
			freemiumActive: false,
		}

		dashboardStore.checklist = {
			close: false,
			completed: true,
			filledProfile: true,
			configuredWidget: true,
			connectedChatbot: false,
			goalCreated: false,
			displayedAd: false,
		}

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-setup-steps-left"]').text()).toBe('2 steps left · About 10 min')
	})

	it('calculates the correct hintText when LINK_ENABLED is false', async () => {
		vi.doMock('@/core/consts', () => ({
			LINK_ENABLED: false,
		}))

		const { wrapper, dashboardStore, streamerStore } = factory({})

		streamerStore.profile = {
			...profileData,
			freemiumActive: false,
		}

		dashboardStore.checklist = {
			close: false,
			completed: true,
			filledProfile: true,
			configuredWidget: true,
			connectedChatbot: false,
			goalCreated: false,
			displayedAd: false,
		}

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-setup-steps-left"]').text()).toBe('2 steps left · About 10 min')
	})

	it('hides close checklist button if it is completed', async () => {
		const { wrapper, dashboardStore } = factory({})

		dashboardStore.checklist = {
			close: false,
			completed: false,
			filledProfile: true,
			configuredWidget: true,
			connectedChatbot: false,
			goalCreated: false,
			displayedAd: false,
		}

		await nextTick()

		expect(wrapper.find('[data-test="dashboard-setup-close-checklist-btn"]').exists()).toBe(false)
	})

	it('hides Advice component if checkList data is fetching', async () => {
		const { wrapper, dashboardStore } = factory({})

		dashboardStore.isFetchingChecklist = true

		await nextTick()

		expect(wrapper.findComponent(Advice).exists()).toBe(false)
	})

	it('triggers closeCheckList store method', async () => {
		const { wrapper, dashboardStore } = factory({})

		await nextTick()

		await wrapper.find('[data-test="dashboard-setup-close-checklist-btn"]').trigger('click')

		expect(dashboardStore.closeCheckList).toHaveBeenCalled()
	})

	it('renders profile Step component with corresponding props', async () => {
		const { wrapper } = factory({})

		await nextTick()

		const step = getStep(wrapper, 1)

		expect(step).toBeDefined()
		expect(step?.exists()).toBe(true)
		expect(step?.props().completed).toBe(true)
		expect(step?.props().route).toEqual({ name: RouteName.PROFILE })
	})

	it('renders widget Step component with corresponding props', async () => {
		const { wrapper } = factory({})

		await nextTick()

		const step = getStep(wrapper, 2)

		expect(step).toBeDefined()
		expect(step?.exists()).toBe(true)
		expect(step?.props().completed).toBe(true)
		expect(step?.props().route).toEqual({ name: RouteName.SETTINGS, hash: '#settings-widgetlink' })
	})

	it('renders chatbot Step component with corresponding props', async () => {
		const { wrapper } = factory({})

		await nextTick()

		const step = getStep(wrapper, 3)

		expect(step).toBeDefined()
		expect(step?.exists()).toBe(true)
		expect(step?.props().completed).toBe(true)
		expect(step?.props().route).toEqual({ name: RouteName.SETTINGS, hash: '#settings-chatbot' })
	})

	it('renders campaigns Step component with corresponding props', async () => {
		const { wrapper } = factory({})

		await nextTick()

		const step = getStep(wrapper, 4)

		expect(step).toBeDefined()
		expect(step?.exists()).toBe(true)
		expect(step?.props().completed).toBe(true)
		expect(step?.props().route).toEqual({ name: RouteName.SETTINGS, hash: '#settings-twitch-extension-section' })
	})

	it('renders freemium Step component with corresponding props', async () => {
		const { wrapper } = factory({})

		await nextTick()

		const step = getStep(wrapper, 6)

		expect(step).toBeDefined()
		expect(step?.exists()).toBe(true)
		expect(step?.props().completed).toBe(true)
		expect(step?.props().route).toEqual({ name: RouteName.LINK })
	})

	it('hides freemium Step component with disabled freemium', async () => {
		const { wrapper, streamerStore } = factory({})

		streamerStore.profile = {
			...profileData,
			freemiumActive: false,
		}

		await nextTick()

		const step = getStep(wrapper, 6)

		expect(step).toBeUndefined()
	})

	it('hides freemium Step component when LINK_ENABLED is false', async () => {
		vi.doMock('@/core/consts', () => ({
			LINK_ENABLED: false,
		}))

		const { wrapper, streamerStore } = factory({})

		streamerStore.profile = {
			...profileData,
			freemiumActive: false,
		}

		await nextTick()

		const step = getStep(wrapper, 6)

		expect(step).toBeUndefined()
	})
})
