import {
	CurrencyName,
	type IRazorPayUser,
	type IRazorPayUserResponse,
	type ITipaltiUser,
	type ITipaltiUserResponse,
	type ITochkaBankUser,
	type ITochkaBankUserResponse,
	PayoutService,
	RazorPayPayoutMode,
} from '@/core/types'

export interface IStreamerWalletRazorPayPayoutMethodResponse {
	slug: PayoutService.RAZOR_PAY
	title: string
	description: string | null
	visible: boolean
	dictionary: {
		document_types: string[]
		payout_mode: RazorPayPayoutMode[]
	}
	status: boolean
	payload: IRazorPayUserResponse
}

export interface IStreamerWalletTipaltiPayoutMethodResponse {
	slug: PayoutService.TIPALTI
	title: string
	description: string | null
	visible: boolean
	dictionary: any[]
	status: boolean
	payload: ITipaltiUserResponse
}

export interface IStreamerWalletTochkaPayoutMethodResponse {
	slug: PayoutService.TOCHKA_BANK
	title: string
	description: string | null
	visible: boolean
	dictionary: any[]
	status: boolean
	payload: ITochkaBankUserResponse
}

export type IStreamerWalletPayoutMethodResponse = IStreamerWalletRazorPayPayoutMethodResponse | IStreamerWalletTipaltiPayoutMethodResponse | IStreamerWalletTochkaPayoutMethodResponse

export interface IStreamerWalletResponse {
	balance: number
	estimated_earnings: number
	audited_earnings: number
	cpa_amount_review: number
	currency: CurrencyName
	methods: IStreamerWalletPayoutMethodResponse[]
  payment_date: string
}

export interface IStreamerWalletRazorPayPayoutMethod {
	slug: PayoutService.RAZOR_PAY
	title: string
	description: string | null
	visible: boolean
	dictionary: {
		documentTypes: string[]
		payoutMode: RazorPayPayoutMode[]
	}
	status: boolean
	payload: IRazorPayUser
}

export interface IStreamerWalletTipaltiPayoutMethod {
	slug: PayoutService.TIPALTI
	title: string
	description: string | null
	visible: boolean
	dictionary: any[]
	status: boolean
	payload: ITipaltiUser
}

export interface IStreamerWalletTochkaPayoutMethod {
	slug: PayoutService.TOCHKA_BANK
	title: string
	description: string | null
	visible: boolean
	dictionary: any[]
	status: boolean
	payload: ITochkaBankUser
}

export type IStreamerWalletPayoutMethod = IStreamerWalletRazorPayPayoutMethod | IStreamerWalletTipaltiPayoutMethod | IStreamerWalletTochkaPayoutMethod

export interface IStreamerWallet {
	balance: number
	earnings: {
		estimated: number
		audited: number
	}
	cpaAmountReview: number
	currency: CurrencyName
	methods: IStreamerWalletPayoutMethod[]
  paymentDate: string
}

export enum PayoutStatus {
  SIGNED = 'signed',
  IN_PROGRESS = 'in_progress',
  REVERSE = 'reverse',
  ERROR = 'error',
  DONE = 'done',
}
