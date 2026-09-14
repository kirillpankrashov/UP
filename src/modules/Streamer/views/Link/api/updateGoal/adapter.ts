import type { GoalFormModel } from '../../store'

export const modelToPayload = (model: GoalFormModel): GoalFormModel => {
	return {
		title: model.title || '',
		description: model.description || '',
		isPublicTotal: model.isPublicTotal || false,
		start: model.start || 0,
		total: model.total || 100,
	}
}
