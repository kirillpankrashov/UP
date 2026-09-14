<template>
  <div class="quiz-preview _campaign">
    <div v-html="styleTag" />
    <div
      class="wrapper"
    >
      <div
        v-if="quizStore.screen === QuizScreen.Welcome && welcomeVisible"
        class="screen welcome-screen"
        :style="{ borderColor: quiz.welcomeColor}"
      >
        <div class="screen-background">
          <ImageOrVideo :src="quiz.welcomeBlob" />
        </div>

        <h2
          class="screen-title welcome-title"
          :style="{ color: quiz.welcomeColor }"
        >
          <span>{{ quiz.welcomeText }}</span>
        </h2>

        <button
          type="button"
          class="btn welcome-btn"
          :style="{ '--el-welcome-btn-color': quiz.welcomeColor }"
          @click="handleStartQuiz"
          :class="{ '_plain': true }"
        >
          <span>Start</span>
        </button>
      </div>

      <div
        v-else-if="quizStore.screen === QuizScreen.Question"
        class="screen question-screen"
        :style="{ borderColor: quiz.questions?.[quizStore.currentIndex]?.questionColor}"
      >
        <div class="screen-background">
          <ImageOrVideo :src="quiz.questions?.[quizStore.currentIndex]?.questionBlob" />
        </div>

        <div
          v-if="quiz.paginationEnabled"
          data-name="pagination"
          class="pagination"
        >
          <span
            v-for="(_, idx) in quiz.questions"
            :key="idx"
            :class="{
              'pagination-section': true,
              '_current': idx === quizStore.currentIndex,
            }"
            :style="{
              borderColor: quiz.questions?.[quizStore.currentIndex]?.questionColor,
              backgroundColor: quizStore.currentIndex > idx ? quiz.questions?.[quizStore.currentIndex]?.questionColor : 'transparent'
            }"
          />
          <span class="pagination-text">
            {{ quizStore.currentIndex + 1 }} / {{ quiz.questions?.length || 0 }}
          </span>
        </div>

        <div
          data-name="question"
          class="screen-title question-title"
          :style="{ color: quiz.questions?.[quizStore.currentIndex]?.questionColor }"
        >
          <span>{{ quizStore.currentQuestion?.questionText }}</span>
        </div>
        <div
          v-if="quizStore.answered && quizStore.currentQuestion?.description"
          data-name="explanation"
          class="screen-title question-explanation"
          :style="{ color: quiz.questions?.[quizStore.currentIndex]?.questionColor }"
        >
          <span>{{ quizStore.currentQuestion.description }}</span>
        </div>

        <ul
          data-name="options"
          class="options"
        >
          <li
            v-for="(answer, idx) in quizStore.currentQuestion?.answers"
            :key="idx"
          >
            <button
              type="button"
              class="btn question-btn"
              :style="{ '--el-question-btn-color': optionClass(idx).color }"
              @click="handleSelectOption(idx)"
              :class="{ '_plain': optionClass(idx).plain }"
            >
              <span>{{ answer.answerText }}</span>
            </button>
          </li>
        </ul>

        <template v-if="quizHasQuestionsWithMultipleAnswers">
          <button
            v-if="quizStore.currentIndex < (quiz.questions?.length || 0) - 1"
            type="button"
            :disabled="!selectedAny || quizStore.answered && !canGoNext"
            class="btn question-btn _next _plain"
            :style="{ '--el-question-btn-color': quiz.questions?.[quizStore.currentIndex]?.questionColor }"
            @click="handleNext"
          >
            <span
              v-if="quizStore.answered"
              class="btn-text _next"
            >Next</span>
            <span
              v-else
              class="btn-text _answer"
            >Answer</span>
          </button>

          <button
            v-else
            type="button"
            :disabled="!selectedAny || quizStore.answered && !canGoNext"
            class="btn question-btn _finish _plain"
            :style="{ '--el-question-btn-color': quiz.questions?.[quizStore.currentIndex]?.questionColor }"
            @click="handleNext"
          >
            <span
              v-if="quizStore.answered"
              class="btn-text _finish"
            >Finish</span>
            <span
              v-else
              class="btn-text _answer"
            >Answer</span>
          </button>
        </template>
      </div>

      <div
        v-else-if="quizStore.screen === QuizScreen.Result"
        class="screen result-screen"
        :style="{ borderColor: quiz.resultColor }"
      >
        <div class="screen-background">
          <ImageOrVideo :src="quiz.resultBlob" />
        </div>

        <div
          v-if="quiz.resultsVisible"
          class="screen-title result-score"
          :style="{ color: quiz.resultColor }"
        >
          {{ quizStore.correctCount }} / {{ quiz.questions?.length || 0 }}
        </div>
        <a
          href="#"
          target="_blank"
          class="screen-title result-text"
          :style="{ color: quiz.resultColor }"
        >
          <span>{{ quiz.resultText }}</span>
        </a>
      </div>
    </div>

    <div
      v-if="!hideNavigation"
      class="preview-controls"
    >
      <button
        v-if="welcomeVisible"
        type="button"
        class="control-btn"
        :class="{ '_active': quizStore.screen === QuizScreen.Welcome }"
        @click="quizStore.setScreen(QuizScreen.Welcome)"
      >
        Welcome
      </button>
      <button
        type="button"
        class="control-btn"
        :class="{ '_active': quizStore.screen === QuizScreen.Question }"
        @click="quizStore.setScreen(QuizScreen.Question)"
      >
        Question
      </button>
      <button
        type="button"
        class="control-btn"
        :class="{ '_active': quizStore.screen === QuizScreen.Result }"
        @click="quizStore.setScreen(QuizScreen.Result)"
      >
        Result
      </button>
    </div>

    <div
      v-if="quizStore.screen === QuizScreen.Question && !hideNavigation"
      class="question-navigation"
    >
      <button
        type="button"
        class="nav-btn"
        :disabled="quizStore.currentIndex === 0"
        @click="quizStore.setCurrentIndex(Math.max(0, quizStore.currentIndex - 1))"
      >
        ←
      </button>
      <span class="nav-text">{{ quizStore.currentIndex + 1 }} / {{ quiz.questions?.length || 0 }}</span>
      <button
        type="button"
        class="nav-btn"
        :disabled="quizStore.currentIndex >= (quiz.questions?.length || 0) - 1"
        @click="quizStore.setCurrentIndex(Math.min((quiz.questions?.length || 0) - 1, quizStore.currentIndex + 1))"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { watch } from 'vue'

