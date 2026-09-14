import type { Platform } from '@/core/types'

export interface IStreamersStatisticsResponse {
  title: string
  status: boolean
  updatedAt: string
  start: string
  end: string
  creators: Array<{
    name: string
    image: string
    platform: Platform
    impressions: number
    clicks: number
    ctr: number
  }>
}

export interface IStreamersStatistics {
	dates: {
		start: string
		end: string
	}
  title: string
  status: boolean
  updatedAt: string
  streamers
	: Array<{
    name: string
    image: string
    platform: Platform
    impressions: number
    clicks: number
    ctr: number
  }>
}
