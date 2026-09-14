import { default as baseDict } from './en'

const dict: typeof baseDict = {
	advertisers: {
		header: {
			title: 'Anunciantes',
		},
		tabs: {
			advertisers: 'Anunciantes',
			holdings: 'Participações',
		},
		advertisers: {
			table: {
				advertiser: 'Anunciante',
				currency: 'Moeda',
				balance: 'Equilíbrio',
				links: 'Links (Patrocínio)',
			},
			links: {
				campaigns: 'Campanhas',
				groups: 'Grupos',
				creatives: 'Criativos',
				holdings: 'Participações',
			},
		},
		holdings: {
			table: {
				holding: 'Participações',
				description: 'Descrição',
			},
		},
	},
}

export default dict
