import type { TTier,TTierResponse } from './types'

export const responseToData = (response: TTierResponse): TTier => {
	if (Array.isArray(response)) {
		return null
	}

	return {
		current: {
			level: response.current.level,
			updated: response.current.updated,
			ctr: response.current.ctr,
			impressions: response.current.impressions,
			referrals: response.current.referrals,
			daysOnPlatform: response.current.days_on_platform,
			discord: response.current.discord,
			extension: response.current.extension,
		},
		levels: response.levels.map(level => ({
			level: level.level,
			requirements: {
				level: level.requirements.level,
				ctr: level.requirements.ctr,
				impressions: level.requirements.impressions,
				referrals: level.requirements.referrals,
				daysOnPlatform: level.requirements.days_on_platform,
				discord: level.requirements.discord,
				extension: level.requirements.extension,
			},
			benefits: level.benefits,
		})),
	}
}
