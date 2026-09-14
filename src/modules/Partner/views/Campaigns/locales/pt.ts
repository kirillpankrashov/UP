import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaigns: {
		header: {
			title: {
				'brand-awareness': 'Campanhas de patrocínio',
				performance: 'Campanhas interativas',
				preroll: 'Campanhas preroll',
				extension: 'Campanhas de extensão',
				specialProject: 'Campanhas de projeto especial',
			},
		},
		balance: 'Equilíbrio',
		tabs: {
			'brand-awareness': 'Conhecimento',
			performance: 'Interactive',
			preroll: 'Preroll',
			extension: 'Extensão',
			specialProject: 'Projeto especial',
		},
		types: {
			campaign: 'Campanhas',
			group: 'Grupos',
			creative: 'Criativos',
		},
		tables: {
			actions: {
				downloadReport: 'Descarregar Relatório',
				viewReport: 'Veja o relatório',
				duplicate: 'Duplicado',
				remove: 'Remover',
			},
			columns: {
				name: 'Nome',
				state: 'Estado',
				disabledStatusReason: {
					closed: 'Entre em contato com o suporte para ativar',
					parentIsDisabled: 'Pai deficiente',
				},
				clicks: 'Cliques',
				ctr: 'CTR',
				impressions: 'Vistas',
				reach: 'Alcance',
				id: 'ID',
				relatedCampaign: 'Campanha relacionada',
				relatedGroup: 'Grupo relacionado',
				format: 'Formato',
				budget: 'Orçamento',
				budgetUsed: 'Orçamento utilizado',
				totalBudget: 'Orçamento total',
				advertiser: 'Anunciante',
				startedAt: 'Começou em',
				endedAt: 'Terminou em',
				platform: 'Plataforma',
				moderation: 'Moderação',
				moderationStatus: {
					pending: 'Pendente',
					complete: 'Aprovado',
				},
				filterLabel: 'configuração',
				channels: 'Channels',
				daysRemaining: 'Dias restantes',
				externalId: 'ID Externo',
				bid_cap: 'Bid cap',
				bid_cpa: 'Bid CPA',
				actions: 'Actions',
			},
			noCampaigns: 'Não tem campanhas',
			noGroups: 'Não tem grupos',
			noCreatives: 'Não tem criativos',
		},
		newCreative: {
			title: 'Novo criativo',
			description: 'Selecione o grupo ao qual o creativo pertencerá',
		},
		newGroup: {
			title: 'Novo grupo',
			description: 'Selecione a campanha à qual o grupo pertencerá',
		},
		partnerSearchFilter: {
			add: 'Filtr',
			status: 'Estado',
			platform: 'Platform',
			advertiser: 'Anunciante',
			allAdvertisers: 'Todos os Anunciantes',
		},
	},
}

export default dict
