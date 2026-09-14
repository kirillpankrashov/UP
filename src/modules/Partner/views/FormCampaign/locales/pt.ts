import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaign: {
		defaultName: 'Nome da campanha',
		defaultNameNew: 'Nova Campanha',
		group: 'Grupo',
		loading: 'Campaign loading ..',
		fetchError: {
			title: 'Falha ao carregar a campanha',
			description: 'Ocorreu um erro ao carregar a campanha. Por favor, tente novamente mais tarde.',
			retry: 'Tentar novamente',
		},
		type: {
			title: 'Tipo de campanha',
			description: 'Escolha o tipo de campanha que se adequa aos seus objectivos de marketing.',
			comingSoon: 'Em breve',
		},
		types: {
			awareness: {
				title: 'Consciência da marca',
				description: 'Custo fixo do anúncio com base no modelo CPM',
			},
			brandLift: {
				title: 'Elevação de Marca',
				description: 'Investigação que mede o nível de percepção da marca ou do produto',
			},
			task: {
				title: 'Tarefa',
				description: 'Atribuição com um custo individual e envolvimento directo da serpentina',
			},
			performance: {
				title: 'Interactive',
				description: 'Custo de anúncio flexível com base no modelo CPA',
			},
		},
		settings: {
			title: 'Configurações da campanha',
			advice: {
				title: 'Que dados são estes?',
				name: {
					title: 'Nome da campanha',
					description: 'que aparecerão de forma diferente das serpentinas durante a emissão.',
				},
				currency: {
					title: 'A moeda',
					description: 'na qual a colocação da sua campanha será cobrada.',
				},
			},
			form: {
				name: {
					label: 'Nome da campanha',
					placeholder: 'Promoção de Primavera, por exemplo',
				},
				description: {
					label: 'Descrição da campanha',
					placeholder: 'Descrever campanha',
				},
				externalId: {
					label: 'External ID',
					placeholder: 'Por exemplo, PF-CMP-1661693993',
				},
				category: {
					label: 'Categoria da campanha',
					placeholder: 'Seleccione a categoria',
					noData: 'Sem categorias',
				},
				currency: {
					label: 'Moeda',
					placeholder: 'Seleccione a moeda',
				},
				schedule: {
					startedAtLabel: 'Data de início',
					endedAtLabel: 'Data de conclusão',
				},
				holding: {
					label: 'Participação do anunciante',
					placeholder: 'Seleccione a exploração',
				},
				advertiser: {
					label: 'Anunciante',
					placeholder: 'Seleccionar anunciante',
					noData: 'Sem dados',
				},
				mediaAgency: {
					label: 'Agência de mídia',
					placeholder: 'Selecione a agência de mídia',
					noData: 'Sem dados',
				},
				ordMarkup: {
					label: 'ORD markup',
					placeholder: '',
				},
				status: {
					label: 'Status',
				},
				awareness: {
					description: {
						label: 'Awareness',
						placeholder: 'Describe campaign for streamers',
					},
				},
				brandlift: {
					description: {
						label: 'Brand Lift',
						placeholder: 'Describe campaign for streamers',
					},
				},
				timezone: {
					label: 'Fuso horário',
					placeholder: 'Fuso horário',
				},
				formSendStatus: {
					updated: 'A campanha foi atualizada',
				},
			},
		},
		affiliateNetworks: {
			title: 'Redes de afiliados',
			description: 'Integração e configuração com redes de afiliados externos.',
			field: {
				label: 'Rede',
				notSelected: 'Sem integrações',
			},
		},
		urlParams: {
			title: 'GET parâmetros de construção',
			description: 'Parâmetros adicionais para a URL que permitem acompanhar o desempenho de suas campanhas.',
			field: {
				paramBlock: 'Parâmetro',
				param: 'Parâmetro ',
				name: 'Valor',
				addParam: 'Adicionar outro parâmetro',
				deleteParam: 'Eliminar parâmetro',
			},
		},
		pixel: {
			title: 'Uplify Pixel',
			description: 'Uplify Pixel ajuda você a rastrear a atividade do usuário no site do anunciante para entregar anúncios de forma eficaz.',
			field: {
				label: 'Uplify Pixel',
				btn: 'Copie o link do pixel',
			},
		},
	},
}

export default dict
