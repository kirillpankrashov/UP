import type { IResponseData } from '@/core/types'
import { Api } from '@/core/client'
import { parseSlug } from '@/core/helpers'
import type { IRealDemoCreativeResponse } from '@/modules/Widget/types'

export const fetchCreative = (slug: string) => {
	const { campaignType } = parseSlug(slug)

	return Api.get<IResponseData<IRealDemoCreativeResponse>>(
		`ads/${campaignType}/ad/${slug}`).then(res => res.data)
}
