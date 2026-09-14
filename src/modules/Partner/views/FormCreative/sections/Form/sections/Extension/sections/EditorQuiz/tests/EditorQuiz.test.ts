import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { getDefaultQuiz } from '@/modules/Partner/views/FormCreative/sections/Form/sections/Extension/helpers'

import EditorQuiz from '../EditorQuiz.vue'

vi.mock('vue-codemirror', () => ({
	Codemirror: {
		name: 'Codemirror',
		template: '<div data-test="codemirror"></div>',
		props: ['modelValue', 'extensions'],
		emits: ['update:modelValue'],
	},
}))

vi.mock('@codemirror/lang-css', () => ({
	css: vi.fn(() => []),
}))

const mockQuizInstance = {
	name: 'QuizInstance',
	template: '<div data-test="quiz-instance"></div>',
	props: ['quiz'],
}

describe('FormCreative Extension EditorQuiz Component', () => {
	const factory = (quiz: any) =>
		mount(EditorQuiz, {
			global: {
				stubs: {
					QuizInstance: mockQuizInstance,
				},
			},
			props: {
				modelValue: {
					quiz,
				},
			},
		})

	it('renders nothing when quiz is undefined', () => {
		const wrapper = factory(undefined)

		expect(wrapper.html()).toBe('<!--v-if-->')
		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="quiz-instance"]').exists()).toBe(false)
	})

	it('renders codemirror and quiz instance when quiz exists', () => {
		const quiz = {
			id: 'quiz-1',
			styles: '.quiz { color: red; }',
			questions: [],
		}
		const wrapper = factory(quiz)

		expect(wrapper.find('[data-test="codemirror"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="quiz-instance"]').exists()).toBe(true)
	})

	it('passes quiz.styles into codemirror modelValue', () => {
		const quiz = {
			id: 'quiz-1',
			styles: '.quiz { color: blue; }',
			questions: [],
		}
		const wrapper = factory(quiz)
		const codemirror = wrapper.findComponent({ name: 'Codemirror' })

		expect(codemirror.props('modelValue')).toBe('.quiz { color: blue; }')
		expect(codemirror.props('extensions')).toHaveLength(1)
	})

	it('passes full quiz object to quiz instance', () => {
		const quiz = {
			id: 'quiz-1',
			styles: '.quiz { color: green; }',
			welcomeText: 'Welcome',
			resultText: 'Result',
			questions: [
				{ id: 'q1', questionText: 'Question 1', answers: [] },
			],
		}
		const wrapper = factory(quiz)
		const quizInstance = wrapper.findComponent({ name: 'QuizInstance' })

		expect(quizInstance.props('quiz')).toEqual(quiz)
	})

	it('updates codemirror value when quiz styles change', async () => {
		const wrapper = factory({
			id: 'quiz-1',
			styles: '.quiz { color: black; }',
			questions: [],
		})

		await wrapper.setProps({
			modelValue: {
				quiz: {
					...getDefaultQuiz(),
					id: 'quiz-1',
					styles: '.quiz { color: white; }',
					questions: [],
				},
			},
		})
		await nextTick()

		const codemirror = wrapper.findComponent({ name: 'Codemirror' })
		expect(codemirror.props('modelValue')).toBe('.quiz { color: white; }')
	})
})
