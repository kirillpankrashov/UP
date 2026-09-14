import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

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

describe('FormAdset Form Component', () => {
	const factory = (storeState = {}) => {
		const wrapper = mount(Form, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		})

		const formAdsetStore = useFormAdsetStore()

		Object.assign(formAdsetStore, {
			currentCampaignType: null,
			...storeState,
		})

		return { wrapper, formAdsetStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders nothing when currentCampaignType is not set', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = null as any
		await nextTick()

		expect(formAdsetStore.currentCampaignType).toBe(null)

		expect(wrapper.html()).toBe('<!--v-if-->')
	})

	it('renders BrandAwareness component when currentCampaignType is BRAND_AWARENESS', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders Performance component when currentCampaignType is PERFORMANCE', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders Preroll component when currentCampaignType is PREROLL', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.PREROLL
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders Extension component when currentCampaignType is EXTENSION', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders SpecialProject component when currentCampaignType is SPECIAL_PROJECT', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()

		expect(wrapper.find('[data-test="form-adset-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(true)
	})

	it('exposes form reference via form computed property', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		const vm = wrapper.vm as any
		const formRef = vm.form
		expect(formRef).toBeDefined()

		expect(vm.formRef).toBeTruthy()
	})

	it('handles campaign type changes dynamically', async () => {
		const { wrapper, formAdsetStore } = factory()

		formAdsetStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)

		formAdsetStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.findComponent({ name: 'Performance' }).exists()).toBe(true)

		formAdsetStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()

		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(true)

		formAdsetStore.currentCampaignType = CampaignType.PREROLL
		await nextTick()

		expect(wrapper.findComponent({ name: 'Preroll' }).exists()).toBe(true)

		formAdsetStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()

		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(true)

		formAdsetStore.currentCampaignType = null as any
		await nextTick()

		expect(wrapper.html()).toBe('<!--v-if-->')
	})
})
