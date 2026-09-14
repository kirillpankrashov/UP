import { AdFrequency } from '@/modules/Widget/types'

export const AdFrequencyMap = {
	[AdFrequency.FIVE]: 5 * 60 * 1000,
	[AdFrequency.TEN]: 10 * 60 * 1000,
	[AdFrequency.FAST]: 15 * 60 * 1000,
	[AdFrequency.ACCELERATED]: 20 * 60 * 1000,
	[AdFrequency.STANDARD]: 30 * 60 * 1000,
	[AdFrequency.CUSTOM]: 15 * 60 * 1000,
}