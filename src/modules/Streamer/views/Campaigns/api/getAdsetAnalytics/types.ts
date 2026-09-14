export interface IAdsetAnalyticsResponse {
  title: string
	data: Array<{
		date: string
		impressions: number
		clicks: number
		bot_clicks: number
		ctr: number
	}>
}

export interface IAdsetAnalyticsDay {
	date: string
	impressions: number
	clicks: number
	botClicks: number
	ctr: number
}

export interface IAdsetAnalytics {
  title: string
	data: IAdsetAnalyticsDay[]
}
