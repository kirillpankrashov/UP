import type { IResponse } from '@/core/types'
import { Api } from '@/core/client'

export const login = async (token: string) => {
	return Api.get<IResponse<{token: string}>>(`auth/streamer/obs/${token}`)
}
