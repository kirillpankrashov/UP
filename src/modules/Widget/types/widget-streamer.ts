import type { TStreamerResponse } from '@/core/types'

export type IWidgetStreamer = Pick<TStreamerResponse['user'],
	'user_id' |
  'name' |
  'email' |
  'currency' |
  'locale' |
  'balance' |
  'email_verified' |
  'signed_up' |
  'user_hash' |
  'domain' |
  'deleted' |
  'deleted_left_days' |
  'deleted_request' |
	'language' |
  'country' |
  'gender' |
  'birthday' |
  'referral' |
  'freemium_active'
>