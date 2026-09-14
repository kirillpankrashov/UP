import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { IQuiz } from '@/core/types'
import * as CoreApi from '@/core/api'
import { Logger } from '@/core/helpers'
import { i18n } from '@/core/i18n'

import FormQuiz from '../FormQuiz.vue'

vi.mock('uuid', () => ({
	v4: vi.fn(() => 'mock-uuid'),
}))
vi.mock('@/core/api')
vi.mock('@/core/helpers')
vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: vi.fn((key) => key),
	}),
}))

const mockDashboardSection = {
	name: 'DashboardSection',
	template: '<div data-test="dashboard-section"><slot /></div>',
	props: ['title'],
}

const mockMiniXButton = {
	name: 'MiniXButton',
	template: '<button data-test="mini-x-button" @click="$emit(\'click\')"><slot /></button>',
	emits: ['click'],
}

const mockElFormItem = {
	name: 'ElFormItem',
	template: '<div data-test="el-form-item"><slot /></div>',
	props: ['label', 'prop', 'class'],
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
		'class',
	],
	emits: ['update:file-list'],
}

const mockElSwitch = {
	name: 'ElSwitch',
	template: '<div data-test="el-switch"></div>',
	props: ['modelValue', 'activeText', 'inactiveText', 'inlinePrompt'],
	emits: ['update:modelValue'],
}

const mockElInput = {
	name: 'ElInput',
	template: '<input data-test="el-input" />',
	props: ['modelValue', 'size', 'placeholder', 'maxlength', 'type', 'rows', 'clearable', 'showWordLimit'],
	emits: ['update:modelValue'],
}

const mockElCheckbox = {
	name: 'ElCheckbox',
	template: '<label data-test="el-checkbox"><slot /></label>',
	props: ['modelValue', 'label', 'size'],
	emits: ['update:modelValue'],
}

const mockElColorPicker = {
	name: 'ElColorPicker',
	template: '<div data-test="el-color-picker"></div>',
	props: ['modelValue'],
	emits: ['update:modelValue'],
}

const mockElButton = {
	name: 'ElButton',
	template: '<button data-test="el-button" @click="$emit(\'click\')"><slot /></button>',
	props: ['type', 'nativeType', 'class'],
	emits: ['click'],
}

const mockElIcon = {
	name: 'ElIcon',
	template: '<i data-test="el-icon"><slot /></i>',
}

