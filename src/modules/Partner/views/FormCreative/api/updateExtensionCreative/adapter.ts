import type { IQuiz, IQuizResponse } from '@/core/types'

import type {
	IUpdateExtensionCreativeData,
	IUpdateExtensionCreativePayload,
} from './types'

export const dataToPayload = (data: IUpdateExtensionCreativeData): IUpdateExtensionCreativePayload => {
	const quizDataToPayload = (quiz: IQuiz): IQuizResponse => {
		return {
			id: quiz.id,
			provider_id: quiz.providerId,
			quiz_status: quiz.quizStatus,
			welcome_text: quiz.welcomeText,
			welcome_blob: quiz.welcomeBlob,
			welcome_color: quiz.welcomeColor,
			result_text: quiz.resultText,
			result_blob: quiz.resultBlob,
			result_color: quiz.resultColor,
			questions: quiz.questions.map((question) => ({
				id: question.id,
				quiz_id: quiz.id,
				question_text: question.questionText,
				description: question.description,
				question_blob: question.questionBlob,
				question_color: question.questionColor,
				answers: question.answers.map((answer) => ({
					id: answer.id,
					question_id: question.id,
					answer_text: answer.answerText,
					is_correct: answer.isCorrect,
				})),
			})),
			correct_answers_visible: quiz.correctAnswersVisible,
			pagination_enabled: quiz.paginationEnabled,
			results_visible: quiz.resultsVisible,
			styles: quiz.styles,
		}
	}

	return {
		slug: data.slug,
		title: data.title.default,
		product_url: data.productUrl.general,
		mobile_product_url: data.productUrl.mobile,
		pixel_clicks: data.pixelClicks.filter(val => val !== ''),
		pixel_impressions: data.pixelImpressions.filter(val => val !== ''),
		pixel_inspections: data.pixelInspections?.filter(val => val !== '') ?? [],
		pixel_clicks_scripts: data.pixelClicksScripts ?? '',
		script_code: data.scriptCode,
		...(data.preview.indexOf('tmp/') !== -1 ? { preview: data.preview } : {}),
		...(data.quiz ? { quiz: quizDataToPayload(data.quiz) } : {}),
		...(data.panel ? { panel: data.panel } : {}),
		...(data.gallery ? { gallery: data.gallery } : {}),
	}
}
