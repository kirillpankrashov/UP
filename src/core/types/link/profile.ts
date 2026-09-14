import type { TPlatformInfoResponse } from '../platform-info'

import type { LinkColorTheme } from './color-theme'
import type { ILinkGearItem } from './gear-item'

export interface ISocialLink {
	name: string
	link: string
	posts?: string[] | null
	data?: Record<string, any>
}

export interface ISchedule {
	text: string
	data: Array<{
		activeDay: boolean
		start: number | null
		totalHours: number | null
	}>
}

export interface IPlatforms {
	twitch: TPlatformInfoResponse | null
	youtube: TPlatformInfoResponse | null
	trovo: TPlatformInfoResponse | null
}

export interface ICategory {
	name: string
	image?: string
	percent: number
}

export interface IDictionary {
	en_title: string
	ru_title: string
	pt_title: string
	es_title: string
}

export interface ILinkProfile {
	about: string | null
	gears: ILinkGearItem[]
	socialLinks: ISocialLink[]
	schedule: ISchedule | null
	linkName: string | null
	telegramChannel: string | null
	theme: LinkColorTheme
	banner: string | null
}
