import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import Form from '../Form.vue'

vi.mock('@/core/helpers')
vi.mock('../sections', () => ({
	BrandAwareness: {
		name: 'BrandAwareness',
		template: '<div data-test="brand-awareness-form">Brand Awareness Form</div>',
	},
	Extension: {
		name: 'Extension',
		template: '<div data-test="extension-form">Extension Form</div>',
	},
	Performance: {
		name: 'Performance',
		template: '<div data-test="performance-form">Performance Form</div>',
	},
	Preroll: {
		name: 'Preroll',
		template: '<div data-test="preroll-form">Preroll Form</div>',
	},
	SpecialProject: {
		name: 'SpecialProject',
		template: '<div data-test="special-project-form">Special Project Form</div>',
	},
}))

describe('Form Component', () => {
	const factory = (storeState = {}) => {
		const wrapper = mount(Form, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-form-campaign': {
								currentCampaignType: null,
								...storeState,
							},
						},
					}),
				],
			},
		})

		const formCampaignStore = useFormCampaignStore()

		return { wrapper, formCampaignStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders nothing when currentCampaignType is not set', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = null as any
		await nextTick()

		expect(wrapper.html()).not.toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).not.toContain('data-test="performance-form"')
		expect(wrapper.html()).not.toContain('data-test="preroll-form"')
		expect(wrapper.html()).not.toContain('data-test="extension-form"')
		expect(wrapper.html()).not.toContain('data-test="special-project-form"')
	})

	it('renders BrandAwareness component when currentCampaignType is BRAND_AWARENESS', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.html()).toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).not.toContain('data-test="performance-form"')
		expect(wrapper.html()).not.toContain('data-test="preroll-form"')
		expect(wrapper.html()).not.toContain('data-test="extension-form"')
		expect(wrapper.html()).not.toContain('data-test="special-project-form"')
	})

	it('renders Performance component when currentCampaignType is PERFORMANCE', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.html()).not.toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).toContain('data-test="performance-form"')
		expect(wrapper.html()).not.toContain('data-test="preroll-form"')
		expect(wrapper.html()).not.toContain('data-test="extension-form"')
		expect(wrapper.html()).not.toContain('data-test="special-project-form"')
	})

	it('renders Preroll component when currentCampaignType is PREROLL', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.PREROLL
		await nextTick()

		expect(wrapper.html()).not.toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).not.toContain('data-test="performance-form"')
		expect(wrapper.html()).toContain('data-test="preroll-form"')
		expect(wrapper.html()).not.toContain('data-test="extension-form"')
		expect(wrapper.html()).not.toContain('data-test="special-project-form"')
	})

	it('renders Extension component when currentCampaignType is EXTENSION', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()

		expect(wrapper.html()).not.toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).not.toContain('data-test="performance-form"')
		expect(wrapper.html()).not.toContain('data-test="preroll-form"')
		expect(wrapper.html()).toContain('data-test="extension-form"')
		expect(wrapper.html()).not.toContain('data-test="special-project-form"')
	})

	it('renders SpecialProject component when currentCampaignType is SPECIAL_PROJECT', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()

		expect(wrapper.html()).not.toContain('data-test="brand-awareness-form"')
		expect(wrapper.html()).not.toContain('data-test="performance-form"')
		expect(wrapper.html()).not.toContain('data-test="preroll-form"')
		expect(wrapper.html()).not.toContain('data-test="extension-form"')
		expect(wrapper.html()).toContain('data-test="special-project-form"')
	})

	it('exposes form reference via form computed property', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.formRef).toBeDefined()
	})

	it('handles campaign type changes dynamically', async () => {
		const { wrapper, formCampaignStore } = factory()

		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.html()).toContain('data-test="brand-awareness-form"')

		formCampaignStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.html()).toContain('data-test="performance-form"')

		formCampaignStore.currentCampaignType = CampaignType.PREROLL
		await nextTick()

		expect(wrapper.html()).toContain('data-test="preroll-form"')

		formCampaignStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()

		expect(wrapper.html()).toContain('data-test="extension-form"')

		formCampaignStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()

		expect(wrapper.html()).toContain('data-test="special-project-form"')
	})
})
