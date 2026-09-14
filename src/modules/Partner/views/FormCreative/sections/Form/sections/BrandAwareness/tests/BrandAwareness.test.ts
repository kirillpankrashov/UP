import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdEntityType, AdFormat, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import BrandAwareness from '../BrandAwareness.vue'

vi.mock('@/core/helpers')
vi.mock('vue-router', () => {
	const useRoute = vi.fn()
	const useRouter = vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
		beforeEach: vi.fn(),
		afterEach: vi.fn(),
	}))
	return {
		useRoute,
		useRouter,
		createRouter: vi.fn(() => ({
			push: vi.fn(),
			replace: vi.fn(),
			beforeEach: vi.fn(),
			afterEach: vi.fn(),
			isReady: vi.fn().mockResolvedValue(undefined),
		})),
		createWebHistory: vi.fn(),
		RouterLink: { name: 'RouterLink', template: '<a><slot /></a>' },
		RouterView: { name: 'RouterView', template: '<div><slot /></div>' },
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

// Mock form components
const formComponents = [
	'FormStatus', 'FormTitle', 'FormCreative', 'FormProductUrl',
	'FormChatbotText', 'FormQrCode', 'FormAdTag', 'FormPixel',
	'FormPixelScript', 'FormImpression',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach(component => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component.toLowerCase()}"><slot /></div>`,
		props: ['modelValue'],
		emits: ['update:modelValue'],
	}
})

const mockBrandAwarenessCreative = {
	slug: 'creative-123',
	title: 'Test Creative',
	chatbotText: 'Test chatbot text',
	visible: true,
	companion: {
		heading: 'Test heading',
		text: 'Test text',
		cta: 'Test CTA',
	},
	productUrl: {
		general: 'https://example.com',
		mobile: 'https://mobile.example.com',
	},
	qrCode: false,
	pixelClicks: ['https://pixel1.com'],
	pixelImpressions: ['https://impression1.com'],
	pixelInspections: [],
	pixelClicksScripts: 'console.log("test");',
	scriptCode: '',
	attachments: {
		video: { basename: 'video.mp4' },
		unit: null,
		zip: null,
	},
	adset: {
		slug: 'adset-123',
		campaign: {
			slug: 'campaign-123',
		},
	},
	legalCompliance: {
		erid: {
			media: 'test-media',
		},
		marker: {
			text: 'test-marker',
		},
	},
}

