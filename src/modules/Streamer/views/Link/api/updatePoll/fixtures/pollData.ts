import { type ILinkPoll, LinkPollEndCondition } from '@/core/types/link'

export const pollData: ILinkPoll = {
	'question': 'Test Poll 1',
	'maxVotes': 100,
	duration: null,
	'remainderDuration': 0,
	'endCondition': LinkPollEndCondition.VOTES,
	'answers': [
		{
			'id': 2,
			'answer': 'answer 2',
			'votes': 0,
		},
		{
			'id': 1,
			'answer': 'answer 1',
			'votes': 0,
		},
	],
}
