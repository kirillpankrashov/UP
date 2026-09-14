import {
	type IRazorPayUser,
	type IRazorPayUserResponse,
	type IStreamerPayoutPayload,
	type ITipaltiUser,
	type ITipaltiUserResponse,
	type ITochkaBankUser,
	type ITochkaBankUserResponse,
	PayoutService,
} from '@/core/types'

const isRazorPayUser = (model: any): model is IRazorPayUser => (model as IRazorPayUser) !== undefined
const isTipaltiUser = (model: any): model is ITipaltiUser => (model as ITipaltiUser) !== undefined
const isTochkaUser = (model: any): model is ITochkaBankUser => (model as ITochkaBankUser) !== undefined

type ModelToPayloadArgs = {
	(method: PayoutService.RAZOR_PAY, model: IRazorPayUser): IRazorPayUserResponse
	(method: PayoutService.TIPALTI, model: ITipaltiUser): ITipaltiUserResponse
	(method: PayoutService.TOCHKA_BANK, model: ITochkaBankUser): ITochkaBankUserResponse
}

export const modelToPayload: ModelToPayloadArgs = ((method: PayoutService, model: IStreamerPayoutPayload) => {
	switch (method) {
		case PayoutService.RAZOR_PAY:
			if (isRazorPayUser(model)) {
				return {
					full_name: model.fullName,
					birthday: model.birthday,
					phone: model.phone,
					email: model.email,
					address: model.address,
					document_type: model.documentType,
					number_identification: model.numberIdentification,
					pan_card: model.panCard,
					pan_card_doc: model.panCardDoc,
					payout_mode: model.payoutMode,
					account_vpa: model.accountVpa,
					bank_ifsc: model.bankIfsc,
					beneficiary_account_number: model.beneficiaryAccountNumber,
				} as IRazorPayUserResponse
			}
			throw new Error(`Invalid model for ${PayoutService.RAZOR_PAY}`)
		case PayoutService.TIPALTI:
			if (isTipaltiUser(model)) {
				return {
					name: model.name,
					last_name: model.lastName,
					middle_name: model.middleName,
					birthday: model.birthday,
					personal_code: model.personalCode,
					city: model.city,
					state: model.state,
					zip_code: model.zipCode,
					address: model.address,
					account_number: model.accountNumber,
					routing_number: model.routingNumber,
				} as ITipaltiUserResponse
			}
			throw new Error(`Invalid model for ${PayoutService.TIPALTI}`)
		case PayoutService.TOCHKA_BANK:
			if (isTochkaUser(model)) {
				return {
					name: model.name,
					last_name: model.lastName,
					middle_name: model.middleName,
					personal_code: model.personalCode,
					account_number: model.accountNumber,
					routing_number: model.routingNumber,
					self_employed: model.selfEmployed,
				} as ITochkaBankUserResponse
			}
			throw new Error(`Invalid model for ${PayoutService.TOCHKA_BANK}`)
		default:
			throw new Error('Unsupported payout service')
	}
}) as ModelToPayloadArgs
