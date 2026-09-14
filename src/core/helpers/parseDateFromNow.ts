import moment from 'moment'


type dateSteps = {
  minutes: number
  hours: number
  days: number
  months: number
  years: number
}

type Step = keyof dateSteps

type Result = {
  diff: dateSteps
  largestStep: Step
  largestStepValue: number
}

export const parseDateFromNow = (datestring: string) => {
	const now = new Date()
	const date = new Date(datestring)

	const result: Result = {
		diff: {
			minutes: 0,
			hours: 0,
			days: 0,
			months: 0,
			years: 0,
		},
		largestStep: 'years',
		largestStepValue: 0,
	}

	// @ts-ignore
	Object.keys(result.diff).forEach((key: Step) => {
		const diff = moment(date).diff(now, key)
		result.diff[key] = diff
		if (diff) {
			result.largestStep = key
			result.largestStepValue = diff
		}
	})

	return result
}
