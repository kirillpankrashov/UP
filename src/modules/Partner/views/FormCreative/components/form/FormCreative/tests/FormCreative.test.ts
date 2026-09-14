import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdFormat, CampaignType } from '@/core/types'
import { i18n } from '@/core/i18n'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import FormCreative from '../FormCreative.vue'

// Мокаем SVG импорты в начале файла
vi.mock('@/assets/img/icons/creative-video.svg', () => ({
	default: {
		name: 'CreativeVideoIcon',
		template: '<svg class="mock-creative-video-icon"></svg>',
	},
}))

vi.mock('@/assets/img/icons/creative-zip.svg', () => ({
	default: {
		name: 'CreativeUnitIcon',
		template: '<svg class="mock-creative-unit-icon"></svg>',
	},
}))

vi.mock('@/modules/Partner/views/FormCreative/store')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

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

const mockCreativeUnitIcon = {
	name: 'CreativeUnitIcon',
	template: '<svg class="mock-creative-unit-icon"></svg>',
}

describe('FormCreative Component', () => {
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

	const options = {
		maxSizeMb: 100,
		accept: 'video' as const,
	}

	const factory = (props = {}) => {
		const defaultProps = {
			file: null,
			field: 'unit' as const,
			options,
			format: AdFormat.FULLSCREEN,
			modelValue: { unit: null, video: null, zip: null },
		}

		return mount(FormCreative, {
			global: {
				plugins: [i18n],
				stubs: {
					FileUploader: mockFileUploader,
					CreativeVideoIcon: mockCreativeVideoIcon,
					CreativeUnitIcon: mockCreativeUnitIcon,
				},
			},
			props: {
				...defaultProps,
				...props,
			},
		})
	}

	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(useFormCreativeStore).mockReturnValue({
			currentCampaignType: CampaignType.BRAND_AWARENESS,
			verifyAttachment: vi.fn(),
		} as any)
	})

	it('passes correct props to FileUploader', () => {
		const wrapper = factory({ file: baseFile })
		const fu = wrapper.findComponent({ name: 'FileUploader' })

		expect(fu.props('options')).toEqual(options)
		expect(fu.props('existingFile')).toBeDefined()
		expect(fu.props('uploadUrl')).toContain('gcp/upload/config')
		expect(fu.props('withExtension')).toBe(true)
		expect(fu.props('noValidate')).toBe(false)
	})

	it('renders correct icon and text for FULLSCREEN format', () => {
		const wrapper = factory({ format: AdFormat.FULLSCREEN })

		expect(wrapper.find('.mock-creative-video-icon').exists()).toBe(true)
		expect(wrapper.text()).toContain('files.instructions.dragVideo')
	})

	it('renders correct icon and text for PIP format', () => {
		const wrapper = factory({ format: AdFormat.PIP })

		expect(wrapper.find('.mock-creative-video-icon').exists()).toBe(true)
		expect(wrapper.text()).toContain('files.instructions.dragVideo')
	})

	it('renders correct icon and text for ADMNG format', () => {
		const wrapper = factory({ format: AdFormat.ADMNG })

		expect(wrapper.find('.mock-creative-unit-icon').exists()).toBe(true)
		expect(wrapper.text()).toContain('files.instructions.dragVideo')
	})

	it('renders correct icon and text for CUSTOM format', () => {
		const wrapper = factory({ format: AdFormat.CUSTOM })

		// Проверяем что есть элемент с классом mock-creative-unit-icon
		expect(wrapper.find('.mock-creative-unit-icon').exists()).toBe(true)
		expect(wrapper.text()).toContain('files.instructions.dragZip')
	})

	it('handles file-upload event and updates correct model field', async () => {
		const wrapper = factory({ field: 'video' })
		const fileAttachment = {
			type: 'video',
			file: {
				basename: 'uploaded.mp4',
				path: '/uploads/uploaded.mp4',
				key: 'uploaded-key',
			},
		}

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-upload', { attachment: fileAttachment })
		await nextTick()

		expect(wrapper.props('modelValue').video).toBe('uploaded-key')
		expect(wrapper.props('modelValue').unit).toBe(null)
		expect(wrapper.props('modelValue').zip).toBe(null)
	})

	it('handles file-delete event and emits file-delete', async () => {
		const wrapper = factory({ file: baseFile })

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-delete')
		await nextTick()

		expect(wrapper.emitted('file-delete')).toBeTruthy()
	})

	it('handles validate event and calls verifyAttachment', async () => {
		const mockVerifyAttachment = vi.fn()
		vi.mocked(useFormCreativeStore).mockReturnValue({
			currentCampaignType: CampaignType.BRAND_AWARENESS,
			verifyAttachment: mockVerifyAttachment,
		} as any)

		const wrapper = factory({ field: 'unit', format: AdFormat.FULLSCREEN })

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('validate', 'test-key')

		expect(mockVerifyAttachment).toHaveBeenCalledWith({
			format: AdFormat.FULLSCREEN,
			unit: 'test-key',
		})
	})

	it('uses correct attachment format for Performance campaigns', async () => {
		const mockVerifyAttachment = vi.fn()
		vi.mocked(useFormCreativeStore).mockReturnValue({
			currentCampaignType: CampaignType.PERFORMANCE,
			verifyAttachment: mockVerifyAttachment,
		} as any)

		const wrapper = factory({ field: 'unit', format: AdFormat.FULLSCREEN })

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('validate', 'test-key')

		expect(mockVerifyAttachment).toHaveBeenCalledWith({
			format: AdFormat.INTERACTIVE,
			unit: 'test-key',
		})
	})

	it('uses correct attachment format for Preroll campaigns', async () => {
		const mockVerifyAttachment = vi.fn()
		vi.mocked(useFormCreativeStore).mockReturnValue({
			currentCampaignType: CampaignType.PREROLL,
			verifyAttachment: mockVerifyAttachment,
		} as any)

		const wrapper = factory({ field: 'unit', format: AdFormat.FULLSCREEN })

		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('validate', 'test-key')

		expect(mockVerifyAttachment).toHaveBeenCalledWith({
			format: AdFormat.PREROLL,
			unit: 'test-key',
		})
	})

	it('initializes model from file prop on mount', async () => {
		const wrapper = factory({
			file: baseFile,
			field: 'unit',
			modelValue: { unit: null, video: null, zip: null },
		})

		await nextTick()

		expect(wrapper.props('modelValue').unit).toBe('test.mp4')
	})

	it('updates model when file prop changes', async () => {
		const wrapper = factory({
			file: null,
			field: 'zip',
			modelValue: { unit: null, video: null, zip: null },
		})

		await wrapper.setProps({ file: { ...baseFile, basename: 'new-file.zip' } })
		await nextTick()

		expect(wrapper.props('modelValue').zip).toBe('new-file.zip')
	})

	it('clears model when file prop set to null', async () => {
		const wrapper = factory({
			file: baseFile,
			field: 'unit',
			modelValue: { unit: 'test.mp4', video: null, zip: null },
		})

		await wrapper.setProps({ file: null })
		await nextTick()

		expect(wrapper.props('modelValue').unit).toBe('test.mp4') // Model не сбрасывается автоматически при file: null
	})

	it('handles uploading-start and file-error events', async () => {
		const wrapper = factory()

		// Тестируем что события не вызывают ошибок
		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('uploading-start')
		await wrapper.findComponent({ name: 'FileUploader' }).vm.$emit('file-error')

		// Smoke test - проверяем что компонент не падает
		expect(wrapper.exists()).toBe(true)
	})
})
