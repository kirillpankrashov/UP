import type {
	IBrandAwarenessAdset,
	IBrandAwarenessCampaign,
	IBrandAwarenessCreative,
	IExtensionAdset,
	IExtensionCampaign,
	IExtensionCreative,
	IPerformanceAdset,
	IPerformanceCampaign,
	IPrerollAdset,
	IPrerollCampaign,
	ISpecialProjectAdset,
	ISpecialProjectCampaign,
	ISpecialProjectCreative,
} from '@/modules/Partner/views/Campaigns/api'

export type AdEntity =
	| IBrandAwarenessCampaign
	| IBrandAwarenessAdset
	| IBrandAwarenessCreative
	| IPerformanceCampaign
	| IPerformanceAdset
	| IPrerollCampaign
	| IPrerollAdset
	| IExtensionCampaign
	| IExtensionAdset
	| IExtensionCreative
	| ISpecialProjectCampaign
	| ISpecialProjectAdset
	| ISpecialProjectCreative

export type AdEntityCampaign =
	| IBrandAwarenessCampaign
	| IPerformanceCampaign
	| IPrerollCampaign
	| IExtensionCampaign
	| ISpecialProjectCampaign

export type AdEntityAdset =
	| IBrandAwarenessAdset
	| IPerformanceAdset
	| IPrerollAdset
	| IExtensionAdset
	| ISpecialProjectAdset

export type AdEntityCreative =
	| IBrandAwarenessCreative
	| IExtensionCreative
	| ISpecialProjectCreative
