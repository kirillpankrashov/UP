import type { DomainName } from '@/core/types'

export interface RuleForm {
	domain?: DomainName
	email: string
	language: string
	country: string
	gender: string
	birthday: string
}