import type { IQuiz } from '@/core/types'
import { ImageOrVideo } from '@/components'

import { ERROR_COLOR, SUCCESS_COLOR } from './const'
import { useQuizStore } from './store'
import { QuizScreen } from './types'

const props = defineProps<{
	quiz: IQuiz
	hideNavigation?: boolean
}>()

const quizStore = useQuizStore()

const welcomeVisible = computed(() => quizStore.quiz?.welcomeBlob || quizStore.quiz?.welcomeText)

const quizHasQuestionsWithMultipleAnswers = computed(() => {
	return quizStore.quiz?.questions.some(question => question.answers.filter(answer => answer.isCorrect).length > 1)
})

const styleTag = computed(() => {
	if (!props.quiz.styles) return ''
	return `<style>${props.quiz.styles}</style>`
})

const selectedAny = computed(() => {
	const sel = quizStore.selected[quizStore.currentIndex] || []
	return sel.length > 0
})

const canGoNext = computed(() => quizStore.answered)

function handleSelectOption(idx: number) {
	if (quizStore.answered) return
	quizStore.selectOption(idx)

	if (!quizHasQuestionsWithMultipleAnswers.value) {
		handleNext()
	}
}

function handleStartQuiz() {
	quizStore.startQuiz()
}

function optionClass(idx: number) {
	const selectedData = quizStore.selected[quizStore.currentIndex] || []
	const currentColor = props.quiz.questions?.[quizStore.currentIndex]?.questionColor

	if (!quizStore.answered) {
		if (selectedData.includes(idx)) return { color: currentColor, plain: false }

		return{ color: currentColor, plain: true }
	}

	const isCorrect = quizStore.currentQuestion?.answers?.[idx]?.isCorrect || false
	const isSelected = selectedData.includes(idx)

	if (props.quiz.correctAnswersVisible) {
		return {
			color: isCorrect ? SUCCESS_COLOR : ERROR_COLOR,
			plain: !isSelected,
		}
	}

	return {
		color: currentColor,
		plain: !isSelected,
	}
}

