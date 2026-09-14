import { DomainName, DomainURL, type IDomain } from '@/core/types'
import { DOMAINS_CONFIG } from '@/core/config'

const _findDomain = (name: DomainName) => (
	DOMAINS_CONFIG.find(domain => domain.name === name) as IDomain
)

export const getDomain = () => {
	switch (window.location.origin) {
		case DomainURL.STREAMO:
			return _findDomain(DomainName.STREAMO) as IDomain
		case DomainURL.STREAMMONEY:
			return _findDomain(DomainName.STREAMMONEY) as IDomain
		case DomainURL.PARETO:
			return _findDomain(DomainName.PARETO) as IDomain
		case DomainURL.GAMING_PARTNERS:
			return _findDomain(DomainName.GAMING_PARTNERS) as IDomain
		case DomainURL.JONEKIRI:
			return _findDomain(DomainName.JONEKIRI) as IDomain
		case DomainURL.TROVO:
			return _findDomain(DomainName.TROVO) as IDomain
		case DomainURL.AMPVERSE:
			return _findDomain(DomainName.AMPVERSE) as IDomain
		default:
			return _findDomain(DomainName.UPLIFY) as IDomain
	}
}
