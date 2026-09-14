export interface ICpmStarCreativeInfo {
  advertiser: string
  bid_price: number
  chatbot_text: string
  duration: number | null
  meta_count: string
  payload: string
  pixel_clicks: string[]
  pixel_impressions: string[]
  product_link: string
  width: number
  height: number
}

export type ICpmStarCreativeResponse = ICpmStarCreativeInfo