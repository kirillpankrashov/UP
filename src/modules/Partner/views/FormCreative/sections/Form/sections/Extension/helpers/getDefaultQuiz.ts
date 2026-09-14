import { v4 as uuidv4 } from 'uuid'

const DEFAULT_COLOR = '#9FB3DF'

export const generateDefaultStyles = () => {
	return `/* When creating your own styles, it's important to override text colors and use '_campaign' selector before each selector. Don't forget to cleanup after you finished and compress styles for better performance. */

/* Main wrapper */
._campaign .wrapper {}

/* Screen base styles */
._campaign .screen {}

._campaign .screen-title {}

._campaign .btn {}

._campaign .btn:disabled {}

._campaign .btn:not(:disabled):hover {}

/* Welcome screen */
._campaign .welcome-screen {}

._campaign .welcome-title {}

._campaign .welcome-btn {}

._campaign .welcome-btn._plain {}

._campaign .btn.welcome-btn:not(._plain) {}

._campaign .btn.welcome-btn:not(._plain):not(:disabled):hover {}

._campaign .btn.welcome-btn._plain {}

._campaign .btn.welcome-btn._plain:not(:disabled):hover {}

/* Question screen */
._campaign .question-screen {}

._campaign .question-title {}

._campaign .question-explanation {}

._campaign .question-btn {}

._campaign .question-btn._plain {}

._campaign .question-btn._next {}

._campaign .question-btn._finish {}

._campaign .btn.question-btn:not(._plain) {}

._campaign .btn.question-btn:not(._plain):not(:disabled):hover {}

._campaign .btn.question-btn._plain {}

._campaign .btn.question-btn._plain:not(:disabled):hover {}

._campaign .btn-text._next {}

._campaign .btn-text._answer {}

._campaign .btn-text._finish {}

/* Pagination */
._campaign .pagination {}

._campaign .pagination-section {}

._campaign .pagination-section._current {}

._campaign .pagination-text {}

/* Options list */
._campaign .options {}

._campaign .options li {}

/* Result screen */
._campaign .result-screen {}

._campaign .result-score {}

._campaign .result-text {}

/* Product link */
._campaign .product-link {}
`
}

export const getNumericId = (): number => {
	return Math.floor(Math.random() * 900000000)
}

export const getDefaultQuiz = () => {
	const quizId = uuidv4()
	const questionId = getNumericId()
	const answerId = getNumericId()

	return {
		id: quizId,
		providerId: '',
		quizStatus: true,
		welcomeText: '',
		welcomeBlob: '',
		welcomeColor: DEFAULT_COLOR,
		resultText: '',
		resultBlob: '',
		resultColor: DEFAULT_COLOR,
		questions: [
			{
				id: questionId,
				quizId,
				questionText: '',
				description: '',
				questionBlob: '',
				questionColor: DEFAULT_COLOR,
				answers: [
					{
						id: answerId,
						questionId,
						answerText: '',
						isCorrect: false,
					},
				],
			},
		],
		correctAnswersVisible: true,
		paginationEnabled: true,
		resultsVisible: true,
		styles: generateDefaultStyles(),
	}
}
