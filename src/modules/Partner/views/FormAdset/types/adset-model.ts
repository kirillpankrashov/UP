import type {
	ICreateBrandAwarenessAdsetData,
	ICreateExtensionAdsetData,
	ICreatePerformanceAdsetData,
	ICreatePrerollAdsetData,
	ICreateSpecialProjectAdsetData,
	IUpdateBrandAwarenessAdsetData,
	IUpdateExtensionAdsetData,
	IUpdatePerformanceAdsetData,
	IUpdatePrerollAdsetData,
	IUpdateSpecialProjectAdsetData,
} from '@/modules/Partner/views/FormAdset/api'

export type ICreateAdsetModel =
| ICreateBrandAwarenessAdsetData
| ICreatePerformanceAdsetData
| ICreatePrerollAdsetData
| ICreateExtensionAdsetData
| ICreateSpecialProjectAdsetData

export type IUpdateAdsetModel =
| IUpdateBrandAwarenessAdsetData
| IUpdatePerformanceAdsetData
| IUpdatePrerollAdsetData
| IUpdateExtensionAdsetData
| IUpdateSpecialProjectAdsetData
