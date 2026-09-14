import { vi } from 'vitest'

import type { IPaginatedData, IResponseMessage, IStatus } from '@/core/types/response'
import { segment } from '@/modules/Partner/views/Segments/api/getSegment/fixtures/segment'
import { segmentList } from '@/modules/Partner/views/Segments/api/getSegments/fixtures/segmentList'
import type { ISearchStreamer } from '@/modules/Partner/views/Segments/api/searchStreamers'
import { searchedStreamers } from '@/modules/Partner/views/Segments/api/searchStreamers/fixtures/searchedStreamers'
import type { ISegment, ISegmentList } from '@/modules/Partner/views/Segments/api/types'

export const getSegments = vi.fn(async (): Promise<IPaginatedData<ISegmentList[]>> => {
	return new Promise(resolve => resolve({
		status: true,
		data: [segmentList],
		perPage: 10,
		total: 10,
	}))
})

export const searchSegments = vi.fn(async (): Promise<ISegmentList[]> => {
	return new Promise(resolve => resolve([segmentList]))
})

export const getSegment = vi.fn(async (): Promise<ISegment> => {
	return new Promise(resolve => resolve(segment))
})

export const createSegment = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Saved',
				'code': 'PARTNER_SEGMENTS_SAVED',
			},
		],
	}))
})

export const updateSegment = vi.fn(async (): Promise<IResponseMessage> => {
	return new Promise(resolve => resolve({
		status: true,
		messages: [
			{
				'field': null,
				'text': 'Saved',
				'code': 'PARTNER_SEGMENTS_SAVED',
			},
		],
	}))
})

export const attachStreamer = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const detachStreamer = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const searchStreamers = vi.fn(async (): Promise<ISearchStreamer[]> => {
	return new Promise(resolve => resolve(searchedStreamers))
})
