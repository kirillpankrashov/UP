import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import { Logger } from '@/core/helpers'
import * as SegmentssApi from '@/modules/Partner/views/Segments/api'
import type { ISegment, ISegmentList } from '@/modules/Partner/views/Segments/api/types'
import type { ISegmentModel, ISegmentsQueryParams } from '@/modules/Partner/views/Segments/types'

interface State {
  isFetchingData: boolean
	segments: {
		bootstrapped: boolean
		perPage: number
		total: number
		loading: boolean
		items: ISegmentList[]
	}
	searchedSegments: {
		loading: boolean
		items: ISegmentList[]
	}
	segment: {
		loading: boolean
		data: ISegment | null
		formVisible: boolean
	}
}

export const useSegmentsStore = () => {
	const route = useRoute()

	return defineStore('partner-segments', {
		state: (): State => ({
			isFetchingData: false,
			segments: {
				bootstrapped: false,
				perPage: 10,
				total: 0,
				loading: false,
				items: [],
			},
			searchedSegments: {
				loading: false,
				items: [],
			},
			segment: {
				loading: false,
				data: null,
				formVisible: false,
			},
		}),
		actions: {
			async fetchSegments (page: number | null = null) {
				try {
					this.searchedSegments.items = []
					this.segments.loading = true

					const params = {
						page: route.query.page || 1,
					} as unknown as ISegmentsQueryParams

					if (page) {
						params.page = page
					}

					const res = await SegmentssApi.getSegments(params)

					this.segments.items = res.data
					this.segments.perPage = res.perPage
					this.segments.total = res.total
					this.segments.bootstrapped = true
				}
				catch(err) {
					Logger.error('Error fetching advertisers list', true, err)
				}
				finally {
					this.segments.loading = false
				}
			},

			async searchSegments (title: string) {
				try {
					this.searchedSegments.loading = true

					this.searchedSegments.items = await SegmentssApi.searchSegments(title)
				}
				catch(err) {
					Logger.error('Error searching segments', true, err)
				}
				finally {
					this.searchedSegments.loading = false
				}
			},

			async fetchSegment (segmentId: number) {
				try {
					this.segment.loading = true

					this.segment.data = await SegmentssApi.getSegment(segmentId)
				}
				catch(err) {
					Logger.error('Error fetching segment', true, err)
				}
				finally {
					this.segment.loading = false
				}
			},

			async createSegment (data: ISegmentModel) {
				try {
					this.segment.loading = true

					await SegmentssApi.createSegment({
						title: data.title,
						streamers: data.streamers,
					})

					this.fetchSegments()
				}
				catch(err) {
					Logger.error('Error creating new segment', true, err)
				}
				finally {
					this.segment.loading = false
				}
			},

			async updateSegment (data: ISegmentModel) {
				if (!this.segment.data) {
					return
				}

				try {
					this.segment.loading = true

					await SegmentssApi.updateSegment(this.segment.data.id, {
						title: data.title,
						streamers: [
							...this.segment.data.streamers.map(s => s.id),
							...data.streamers,
						],
					})

					this.fetchSegments()
				}
				catch(err) {
					Logger.error('Error updating segment with id: ' + this.segment.data.id, true, err)
				}
				finally {
					this.segment.loading = false
				}
			},

			async detachStreamer (streamerId: number, segmentId: number) {
				try {
					this.segment.loading = true

					await SegmentssApi.detachStreamer(streamerId, segmentId)

					if (this.segment.data) {
						this.segment.data.streamers = this.segment.data.streamers.filter(s => s.id !== streamerId)
					}
				}
				catch(err) {
					Logger.error('Error detaching streamer with id: ' + streamerId + ' from segment with id: ' + segmentId, true, err)
				}
				finally {
					this.segment.loading = false
				}
			},

			async searchStreamers (title: string, segmentId?: number) {
				if (title.length < 1) {
					return
				}

				try {
					return SegmentssApi.searchStreamers(title, segmentId)
				}
				catch(err) {
					Logger.error('Error searching streamers', true, err)
				}
			},
		},
	})()
}
