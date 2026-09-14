// TODO: переписать на отдельные папки с ендпоинтами, типами и адаптерами
import type { IResponseData, IStatus } from '@/core/types'
import { Api, CpmStarApi, SspMediaApi, SspTextApi } from '@/core/client'
import { responseToWidgetAdapter } from '@/modules/Widget/adapters/widget'
import type {
	ICpmStarCreativeResponse,
	ISspCreativeResponse,
	ISspStreamInfo,
	IWidgetResponse,
} from '@/modules/Widget/types'

const showMessage = false

type FetchBrandAwarenessPayload = {
  slug: string
  data: {
    width: number
    height: number
  }
}

export const fetch = (params: { slug: string }) => {
	return Api.get<{data: IWidgetResponse}>(
		`ads/widget/${params.slug}`,
		undefined,
		{ showMessage },
	).then(res => responseToWidgetAdapter(res.data))
}

export const enable = (params: { slug: string }) => {
	return Api.get<{ data: IStatus }>(
		`streamer/widget/${params.slug}/enable`,
		undefined,
		{ showMessage },
	)
}

export const fetchBrandAwareness = (params: FetchBrandAwarenessPayload) => {
	return Api.post(
		`ads/widget/${params.slug}/auto`,
		params.data,
		{
			showMessage,
			throwOnStatusFalse: false,
		},
	)
}

export const fetchReferralPromo = (params: { slug: string }) => {
	return Api.get(
		`ads/widget/${params.slug}/referral`,
		undefined,
		{ showMessage },
	)
}

export const checkForBS = (params: { slug: string }) => {
	return Api.get<IStatus>(
		`ads/brand-safety/${params.slug}/visual`,
		undefined,
		{
			showMessage,
			throwOnStatusFalse: false,
		},
	)
}

export const fetchSspMediaCreative = (params: ISspStreamInfo) => {
	return SspMediaApi.post<IResponseData<ISspCreativeResponse>>(
		'yandex/fs',
		params,
		{
			showMessage,
			throwOnStatusFalse: false,
		})
		.then(res => (res.data))
}

export const fetchSspTextCreative = (params: ISspStreamInfo) => {
	return SspTextApi.post<IResponseData<ISspCreativeResponse>>(
		'yandex/text',
		params,
		{
			showMessage,
			throwOnStatusFalse: false,
		})
		.then(res => (res.data))
}

export const fetchCpmStarCreative = (params: ISspStreamInfo) => {
	return CpmStarApi.post<IResponseData<ICpmStarCreativeResponse>>(
		'cpmstar/banner',
		params,
		{
			showMessage,
			throwOnStatusFalse: false,
		})
		.then(res => (res.data))
}
