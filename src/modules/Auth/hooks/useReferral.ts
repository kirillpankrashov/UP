interface Referral {
  createdAt: number
  value: string
}

export const useReferral = () => {
	const REFERRAL = 'referral'

	const checkExpired = (referral: Referral): boolean => {
		const { createdAt } = referral
		const week = 1000 * 60 * 60 * 24 * 7 // 7 days
		const passedTime = new Date().getTime() - createdAt

		return passedTime > week
	}

	const removeToken = () => {
		localStorage.removeItem(REFERRAL)
	}

	const setToken = (value: string, partnerId: string) => {
		localStorage.setItem(REFERRAL, JSON.stringify({
			createdAt: new Date().getTime(),
			value,
			...(partnerId ? { partnerId } : {}),
		}))
	}

	const getReferral = () => {
		const referralStr = localStorage.getItem(REFERRAL)
		if (!referralStr) return null

		const referral = JSON.parse(referralStr) as Referral
		if (checkExpired(referral)) {
			removeToken()
			return null
		}

		return referral
	}

	const setReferral = (token: string, partnerId: string) => {
		const referral = getReferral()
		if (referral) return

		setToken(token, partnerId)
	}

	return {
		getReferral,
		setReferral,
	}
}

