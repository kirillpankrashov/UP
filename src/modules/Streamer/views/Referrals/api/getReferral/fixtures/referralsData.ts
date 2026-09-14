import { CurrencyName } from '@/core/types'
import type { IReferral } from '@/modules/Streamer/views/Referrals/api/getReferral'

export const referralsData: IReferral = {
	link: 'http://platform.uplify.app/en/ref/tw3yvgcor63sypxzksmgbtsb?utm_source=referral&utm_medium=1372&utm_label=yuriysokol',
	invited: 2,
	amount: 0,
	currency: CurrencyName.RUB,
	promotion: true,
	const: {
		referrer: 0,
		referral: 0,
		currency: CurrencyName.RUB,
	},
}
