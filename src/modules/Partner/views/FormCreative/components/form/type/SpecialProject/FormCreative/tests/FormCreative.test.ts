import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdFormat } from '@/core/types'
import * as CoreApi from '@/core/api'
import { Logger } from '@/core/helpers'
import { i18n } from '@/core/i18n'

import FormCreative from '../FormCreative.vue'

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

describe('FormCreative SpecialProject FormCreative Component', () => {
	let loggerErrorSpy: ReturnType<typeof vi.spyOn>
	let loggerInfoSpy: ReturnType<typeof vi.spyOn>

	const factory = (
		modelValue: { video?: string | null, zip?: string | null } = { video: null, zip: null },
		format = AdFormat.SP_FULLSCREEN,
		maxSizeMb = 10,
	) => mount(FormCreative, {
		global: {
			plugins: [i18n],
			stubs: {
				ElFormItem: mockElFormItem,
				ElUpload: mockElUpload,
				ElButton: mockElButton,
			},
		},
		props: {
			modelValue,
			format,
			maxSizeMb,
		},
	})

	beforeEach(() => {
		vi.clearAllMocks()
		loggerErrorSpy = vi.spyOn(Logger, 'error').mockImplementation(() => undefined as any)
		loggerInfoSpy = vi.spyOn(Logger, 'info').mockImplementation(() => undefined as any)
		vi.mocked(CoreApi.getSignedUrl).mockResolvedValue({
			url: 'https://storage.local/file.mp4?signature=123',
			key: 'creative/special/file.mp4',
		} as any)
		vi.mocked(CoreApi.uploadFile).mockResolvedValue(undefined as any)
	})

	it('renders video mode config for non custom format', () => {
		const wrapper = factory({ video: null, zip: null }, AdFormat.SP_FULLSCREEN)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		expect(upload.props('accept')).toBe('.mp4, .webm, .jpg, .jpeg, .png, .gif, .webp')
		expect(wrapper.find('[data-test="el-form-item"]').exists()).toBe(true)
	})

	it('renders zip mode config for sp_custom format', () => {
		const wrapper = factory({ video: null, zip: null }, AdFormat.SP_CUSTOM)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		expect(upload.props('accept')).toBe('.zip')
	})

	it('uploads file and writes key to active video field', async () => {
		const wrapper = factory({ video: '', zip: null }, AdFormat.SP_FULLSCREEN)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'creative.mp4',
				type: 'video/mp4',
				size: 1024,
			},
		})
		await nextTick()

		const modelValue = wrapper.props('modelValue') as { video?: string | null, zip?: string | null }
		expect(CoreApi.getSignedUrl).toHaveBeenCalled()
		expect(CoreApi.uploadFile).toHaveBeenCalled()
		expect(modelValue.video).toBe('creative/special/file.mp4')
		expect(loggerInfoSpy).toHaveBeenCalledWith('File uploaded successfully!')
	})

	it('uploads file and writes key to active zip field', async () => {
		const wrapper = factory({ video: null, zip: '' }, AdFormat.SP_CUSTOM)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'creative.zip',
				type: 'application/zip',
				size: 1024,
			},
		})
		await nextTick()

		const modelValue = wrapper.props('modelValue') as { video?: string | null, zip?: string | null }
		expect(modelValue.zip).toBe('creative/special/file.mp4')
	})

	it('does not upload when file exceeds maxSizeMb', async () => {
		const wrapper = factory({ video: '', zip: null }, AdFormat.SP_FULLSCREEN, 1)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'big.mp4',
				type: 'video/mp4',
				size: 2 * 1024 * 1024,
			},
		})

		expect(CoreApi.getSignedUrl).not.toHaveBeenCalled()
		expect(CoreApi.uploadFile).not.toHaveBeenCalled()
		expect(loggerErrorSpy).toHaveBeenCalledWith('File size must be less than 1MB')
	})

	it('clears active field and emits file-delete on remove', async () => {
		const wrapper = factory({ video: 'creative/special/file.mp4', zip: null }, AdFormat.SP_FULLSCREEN)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		upload.props('onRemove')()
		await nextTick()

		const modelValue = wrapper.props('modelValue') as { video?: string | null, zip?: string | null }
		expect(modelValue.video).toBe(null)
		expect(wrapper.emitted('file-delete')).toBeTruthy()
	})

	it('does not emit file-delete when active field is empty', async () => {
		const wrapper = factory({ video: null, zip: null }, AdFormat.SP_FULLSCREEN)
		const upload = wrapper.findComponent({ name: 'ElUpload' })

		upload.props('onRemove')()
		await nextTick()

		expect(wrapper.emitted('file-delete')).toBeFalsy()
	})

	it('restores preview file list from existing attachment and on model update', async () => {
		const wrapper = factory({ video: 'https://cdn/existing.mp4', zip: null }, AdFormat.SP_FULLSCREEN)
		await nextTick()

		let upload = wrapper.findComponent({ name: 'ElUpload' })
		let fileList = upload.props('fileList')
		expect(fileList).toHaveLength(1)
		expect(fileList[0].url).toBe('https://cdn/existing.mp4')

		await wrapper.setProps({
			modelValue: { video: 'https://cdn/new.mp4', zip: null },
		})
		await nextTick()

		upload = wrapper.findComponent({ name: 'ElUpload' })
		fileList = upload.props('fileList')
		expect(fileList).toHaveLength(1)
		expect(fileList[0].url).toBe('https://cdn/new.mp4')
	})

	it('logs upload errors from onError and failed upload', async () => {
		const wrapper = factory({ video: '', zip: null }, AdFormat.SP_FULLSCREEN)
		const upload = wrapper.findComponent({ name: 'ElUpload' })
		const error = new Error('upload fail')

		upload.props('onError')(error)
		expect(loggerErrorSpy).toHaveBeenCalledWith('Upload error:', false, error)

		vi.mocked(CoreApi.getSignedUrl).mockRejectedValueOnce(new Error('signed url failed'))
		await upload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'creative.mp4',
				type: 'video/mp4',
				size: 1024,
			},
		})

		expect(loggerErrorSpy).toHaveBeenCalledWith('Upload error:', false, expect.any(Error))
	})
})
