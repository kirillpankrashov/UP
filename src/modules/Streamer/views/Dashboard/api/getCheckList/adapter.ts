import type { TCheckList, TCheckListResponse } from './types'

export const responseToData = (response: TCheckListResponse): TCheckList => {
	return {
		close: response.close,
		completed: response.completed,
		filledProfile: response.filled_profile,
		configuredWidget: response.configured_widget,
		connectedChatbot: response.connected_chatbot,
		goalCreated: response.goal_created,
		displayedAd: response.displayed_ad,
	}
}
