import type { PollFormModel } from '../../store'

export const modelToPayload = (model: PollFormModel): PollFormModel => {
	return {
		question: model.question,
		maxVotes: +model.maxVotes,
		remainderDuration: +model.remainderDuration,
		duration: model.duration,
		endCondition: model.endCondition,
		answers: model.answers.filter(answer => answer.answer !== '').map(answer => ({
			id: answer.id,
			answer: answer.answer,
		})) || [],
	}
}
