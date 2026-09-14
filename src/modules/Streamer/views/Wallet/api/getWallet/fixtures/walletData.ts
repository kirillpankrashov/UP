import { CurrencyName, type IStreamerWallet, type IStreamerWalletRazorPayPayoutMethod, type IStreamerWalletTipaltiPayoutMethod, type IStreamerWalletTochkaPayoutMethod,PayoutService } from '@/core/types'

export const walletDataTipalti: IStreamerWallet = {
	balance: 123456,
	earnings: {
		estimated: 123,
		audited: 123,
	},
	cpaAmountReview: 123,
	currency: CurrencyName.RUB,
	paymentDate: '2026-01-01',
	methods: [
		{
			slug: PayoutService.TIPALTI,
			title: 'Tipalti',
			description: null,
			visible: true,
			dictionary: [],
			status: true,
			payload: {
				name: '',
				lastName: '',
				middleName: '',
				birthday: '',
				personalCode: '',
				city: '',
				state: '',
				zipCode: '',
				address: '',
				accountNumber: '',
				routingNumber: '',
			},
		} as unknown as IStreamerWalletTipaltiPayoutMethod,
	],
}

export const walletDataTochka: IStreamerWallet = {
	balance: 123456,
	earnings: {
		estimated: 123,
		audited: 123,
	},
	cpaAmountReview: 123,
	currency: CurrencyName.RUB,
	paymentDate: '2026-01-01',
	methods: [
		{
			slug: PayoutService.TOCHKA_BANK,
			title: 'TochkaBank',
			description: null,
			visible: true,
			dictionary: [],
			status: true,
			payload: {
				name: '',
				lastName: '',
				middleName: '',
				personalCode: '',
				accountNumber: '',
				routingNumber: '',
				selfEmployed: true,
			},
		} as IStreamerWalletTochkaPayoutMethod,
	],
}

export const walletDataRazorPay: IStreamerWallet = {
	balance: 123456,
	earnings: {
		estimated: 123,
		audited: 123,
	},
	cpaAmountReview: 123,
	currency: CurrencyName.RUB,
	paymentDate: '2026-01-01',
	methods: [
		{
			slug: PayoutService.RAZOR_PAY,
			title: 'RazorPay',
			description: null,
			visible: true,
			dictionary: {
				documentTypes: [],
				payoutMode: ['UPI', 'IMPS', 'NEFT', 'RTGS'],
			},
			status: true,
			payload: {
				fullName: '',
				birthday: '',
				phone: '',
				email: '',
				address: '',
				documentType: '',
				numberIdentification: '',
				panCard: '',
				panCardDoc: '',
				payoutMode: '',
				accountVpa: '',
				bankIfsc: '',
				beneficiaryAccountNumber: '',
			},
		} as unknown as IStreamerWalletRazorPayPayoutMethod,
	],
}
