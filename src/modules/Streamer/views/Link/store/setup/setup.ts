import { defineStore } from 'pinia'

import type {
	ILinkGoal,
	ILinkPoll,
} from '@/core/types/link'
import { Logger } from '@/core/helpers'
import * as LinkApi from '@/modules/Streamer/views/Link/api'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

export type GoalFormModel = Pick<
	ILinkGoal,
	'title' |
	'description' |
	'start' |
	'total' |
	'isPublicTotal'
>
export type PollFormModel = Pick<
	ILinkPoll,
	'question' |
	'maxVotes' |
	'remainderDuration' |
	'duration' |
	'endCondition' |
	'answers'
>

interface State {
  isBootsraped: boolean
  isLoadingData: boolean
  goal: ILinkGoal | null
	goalSending: boolean
  poll: ILinkPoll | null
	pollSending: boolean
}

export const useLinkSetupStore = defineStore('linkSetup', {
	state: (): State => ({
		isBootsraped: false,
		isLoadingData: false,
		goal: null,
		goalSending: false,
		poll: null,
		pollSending: false,
	}),

	actions: {
		async fetchGoal () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			this.goalSending = true

			try {
				this.goal = await LinkApi.getGoal()
			}
			catch(err) {
				Logger.error('Error creating new goal', true, err)
			}
			finally {
				this.goalSending = false
			}
		},

		async createGoal (data: GoalFormModel) {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			this.goalSending = true

			try {
				this.goal = await LinkApi.createGoal(data)
			}
			catch(err) {
				Logger.error('Error creating new goal', true, err)
			}
			finally {
				this.goalSending = false
			}
		},

		async updateGoal (data: GoalFormModel) {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			if (!this.goal) {
				Logger.error('There is no goal to update', false)
				return
			}

			this.goalSending = true

			try {
				await LinkApi.updateGoal(data)
				this.goal = {
					...this.goal,
					...data,
				}
			}
			catch(err) {
				Logger.error('Error updating goal', true, err)
			}
			finally {
				this.goalSending = false
			}
		},

		async deleteGoal () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			if (!this.goal) {
				Logger.error('There is no goal to delete', false)
				return
			}

			this.goalSending = true

			try {
				await LinkApi.deleteGoal()

				this.goal = null
			}
			catch(err) {
				Logger.error('Error deleting goal', true, err)
			}
			finally {
				this.goalSending = false
			}
		},

		async fetchPoll () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			this.pollSending = true

			try {
				this.poll = await LinkApi.getPoll()
			}
			catch(err) {
				Logger.error('Error creating new poll', true, err)
			}
			finally {
				this.pollSending = false
			}
		},

		async createPoll (data: PollFormModel) {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			this.pollSending = true

			try {
				this.poll = await LinkApi.createPoll(data)
			}
			catch(err) {
				Logger.error('Error creating new poll', true, err)
			}
			finally {
				this.pollSending = false
			}
		},

		async updatePoll (data: PollFormModel) {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			if (!this.poll) {
				Logger.error('There is no poll to update', false)
				return
			}

			this.pollSending = true

			try {
				await LinkApi.updatePoll(data)
				this.poll = {
					...this.poll,
					...data,
				}
			}
			catch(err) {
				Logger.error('Error updating poll', true, err)
			}
			finally {
				this.pollSending = false
			}
		},

		async deletePoll () {
			const streamerStore = useStreamerStore()

			if (!streamerStore.streamerId) {
				Logger.error('No streamer data fetched yet', false)
				return
			}

			if (!this.poll) {
				Logger.error('There is no poll to delete', false)
				return
			}

			this.pollSending = true

			try {
				await LinkApi.deletePoll()

				this.poll = null
			}
			catch(err) {
				Logger.error('Error deleting poll', true, err)
			}
			finally {
				this.pollSending = false
			}
		},

		updatePollTimer (timer: number) {
			if (!this.poll) {
				return
			}

			this.poll.remainderDuration = timer
		},

		updatePollVotes (votes: number) {
			if (!this.poll) {
				return
			}
			this.poll.maxVotes = votes
		},
	},
})
