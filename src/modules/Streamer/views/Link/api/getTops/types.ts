import type { ILinkTopSupporter } from '@/core/types/link'

export interface ILinkTops {
	today: ILinkTopSupporter[]
	yesterday: ILinkTopSupporter[]
	week: ILinkTopSupporter[]
	month: ILinkTopSupporter[]
	allTime: ILinkTopSupporter[]
	expiresAt: number
}
