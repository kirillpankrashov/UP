import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Partner/router'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { FormSection } from '@/modules/Partner/views/FormCampaign/types'

import Actions from '../Actions.vue'

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		// Переопределяем только то, что нам нужно для тестов
		useRoute: vi.fn(() => ({
			name: RouteName.CAMPAIGN_CREATE,
		})),
		useRouter: vi.fn(() => ({
			push: vi.fn(),
		})),
	}
})

// Мокируем функцию локализации
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => {
			// Возвращаем ожидаемые переводы для ключей, используемых в компоненте
			const translations: Record<string, string> = {
				'button.cancel.static': 'Cancel',
				'button.back.static': 'Back',
				'button.next.static': 'Next',
				'button.save': 'Save',
				'button.send.pending': 'Saving...',
				'button.saveChanges.pending': 'Saved!',
			}

			// Возвращаем перевод или сам ключ, если перевод не найден
			return translations[key] || key
		},
	}),
}))

// Мокируем компоненты
const mockElButton = {
	name: 'ElButton',
	template: '<button class="mock-button" :class="buttonClasses" v-bind="buttonAttributes"><slot /></button>',
	props: ['type', 'size', 'plain', 'disabled', 'loading'],
	computed: {
		buttonClasses(this: any) {
			const classes = []
			if (this.type === 'success') classes.push('el-button--success')
			if (this.type === 'primary') classes.push('el-button--primary')
			return classes
		},
		buttonAttributes(this: any) {
			const attrs: any = {}
			if (this.disabled) attrs.disabled = true
			if (this.loading) attrs['data-loading'] = true
			return attrs
		},
	},
}

const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div class="mock-dashboard-section"><slot /></div>',
	props: ['noLeft'],
}

describe('Actions Component', () => {
	const factory = (props = {}, storeState: { section?: FormSection; currentCampaignType?: CampaignType | null } = {}) => {
		const wrapper = mount(Actions, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						stubActions: false,
					}),
				],
				stubs: {
					ElButton: mockElButton,
					DashboardSection: mockDashboardSection,
				},
			},
			props: {
				sending: false,
				success: false,
				...props,
			},
		})

		const formCampaignStore = useFormCampaignStore()
		formCampaignStore.section = FormSection.TYPE
		formCampaignStore.currentCampaignType = CampaignType.BRAND_AWARENESS
		if (storeState.section !== undefined) {
			formCampaignStore.section = storeState.section
		}
		if (storeState.currentCampaignType !== undefined) {
			formCampaignStore.currentCampaignType = storeState.currentCampaignType as any
		}

		return { wrapper, formCampaignStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('displays correct text for back button in TYPE section', () => {
		const { wrapper } = factory()

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		expect(backButton.text()).toContain('Cancel')
	})

	it('displays correct text for back button in SETTINGS section', async () => {
		const { wrapper } = factory({}, { section: FormSection.SETTINGS })

		await nextTick()

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		expect(backButton.text()).toContain('Back')
	})

	it('displays correct text for next button in TYPE section', () => {
		const { wrapper } = factory()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Next')
	})

	it('displays correct text for next button in SETTINGS section', async () => {
		const { wrapper } = factory({}, { section: FormSection.SETTINGS })

		await nextTick()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Save')
	})

	it('shows loading state when sending', () => {
		const { wrapper } = factory({ sending: true })

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.attributes('data-loading')).toBeDefined()
	})

	it('shows success state when success', () => {
		const { wrapper } = factory({ success: true })

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.classes()).toContain('el-button--success')
		expect(nextButton.attributes('data-loading')).toBeDefined()
	})

	it('disables next button when currentCampaignType is not set in TYPE section', async () => {
		const { wrapper, formCampaignStore } = factory({}, { currentCampaignType: null })

		// Ensure the store state is properly set
		expect(formCampaignStore.currentCampaignType).toBe(null)
		expect(formCampaignStore.section).toBe(FormSection.TYPE)

		await nextTick()

		const nextButton = wrapper.find('[data-test="next-button"]')
		expect(nextButton.attributes('disabled')).toBeDefined()
	})

	it('enables next button when currentCampaignType is set in TYPE section', async () => {
		const { wrapper } = factory({}, {
			section: FormSection.TYPE,
			currentCampaignType: CampaignType.BRAND_AWARENESS,
		})

		await nextTick() // Важно дождаться обновления

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.attributes('disabled')).toBeUndefined()
	})

	it('emits onReturn event when back button is clicked in TYPE section', async () => {
		const { wrapper } = factory()

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		await backButton.trigger('click')

		expect(wrapper.emitted('onReturn')).toBeTruthy()
	})

	it('changes section to TYPE when back button is clicked in SETTINGS section', async () => {
		const { wrapper, formCampaignStore } = factory({}, { section: FormSection.SETTINGS })

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		await backButton.trigger('click')

		expect(formCampaignStore.section).toBe(FormSection.TYPE)
	})

	it('changes section to SETTINGS when next button is clicked in TYPE section', async () => {
		const { wrapper, formCampaignStore } = factory({}, {
			section: FormSection.TYPE,
			currentCampaignType: CampaignType.BRAND_AWARENESS,
		})

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		await nextButton.trigger('click')

		expect(formCampaignStore.section).toBe(FormSection.SETTINGS)
	})

	it('emits onSubmit event when next button is clicked in SETTINGS section', async () => {
		const { wrapper } = factory({}, { section: FormSection.SETTINGS })

		await nextTick()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		await nextButton.trigger('click')

		expect(wrapper.emitted()).toHaveProperty('onSubmit')
	})

	it('disables buttons when sending', () => {
		const { wrapper } = factory({ sending: true })

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		const nextButton = wrapper.findComponent('[data-test="next-button"]')

		expect(backButton.attributes('disabled')).toBeDefined()
		expect(nextButton.attributes('disabled')).toBeDefined()
	})

	it('disables buttons when success', () => {
		const { wrapper } = factory({ success: true })

		const backButton = wrapper.findComponent('[data-test="back-button"]')
		const nextButton = wrapper.findComponent('[data-test="next-button"]')

		expect(backButton.attributes('disabled')).toBeDefined()
		expect(nextButton.attributes('disabled')).toBeDefined()
	})

	it('shows saving text when sending in SETTINGS section', async () => {
		const { wrapper } = factory({
			sending: true,
		}, {
			section: FormSection.SETTINGS,
		})

		await nextTick()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Saving...')
	})

	it('shows saved text when success in SETTINGS section', async () => {
		const { wrapper, formCampaignStore } = factory({
			success: true,
		}, {
			section: FormSection.SETTINGS,
		})

		// Проверяем, что секция установлена правильно
		expect(formCampaignStore.section).toBe(FormSection.SETTINGS)

		await nextTick()

		const nextButton = wrapper.findComponent('[data-test="next-button"]')
		expect(nextButton.text()).toContain('Saved!')
	})
})
