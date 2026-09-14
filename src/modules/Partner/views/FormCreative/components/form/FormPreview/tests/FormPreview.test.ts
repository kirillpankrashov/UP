import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as CoreApi from '@/core/api'
import { Logger } from '@/core/helpers'
import { i18n } from '@/core/i18n'

import FormPreview from '../FormPreview.vue'

vi.mock('@/core/api')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot /></div>',
	props: ['label', 'prop'],
}

const mockElButton = {
	name: 'ElButton',
	template: '<button data-test="el-button"><slot /></button>',
	props: ['type', 'nativeType'],
}

const mockElUpload = {
	name: 'ElUpload',
	template: '<div data-test="el-upload"><slot /></div>',
	props: [
		'fileList',
		'autoUpload',
		'showFileList',
		'limit',
		'onChange',
		'onError',
		'beforeUpload',
		'onRemove',
		'listType',
		'accept',
	],
	emits: ['update:file-list'],
}

describe('FormCreative FormPreview Component', () => {
	let loggerErrorSpy: ReturnType<typeof vi.spyOn>
	let loggerInfoSpy: ReturnType<typeof vi.spyOn>

	const factory = (preview: string | null = null) => {
		const wrapper = mount(FormPreview, {
			global: {
				plugins: [i18n],
				stubs: {
					ElFormItem: mockElFormItem,
					ElUpload: mockElUpload,
					ElButton: mockElButton,
				},
			},
			props: {
				modelValue: {
					preview,
				},
			},
		})

		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
		loggerErrorSpy = vi.spyOn(Logger, 'error').mockImplementation(() => undefined as any)
		loggerInfoSpy = vi.spyOn(Logger, 'info').mockImplementation(() => undefined as any)
		vi.mocked(CoreApi.getSignedUrl).mockResolvedValue({
			url: 'https://storage.local/file.png?signature=123',
			key: 'creative/preview/file.png',
		} as any)
		vi.mocked(CoreApi.uploadFile).mockResolvedValue(undefined as any)
	})

	it('renders upload with expected config', () => {
		const { wrapper } = factory()
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		expect(upload.exists()).toBe(true)
		expect(upload.props('limit')).toBe(1)
		expect(upload.props('accept')).toBe('.mp4, .webm')
		expect(upload.props('autoUpload')).toBe(false)
	})

	it('rejects non-image files in beforeUpload', () => {
		const { wrapper } = factory()
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		const result = upload.props('beforeUpload')({
			type: 'video/mp4',
			size: 100,
		})

		expect(result).toBe(false)
		expect(loggerErrorSpy).toHaveBeenCalledWith('Only images can be uploaded')
	})

	it('rejects files larger than 2MB in beforeUpload', () => {
		const { wrapper } = factory()
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		const result = upload.props('beforeUpload')({
			type: 'image/png',
			size: 3 * 1024 * 1024,
		})

		expect(result).toBe(false)
		expect(loggerErrorSpy).toHaveBeenCalledWith('File size must be less than 2MB')
	})

	it('uploads valid file and updates model.preview', async () => {
		const { wrapper } = factory('')
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'preview.png',
				type: 'image/png',
				size: 1024,
			},
		})
		await nextTick()

		expect(CoreApi.getSignedUrl).toHaveBeenCalled()
		expect(CoreApi.uploadFile).toHaveBeenCalled()
		expect((wrapper.props('modelValue') as { preview: string | null }).preview).toBe('creative/preview/file.png')
		expect(loggerInfoSpy).toHaveBeenCalledWith('Image uploaded successfully!')
	})

	it('does not upload oversized file in onChange handler', async () => {
		const { wrapper } = factory('')
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'too-big.png',
				type: 'image/png',
				size: 3 * 1024 * 1024,
			},
		})

		expect(CoreApi.getSignedUrl).not.toHaveBeenCalled()
		expect(CoreApi.uploadFile).not.toHaveBeenCalled()
		expect(loggerErrorSpy).toHaveBeenCalledWith('File size must be less than 2MB')
	})

	it('clears model.preview on remove when preview exists', async () => {
		const { wrapper } = factory('creative/preview/file.png')
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		upload.props('onRemove')()
		await nextTick()

		expect((wrapper.props('modelValue') as { preview: string | null }).preview).toBe(null)
	})

	it('logs upload errors in onError handler', () => {
		const { wrapper } = factory()
		const upload = wrapper.findComponent({ name: 'ElUpload' })
		const error = new Error('failed')

		upload.props('onError')(error)

		expect(loggerErrorSpy).toHaveBeenCalledWith('Upload error:', false, error)
		expect(loggerErrorSpy).toHaveBeenCalledWith('Image upload error')
	})
})
