export type TTierResponse = {
  current: {
		level: number
		updated: {
			date: string
			text: string
		}
		ctr: {
			title: string
			value: number
		}
		impressions: {
			title: string
			value: number
		}
		referrals: {
			title: string
			value: number
		}
		days_on_platform: {
			title: string
			value: number
		}
		discord: {
			title: string
			value: boolean
		}
		extension: {
			title: string
			value: boolean
		}
	}
  levels: Array<{
		level: number
		requirements: {
			level: number
			ctr: number
			impressions: number
			referrals: number
			days_on_platform: number
			discord: boolean
			extension: boolean
		}
		benefits: string[]
	}>
} | []

export type TTier = {
  current: {
		level: number
		updated: {
			date: string
			text: string
		}
		ctr: {
			title: string
			value: number
		}
		impressions: {
			title: string
			value: number
		}
		referrals: {
			title: string
			value: number
		}
		daysOnPlatform: {
			title: string
			value: number
		}
		discord: {
			title: string
			value: boolean
		}
		extension: {
			title: string
			value: boolean
		}
	}
  levels: Array<{
		level: number
		requirements: {
			level: number
			ctr: number
			impressions: number
			referrals: number
			daysOnPlatform: number
			discord: boolean
			extension: boolean
		}
		benefits: string[]
	}>
} | null
