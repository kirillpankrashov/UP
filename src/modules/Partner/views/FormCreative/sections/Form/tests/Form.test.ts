import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import Form from '../Form.vue'

// Мокируем импортируемые компоненты формы
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
	SpecialProject: {
		name: 'SpecialProject',
		template: '<div data-test="special-project-form">Special Project Form</div>',
	},
}))

describe('FormCreative Form Component', () => {
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

		const formCreativeStore = useFormCreativeStore()

		// Устанавливаем состояние store после создания
		Object.assign(formCreativeStore, {
			currentCampaignType: null,
			...storeState,
		})

		return { wrapper, formCreativeStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders nothing when currentCampaignType is not set', async () => {
		const { wrapper, formCreativeStore } = factory()

		// Явно устанавливаем null и дожидаемся обновления
		formCreativeStore.currentCampaignType = null as any
		await nextTick()

		// Убеждаемся что currentCampaignType действительно null
		expect(formCreativeStore.currentCampaignType).toBe(null)

		// Компонент не должен рендериться
		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
	})

	it('renders BrandAwareness component when currentCampaignType is BRAND_AWARENESS', async () => {
		const { wrapper, formCreativeStore } = factory()

		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		// Проверяем что компонент отображается
		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders Extension component when currentCampaignType is EXTENSION', async () => {
		const { wrapper, formCreativeStore } = factory()

		formCreativeStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('renders SpecialProject component when currentCampaignType is SPECIAL_PROJECT', async () => {
		const { wrapper, formCreativeStore } = factory()

		formCreativeStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(true)
	})

	it('returns null for unsupported campaign types', async () => {
		const { wrapper, formCreativeStore } = factory()

		formCreativeStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(false)
	})

	it('exposes form reference via form computed property', async () => {
		const { wrapper, formCreativeStore } = factory()

		// Устанавливаем тип кампании и обновляем представление
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		// Проверяем, что ref правильно установлен
		const vm = wrapper.vm as any
		const formRef = vm.form
		expect(formRef).toBeDefined()

		// Проверяем, что ref правильно установлен
		expect(vm.formRef).toBeTruthy()
	})

	it('handles campaign type changes dynamically', async () => {
		const { wrapper, formCreativeStore } = factory()

		// Начинаем с BRAND_AWARENESS
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)

		// Меняем на неподдерживаемый тип
		formCreativeStore.currentCampaignType = CampaignType.PERFORMANCE
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(false)

		formCreativeStore.currentCampaignType = CampaignType.EXTENSION
		await nextTick()
		expect(wrapper.findComponent({ name: 'Extension' }).exists()).toBe(true)

		formCreativeStore.currentCampaignType = CampaignType.SPECIAL_PROJECT
		await nextTick()
		expect(wrapper.findComponent({ name: 'SpecialProject' }).exists()).toBe(true)

		// И обратно на BRAND_AWARENESS
		formCreativeStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		await nextTick()

		expect(wrapper.findComponent({ name: 'BrandAwareness' }).exists()).toBe(true)

		// И обратно на null
		formCreativeStore.currentCampaignType = null as any
		await nextTick()

		expect(wrapper.find('[data-test="form-creative-component"]').exists()).toBe(false)
	})
})
