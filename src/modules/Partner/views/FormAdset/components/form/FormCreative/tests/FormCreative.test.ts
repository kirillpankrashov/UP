import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdFormat, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import FormCreative from '../FormCreative.vue'

const mockFileUploader = {
	name: 'FileUploader',
	template: '<div class="mock-file-uploader"><slot name="drag-n-drop" /></div>',
	props: [
		'options',
		'existingFile',
		'uploadUrl',
		'withExtension',
		'noValidate',
	],
	emits: [
		'file-error',
		'file-delete',
		'file-upload',
		'uploading-start',
		'validate',
	],
}

const mockCreativeVideoIcon = {
	name: 'CreativeVideoIcon',
	template: '<svg class="mock-creative-video-icon"></svg>',
}

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/modules/Partner/views/FormAdset/api')

describe('FormCreative', () => {
	const baseFile = {
		basedir: '/uploads',
		basename: 'test.mp4',
		path: '/uploads/test.mp4',
		size: 12345,
		properties: {
			width: 1920,
			height: 1080,
		},
	}

	// const baseAttachment = {
	// 	basename: 'test.mp4',
	// 	key: 'test-key',
	// 	path: '/uploads/test.mp4',
	// }

	const options = {
		maxSizeMb: 100,
		accept: 'video' as const,
	}

	const factory = (props = {}, modelValue: { unit: string | null } = { unit: null }) => {
		const wrapper = mount(FormCreative, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				stubs: {
					FileUploader: mockFileUploader,
					CreativeVideoIcon: mockCreativeVideoIcon,
				},
			},
			props: {
				file: null,
				options,
				format: AdFormat.FULLSCREEN,
				modelValue,
				...props,
			},
		})

		const formAdsetStore = useFormAdsetStore()

		return { wrapper, formAdsetStore }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('passes correct props to FileUploader', () => {
		const { wrapper } = factory({ file: baseFile })
		const fu = wrapper.findComponent({ name: 'FileUploader' })

		expect(fu.props('options')).toEqual(options)
		expect(fu.props('existingFile')).toBeDefined()
		expect(fu.props('uploadUrl')).toContain('gcp/upload/config')
		expect(fu.props('withExtension')).toBe(true)
		expect(fu.props('noValidate')).toBe(false)
	})

	it('renders drag-n-drop content with correct text', () => {
		const { wrapper } = factory()

		expect(wrapper.text()).toContain('files.instructions.dragVideo')
	})

	it('emits file-delete and resets attachment', async () => {
		const { wrapper } = factory({ file: baseFile }, { unit: 'test.mp4' })

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-delete')
		await nextTick()

		expect(wrapper.emitted('file-delete')).toBeTruthy()
		const vm = wrapper.vm as any
		expect(vm.attachment).toBe(null)
	})

	it('handles file-upload event and updates model/attachment', async () => {
		const { wrapper } = factory()
		const fileAttachment = {
			type: 'unit',
			file: {
				basename: 'uploaded.mp4',
				path: '/uploads/uploaded.mp4',
				key: 'uploaded-key',
			},
		}

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-upload', { attachment: fileAttachment })
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.attachment).toEqual(fileAttachment.file)
		expect(vm.model.unit).toBe('uploaded-key')
	})

	it('handles uploading-start event and sets correct flags', async () => {
		const { wrapper } = factory()

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('uploading-start')
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.isFileUploading).toBe(true)
		expect(vm.isFileError).toBe(false)
	})

	it('handles file-error event and sets correct flags', async () => {
		const { wrapper } = factory()

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-error')
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.isFileError).toBe(true)
		expect(vm.isFileUploading).toBe(false)
	})

	it('initializes model and attachment from file prop', async () => {
		const { wrapper } = factory({ file: baseFile })
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.attachment).toEqual({ basename: 'test.mp4' })
		expect(vm.model.unit).toBe('test.mp4')
	})

	it('updates model and attachment when file prop changes', async () => {
		const { wrapper } = factory({ file: null })

		await wrapper.setProps({ file: baseFile })
		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.attachment).toEqual({ basename: 'test.mp4' })
		expect(vm.model.unit).toBe('test.mp4')
	})

	it('clears model and attachment when file prop set to null', async () => {
		const { wrapper } = factory({ file: baseFile })

		await nextTick()

		const vm = wrapper.vm as any
		expect(vm.model.unit).toBe('test.mp4')

		await wrapper.setProps({ file: null })
		await nextTick()

		expect(vm.attachment).toBe(null)
	})

	describe('attachmentFormat computed', () => {
		it('returns INTERACTIVE format for PERFORMANCE campaign type', async () => {
			const { wrapper, formAdsetStore } = factory()

			formAdsetStore.currentCampaignType = CampaignType.PERFORMANCE
			await nextTick()

			const vm = wrapper.vm as any
			expect(vm.attachmentFormat).toBe(AdFormat.INTERACTIVE)
		})

		it('returns PREROLL format for PREROLL campaign type', async () => {
			const { wrapper, formAdsetStore } = factory()

			formAdsetStore.currentCampaignType = CampaignType.PREROLL
			await nextTick()

			const vm = wrapper.vm as any
			expect(vm.attachmentFormat).toBe(AdFormat.PREROLL)
		})

		it('returns props format for other campaign types', async () => {
			const { wrapper, formAdsetStore } = factory({ format: AdFormat.FULLSCREEN })

			formAdsetStore.currentCampaignType = CampaignType.BRAND_AWARENESS
			await nextTick()

			const vm = wrapper.vm as any
			expect(vm.attachmentFormat).toBe(AdFormat.FULLSCREEN)
		})

		it('returns props format when campaign type is null', async () => {
			const { wrapper, formAdsetStore } = factory({ format: AdFormat.FULLSCREEN })

			formAdsetStore.currentCampaignType = null as any
			await nextTick()

			const vm = wrapper.vm as any
			expect(vm.attachmentFormat).toBe(AdFormat.FULLSCREEN)
		})
	})

	describe('onValidate method', () => {
		it('calls formAdsetStore.verifyAttachment with correct parameters', async () => {
			const { wrapper, formAdsetStore } = factory({ format: AdFormat.FULLSCREEN })

			formAdsetStore.currentCampaignType = CampaignType.BRAND_AWARENESS
			await nextTick()

			await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('validate', 'test-key')

			expect(formAdsetStore.verifyAttachment).toHaveBeenCalledWith({
				format: AdFormat.FULLSCREEN,
				unit: 'test-key',
			})
		})

		it('calls verifyAttachment with INTERACTIVE format for PERFORMANCE campaign', async () => {
			const { wrapper, formAdsetStore } = factory()

			formAdsetStore.currentCampaignType = CampaignType.PERFORMANCE
			await nextTick()

			await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('validate', 'test-key')

			expect(formAdsetStore.verifyAttachment).toHaveBeenCalledWith({
				format: AdFormat.INTERACTIVE,
				unit: 'test-key',
			})
		})
	})

	describe('file upload URL', () => {
		it('generates correct upload URL from environment variable', () => {
			const { wrapper } = factory()
			const vm = wrapper.vm as any

			expect(vm.fileUploadUrl).toContain('gcp/upload/config')
		})
	})

	describe('setInitialModel method', () => {
		it('sets attachment and model when file is provided', async () => {
			const { wrapper } = factory()
			const vm = wrapper.vm as any

			vm.setInitialModel(baseFile)
			await nextTick()

			expect(vm.attachment).toEqual({ basename: 'test.mp4' })
			expect(vm.model.unit).toBe('test.mp4')
		})

		it('clears attachment when file is null', async () => {
			const { wrapper } = factory()
			const vm = wrapper.vm as any

			vm.setInitialModel(null)
			await nextTick()

			expect(vm.attachment).toBe(null)
		})
	})
})
