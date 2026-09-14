import { default as baseDict } from './en'

const dict: typeof baseDict = {
	advertisers: {
		header: {
			title: 'Anunciantes',
		},
		tabs: {
			advertisers: 'Anunciantes',
			holdings: 'Tenencias',
		},
		advertisers: {
			table: {
				advertiser: 'Anunciante',
				currency: 'Moneda',
				balance: 'Saldo',
				links: 'Enlaces (Patrocinio)',
			},
			links: {
				campaigns: 'Campañas',
				groups: 'Grupos',
				creatives: 'Creativos',
				holdings: 'Tenencias',
			},
		},
		holdings: {
			table: {
				holding: 'Nombre de la Tenencia',
				description: 'Descripción',
			},
		},
	},
}

export default dict
