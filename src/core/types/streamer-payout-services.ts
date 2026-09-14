export enum PayoutService {
  TIPALTI = 'tipalti',
  TOCHKA_BANK = 'tochka',
  RAZOR_PAY = 'razorpay'
}

export enum RazorPayPayoutMode {
  UPI = 'UPI',
  IMPS = 'IMPS',
  NEFT = 'NEFT',
  RTGS = 'RTGS',
}

export interface ITochkaBankUserResponse {
  name: string
  last_name: string
  middle_name: string
  personal_code: string
  account_number: string
  routing_number: string
  self_employed?: boolean
}

export interface ITipaltiUserResponse {
  name: string
  last_name: string
  middle_name: string
  birthday: Date
  personal_code: string
  city: string
  state: string
  zip_code: string
  address: string
  account_number: string
  routing_number: string
}

export interface IRazorPayUserResponse {
  full_name: string
  birthday: Date
  phone: string
  email: string
  address: string
  document_type: string
  number_identification?: string
  pan_card?: string
  pan_card_doc?: string
  payout_mode: RazorPayPayoutMode
  account_vpa?: string
  bank_ifsc?: string
  beneficiary_account_number?: string
}

export type IStreamerPayoutPayloadResponse = ITochkaBankUserResponse | ITipaltiUserResponse | IRazorPayUserResponse

export interface ITochkaBankUser {
  name: string
  lastName: string
  middleName: string
  personalCode: string
  accountNumber: string
  routingNumber: string
  selfEmployed?: boolean
}

export interface ITipaltiUser {
  name: string
  lastName: string
  middleName: string
  birthday: Date
  personalCode: string
  city: string
  state: string
  zipCode: string
  address: string
  accountNumber: string
  routingNumber: string
}

export interface IRazorPayUser {
  fullName: string
  birthday: Date
  phone: string
  email: string
  address: string
  documentType: string
  numberIdentification?: string
  panCard?: string
  panCardDoc?: string
  payoutMode: RazorPayPayoutMode
  accountVpa?: string
  bankIfsc?: string
  beneficiaryAccountNumber?: string
}

export type IStreamerPayoutPayload = ITochkaBankUser | ITipaltiUser | IRazorPayUser
