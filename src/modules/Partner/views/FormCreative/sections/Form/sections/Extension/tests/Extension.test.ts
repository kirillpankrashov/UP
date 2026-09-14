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
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { extensionCreative } from '@/modules/Partner/views/FormCreative/api/getExtensionCreative/fixtures/extensionCreative'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import Extension from '../Extension.vue'

const { mockPush } = vi.hoisted(() => ({
	mockPush: vi.fn(),
}))

vi.mock('@/core/helpers')
vi.mock('@/core/router', () => ({
	router: {
		push: mockPush,
	},
}))
vi.mock('vue-router', () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(() => ({ push: vi.fn() })),
	createWebHistory: vi.fn(() => ({})),
	createRouter: vi.fn(() => ({
		beforeEach: vi.fn(),
		afterEach: vi.fn(),
		push: vi.fn(),
		replace: vi.fn(),
	})),
	RouterLink: {
		name: 'RouterLink',
		template: '<a><slot /></a>',
	},
	RouterView: {
		name: 'RouterView',
		template: '<div><slot /></div>',
	},
}))
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const formComponents = [
	'FormStatus',
	'FormTitle',
	'FormProductUrl',
	'FormPreview',
	'FormPixel',
	'FormPixelScript',
	'FormImpression',
	'FormLegals',
	'FormBanner',
	'FormGallery',
	'FormQuiz',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach((component) => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"></div>`,
		props: ['modelValue', 'creative', 'class'],
		emits: ['update:modelValue', 'file-delete'],
	}
})

const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div class="mock-dashboard-section"><slot /><slot name="title" /></div>',
	props: ['title', 'noBorder'],
}

const mockDashboardSubsection = {
	name: 'DashboardSubsection',
	template: '<div class="mock-dashboard-subsection"><slot /></div>',
	props: ['title'],
}

describe('FormCreative Extension Component', () => {
	const factory = (
		routeName = RouteName.CREATIVE_CREATE,
		adsetFormat = AdFormat.EXT_BANNER,
		creativeState: any = {},
	) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: { campaignSlug: 'cmp', adsetSlug: 'adset' },
			query: {},
		} as any)

		const wrapper = mount(Extension, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							'partner-formadset': {
								adset: {
									slug: 'adset-1',
									format: { id: adsetFormat },
								},
							},
						},
					}),
				],
				stubs: {
					ElForm,
					ExtensionSkeleton: {
						name: 'ExtensionSkeleton',
						template: '<div data-test="extension-skeleton-stub"></div>',
					},
					DashboardSection: mockDashboardSection,
					DashboardSubsection: mockDashboardSubsection,
					Advice: {
						name: 'Advice',
						template: '<div data-test="Advice"><slot /></div>',
						props: ['type', 'title', 'label'],
					},
					PreviewExtensionBanner: {
						name: 'PreviewExtensionBanner',
						template: '<div data-test="PreviewExtensionBanner"></div>',
						props: ['panel'],
					},
					PreviewExtensionGallery: {
						name: 'PreviewExtensionGallery',
						template: '<div data-test="PreviewExtensionGallery"></div>',
						props: ['gallery'],
					},
					QuizInstance: {
						name: 'QuizInstance',
						template: '<div data-test="QuizInstance"></div>',
						props: ['quiz'],
					},
					EditorBanner: { name: 'EditorBanner', template: '<div data-test="EditorBanner"></div>' },
					EditorGallery: { name: 'EditorGallery', template: '<div data-test="EditorGallery"></div>' },
					EditorQuiz: { name: 'EditorQuiz', template: '<div data-test="EditorQuiz"></div>' },
					ElDialog: {
						name: 'ElDialog',
						template: '<div data-test="ElDialog"><slot /></div>',
						props: ['modelValue', 'fullscreen', 'destroyOnClose'],
					},
					...formComponentMocks,
				},
			},
		})

		const formCreativeStore = useFormCreativeStore()
		const formAdsetStore = useFormAdsetStore()
		const campaignsStore = useCampaignsStore()
		const formCampaignStore = useFormCampaignStore()

		Object.assign(formCreativeStore, creativeState)
		formAdsetStore.adset = {
			slug: 'adset-1',
			format: { id: adsetFormat },
		} as any

		return { wrapper, formCreativeStore, formAdsetStore, campaignsStore, formCampaignStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		vi.useFakeTimers()
	})

	it('renders common sections in create mode', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-name-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-data-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="extension-analytics-section"]').exists()).toBe(true)
	})

	it('shows status section only in edit mode', () => {
		const { wrapper: createWrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)
		const { wrapper: editWrapper } = factory(RouteName.CREATIVE_EDIT, AdFormat.EXT_BANNER)

		expect(createWrapper.find('[data-test="extension-status-section"]').exists()).toBe(false)
		expect(editWrapper.find('[data-test="extension-status-section"]').exists()).toBe(true)
	})

	it('shows skeleton while fetching creative in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.EXT_BANNER)

		formCreativeStore.$patch({ isFetchingCreative: true })
		await nextTick()

		expect(wrapper.find('[data-test="extension-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElForm).exists()).toBe(false)
	})

	it('does not show skeleton in create mode when isFetchingCreative is true', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)

		formCreativeStore.$patch({ isFetchingCreative: true })
		await nextTick()

		expect(wrapper.find('[data-test="extension-skeleton-stub"]').exists()).toBe(false)
		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
	})

	it('renders banner section for EXT_BANNER format', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)
		await nextTick()

		expect(wrapper.find('[data-test="extension-files-section"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'FormBanner' }).exists()).toBe(true)
	})

	it('renders quiz section for EXT_QUIZ format', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_QUIZ)
		await nextTick()

		expect(wrapper.findComponent({ name: 'FormQuiz' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'QuizInstance' }).exists()).toBe(true)
	})

	it('renders gallery section for EXT_GALLERY format', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_GALLERY)
		await nextTick()

		expect(wrapper.find('[data-test="extension-gallery-section"]').exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'FormGallery' }).exists()).toBe(true)
	})

	it('initializes with creative data in edit mode', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, AdFormat.EXT_QUIZ, {
			creative: extensionCreative,
		})
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(extensionCreative.title)
		expect(vm.model.productUrl.general).toBe(extensionCreative.productUrl.general)
		expect(vm.modelVisibleStatus).toBe(extensionCreative.visible)
	})

	it('calls createCreative on submit in create mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()
		expect(formCreativeStore.createCreative).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateCreative on submit in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.EXT_BANNER, {
			creative: extensionCreative,
		})
		await nextTick()
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()
		expect(formCreativeStore.updateCreative).toHaveBeenCalledWith({
			...vm.model,
			slug: extensionCreative.slug,
		})
	})

	it('changes status when visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.EXT_BANNER, {
			creative: extensionCreative,
		})
		await nextTick()
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}
		vm.modelVisibleStatus = !extensionCreative.visible

		await vm.onSubmit()
		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			extensionCreative.slug,
			CampaignType.EXTENSION,
			AdEntityType.CREATIVES,
		)
	})

	it('exposes required methods and state', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.EXT_BANNER)
		const vm = wrapper.vm as any

		expect(typeof vm.onSubmit).toBe('function')
		expect(vm.closeAndReturnRoute).toBeDefined()
		expect(typeof vm.showCloseDialog).toBe('boolean')
		expect(typeof vm.sending).toBe('boolean')
		expect(typeof vm.success).toBe('boolean')
	})
})