describe('BrandAwareness Component', () => {
	const factory = (routeName = RouteName.CREATIVE_CREATE, storeState = {}) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: {},
			query: {},
		} as any)

		const wrapper = mount(BrandAwareness, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-formcreative': {
								currentCampaignType: null,
								creative: null,
								isFetchingCreative: false,
								fetchError: false,
								...storeState,
							},
						},
					}),
				],
				stubs: {
					ElForm,
					BrandAwarenessSkeleton: {
						name: 'BrandAwarenessSkeleton',
						template: '<div data-test="brand-awareness-skeleton-stub"></div>',
					},
					DashboardSection: {
						name: 'DashboardSection',
						template: '<div class="dashboard-section"><slot /></div>',
						props: ['title', 'noBorder'],
					},
					DashboardSubsection: {
						name: 'DashboardSubsection',
						template: '<div class="dashboard-subsection"><slot /></div>',
						props: ['title'],
					},
					Advice: {
						name: 'Advice',
						template: '<div class="advice"><slot /></div>',
						props: ['type', 'title', 'label'],
					},
					Preview: {
						name: 'Preview',
						template: '<div class="preview"></div>',
						props: ['slug'],
					},
					...formComponentMocks,
				},
			},
		})

		const formCreativeStore = useFormCreativeStore()
		const formAdsetStore = useFormAdsetStore()
		const campaignsStore = useCampaignsStore()

		// Setup default adset
		formAdsetStore.adset = {
			slug: 'adset-123',
			format: { id: AdFormat.FULLSCREEN },
		} as any

		return { wrapper, formCreativeStore, formAdsetStore, campaignsStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('shows skeleton while fetching creative in edit mode', () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			isFetchingCreative: true,
		})

		expect(wrapper.find('[data-test="brand-awareness-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElForm).exists()).toBe(false)
	})

	it('does not show skeleton in create mode when isFetchingCreative is true', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, {
			isFetchingCreative: true,
		})

		expect(wrapper.find('[data-test="brand-awareness-skeleton-stub"]').exists()).toBe(false)
		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
	})

	it('renders form with required components in create mode', () => {
		const { wrapper } = factory()

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-name-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-files-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-data-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="brand-awareness-analytics-section"]').exists()).toBe(true)
	})

	it('shows status section only in edit mode', () => {
		const { wrapper: createWrapper } = factory(RouteName.CREATIVE_CREATE)
		const { wrapper: editWrapper } = factory(RouteName.CREATIVE_EDIT)

		expect(createWrapper.find('[data-test="brand-awareness-status-section"]').exists()).toBe(false)
		expect(editWrapper.find('[data-test="brand-awareness-status-section"]').exists()).toBe(true)
	})

	it('shows AdTag section only for ADMNG format', async () => {
		const { wrapper: fullscreenWrapper, formAdsetStore: fullscreenStore } = factory()
		fullscreenStore.adset = { format: { id: AdFormat.FULLSCREEN } } as any

		const { wrapper: admngWrapper, formAdsetStore: admngStore } = factory()
		admngStore.adset = { format: { id: AdFormat.ADMNG } } as any

		await nextTick()

		expect(fullscreenWrapper.find('[data-test="brand-awareness-adtag-section"]').exists()).toBe(false)
		expect(admngWrapper.find('[data-test="brand-awareness-adtag-section"]').exists()).toBe(true)
	})

	it('shows files section for supported formats', async () => {
		const supportedFormats = [AdFormat.FULLSCREEN, AdFormat.PIP, AdFormat.CUSTOM]

		for (const format of supportedFormats) {
			const { wrapper, formAdsetStore } = factory()
			formAdsetStore.adset = { format: { id: format } } as any

			await nextTick()

			expect(wrapper.find('[data-test="brand-awareness-files-section"]').exists()).toBe(true)
		}
	})

	it('hides files section for unsupported formats', async () => {
		const { wrapper, formAdsetStore } = factory()
		formAdsetStore.adset = { format: { id: AdFormat.ADMNG } } as any

		await nextTick()

		expect(wrapper.find('[data-test="brand-awareness-files-section"]').exists()).toBe(false)
	})

	it('initializes with default model in create mode', () => {
		const { wrapper } = factory()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe('')
		expect(vm.model.chatbotText).toBe('')
		expect(vm.model.productUrl.general).toBe('')
		expect(vm.model.qrCode).toBe(false)
	})

	it('initializes with creative data in edit mode', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(mockBrandAwarenessCreative.title)
		expect(vm.model.chatbotText).toBe(mockBrandAwarenessCreative.chatbotText)
		expect(vm.model.productUrl.general).toBe(mockBrandAwarenessCreative.productUrl.general)
		expect(vm.modelVisibleStatus).toBe(mockBrandAwarenessCreative.visible)
	})

	it('shows requirements advice when no file is present', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE)

		await nextTick()

		expect(wrapper.find('[data-test="creative-requirements-advice"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="creative-preview-advice"]').exists()).toBe(false)
	})

	it('shows preview advice when file is present', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		await nextTick()

		expect(wrapper.find('[data-test="creative-requirements-advice"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="creative-preview-advice"]').exists()).toBe(true)
	})

	it('opens preview dialog when preview button is clicked', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		await nextTick()

		const previewButton = wrapper.find('[data-test="preview-button"]')
		await previewButton.trigger('click')

		const vm = wrapper.vm as any
		expect(vm.previewVisible).toBe(true)
	})

	it('calls createCreative on submit in create mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE)

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formCreativeStore.createCreative).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateCreative on submit in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		await nextTick()

		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(formCreativeStore.updateCreative).toHaveBeenCalledWith({
			...vm.model,
			slug: mockBrandAwarenessCreative.slug,
		})
	})

	it('changes status when visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		await nextTick()

		const vm = wrapper.vm as any
		vm.modelVisibleStatus = !mockBrandAwarenessCreative.visible
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			mockBrandAwarenessCreative.slug,
			CampaignType.BRAND_AWARENESS,
			AdEntityType.CREATIVES,
		)
	})

	it('handles file deletion correctly', () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, {
			creative: mockBrandAwarenessCreative,
		})

		const vm = wrapper.vm as any
		vm.onFileDelete()

		expect(formCreativeStore.deleteAttachment).toHaveBeenCalledWith({
			field: 'video', // Based on FULLSCREEN format
			slug: mockBrandAwarenessCreative.slug,
		})
	})

	it('computes creative field based on format', () => {
		const formatTests = [
			{ format: AdFormat.FULLSCREEN, expected: 'video' },
			{ format: AdFormat.PIP, expected: 'video' },
			{ format: AdFormat.CUSTOM, expected: 'zip' },
			{ format: AdFormat.ADMNG, expected: 'unit' },
		]

		formatTests.forEach(({ format, expected }) => {
			const { wrapper, formAdsetStore } = factory()
			formAdsetStore.adset = { format: { id: format } } as any

			const vm = wrapper.vm as any
			expect(vm.creativeField).toBe(expected)
		})
	})

	it('computes max file size based on format', () => {
		const sizeTests = [
			{ format: AdFormat.FULLSCREEN, expected: 15 },
			{ format: AdFormat.PIP, expected: 15 },
			{ format: AdFormat.CUSTOM, expected: 10 },
			{ format: AdFormat.ADMNG, expected: 15 },
		]

		sizeTests.forEach(({ format, expected }) => {
			const { wrapper, formAdsetStore } = factory()
			formAdsetStore.adset = { format: { id: format } } as any

			const vm = wrapper.vm as any
			expect(vm.maxFileSize).toBe(expected)
		})
	})
})
