import type { IQuiz, IQuizResponse } from '@/core/types'
import { CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { getNumericId } from '@/modules/Partner/views/FormCreative/sections/Form/sections/Extension/helpers/getDefaultQuiz'

import type {
	IExtensionCreative,
	IExtensionCreativeResponse,
} from './types'

export const responseToData = (response: IExtensionCreativeResponse): IExtensionCreative => {
	const quizResponseToObject = (quizResponse: IQuizResponse): IQuiz | undefined => {
		const getNormalizedId = (id: string | number): number => {
			return typeof id === 'string' ? getNumericId() : id
		}

		try {
			return {
				id: quizResponse.id,
				providerId: quizResponse.provider_id,
				quizStatus: quizResponse.quiz_status,
				welcomeText: quizResponse.welcome_text || '',
				welcomeBlob: quizResponse.welcome_blob || '',
				welcomeColor: quizResponse.welcome_color,
				resultText: quizResponse.result_text || '',
				resultBlob: quizResponse.result_blob || '',
				resultColor: quizResponse.result_color,
				questions: quizResponse.questions.map((question) => {
					const questionId = getNormalizedId(question.id)

					return {
						id: questionId,
						quizId: quizResponse.id,
						questionText: question.question_text,
						description: question.description || '',
						questionBlob: question.question_blob || '',
						questionColor: question.question_color,
						answers: question.answers.map((answer) => ({
							id: getNormalizedId(answer.id),
							questionId: questionId,
							answerText: answer.answer_text,
							isCorrect: answer.is_correct,
						})),
					}
				}),
				correctAnswersVisible: quizResponse.correct_answers_visible,
				paginationEnabled: quizResponse.pagination_enabled,
				resultsVisible: quizResponse.results_visible,
				styles: quizResponse?.styles || '',
			}
		}
		catch (err) {
			Logger.error('Error converting quiz response to object', true, err)
			return undefined
		}
	}

	return {
		id: response.id,
		adset: {
			id: response.ad_set.id,
			campaign: {
				id: response.ad_set.campaign.id,
				slug: response.ad_set.campaign.slug,
				type: CampaignType.EXTENSION,
				title: response.ad_set.campaign.title,
				description: response.ad_set.campaign.description,
				category: response.ad_set.campaign.category,
				holding: response.ad_set.campaign.holding,
				advertiser: {
					...response.ad_set.campaign.advertiser,
					wallet: {
						...response.ad_set.campaign.advertiser.wallet,
						currency: {
							...response.ad_set.campaign.advertiser.wallet.currency,
							enTitle: response.ad_set.campaign.advertiser.wallet.currency.en_title,
							ruTitle: response.ad_set.campaign.advertiser.wallet.currency.ru_title,
							ptTitle: response.ad_set.campaign.advertiser.wallet.currency.pt_title,
							esTitle: response.ad_set.campaign.advertiser.wallet.currency.es_title,
						},
					},
				},
				visible: response.ad_set.campaign.visible,
			},
			slug: response.ad_set.slug,
			format: response.ad_set.format,
			title: response.ad_set.title,
			created: response.ad_set.created,
			published: response.ad_set.published,
			visible: response.ad_set.visible,
		},
		slug: response.slug,
		title: response.title,
		description: response.description,
		attachments: {
			...response.attachments,
			quiz: response.attachments?.quiz ? quizResponseToObject(response.attachments.quiz) : undefined,
			panel: response.attachments?.panel || undefined,
			gallery: response.attachments?.gallery || undefined,
		},
		productUrl: {
			general: response.product_url,
			mobile: response.mobile_product_url,
		},
		scriptCode: response.script_code,
		pixelClicks: response.pixel_clicks,
		pixelClicksScripts: response.pixel_clicks_scripts,
		pixelImpressions: response.pixel_impressions,
		pixelInspections: response.pixel_inspections,
		pixelQuertels25: response.pixel_quertels_25,
		pixelQuertels50: response.pixel_quertels_50,
		pixelQuertels75: response.pixel_quertels_75,
		preview: response.preview || null,
		productUrlAdditionalParams: response.product_url_additional_params,
		legalCompliance: response.legal_compliance,
		published: response.published,
		visible: response.visible,
	}
}
