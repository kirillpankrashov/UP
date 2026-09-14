import type { Platform } from '@/core/types'
import type { ILinkGearItem, LinkColorTheme } from '@/core/types/link'
import type { LinkCardPosition } from '@/core/types/link'
import type { ICategory, IDictionary, IPlatforms, ISchedule, ISocialLink } from '@/core/types/link/profile'

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
}

export interface ILinkProfileResponse {
	streamerId: number
	name: string
	avatar: string
	birthday: number
	language: IDictionary
	deleted: boolean
	country: IDictionary
	gender: Gender
	platforms: IPlatforms
	platform: Platform
	pointsTotal: number
	about: string
	gears: ILinkGearItem[]
	socialLinks: ISocialLink[]
	schedule: ISchedule
	categories: ICategory[]
	linkName: string | null
	telegramChannel: string | null
	widgetSlug: string
	theme: LinkColorTheme
	banner: string | null
	goalPosition: LinkCardPosition
	pollPosition: LinkCardPosition
	isFraudClicks: boolean
}
