export interface IUpdateBillingData {
  name: string
  email: string
  address: string
  phone: string
  bankName: string
  bankAccountName: string
  bankAccountHolderAddress: string
  bankAddress: string
  bankAccountNumber: string
  swiftCode: string
  routingNumber: string
}

export interface IUpdateBillingPayload {
  name: string
  email: string
  address: string
  phone: string
  bank_name: string
  bank_account_name: string
  bank_account_holder_address: string
  bank_address: string
  bank_account_number: string
  swift_code: string
  routing_number: string
}
