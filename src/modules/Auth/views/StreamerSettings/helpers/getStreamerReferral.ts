import { useReferral } from '@/modules/Auth/hooks'

export const getStreamerReferral = (getReferral: ReturnType<typeof useReferral>['getReferral']) => {
	const referral = getReferral()
	if (!referral) return {}

	const { value } = referral
	return { referral: value }
}
