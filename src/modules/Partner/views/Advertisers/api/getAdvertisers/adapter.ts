import type { IAdvertiser, IAdvertiserResponse } from './types'

export const responseToData = (response: IAdvertiserResponse[]): IAdvertiser[] => {
	return response.map(advertiser => ({
		id: advertiser.id,
		title: advertiser.title,
		description: advertiser.description,
		wallet: {
			...advertiser.wallet,
			currency: {
				code: advertiser.wallet.currency.code,
				enTitle: advertiser.wallet.currency.en_title,
				ruTitle: advertiser.wallet.currency.ru_title,
				flag: advertiser.wallet.currency.flag,
				visible: advertiser.wallet.currency.visible,
				ptTitle: advertiser.wallet.currency.pt_title,
				esTitle: advertiser.wallet.currency.es_title,
			},
		},
		holding: advertiser.holding,
	}))
}
