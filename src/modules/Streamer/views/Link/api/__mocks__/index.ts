import { vi } from 'vitest'

import type { IStatus } from '@/core/types'
import type { ILinkAlerts, ILinkGoal, ILinkPoll, ILinkPost, ILinkProfile, ILinkTopSupporter } from '@/core/types/link'

import { postData } from '../createPost/fixtures/postData'
import { alertsData } from '../getAlerts/fixtures/alertsData'
import type { ILinkAnalytics } from '../getAnalytics'
import { analytcsData } from '../getAnalytics/fixtures/analytcsData'
import { goalData } from '../getGoal/fixtures/goalData'
import { pollData } from '../getPoll/fixtures/pollData'
import { postsData } from '../getPosts/fixtures/postsData'
import type { ILinkPosts } from '../getPosts/types'
import { linkProfileData } from '../getProfile/fixtures/linkProfileData'
import type { ILinkStatistics } from '../getStatistics'
import { statisticsData } from '../getStatistics/fixtures/statisticsData'
import { topsByPeriodData } from '../getTopByPeriod/fixtures/topsByPeriodData'
import type { ILinkTops } from '../getTops'
import { topsData } from '../getTops/fixtures/topsData'

export const createGoal = vi.fn(async (): Promise<ILinkGoal> => {
	return new Promise(resolve => resolve(goalData))
})

export const getGoal = vi.fn(async (): Promise<ILinkGoal> => {
	return new Promise(resolve => resolve(goalData))
})

export const updateGoal = vi.fn(async (): Promise<ILinkGoal> => {
	return new Promise(resolve => resolve(goalData))
})

export const deleteGoal = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const createPoll = vi.fn(async (): Promise<ILinkPoll> => {
	return new Promise(resolve => resolve(pollData))
})

export const getPoll = vi.fn(async (): Promise<ILinkPoll> => {
	return new Promise(resolve => resolve(pollData))
})

export const updatePoll = vi.fn(async (): Promise<ILinkPoll> => {
	return new Promise(resolve => resolve(pollData))
})

export const deletePoll = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({
		status: true,
	}))
})

export const getAlerts = vi.fn(async (): Promise<ILinkAlerts> => {
	return new Promise(resolve => resolve(alertsData))
})

export const updateAlerts = vi.fn(async (): Promise<ILinkAlerts> => {
	return new Promise(resolve => resolve(alertsData))
})

export const requestDemo = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const getAnalytics = vi.fn(async (): Promise<ILinkAnalytics> => {
	return new Promise(resolve => resolve(analytcsData))
})

export const getStatistics = vi.fn(async (): Promise<ILinkStatistics> => {
	return new Promise(resolve => resolve(statisticsData))
})

export const getTops = vi.fn(async (): Promise<ILinkTops> => {
	return new Promise(resolve => resolve(topsData as unknown as ILinkTops))
})

export const getTopByPeriod = vi.fn(async (): Promise<ILinkTopSupporter[]> => {
	return new Promise(resolve => resolve(topsByPeriodData as unknown as ILinkTopSupporter[]))
})

export const getPosts = vi.fn(async (): Promise<ILinkPosts> => {
	return new Promise(resolve => resolve(postsData))
})

export const createPost = vi.fn(async (): Promise<ILinkPost> => {
	return new Promise(resolve => resolve(postData))
})

export const getPost = vi.fn(async (): Promise<ILinkPost> => {
	return new Promise(resolve => resolve(postData))
})

export const updatePost = vi.fn(async (): Promise<ILinkPost> => {
	return new Promise(resolve => resolve(postData))
})

export const deletePost = vi.fn(async (): Promise<IStatus> => {
	return new Promise(resolve => resolve({ status: true }))
})

export const getProfile = vi.fn(async (): Promise<ILinkProfile> => {
	return new Promise(resolve => resolve(linkProfileData))
})

export const updateProfile = vi.fn(async (): Promise<ILinkProfile> => {
	return new Promise(resolve => resolve(linkProfileData))
})
