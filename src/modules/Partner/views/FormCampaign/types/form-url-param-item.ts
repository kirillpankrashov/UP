import { CampaignUrlParams } from '@/modules/Partner/views/FormCampaign/types'

export interface IFormUrlParamItem {
	key: string
  param: CampaignUrlParams | undefined
  name: string | null
}
