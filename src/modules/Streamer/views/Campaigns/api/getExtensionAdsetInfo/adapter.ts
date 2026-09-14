import { CampaignType, type IQuiz, type IQuizResponse } from '@/core/types'
import { Logger } from '@/core/helpers'

import type { IExtensionAdsetInfo, IExtensionAdsetInfoResponse } from './types'

export const responseToData = (adset: IExtensionAdsetInfoResponse): IExtensionAdsetInfo => {
	const quizResponseToObject = (quizResponse: IQuizResponse): IQuiz | undefined => {
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
				questions: quizResponse.questions.map((question) => ({
					id: question.id,
					quizId: quizResponse.id,
					questionText: question.question_text,
					description: question.description || '',
					questionBlob: question.question_blob || '',
					questionColor: question.question_color,
					answers: question.answers.map((answer) => ({
						id: answer.id,
						questionId: question.id,
						answerText: answer.answer_text,
						isCorrect: answer.is_correct,
					})),
				})),
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
		campaignType: CampaignType.EXTENSION,
		slug: adset.slug,
		platform: adset.platform,
		title: adset.title,
		income: {
			current: adset.income,
			estimate: adset.estimate_income,
		},
		impressions: adset.impressions,
		clicks: adset.clicks,
		actions: adset.actions,
		creatorPayout: {
			value: adset.creator_payout,
			currency: adset.creator_payout_currency,
		},
		ctr: {
			current: adset.ctr,
			global: adset.global_target_ctr,
			target: adset.target_ctr,
		},
		dates: {
			start: adset.start,
			end: adset.end,
		},
		payoutType: adset.payout_type,
		bidCap: adset.bid_cap,
		currency: adset.currency,
		format: adset.format,
		description: adset.description,
		ads: adset.ads.map((ad) => ({
			id: ad.id,
			slug: ad.slug,
			title: ad.title,
			attachments: {
				...ad.attachments,
				quiz: ad.attachments.quiz ? quizResponseToObject(ad.attachments.quiz) : undefined,
			},
			productUrl: ad.product_url,
			chatbotText: ad.chatbot_text,
		})),
		campaign: {
			id: adset.campaign.id,
			slug: adset.campaign.slug,
			type: adset.campaign.type,
			title: adset.campaign.title,
			description: adset.campaign.description,
			category: adset.campaign.category,
			holding: adset.campaign.holding,
			advertiser: {
				id: adset.campaign.advertiser.id,
				title: adset.campaign.advertiser.title,
				description: adset.campaign.advertiser.description,
				wallet: {
					balance: adset.campaign.advertiser.wallet.balance,
					currency: {
						code: adset.campaign.advertiser.wallet.currency.code,
						enTitle: adset.campaign.advertiser.wallet.currency.en_title,
						ruTitle: adset.campaign.advertiser.wallet.currency.ru_title,
						flag: adset.campaign.advertiser.wallet.currency.flag,
						visible: adset.campaign.advertiser.wallet.currency.visible,
						ptTitle: adset.campaign.advertiser.wallet.currency.pt_title,
						esTitle: adset.campaign.advertiser.wallet.currency.es_title,
					},
					icon: adset.campaign.advertiser.wallet.icon,
				},
				holding: adset.campaign.advertiser.holding,
			},
			visible: adset.campaign.visible,
		},
		status: adset.status,
	}
}
