import type {
	ICreateBrandAwarenessCreativeData,
	ICreateExtensionCreativeData,
	ICreateSpecialProjectCreativeData,
	IUpdateBrandAwarenessCreativeData,
	IUpdateExtensionCreativeData,
	IUpdateSpecialProjectCreativeData,
} from '@/modules/Partner/views/FormCreative/api'

export type ICreateCreativeModel =
| ICreateBrandAwarenessCreativeData
| ICreateExtensionCreativeData
| ICreateSpecialProjectCreativeData

export type IUpdateCreativeModel =
| IUpdateBrandAwarenessCreativeData
| IUpdateExtensionCreativeData
| IUpdateSpecialProjectCreativeData
