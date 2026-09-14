import type { Locale,Platform } from '@/core/types'

export enum DomainURL {
  LOCAL = 'http://localhost:8080',
  LOCAL_S = 'https://localhost:8080',
  LOCAL_DOMAIN = 'http://dashboard.uplify:8080',
  LOCAL_DOMAIN_S = 'https://dashboard.uplify:8080',
  ALPHA = 'https://alpha.uplify.app',
  BETA = 'https://beta.uplify.app',
  RELEASE = 'https://release.uplify.app',
  PLATFORM = 'https://platform.uplify.app',
  STREAMO = 'https://streamo.uplify.app',
  PARETO = 'https://pareto.uplify.app',
  PARETO_IO = 'https://uplify.pareto.io',
  TROVO = 'https://trovo.uplify.app',
  STREAMMONEY = 'https://streammoney.fun',
  GAMING_PARTNERS = 'https://gaming-partners.uplify.app',
  JONEKIRI = 'https://jonekiri.uplify.app',
  AMPVERSE = 'https://ampvers-pulse.uplify.app',
}

export enum DomainName {
  UPLIFY = 'uplify',
  STREAMO = 'streamo',
  PARETO = 'pareto',
  TROVO = 'trovo',
  STREAMMONEY = 'streammoney',
  GAMING_PARTNERS = 'gaming-partners',
  JONEKIRI = 'jonekiri',
  AMPVERSE = 'ampverse',
}

export enum DomainTheme {
	UPLIFY = 'theme-default',
  PARETO = 'theme-pareto',
  TROVO = 'theme-trovo',
  STREAMMONEY = 'theme-streammoney',
  GAMING_PARTNERS = 'theme-gaming-partners',
  JONEKIRI = 'theme-jonekiri',
  AMPVERSE = 'theme-ampverse',
}

export interface IDomain {
	name: DomainName
	baseUrl: DomainURL
	urls: DomainURL[]
	theme: DomainTheme
	platforms: Platform[]
	locales: Locale[]
}
