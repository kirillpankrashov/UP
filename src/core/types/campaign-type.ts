export enum CampaignType {
  BRAND_AWARENESS = 'brand_awareness',
  PERFORMANCE = 'performance',
  PREROLL = 'preroll',
	EXTENSION = 'extension',
	SPECIAL_PROJECT = 'special_project',
}

export interface ICampaign {
  id: CampaignType
  title: string
  description: string
  icon: 'speaker' | 'list' | 'task-checked' | 'dialog-bubbles'
  disabled?: boolean
}
