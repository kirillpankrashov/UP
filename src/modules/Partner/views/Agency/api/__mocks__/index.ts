import { vi } from 'vitest'

import type { IPaginatedData, IResponseData, IStatus } from '@/core/types/response'
import { adsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/fixtures/adsetInfo'
import type { IAdsetInfo } from '@/modules/Partner/views/Agency/api/getAdsetInfo/types'
import { adsetsActive } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'
import type { IAdset } from '@/modules/Partner/views/Agency/api/getAdsetsActive/types'
import { adsetStreamers } from '@/modules/Partner/views/Agency/api/getAdsetStreamers/fixtures/adsetStreamers'
import type { IAdsetStreamer } from '@/modules/Partner/views/Agency/api/getAdsetStreamers/types'
import { agency } from '@/modules/Partner/views/Agency/api/getAgency/fixtures/agency'
import type { IAgency } from '@/modules/Partner/views/Agency/api/getAgency/types'
import { billing } from '@/modules/Partner/views/Agency/api/getBilling/fixtures/billing'
import type { IBilling } from '@/modules/Partner/views/Agency/api/getBilling/types'
import { invoices } from '@/modules/Partner/views/Agency/api/getInvoices/fixtures/invoices'
import type { IInvoice } from '@/modules/Partner/views/Agency/api/getInvoices/types'
import { referral } from '@/modules/Partner/views/Agency/api/getReferral/fixtures/referral'
import type { IReferral } from '@/modules/Partner/views/Agency/api/getReferral/types'
import { referralsHistory } from '@/modules/Partner/views/Agency/api/getReferralsHistory/fixtures/referralsHistory'
import type { IReferralHistoryItem } from '@/modules/Partner/views/Agency/api/getReferralsHistory/types'
import { referralsHistoryDetail } from '@/modules/Partner/views/Agency/api/getReferralsHistoryDetail/fixtures/referralsHistoryDetail'
import type { IReferralHistoryDetail } from '@/modules/Partner/views/Agency/api/getReferralsHistoryDetail/types'
import { referralStreamers } from '@/modules/Partner/views/Agency/api/getReferralStreamers/fixtures/referralStreamers'
import type { IReferralStreamer } from '@/modules/Partner/views/Agency/api/getReferralStreamers/types'
import { streamerAdsets } from '@/modules/Partner/views/Agency/api/getStreamerAdsets/fixtures/streamerAdsets'
import type { IStreamerAdset } from '@/modules/Partner/views/Agency/api/getStreamerAdsets/types'
import { streamerInfo } from '@/modules/Partner/views/Agency/api/getStreamerInfo/fixtures/streamerInfo'
import type { IStreamerInfo } from '@/modules/Partner/views/Agency/api/getStreamerInfo/types'
import { streamers } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'
import type { IStreamer } from '@/modules/Partner/views/Agency/api/getStreamers/types'

export const getAgency = vi.fn(async (): Promise<IAgency> => {
	return new Promise(resolve => resolve(agency))
})

export const updateAgency = vi.fn(async (): Promise<IAgency> => {
	return new Promise(resolve => resolve(agency))
})

export const getBilling = vi.fn(async (): Promise<IBilling> => {
	return new Promise(resolve => resolve(billing))
})

export const updateBilling = vi.fn(async (): Promise<IBilling> => {
	return new Promise(resolve => resolve(billing))
})

export const getInvoices = vi.fn(async (): Promise<IPaginatedData<IInvoice[]>> => {
	return new Promise(resolve => resolve(invoices))
})

export const getAdsetStreamers = vi.fn(async (): Promise<IPaginatedData<IAdsetStreamer[]>> => {
	return new Promise(resolve => resolve(adsetStreamers))
})

export const getAdsetsActive = vi.fn(async (): Promise<IPaginatedData<IAdset[]>> => {
	return new Promise(resolve => resolve(adsetsActive))
})

export const getAdsetsClosed = vi.fn(async (): Promise<IPaginatedData<IAdset[]>> => {
	return new Promise(resolve => resolve(adsetsActive))
})

export const getAdsetInfo = vi.fn(async (): Promise<IAdsetInfo> => {
	return new Promise(resolve => resolve(adsetInfo))
})

export const getStreamerAdsets = vi.fn(async (): Promise<IStreamerAdset[]> => {
	return new Promise(resolve => resolve(streamerAdsets))
})

export const getStreamerInfo = vi.fn(async (): Promise<IStreamerInfo> => {
	return new Promise(resolve => resolve(streamerInfo))
})

export const getStreamers = vi.fn(async (): Promise<IPaginatedData<IStreamer[]>> => {
	return new Promise(resolve => resolve(streamers))
})

export const updateStreamerInfo = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const getReferral = vi.fn(async (): Promise<IReferral> => {
	return new Promise(resolve => resolve(referral))
})

export const getReferralsHistory = vi.fn(async (): Promise<IPaginatedData<IReferralHistoryItem[]>> => {
	return new Promise(resolve => resolve(referralsHistory))
})

export const getReferralsHistoryDetail = vi.fn(async (): Promise<IPaginatedData<IReferralHistoryDetail[]>> => {
	return new Promise(resolve => resolve(referralsHistoryDetail))
})

export const getReferralStreamers = vi.fn(async (): Promise<IResponseData<IReferralStreamer[]> & { amount: number }> => {
	return new Promise(resolve => resolve(referralStreamers))
})

export const detachReferral = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})