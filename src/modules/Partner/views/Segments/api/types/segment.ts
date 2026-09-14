import type { ISegmentStreamer, ISegmentStreamerResponse } from './segment-streamer'

export interface ISegmentResponse {
  id: number
	title: string
	icon: string
	streamers: ISegmentStreamerResponse[]
}

export interface ISegment {
  id: number
	title: string
	icon: string
	streamers: ISegmentStreamer[]
}