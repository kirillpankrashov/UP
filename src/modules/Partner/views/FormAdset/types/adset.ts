import type {
	IBrandAwarenessAdset,
	IExtensionAdset,
	IPerformanceAdset,
	IPrerollAdset,
	ISpecialProjectAdset,
} from '@/modules/Partner/views/FormAdset/api'

export type IAdset =
| IBrandAwarenessAdset
| IPerformanceAdset
| IPrerollAdset
| IExtensionAdset
| ISpecialProjectAdset
