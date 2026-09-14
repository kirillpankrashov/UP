export enum LinkPollEndCondition {
	DURATION = 'duration',
	VOTES = 'votes',
}

export interface ILinkPollAnswer {
	id?: number
	answer: string
	votes?: number
}

export interface ILinkPoll {
  question: string
  duration: number | null
  remainderDuration: number
  answers: ILinkPollAnswer[]
  endCondition: LinkPollEndCondition
  maxVotes: number
}
