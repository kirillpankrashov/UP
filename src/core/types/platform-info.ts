export type TPlatformInfoResponse = {
	provider_id: number | string
	nickname: string
	displayname: string
	avatar: string
  application?: {
    access_token: string
    client_id: string
  }
} | null

export type TPlatformInfoData = {
	providerId: number | string
	nickname: string
	displayname: string
	avatar: string
  application?: {
    accessToken: string
    clientId: string
  }
} | null
