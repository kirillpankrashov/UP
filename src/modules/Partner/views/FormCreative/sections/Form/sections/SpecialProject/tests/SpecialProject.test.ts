import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
	AdEntityType,
	AdFormat,
	CampaignType,
} from '@/core/types'
import { SP_CUSTOM_MAX_SIZE_MB, SP_VIDEO_MAX_SIZE_MB } from '@/core/consts'
import { i18n } from '@/core/i18n'
import { ElForm } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { specialProjectCreative } from '@/modules/Partner/views/FormCreative/api/getSpecialProjectCreative/fixtures/specialProjectCreative'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import SpecialProject from '../SpecialProject.vue'

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
	'FormCreative',
	'FormProductUrl',
	'FormChatbotText',
	'FormQrCode',
	'FormAdTag',
	'FormPixel',
	'FormPixelScript',
	'FormImpression',
	'FormLegals',
]

const formComponentMocks: Record<string, any> = {}
formComponents.forEach((component) => {
	formComponentMocks[component] = {
		name: component,
		template: `<div data-test="${component}"><slot /></div>`,
		props: ['modelValue', 'creative', 'format', 'maxSizeMb'],
		emits: ['update:modelValue', 'file-delete'],
	}
})

describe('FormCreative SpecialProject Component', () => {
	const factory = (
		routeName = RouteName.CREATIVE_CREATE,
		adsetFormat = AdFormat.SP_FULLSCREEN,
		creativeState: any = {},
	) => {
		vi.mocked(useRoute).mockReturnValue({
			name: routeName,
			params: { campaignSlug: 'cmp', adsetSlug: 'adset' },
			query: {},
		} as any)

		const wrapper = mount(SpecialProject, {
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
					SpecialProjectSkeleton: {
						name: 'SpecialProjectSkeleton',
						template: '<div data-test="special-project-skeleton-stub"></div>',
					},
					DashboardSection: {
						name: 'DashboardSection',
						template: '<div data-test="dashboard-section"><slot /><slot name="title" /></div>',
						props: ['title', 'noBorder'],
					},
					DashboardSubsection: {
						name: 'DashboardSubsection',
						template: '<div data-test="dashboard-subsection"><slot /></div>',
						props: ['title'],
					},
					Advice: {
						name: 'Advice',
						template: '<div data-test="advice"><slot /></div>',
						props: ['type', 'title', 'label'],
					},
					Preview: {
						name: 'Preview',
						template: '<div data-test="preview-component"></div>',
						props: ['slug'],
					},
					ElDialog: {
						name: 'ElDialog',
						template: '<div data-test="el-dialog"><slot /></div>',
						props: ['modelValue', 'fullscreen', 'destroyOnClose'],
					},
					ElButton: {
						name: 'ElButton',
						template: '<button data-test="el-button" @click="$emit(\'click\')"><slot /></button>',
						props: ['type', 'size', 'class'],
						emits: ['click'],
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

	it('renders base sections in create mode', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)

		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-name-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-files-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-data-section"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="special-project-analytics-section"]').exists()).toBe(true)
	})

	it('shows status section only in edit mode', () => {
		const { wrapper: createWrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)
		const { wrapper: editWrapper } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_FULLSCREEN)

		expect(createWrapper.find('[data-test="special-project-status-section"]').exists()).toBe(false)
		expect(editWrapper.find('[data-test="special-project-status-section"]').exists()).toBe(true)
	})

	it('shows skeleton while fetching creative in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_FULLSCREEN)

		formCreativeStore.$patch({ isFetchingCreative: true })
		await nextTick()

		expect(wrapper.find('[data-test="special-project-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.findComponent(ElForm).exists()).toBe(false)
	})

	it('does not show skeleton in create mode when isFetchingCreative is true', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)

		formCreativeStore.$patch({ isFetchingCreative: true })
		await nextTick()

		expect(wrapper.find('[data-test="special-project-skeleton-stub"]').exists()).toBe(false)
		expect(wrapper.findComponent(ElForm).exists()).toBe(true)
	})

	it('computes creativeField and maxFileSize by adset format', async () => {
		const { wrapper, formAdsetStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)
		const vm = wrapper.vm as any

		expect(vm.creativeField).toBe('video')
		expect(vm.maxFileSize).toBe(SP_VIDEO_MAX_SIZE_MB)

		formAdsetStore.adset = { slug: 'adset-1', format: { id: AdFormat.SP_CUSTOM } } as any
		await nextTick()

		expect(vm.creativeField).toBe('zip')
		expect(vm.maxFileSize).toBe(SP_CUSTOM_MAX_SIZE_MB)
	})

	it('initializes with creative data in edit mode', async () => {
		const { wrapper } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_FULLSCREEN, {
			creative: specialProjectCreative,
		})
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.title.default).toBe(specialProjectCreative.title)
		expect(vm.model.productUrl.general).toBe(specialProjectCreative.productUrl.general)
		expect(vm.model.chatbotText).toBe(specialProjectCreative.chatbotText)
		expect(vm.modelVisibleStatus).toBe(specialProjectCreative.visible)
	})

	it('calls createCreative on submit in create mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()
		expect(formCreativeStore.createCreative).toHaveBeenCalledWith(vm.model)
	})

	it('calls updateCreative on submit in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_FULLSCREEN, {
			creative: specialProjectCreative,
		})
		await nextTick()
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}

		await vm.onSubmit()
		expect(formCreativeStore.updateCreative).toHaveBeenCalledWith({
			...vm.model,
			slug: specialProjectCreative.slug,
		})
	})

	it('changes status when visibility changed in edit mode', async () => {
		const { wrapper, campaignsStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_FULLSCREEN, {
			creative: specialProjectCreative,
		})
		await nextTick()
		const vm = wrapper.vm as any
		vm.formRef = {
			validate: vi.fn().mockResolvedValue(true),
		}
		vm.modelVisibleStatus = !specialProjectCreative.visible

		await vm.onSubmit()
		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(
			specialProjectCreative.slug,
			CampaignType.SPECIAL_PROJECT,
			AdEntityType.CREATIVES,
		)
	})

	it('calls deleteAttachment with computed field on file delete in edit mode', async () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_EDIT, AdFormat.SP_CUSTOM, {
			creative: specialProjectCreative,
		})
		await nextTick()
		const vm = wrapper.vm as any

		vm.onFileDelete()

		expect(formCreativeStore.deleteAttachment).toHaveBeenCalledWith({
			field: 'zip',
			slug: specialProjectCreative.slug,
		})
	})

	it('does not call deleteAttachment on file delete in create mode', () => {
		const { wrapper, formCreativeStore } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)
		const vm = wrapper.vm as any

		vm.onFileDelete()
		expect(formCreativeStore.deleteAttachment).not.toHaveBeenCalled()
	})

	it('exposes required methods and state', () => {
		const { wrapper } = factory(RouteName.CREATIVE_CREATE, AdFormat.SP_FULLSCREEN)
		const vm = wrapper.vm as any

		expect(typeof vm.onSubmit).toBe('function')
		expect(vm.closeAndReturnRoute).toBeDefined()
		expect(typeof vm.showCloseDialog).toBe('boolean')
		expect(typeof vm.sending).toBe('boolean')
		expect(typeof vm.success).toBe('boolean')
	})
})
