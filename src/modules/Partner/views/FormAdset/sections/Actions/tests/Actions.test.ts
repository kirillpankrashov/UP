import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElButton } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'

import Actions from '../Actions.vue'

// Mock DashboardSection component
const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div class="mock-dashboard-section"><slot /></div>',
	props: ['noLeft'],
}

// Mock router
const mockRouter = {
	push: vi.fn(),
}

// Mock route
const mockRoute = {
	name: RouteName.ADSET_CREATE,
	params: {
		campaignSlug: 'test-campaign',
	},
}

// Mock store
const mockFormAdsetStore = {
	adset: null as any,
}

vi.mock('vue-router', async () => {
	const actual = await vi.importActual('vue-router') as any
	return {
		...actual,
		useRoute: () => mockRoute,
		useRouter: () => mockRouter,
	}
})

vi.mock('@/modules/Partner/views/FormAdset/store', () => ({
	useFormAdsetStore: () => mockFormAdsetStore,
}))

describe('Actions Component', () => {
	beforeAll(() => {
		vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	const factory = (props = {}, routeName = RouteName.ADSET_CREATE) => {
		// Update route name for each test
		mockRoute.name = routeName

		const wrapper = mount(Actions, {
			global: {
				plugins: [i18n],
				stubs: {
					DashboardSection: mockDashboardSection,
				},
			},
			props: {
				sending: false,
				success: false,
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		mockFormAdsetStore.adset = null
	})

	it('renders both buttons correctly', () => {
		const { wrapper } = factory()

		const backButton = wrapper.find('[data-test="back-button"]')
		const nextButton = wrapper.find('[data-test="next-button"]')

		expect(backButton.exists()).toBe(true)
		expect(nextButton.exists()).toBe(true)
	})

	it('displays correct back button text', () => {
		const { wrapper } = factory()

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		expect(backButton.text()).toContain('Back')
	})

	it('displays correct next button text in normal state', () => {
		const { wrapper } = factory()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Save')
	})

	it('displays correct next button text when sending', () => {
		const { wrapper } = factory({ sending: true })

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Sending')
	})

	it('displays correct next button text when success', () => {
		const { wrapper } = factory({ success: true })

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Saving')
	})

	it('disables buttons when sending', () => {
		const { wrapper } = factory({ sending: true })

		const backButton = wrapper.findComponent(ElButton)
		const nextButton = wrapper.findAllComponents(ElButton)[1]

		expect(backButton.props('disabled')).toBe(true)
		expect(nextButton.props('disabled')).toBe(true)
	})

	it('disables buttons when success', () => {
		const { wrapper } = factory({ success: true })

		const backButton = wrapper.findComponent(ElButton)
		const nextButton = wrapper.findAllComponents(ElButton)[1]

		expect(backButton.props('disabled')).toBe(true)
		expect(nextButton.props('disabled')).toBe(true)
	})

	it('shows loading state on next button when sending', () => {
		const { wrapper } = factory({ sending: true })

		const nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('loading')).toBe(true)
	})

	it('shows loading state on next button when success', () => {
		const { wrapper } = factory({ success: true })

		const nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('loading')).toBe(true)
	})

	it('changes next button type to success when success is true', () => {
		const { wrapper } = factory({ success: true })

		const nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('type')).toBe('success')
	})

	it('keeps next button type as primary when success is false', () => {
		const { wrapper } = factory({ success: false })

		const nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('type')).toBe('primary')
	})

	it('emits onReturn event when back button is clicked', async () => {
		const { wrapper } = factory()

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		await backButton.trigger('click')

		expect(wrapper.emitted('onReturn')).toBeTruthy()
		expect(wrapper.emitted('onReturn')).toHaveLength(1)
	})

	it('emits onSubmit event when next button is clicked', async () => {
		const { wrapper } = factory()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		await nextButton.trigger('click')

		expect(wrapper.emitted('onSubmit')).toBeTruthy()
		expect(wrapper.emitted('onSubmit')).toHaveLength(1)
	})

	it('does not emit events when buttons are disabled', async () => {
		const { wrapper } = factory({ sending: true })

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		const nextButton = wrapper.findComponent('[data-test="next-button"]')

		await backButton.trigger('click')
		await nextButton.trigger('click')

		expect(wrapper.emitted('onReturn')).toBeFalsy()
		expect(wrapper.emitted('onSubmit')).toBeFalsy()
	})

	it('has correct button sizes and styling', () => {
		const { wrapper } = factory()

		const backButton = wrapper.findComponent(ElButton)
		const nextButton = wrapper.findAllComponents(ElButton)[1]

		expect(backButton.props('size')).toBe('large')
		expect(backButton.props('type')).toBe('primary')
		expect(backButton.props('plain')).toBe(true)

		expect(nextButton.props('size')).toBe('large')
	})

	it('updates button states when props change', async () => {
		const { wrapper } = factory({ sending: false, success: false })

		let nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('disabled')).toBe(false)
		expect(nextButton.props('loading')).toBe(false)

		await wrapper.setProps({ sending: true })

		nextButton = wrapper.findAllComponents(ElButton)[1]
		expect(nextButton.props('disabled')).toBe(true)
		expect(nextButton.props('loading')).toBe(true)
	})

	it('shows duplicate button only in edit mode', () => {
		const { wrapper: createWrapper } = factory({}, RouteName.ADSET_CREATE)
		const { wrapper: editWrapper } = factory({}, RouteName.ADSET_EDIT)

		const createDuplicateButton = createWrapper.find('[data-test="duplicate-button"]')
		const editDuplicateButton = editWrapper.find('[data-test="duplicate-button"]')

		expect(createDuplicateButton.exists()).toBe(false)
		expect(editDuplicateButton.exists()).toBe(true)
	})

	it('navigates to create route and copies adset when duplicate is clicked', async () => {
		const mockAdset = { id: 1, title: 'Test Adset' }
		mockFormAdsetStore.adset = mockAdset

		const { wrapper } = factory({}, RouteName.ADSET_EDIT)

		const duplicateButton = wrapper.findComponent('[data-test="duplicate-button"]')
		await duplicateButton.trigger('click')

		expect(mockRouter.push).toHaveBeenCalledWith({
			name: RouteName.ADSET_CREATE,
			params: {
				campaignSlug: 'test-campaign',
			},
		})

		expect(mockFormAdsetStore.adset).toBe(mockAdset)
	})
})
