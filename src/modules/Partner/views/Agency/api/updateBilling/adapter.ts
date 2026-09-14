import type { IUpdateBillingData, IUpdateBillingPayload } from './types'

export const dataToPayload = (data: IUpdateBillingData): IUpdateBillingPayload => ({
	name: data.name,
	email: data.email,
	address: data.address,
	phone: data.phone,
	bank_name: data.bankName,
	bank_account_name: data.bankAccountName,
	bank_account_holder_address: data.bankAccountHolderAddress,
	bank_address: data.bankAddress,
	bank_account_number: data.bankAccountNumber,
	swift_code: data.swiftCode,
	routing_number: data.routingNumber,
})
