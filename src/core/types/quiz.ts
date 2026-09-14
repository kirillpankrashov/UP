export interface IAnswerResponse {
	id: number
	question_id: number
	answer_text: string
	is_correct: boolean
}

export interface IQuestionResponse {
	id: number
	quiz_id: string
	question_text: string
	description: string
	question_blob: string
	question_color: string
	answers: Array<IAnswerResponse>
}

export interface IQuizResponse {
	id: string
  provider_id: string
  quiz_status: boolean
  welcome_text: string
  welcome_blob: string
  welcome_color: string
  result_text: string
  result_blob: string
  result_color: string
  questions: Array<IQuestionResponse>
	correct_answers_visible: boolean
	pagination_enabled: boolean
	results_visible: boolean
	styles: string
}

export interface IAnswer {
	id: number
	questionId: number
	answerText: string
	isCorrect: boolean
}

export interface IQuestion {
	id: number
	quizId: string
	questionText: string
	description: string
	questionBlob: string
	questionColor: string
	answers: Array<IAnswer>
}

export interface IQuiz {
  id: string
  providerId: string
  quizStatus: boolean
  welcomeText: string
  welcomeBlob: string
	welcomeColor: string
  resultText: string
  resultBlob: string
	resultColor: string
  questions: Array<IQuestion>
	correctAnswersVisible: boolean
	paginationEnabled: boolean
	resultsVisible: boolean
	styles: string
}
