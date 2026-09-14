import { Platform } from '@/core/types'

export interface IAudience {
	impressions: number
	reach: number
	streamers: number
}

export interface IAudiencePayload {
  platform: Platform
  start: string
  end: string
  streamers: number[]
  exclude_streamers: boolean
  broadcaster_languages: string[]
  exclude_languages: boolean
  countries: string[]
  exclude_countries: boolean
  countries_auditory: string[]
  exclude_countries_auditory: boolean
  devices_auditory: string[]
  exclude_devices_auditory: boolean
  age_from: number | null
  age_to: number | null
  gender: string | null
  mature: boolean
  tags: number[]
  exclude_tags: boolean
  agencies: number[]
  min_cpm: number | null
  max_cpm: number | null
}