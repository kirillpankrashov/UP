import axios from 'axios'

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL || ''
const SLACK_CHANNEL = '#front-ci-cd'
const SLACK_USERNAME = 'Front Bot'
const SLACK_ICON = ':uplify-circle:'

export default async (
	text,
	username = SLACK_USERNAME,
	icon_emoji = SLACK_ICON,
	channel = SLACK_CHANNEL,
) => {
	if (!SLACK_WEBHOOK) {
		return null
	}

	return await axios.post(SLACK_WEBHOOK, {
		channel,
		username,
		icon_emoji,
		text,
	})
}
