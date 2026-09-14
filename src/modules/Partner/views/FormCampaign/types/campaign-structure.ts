import type {
	IBrandAwarenessCampaignStructure,
	IExtensionCampaignStructure,
	IPerformanceCampaignStructure,
	IPrerollCampaignStructure,
	ISpecialProjectCampaignStructure,
} from '@/modules/Partner/views/FormCampaign/api'

export type ICampaignStructure =
	| IBrandAwarenessCampaignStructure
	| IPerformanceCampaignStructure
	| IPrerollCampaignStructure
	| IExtensionCampaignStructure
	| ISpecialProjectCampaignStructure