describe('FormCreative Extension FormQuiz Component', () => {
	let loggerErrorSpy: ReturnType<typeof vi.spyOn>
	let loggerInfoSpy: ReturnType<typeof vi.spyOn>
	let loggerWarningSpy: ReturnType<typeof vi.spyOn>

	const createQuiz = (overrides: Partial<IQuiz> = {}): IQuiz => ({
		id: 'quiz-1',
		providerId: 'provider-1',
		quizStatus: true,
		welcomeText: '',
		welcomeBlob: '',
		welcomeColor: '#ffffff',
		resultText: '',
		resultBlob: '',
		resultColor: '#000000',
		correctAnswersVisible: true,
		paginationEnabled: false,
		resultsVisible: true,
		styles: '',
		questions: [{
			id: 1,
			quizId: 'quiz-1',
			questionText: 'Q1',
			description: '',
			questionBlob: '',
			questionColor: '#000000',
			answers: [
				{ id: 1, questionId: 1, answerText: 'A1', isCorrect: false },
				{ id: 2, questionId: 1, answerText: 'A2', isCorrect: true },
			],
		}],
		...overrides,
	})

	const factory = (quiz: IQuiz | undefined = createQuiz()) =>
		mount(FormQuiz, {
			global: {
				plugins: [i18n],
				stubs: {
					DashboardSection: mockDashboardSection,
					MiniXButton: mockMiniXButton,
					ElFormItem: mockElFormItem,
					ElUpload: mockElUpload,
					ElSwitch: mockElSwitch,
					ElInput: mockElInput,
					ElCheckbox: mockElCheckbox,
					ElColorPicker: mockElColorPicker,
					ElButton: mockElButton,
					ElIcon: mockElIcon,
					PlusIcon: true,
				},
			},
			props: {
				modelValue: {
					quiz,
				},
			},
		})

	beforeEach(() => {
		vi.clearAllMocks()
		loggerErrorSpy = vi.spyOn(Logger, 'error').mockImplementation(() => undefined as any)
		loggerInfoSpy = vi.spyOn(Logger, 'info').mockImplementation(() => undefined as any)
		loggerWarningSpy = vi.spyOn(Logger, 'warning').mockImplementation(() => undefined as any)
		vi.mocked(CoreApi.getSignedUrl).mockResolvedValue({
			url: 'https://storage.local/extension/quiz/file.png?signature=1',
			key: 'extension/quiz/file.png',
		} as any)
		vi.mocked(CoreApi.uploadFile).mockResolvedValue(undefined as any)
	})

	it('renders quiz blocks and uploads', () => {
		const wrapper = factory()
		const uploads = wrapper.findAllComponents({ name: 'ElUpload' })

		expect(wrapper.findAll('[data-test="dashboard-section"]').length).toBeGreaterThanOrEqual(4)
		expect(uploads).toHaveLength(3) // welcome, first question, result
	})

	// it('rejects non-image files in beforeUpload', () => {
	// 	const wrapper = factory()
	// 	const upload = wrapper.findAllComponents({ name: 'ElUpload' })[0]

	// 	const result = upload.props('beforeUpload')({
	// 		type: 'video/mp4',
	// 		size: 1024,
	// 	})

	// 	expect(result).toBe(false)
	// 	expect(loggerErrorSpy).toHaveBeenCalledWith('Only images can be uploaded')
	// })

	it('uploads welcome blob and updates model', async () => {
		const wrapper = factory()
		const welcomeUpload = wrapper.findAllComponents({ name: 'ElUpload' })[0]

		await welcomeUpload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'welcome.png',
				type: 'image/png',
				size: 1024,
			},
		})
		await nextTick()

		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz
		expect(CoreApi.getSignedUrl).toHaveBeenCalled()
		expect(CoreApi.uploadFile).toHaveBeenCalled()
		expect(quiz?.welcomeBlob).toBe('https://storage.local/extension/quiz/file.png')
		expect(loggerInfoSpy).toHaveBeenCalledWith('Image uploaded successfully!')
	})

	it('uploads question blob and updates target question', async () => {
		const wrapper = factory()
		const questionUpload = wrapper.findAllComponents({ name: 'ElUpload' })[1]

		await questionUpload.props('onChange')({
			status: 'ready',
			raw: {
				name: 'question.png',
				type: 'image/png',
				size: 1024,
			},
		})
		await nextTick()

		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz
		expect(quiz?.questions[0].questionBlob).toBe('https://storage.local/extension/quiz/file.png')
	})

	it('clears blobs on remove handlers', async () => {
		const wrapper = factory(createQuiz({
			welcomeBlob: 'welcome-existing',
			resultBlob: 'result-existing',
			questions: [{
				id: 1,
				quizId: 'quiz-1',
				questionText: 'Q1',
				description: '',
				questionBlob: 'question-existing',
				questionColor: '#000',
				answers: [
					{ id: 1, questionId: 1, answerText: 'A1', isCorrect: false },
					{ id: 2, questionId: 1, answerText: 'A2', isCorrect: true },
				],
			}],
		}))
		const uploads = wrapper.findAllComponents({ name: 'ElUpload' })

		uploads[0].props('onRemove')()
		uploads[1].props('onRemove')()
		uploads[2].props('onRemove')()
		await nextTick()

		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz
		expect(quiz?.welcomeBlob).toBe('')
		expect(quiz?.resultBlob).toBe('')
		expect(quiz?.questions[0].questionBlob).toBe('')
	})

	it('adds question and options with limits', async () => {
		const wrapper = factory()
		const vm = wrapper.vm as any
		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz!

		vm.addQuestion()
		await nextTick()
		expect(quiz.questions.length).toBe(2)
		expect(quiz.questions[1].answers.length).toBe(2)

		vm.addOption(0)
		vm.addOption(0)
		vm.addOption(0) // should warn on max 4
		await nextTick()

		expect(quiz.questions[0].answers.length).toBe(4)
		expect(loggerWarningSpy).toHaveBeenCalledWith('Maximum 4 answer options allowed')
	})

	it('does not remove question below minimum and logs warning', async () => {
		const wrapper = factory()
		const vm = wrapper.vm as any
		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz!

		vm.removeQuestion(0)
		await nextTick()

		expect(quiz.questions.length).toBe(1)
		expect(loggerWarningSpy).toHaveBeenCalledWith('There must be at least one question')
	})

	it('does not remove option below minimum and logs warning', async () => {
		const wrapper = factory()
		const vm = wrapper.vm as any
		const quiz = (wrapper.props('modelValue') as { quiz?: IQuiz }).quiz!

		vm.removeOption(0, 0)
		await nextTick()

		expect(quiz.questions[0].answers.length).toBe(2)
		expect(loggerWarningSpy).toHaveBeenCalledWith('There must be at least 2 answer options')
	})

	it('logs upload errors from onError and upload exception', async () => {
		const wrapper = factory()
		const uploads = wrapper.findAllComponents({ name: 'ElUpload' })
		const uploadError = new Error('upload error')

		uploads[0].props('onError')(uploadError)
		expect(loggerErrorSpy).toHaveBeenCalledWith('Upload error:', false, uploadError)
		expect(loggerErrorSpy).toHaveBeenCalledWith('Image upload error')

		vi.mocked(CoreApi.getSignedUrl).mockRejectedValueOnce(new Error('signed url failed'))
		await uploads[0].props('onChange')({
			status: 'ready',
			raw: {
				name: 'welcome.png',
				type: 'image/png',
				size: 1024,
			},
		})

		expect(loggerErrorSpy).toHaveBeenCalledWith('Upload error:', false, expect.any(Error))
		expect(loggerErrorSpy).toHaveBeenCalledWith('Image upload error')
	})
})
