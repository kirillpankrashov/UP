import type { IBilling, IBillingResponse } from './types'

export const responseToData = (response: IBillingResponse): IBilling => ({
	name: response.name,
	email: response.email,
	address: response.address,
	phone: response.phone,
	bankName: response.bank_name,
	bankAccountName: response.bank_account_name,
	bankAccountHolderAddress: response.bank_account_holder_address,
	bankAddress: response.bank_address,
	bankAccountNumber: response.bank_account_number,
	swiftCode: response.swift_code,
	routingNumber: response.routing_number,
})
