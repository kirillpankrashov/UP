import type {
	IBrandAwarenessCampaign,
	IExtensionCampaign,
	IPerformanceCampaign,
	IPrerollCampaign,
	ISpecialProjectCampaign,
} from '@/modules/Partner/views/FormCampaign/api'

export type ICampaign =
	| IBrandAwarenessCampaign
	| IPerformanceCampaign
	| IPrerollCampaign
	| IExtensionCampaign
	| ISpecialProjectCampaign
