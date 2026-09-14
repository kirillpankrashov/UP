export interface ICategoriesImperssionsResponse {
  title: string
  status: boolean
  updatedAt: string
  start: string
  end: string
  categories: Array<{
		name: string
		image: string
		impressions: number
  }>
}

export interface ICategoriesImperssions {
	dates: {
		start: string
		end: string
	}
  title: string
  status: boolean
  updatedAt: string
  categories: Array<{
		name: string
		image: string
		impressions: number
	}>
}