function handleNext() {
	if (quizHasQuestionsWithMultipleAnswers.value) {
		if (!quizStore.answered) {
			quizStore.checkAnswer()
		}
		else {
			quizStore.nextQuestion()
		}
	}
	else {
		quizStore.checkAnswer()
		if (quizStore.quiz?.questions?.[quizStore.currentIndex].description) {
			setTimeout(quizStore.nextQuestion, 1000)
		}
		else {
			quizStore.nextQuestion()
		}
	}
}

watch(() => props.quiz, (newQuiz) => {
	if (newQuiz) {
		quizStore.setQuiz(newQuiz)
	}
}, { immediate: true })
</script>

<style>
.quiz-preview {
	/* transform: scale(0.95);
	transform-origin: right top; */
}

.wrapper {
	position: relative;
	display: flex;
	width: 310px;
	height: 550px;
	flex-shrink: 0;
	flex-direction: column;
  overflow: hidden;
}

.wrapper:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ext-white-color);
  z-index: -1;
}

.screen {
  position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	padding: 32px 20px;
	border-width: 2px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.screen-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.screen-title {
	margin-bottom: 16px;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
}

.pagination {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 20;
	margin-bottom: 24px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 8px;
	padding: 32px 16px;
}

.pagination-text {
	display: none;
}

.pagination-section {
	display: inline-block;
	width: 100%;
	height: 6px;
	border: 2px solid;
	opacity: 0.7;
}

.options {
	width: 100%;
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.product-link {
	margin-top: 16px;
	font-size: 12px;
	font-weight: bold;
	text-decoration: underline;
	cursor: pointer;
	color: var(--el-result-color);
}

.btn {
	width: 100%;
	font-size: 12px;
	font-weight: bold;
	cursor: pointer;
	border-radius: 4px;
	padding: 12px 24px;
	border: 2px solid var(--ext-white-color);
	transition: all 0.3s ease;
	color: var(--ext-white-color);
}

.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.btn:not(:disabled):hover {
	background-color: var(--ext-white-color);
	color: var(--ext-black-color);
}

.btn.welcome-btn:not(._plain) {
	border-color: var(--el-welcome-btn-color);
	background-color: var(--el-welcome-btn-color);
	color: var(--ext-white-color);
}

.btn.welcome-btn:not(._plain):not(:disabled):hover {
	filter: brightness(1.2);
}

.btn.welcome-btn._plain {
	border-color: var(--el-welcome-btn-color);
	background-color: transparent;
	color: var(--el-welcome-btn-color);
}

.btn.welcome-btn._plain:not(:disabled):hover {
	background-color: var(--el-welcome-btn-color);
	color: var(--ext-white-color);
}

.btn.question-btn:not(._plain) {
	border-color: var(--el-question-btn-color);
	background-color: var(--el-question-btn-color);
	color: var(--ext-white-color);
}

.btn.question-btn:not(._plain):not(:disabled):hover {
	filter: brightness(1.2);
}

.btn.question-btn._plain {
	border-color: var(--el-question-btn-color);
	background-color: transparent;
	color: var(--el-question-btn-color);
}

.btn.question-btn._plain:not(:disabled):hover {
	background-color: var(--el-question-btn-color);
	color: var(--ext-white-color);
}

.preview-controls {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.control-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #f0f0f0;
}

.control-btn._active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.question-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.nav-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-text {
  font-size: 12px;
  color: #666;
  min-width: 40px;
  text-align: center;
}
</style>
