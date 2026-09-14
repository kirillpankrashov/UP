import { defineStore } from 'pinia'

import type { IQuiz } from '@/core/types'

import { QuizScreen } from '../types'

interface QuizState {
	screen: QuizScreen
	currentIndex: number
	selected: Record<number, number[]>
	answered: boolean
	correctCount: number
	quiz: IQuiz | null
}

export const useQuizStore = defineStore('quiz', {
	state: (): QuizState => ({
		screen: QuizScreen.Welcome,
		currentIndex: 0,
		selected: {},
		answered: false,
		correctCount: 0,
		quiz: null,
	}),

	getters: {
		currentQuestion: (state) => state.quiz?.questions?.[state.currentIndex],
		questionsCount: (state) => state.quiz?.questions?.length || 0,
		hasQuestions: (state) => (state.quiz?.questions?.length || 0) > 0,
		isLastQuestion: (state) => state.currentIndex >= (state.quiz?.questions?.length || 0) - 1,
	},

	actions: {
		setQuiz(quiz: IQuiz) {
			this.quiz = quiz
			this.resetQuiz()
		},

		selectOption(idx: number) {
			if (this.answered) return

			const currentSelected = this.selected[this.currentIndex] || []

			// Если это множественный выбор (пока что делаем как одиночный)
			if (currentSelected.includes(idx)) {
				this.selected[this.currentIndex] = currentSelected.filter(i => i !== idx)
			}
			else {
				this.selected[this.currentIndex] = [...currentSelected, idx]
			}
		},

		checkAnswer() {
			if (this.answered) return

			this.answered = true

			// Подсчитываем правильные ответы
			const currentSelected = this.selected[this.currentIndex] || []
			const correctAnswers = this.currentQuestion?.answers
				?.map((answer, idx) => ({ idx, isCorrect: answer.isCorrect }))
				?.filter(item => item.isCorrect)
				?.map(item => item.idx) || []

			const isCorrect = currentSelected.length === correctAnswers.length &&
				currentSelected.every(idx => correctAnswers.includes(idx))

			if (isCorrect) {
				this.correctCount++
			}
		},

		nextQuestion() {
			if (this.currentIndex < (this.quiz?.questions?.length || 0) - 1) {
				this.currentIndex++
				this.answered = false
			}
			else {
				this.screen = QuizScreen.Result
			}
		},

		startQuiz() {
			this.screen = QuizScreen.Question
			this.currentIndex = 0
			this.selected = {}
			this.answered = false
			this.correctCount = 0
		},

		resetQuiz() {
			if (this.quiz?.welcomeBlob || this.quiz?.welcomeText) {
				this.screen = QuizScreen.Welcome
			}
			else {
				this.screen = QuizScreen.Question
			}
			this.currentIndex = 0
			this.selected = {}
			this.answered = false
			this.correctCount = 0
		},

		setScreen(screen: QuizScreen) {
			this.screen = screen
		},

		setCurrentIndex(index: number) {
			this.currentIndex = index
		},
	},
})
