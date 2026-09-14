import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaigns: {
		header: {
			title: {
				'brand-awareness': 'Campañas de patrocinio',
				performance: 'Campañas interactivas',
				preroll: 'Campañas preroll',
				extension: 'Campañas de extensión',
				specialProject: 'Campañas de proyecto especial',
			},
		},
		balance: 'Balance',
		tabs: {
			'brand-awareness': 'Conciencia',
			performance: 'Rendimiento',
			preroll: 'Preroll',
			extension: 'Extensión',
			specialProject: 'Proyecto especial',
		},
		types: {
			campaign: 'Campañas',
			group: 'Grupos',
			creative: 'Creativos',
		},
		tables: {
			actions: {
				downloadReport: 'Descargar Informe',
				viewReport: 'Ver informe',
				duplicate: 'Duplicar',
				remove: 'Eliminar',
			},
			columns: {
				name: 'Nombre',
				state: 'Estado',
				disabledStatusReason: {
					closed: 'Contacte al soporte para activar',
					parentIsDisabled: 'Padre deshabilitado',
				},
				clicks: 'Clics',
				ctr: 'CTR',
				impressions: 'Vistas',
				reach: 'Alcance',
				id: 'ID',
				relatedCampaign: 'Campaña Relacionada',
				relatedGroup: 'Grupo Relacionado',
				format: 'Formato',
				budget: 'Presupuesto',
				budgetUsed: 'Presupuesto Utilizado',
				totalBudget: 'Presupuesto Total',
				advertiser: 'Anunciante',
				startedAt: 'Iniciado En',
				endedAt: 'Terminado En',
				platform: 'Plataforma',
				moderation: 'Moderación',
				moderationStatus: {
					pending: 'Pendiente',
					complete: 'Aprobado',
				},
				filterLabel: 'Ajustes de columna',
				channels: 'Canales',
				daysRemaining: 'Días restantes',
				externalId: 'ID externo',
				bid_cap: 'Bid cap',
				bid_cpa: 'Bid CPA',
				actions: 'Acciones',
			},
			noCampaigns: 'No tienes campañas',
			noGroups: 'No tienes grupos',
			noCreatives: 'No tienes creativos',
		},
		newCreative: {
			title: 'Nueva creatividad',
			description: 'Seleccione el grupo al que pertenecerá la creatividad',
		},
		newGroup: {
			title: 'Nuevo grupo',
			description: 'Seleccione la campaña a la que pertenecerá el grupo',
		},
		partnerSearchFilter: {
			add: 'Add Filter',
			status: 'Status',
			platform: 'Platform',
			advertiser: 'Advertiser',
			allAdvertisers: 'All advertisers',
		},
	},
}

export default dict
