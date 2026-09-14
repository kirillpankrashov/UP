export interface IHistoryReferralResponse {
  user_id: number
  name: string
  signed_up: string
  completed: boolean
  impressions: number
  total_impressions: number
}

export interface IHistoryReferral {
  userId: number
  name: string
  signedUp: string
  completed: boolean
  impressions: {
		current: number
		total: number
	}
}
