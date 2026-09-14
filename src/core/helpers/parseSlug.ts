import { AdEntityType, AdFormat, CampaignType } from '../types'

export enum CampaignTypeSlug {
  BA = CampaignType.BRAND_AWARENESS,
  PF = CampaignType.PERFORMANCE,
  VOD = CampaignType.PREROLL,
	EXT = CampaignType.EXTENSION,
	SP = CampaignType.SPECIAL_PROJECT,
}

export enum AdEntityTypeDict {
  CMP = AdEntityType.CAMPAIGNS,
  GRP = AdEntityType.ADSETS,
  CRV = AdEntityType.CREATIVES,
}

export enum AdFormatDict {
  V = AdFormat.FULLSCREEN,
  L = AdFormat.LEADERBOARD,
  P = AdFormat.PIP,
  C = AdFormat.CUSTOM,
  YFS = AdFormat.YANDEX_FS,
  YT = AdFormat.YANDEX_TEXT,
}

// interface ParsedSlug {
// 	campaignType: CampaignTypeSlug
//   adEntityType: AdEntityTypeDict
//   adFormat: AdFormatDict
// }

type SplittedSlug = [
  keyof typeof CampaignTypeSlug,
  keyof typeof AdEntityTypeDict,
  keyof typeof AdFormatDict
]

export const parseSlug = (slug: string) => {
	if (typeof slug !== 'string') {
		throw new Error('Slug is not string')
	}

	const [type, kind, format]: SplittedSlug = slug.split('-') as SplittedSlug

	return {
		campaignType: CampaignTypeSlug[type] as unknown as CampaignType,
		adEntityType: AdEntityTypeDict[kind] as unknown as AdEntityType,
		adFormat: AdFormatDict[format] as unknown as AdFormat,
	}
}
