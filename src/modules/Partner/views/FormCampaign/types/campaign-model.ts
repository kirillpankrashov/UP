import type {
	ICreateBrandAwarenessCampaignData,
	ICreateExtensionCampaignData,
	ICreatePerformanceCampaignData,
	ICreatePrerollCampaignData,
	ICreateSpecialProjectCampaignData,
	IUpdateBrandAwarenessCampaignData,
	IUpdateExtensionCampaignData,
	IUpdatePerformanceCampaignData,
	IUpdatePrerollCampaignData,
	IUpdateSpecialProjectCampaignData,
} from '@/modules/Partner/views/FormCampaign/api'

export type ICreateCampaignModel =
  | ICreateBrandAwarenessCampaignData
	| ICreatePerformanceCampaignData
	| ICreatePrerollCampaignData
	| ICreateExtensionCampaignData
	| ICreateSpecialProjectCampaignData

export type IUpdateCampaignModel =
	| IUpdateBrandAwarenessCampaignData
	| IUpdatePerformanceCampaignData
	| IUpdatePrerollCampaignData
	| IUpdateExtensionCampaignData
	| IUpdateSpecialProjectCampaignData
