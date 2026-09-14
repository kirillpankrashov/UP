import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creators: {
		header: {
			title: 'Criadores',
		},
		tabs: {
			overview: 'Visão geral',
			history: 'Histórico de transações',
			campaignsActive: 'Campanhas',
			campaignsClosed: 'Concluído',
			creators: 'Criadores',
			billing: 'Faturamento',
		},
		invite: {
			title: 'Convidar criadores',
			invited: 'Criadores convidados',
			amount: 'Montante a ser pago',
			link: 'Link do convite',
			advice: {
				title: 'Obtenha uma parte da receita',
				description: 'Gere participação na receita de seus criadores que você indicar enquanto eles estiverem ativos no Uplify.',
				link: {
					url: '/',
					label: 'Como funciona',
				},
			},
		},
		creatorsList: 'Lista de criadores',
		billing: {
			companyInformation: {
				title: 'Informações sobre a empresa',
				name: {
					label: 'Nome',
					placeholder: 'Nome da empresa',
				},
				email: {
					label: 'E-mail',
					placeholder: 'email@email.com',
				},
				address: {
					label: 'Endereço eletrônico',
					placeholder: 'Endereço da empresa',
				},
				phone: {
					label: 'Telefone para contato',
					placeholder: '+1 (123) 456 789',
				},
			},
			paymentDetails: {
				title: 'Detalhes do pagamento',
				bankName: {
					label: 'Nome do banco',
					placeholder: '',
				},
				bankAccountName: {
					label: 'Nome da conta bancária',
					placeholder: '',
				},
				bankAccountHolderAddress: {
					label: 'Endereço do titular da conta bancária',
					placeholder: '',
				},
				bankAddress: {
					label: 'Endereço do banco',
					placeholder: '',
				},
				bankAccountNumber: {
					label: 'Número da conta bancária',
					placeholder: '',
				},
				BIC: {
					label: 'Código BIC / SWIFT',
					placeholder: '',
				},
				routingNumber: {
					label: 'Número de registro',
					placeholder: '',
				},
			},
			invoices: {
				title: 'Faturas',
				date: 'Data da fatura',
				amount: 'Valor da fatura',
				invoice: 'Fatura',
			},
		},
		history: {
			title: 'Histórico de transações',
			payments: 'Transações para sempre',
			none: 'Não há transações',
			columns: {
				date: 'Encontro',
				payment: 'Pagamento por dia',
				details: 'Detalhes',
			},
			detailed: {
				title: 'Detalização de transações',
				description: 'Criadores que trouxeram dinheiro naquele dia.',
			},
		},
		list: {
			title: 'Lista de criadores',
			description: 'Lista de criadores que você convidou. Pagamentos para sempre ',
			none: 'Não há criadores',
			columns: {
				creator: 'Criadora',
				lastActivity: 'Último dia de atividade',
				earnings: 'Ganhos',
			},
		},
		creatorsPayout: {
			title: 'Pagamento aos criadores',
			description: 'Insira o valor que seus criadores devem receber quando patrocinarem sua campanha. Especifique o custo por mil vistas (CPM).',
			link: {
				text: 'Mais sobre formatos criativos',
				href: 'https://help.uplify.app/en/articles/5640856-in-stream-campaign-formats',
			},
			thirdParty: {
				checkbox: 'Permitir que parceiros terceirizados façam patrocínios',
				popover: {
					label: 'Dica',
					text: 'Insira o valor básico que inclui sua comissão e pagamento aos criadores. Especifique o custo por mil vistas (CPM).',
				},
			},
			comission: {
				label: 'Comissão',
				popover: {
					label: 'Dica',
					text: 'Usado para campanhas com acordos individuais com patrocinadores ou se os pagamentos aos criadores não estiverem configurados.',
				},
			},
			darkMarket: {
				checkbox: 'Permitir aumento da taxa para clientes do mercado negro',
				popover: {
					label: 'Dica',
					text: 'Insira um valor base para clientes da categoria do mercado negro (jogos de azar, cassino, criptografia, etc.). Especifique o custo por mil vistas (CPM).',
				},
			},
			cpaLabel: 'Pagamento aos criadores',
			darkMarketLabel: 'Preços de terceiros (incl. taxa)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip_video: 'Overlay 15%',
				interactive: 'Interativo',
				preroll: 'Pre-Roll',
				cpa: 'CPA cost',
				cpc: 'CPC cost',
			},
		},
		creatorsTable: {
			columns: {
				creators: 'Criador',
				lastActivity: 'Ultima atividade',
				balance: 'Saldo',
				campaign: 'Campanhas',
			},
			status: {
				checkList: {
					label: 'Integração em andamento',
					text: 'O streamer ainda não concluiu o processo de integração.',
				},
				payable: {
					label: 'Verifique as configurações de pagamento',
					text: 'O streamer ainda não configurou o pagamento.',
				},
				lowCtr: {
					label: 'CTR baixa',
					text: 'Problemas com CTR em campanhas.',
				},
			},
			none: 'Sem dados',
		},
		settings: {
			title: 'Configurações',
			custom: {
				headline: 'Pagamento personalizado',
				descr: 'Insira o valor personalizado que {streamer} deve receber ao fazer um patrocínio. Especifique o custo por mil vistas (CPM).',
			},
			darkMarket: {
				headline: 'Taxa para clientes do mercado escuro',
			},
			cpaLabel: 'Pagamento aos criador',
			darkMarketLabel: 'Preços de terceiros (incl. taxa)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip: 'Overlay 15%',
				interactive: 'Interativo',
			},
		},
		stats: {
			columns: {
				campaign: 'Campanha',
				creator: 'Criador',
				income: 'Renda',
				views: 'Vistas',
				avgCtr: 'Méd. CTR',
				ctr: 'CTR',
				status: 'Status',
			},
			none: 'Sem dados',
		},
		campaignCreators: {
			title: 'Relatório de campanha: {title}',
		},
		creatorCampaigns: {
			title: '{streamer} campanhas',
		},
		categoriesStopList: {
			title: 'Lista de parada de categorias',
			description: 'As campanhas das categorias selecionadas serão automaticamente desativadas para exibição na seção de anúncios in-stream para seus criadores.',
		},
		campaigns: {
			active: {
				title: 'Campanhas ativas',
				description: 'Lista de campanha disponível para seus criadores',
			},
			closed: {
				title: 'Campanhas fechadas',
				description: 'Lista de campanhas fechadas',
			},
			reportBtn: {
				full: 'Relatório da campanha',
				short: 'Relatório',
			},
			none: 'As campanhas publicitárias estão a chegar',
		},
		campaignRow: {
			of: 'de',
			dailyActions: 'Ações diário',
			dailyLimit: 'Visualizações restantes',
			dailyActionsLimit: 'Ações diárias restantes',
			dailyActionsLimitLabel: 'O número total de ações disponíveis para toda a comunidade é exibido',
			dailyImpressions: 'Vistas diário',
			potentialIncome: 'Receita Potencial',
			yourIncome: 'Os seus rendimentos',
			yourCTR: 'Seu CTR',
			averageCTR: 'CTR médio',
			dateStart: 'Data de início',
			dateEnd: 'Data final',
			enable: 'Habilitar',
			disable: 'Desativar',
			attended: 'Atendido',
			toggling: 'Pendente..',
			tags: {
				undefinedFormat: 'Formato desconhecido',
				dailyLimitDepleted: 'Limite de hoje esgotado',
				totalLimitDepleted: 'Limite de hoje esgotado',
				setupExtension: 'Extensão de instalação',
				checkExtension: 'Verifique o status da extensão',
				extension: 'Extensão',
				actionBonus: 'Bônus de Ação',
				dailyActionsLimitDepleted: 'Limite de ação atingido',
				performanceDailyDepleted: 'Limite de hoje esgotado',
			},
			disabledUntil: 'Desativado até: {date}',
			reasons: {
				lowCTR: '🔥 Motivo: CTR baixo',
				lowCTRLink: {
					text: 'Como melhorar meu CTR?',
					href: 'https://www.notion.so/CTR-todo-o-que-voc-precisa-saber-f59965b014134b39800d87b2e3d7216c',
				},
				moderator: 'Motivo: decisão do moderador',
			},
			format: {
				fullscreen: 'Overlay 50%',
				pip: 'Overlay 15%',
			},
			totalImpressions: 'Visualizações disponíveis',
		},
		campaignSidebar: {
			potentialRevenue: 'Receita Potencial',
			totalRevenue: 'Sua receita total',
			revenue: 'Receita',
			estimatedRevenue: 'Receita estimada',
			ctr: 'Seu CTR',
			target_ctr: 'Alvo ctr',
			evr: 'Sua qualidade de conversões',
			clicks: 'Cliques',
			date: 'Dias restantes',
			dateStart: 'Data de início',
			dateEnd: 'Data final',
			paymentType: 'Tipo de pagamento',
			pricePerViews: 'Preço por 1000 vistas',
			pricePerAction: 'Preço por 1 ação',
			pricePerClick: 'Preço por 1 clique',
			frequency: 'Frequência',
			adFormat: 'Formato do anúncio',
			advertiserCategory: 'Categoria do anunciante',
			description: 'Descrição da campanha',
			creativePreview: 'Pré-visualização criativa',
			messageInDescription: 'Mensagem na descrição',
			chatMessage: 'Mensagem em chatbot',
			campaignOn: 'Campanha em',
			campaignOff: 'Campanha de lançamento',
			productLink: 'Link de produto',
			copyProductLink: 'Copiar link de produto pessoal',
			deliveredAtions: 'Ações entregues',
			deliveredImpressions: 'Vistas entregues',
			deliveredDailyActions: 'Ações entregues',
			deliveredClicks: 'Cliques entregues',
			downloadCreative: 'Baixar criativo',
			copyDescription: 'Descrição da cópia',
			videos: 'Link de vídeo',
			addNewVideo: 'Adicione outro vídeo',
			howToIncreaseCtr: 'Como aumentar a CTR?',
			howToIncreaseEvr: 'Como aumentar a EVR?',
			evrList: 'Eventos EVR',
			scale: {
				poor: 'Pobre',
				fair: 'Justa',
				good: 'Boa',
				veryGood: 'Muito bom',
				excellent: 'Excelente',
			},
		},
	},
}

export default dict
