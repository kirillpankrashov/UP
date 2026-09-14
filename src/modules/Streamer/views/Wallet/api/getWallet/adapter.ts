import {
	type IStreamerWallet,
	type IStreamerWalletResponse,
	PayoutService } from '@/core/types'
import type { IStreamerWalletPayoutMethod, IStreamerWalletPayoutMethodResponse } from '@/core/types/streamer-wallet'

export const responseToData = (response: IStreamerWalletResponse): IStreamerWallet => {
	const _formatMethod = (response: IStreamerWalletPayoutMethodResponse) => {
		const method: Omit<IStreamerWalletPayoutMethod, 'payload' | 'dictionary'> = {
			slug: response.slug,
			title: response.title,
			description: response.description,
			visible: response.visible,
			status: response.status,
		}

		switch (response.slug) {
			case PayoutService.RAZOR_PAY:
				return {
					...method,
					slug: response.slug,
					dictionary: {
						documentTypes: response.dictionary.document_types,
						payoutMode: response.dictionary.payout_mode,
					},
					payload: {
						fullName: response.payload.full_name,
						birthday: response.payload.birthday,
						phone: response.payload.phone,
						email: response.payload.email,
						address: response.payload.address,
						documentType: response.payload.document_type,
						numberIdentification: response.payload.number_identification,
						panCard: response.payload.pan_card,
						panCardDoc: response.payload.pan_card_doc,
						payoutMode: response.payload.payout_mode,
						accountVpa: response.payload.account_vpa,
						bankIfsc: response.payload.bank_ifsc,
						beneficiaryAccountNumber: response.payload.beneficiary_account_number,
					},
				}
			case PayoutService.TIPALTI:
				return {
					...method,
					slug: response.slug,
					dictionary: response.dictionary,
					payload: {
						name: response.payload.name,
						lastName: response.payload.last_name,
						middleName: response.payload.middle_name,
						birthday: response.payload.birthday,
						personalCode: response.payload.personal_code,
						city: response.payload.city,
						state: response.payload.state,
						zipCode: response.payload.zip_code,
						address: response.payload.address,
						accountNumber: response.payload.account_number,
						routingNumber: response.payload.routing_number,
					},
				}
			case PayoutService.TOCHKA_BANK:
				return {
					...method,
					slug: response.slug,
					dictionary: response.dictionary,
					payload: {
						name: response.payload.name,
						lastName: response.payload.last_name,
						middleName: response.payload.middle_name,
						personalCode: response.payload.personal_code,
						accountNumber: response.payload.account_number,
						routingNumber: response.payload.routing_number,
						selfEmployed: response.payload.self_employed,
					},
				}
			default:
				throw new Error('Unsupported payout service')
		}
	}

	return {
		balance: response.balance,
		currency: response.currency,
		earnings: {
			audited: response.audited_earnings,
			estimated: response.estimated_earnings,
		},
		cpaAmountReview: response.cpa_amount_review,
		methods: response.methods.map(method => _formatMethod(method)),
		paymentDate: response.payment_date,
	}
}
