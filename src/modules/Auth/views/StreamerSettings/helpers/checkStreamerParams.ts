import { Logger } from '@/core/helpers'
import type { RuleForm } from '@/components/StreamerSettingsForm'

export const checkStreamerParams = (model: RuleForm) => {
	const streamerData = localStorage.getItem('saved-streamer-data') || ''
	if (!streamerData) return

	try {
		const params = JSON.parse(streamerData)
		if (!params) return

		const {
			email,
			country,
			language,
			gender,
			birthday,
		} = params

		if (email) model.email = email
		if (country) model.country = country
		if (language) model.language = language
		if (gender) model.gender = gender
		if (birthday) model.birthday = birthday
	}
	catch (err) {
		Logger.error('Invalid streamer data in localStorage')
	}
}
