import type { ICampaignAdvertiser, ICampaignAdvertiserResponse } from '@/core/types'

export interface ICampaignStatisticsResponse {
  title: string
  status: boolean
  updatedAt: string
  start: string
  end: string
  impressions: number
  impressions_limit: number
  spent: number
  spent_limit: number
  ctr: number
  clicks_total: number
  fills: number
  reach: number
  channels: number
  categories: number
  avg_cpm: number
  advertiser: ICampaignAdvertiserResponse
  data: Array<{
    date: string
    impressions: number
    clicks: number
    ctr: number
  }>
  creatives: Array<{
    group_name: string
    creative_name: string
    format: string
    impressions: number
    reach: number
    clicks: number
    ctr: number
    spent: number
  }>
  top_channels: Array<{
    name: string
    image: string
    impressions: number
    reach: number
    clicks: number
    ctr: number
  }>
  top_categories: Array<{
    name: string
    image: string
    impressions: number
  }>
}

export interface ICampaignStatistics {
  title: string
  status: boolean
  updatedAt: string
	dates: {
		start: string
		end: string
	}
  impressions: {
		current: number
		limit: number
	}
  spent: {
		current: number
		limit: number
	}
  ctr: number
  clicksTotal: number
  fills: number
  reach: number
  channels: number
  categories: number
  avgCpm: number
  advertiser: ICampaignAdvertiser
  data: Array<{
    date: string
    impressions: number
    clicks: number
    ctr: number
  }>
  creatives: Array<{
    adsetName: string
    creativeName: string
    format: string
    impressions: number
    reach: number
    clicks: number
    ctr: number
    spent: number
  }>
  topChannels: Array<{
    name: string
    image: string
    impressions: number
    reach: number
    clicks: number
    ctr: number
  }>
  topCategories: Array<{
    name: string
    image: string
    impressions: number
  }>
}
