import type {
	IBrandAwarenessAdset,
	IBrandAwarenessAdsetInfo,
	IBrandAwarenessAdsetShort,
	IBrandAwarenessCompletedAdset,
	IExtensionAdset,
	IExtensionAdsetInfo,
	IExtensionAdsetShort,
	IPerformanceAdset,
	IPerformanceAdsetInfo,
	IPerformanceAdsetShort,
	IPerformanceCompletedAdset,
	IPrerollAdset,
	IPrerollAdsetInfo,
	IPrerollAdsetShort,
	IPrerollCompletedAdset,
	ISpecialProjectAdset,
	ISpecialProjectAdsetInfo,
} from '../api'

export type IAdset =
	| IBrandAwarenessAdset
	| IPerformanceAdset
	| IPrerollAdset
	| IBrandAwarenessCompletedAdset
	| IPerformanceCompletedAdset
	| IPrerollCompletedAdset
	| IExtensionAdset
	| ISpecialProjectAdset

export type IAdsetShort =
	| IBrandAwarenessAdsetShort
	| IPerformanceAdsetShort
	| IPrerollAdsetShort
	| IExtensionAdsetShort

export type IActiveAdset =
	| IBrandAwarenessAdset
	| IPerformanceAdset
	| IPrerollAdset
	| IExtensionAdset
	| ISpecialProjectAdset

export type IActiveAdsetInfo =
	| IBrandAwarenessAdsetInfo
	| IPerformanceAdsetInfo
	| IPrerollAdsetInfo
	| IExtensionAdsetInfo
	| ISpecialProjectAdsetInfo
