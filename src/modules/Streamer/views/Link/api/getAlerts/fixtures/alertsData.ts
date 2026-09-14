import { ChatbotFrequency, type ILinkAlerts, LinkCardPosition, SupporterAlertDuration } from '@/core/types/link'

export const alertsData: ILinkAlerts = {
	chatbotFrequency: ChatbotFrequency.EVERY_15_MIN,
	goalPosition: LinkCardPosition.LEFT_BOTTOM_CORNER,
	pollPosition: LinkCardPosition.LEFT_TOP_CORNER,
	supporterAlertDuration: SupporterAlertDuration.EVERY_10_SEC,
	supporterAlertPosition: LinkCardPosition.RIGHT_BOTTOM_CORNER,
}
