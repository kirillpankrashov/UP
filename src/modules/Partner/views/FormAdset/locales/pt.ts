import { default as baseDict } from './en'

const dict: typeof baseDict = {
	adset: {
		defaultName: 'Nome do grupo',
		defaultNameNew: 'Novo Grupo',
		loading: 'Group loading ..',
		fetchError: {
			title: 'Falha ao carregar o grupo',
			description: 'Ocorreu um erro ao carregar o grupo ou os dados da campanha. Por favor, tente novamente mais tarde.',
			retry: 'Tentar novamente',
		},
		settings: {
			title: 'Configurações de grupo',
			description: 'Agrupe as suas campanhas por parâmetros e estabeleça objectivos para seguir cada uma delas de forma eficiente',
			form: {
				name: {
					title: 'Nome do grupo',
					label: 'O nome é visível apenas para si',
					placeholder: 'Grupo',
				},
				description: {
					title: 'Descrição do grupo',
					label: 'Descrição do grupo',
					placeholder: 'Descrever o grupo para o autor',
				},
				altName: {
					addBtn: 'Adicionar nome alternativo para streamers',
					label: 'Nome do grupo para streamers',
					placeholder: 'Por exemplo, Spring Promo',
				},
				externalId: {
					title: 'External ID',
					placeholder: 'Por exemplo, PF-CMP-1661693993',
				},
				platform: {
					title: 'Plataforma',
				},
				format: {
					title: 'Formato',
					moreAbout: 'Saiba mais sobre formatos criativos',
					formats: {
						fullscreen: {
							label: 'Vídeo em ecrã inteiro',
							description: 'Rollo médio colocado Em Stream em ecrã inteiro',
						},
						smallVideo: {
							label: 'Vídeo numa janela separada',
							description: 'Rollo médio colocado em fluxo vivo no ecrã 1/4',
						},
						custom: {
							label: 'Solução personalizada',
							description: 'Criativo multi-formato num fluxo ao vivo em qualquer área visível do ecrã',
						},
					},
				},
				formatSettings: {
					duration: {
						label: 'Duração, seg',
						tooltip: 'Tempo de exibição do criativo no ecrã. Para criativos de vídeo é usada a duração do vídeo e este campo é ignorado — relevante apenas para imagens.',
					},
					frequency: {
						label: 'Frequência, seg',
						tooltip: 'Intervalo após o qual o criativo será exibido novamente ao mesmo espectador. Deixe em branco para exibir constantemente',
					},
				},
				schedule: {
					title: 'Horário',
					startedAtLabel: 'Data de início',
					endedAtLabel: 'Data de conclusão',
				},
				viewTime: {
					label: 'Tempo de visualização',
					from: 'De',
					to: 'Para',
				},
				payType: {
					payPerImpression: 'Pagamento por impressão',
					payPerAction: 'Pagamento por ação',
				},
				budget: {
					title: 'Orçamento',
					costPerUnitLabel: 'Custo da publicidade por unidade',
					impressionsLabel: 'Número de vistas',
					totalBudget: 'Orçamento total',
					costPerActionLabel: 'O custo de uma ação',
					budgetLabel: 'Orçamento',
					totalActions: 'Número esperado de ações:',
					bidCap: 'Custo por milha, CPM',
					impressions: 'Impressões',
					cpc: 'Custo do clique',
					clicks: 'Número de cliques',
					conversions: 'Número de conversões',
					margin: 'Margem da Uplify',
					agencyCommission: 'Comissão da agência',
					cpmPercent: 'Divisão do orçamento, CPM',
					cpa: 'Custo de conversão',
					creatorsPayout: 'Pagamento de criadores',
					conversion: 'Número de conversões',
					infoMessage: 'Apenas para uso interno',
					dailyClickCap: 'Limite de cliques diários',
					dailyConversionCap: 'Limite de conversão diária',
					creatorsCPM: 'Pagamento de criadores de conteúdo por CPM',
					creatorsCPA: 'Pagamento de criadores por conversão',
				},
				targets: {
					title: 'Alvos',
					ctrLabel: 'CTR alvo',
					evrLabel: 'EVR alvo',
					cpaLabel: 'CPA alvo',
				},
				frequency: {
					title: 'Frequência',
					standard: {
						label: 'Norma',
						description: 'Padrão - Frequência recomendada de vistas com óptimo alcance: Adequado para campanhas a longo prazo',
					},
					accelerated: {
						label: 'Acelerado',
						description: 'Acelerado - Frequência de vistas com alcance máximo: adequado para campanhas de curto prazo',
					},
					customizable: {
						label: 'Personalizável',
						description: 'Personalizável - frequência de vistas com base em parâmetros específicos de alcance: adequado para campanhas não-padronizadas',
					},
					impressionsCount: 'Número de inserções',
					period: 'Period',
				},
				streamerDayLimit: {
					label: 'Limite diário de inserções por criador',
					placeholder: '100',
				},
				status: {
					label: 'Status',
				},
				timezone: {
					label: 'Fuso horário',
					placeholder: 'Fuso horário',
				},
				formSendStatus: {
					updated: 'O grupo foi atualizado',
				},
			},
		},
		alerts: {
			title: 'Alertas',
			description: {
				label: 'Descrição de alerta',
				placeholder: 'Installs {{current_actions}} / {{target_actions}}.\nInstall Opera GX and win iPhone\n',
			},
		},
		targeting: {
			title: 'Direcionamento por criadores',
			addition: {
				onlySelected: 'apenas seleccionada',
				exceptSelected: 'todos, excepto os seleccionados',
				excludeSelected: 'Excluir categorias seleccionadas da segmentação',
			},
			evaluation: {
				label: 'Avaliação do público',
				description: 'Seleccionar a língua de emissão para obter uma estimativa preliminar da audiência.',
				size: 'Tamanho',
				reach: 'Alcance',
				streamersNumber: 'Número de serpentinas',
				howCalculated: 'Como são calculados os indicadores?',
			},
			form: {
				agencies: {
					label: 'Seleção de rede',
					placeholder: 'Selecionar agência',
					warning: {
						title: 'Seu valor para CPM é menor que o preço da rede',
						text: 'O&nbsp;valor inserido para CPM &eacute;&nbsp;menor que o&nbsp;custo que a&nbsp;rede de&nbsp;parceiros exige.Voc&ecirc; poder&aacute; salvar a&nbsp;campanha, mas n&atilde;o funcionar&aacute; at&eacute; que o&nbsp;valor seja corrigido.',
					},
				},
				streamers: {
					label: 'Selecção de criadores',
					placeholder: 'Seleccionar criadores',
					pricePlaceholder: 'Preço',
					addBtn: 'Adicionar',
					nameColumn: 'Criador',
					priceColumn: 'Preço',
				},
				language: {
					label: 'Linguagem de transmissão',
					placeholder: 'Seleccionar linguagem',
				},
				countries: {
					label: 'Países',
					placeholder: 'Seleccione o país',
				},
				devices: {
					label: 'Dispositivas',
					placeholder: 'Seleccionar dispositivo',
				},
				gender: {
					label: 'Género',
					placeholder: 'Seleccionar género',
				},
				age: {
					label: 'Idade dos criadores',
					fromPlaceholder: 'a partir de',
					toPlaceholder: 'para',
				},
				ageRestrictions: {
					label: 'Criador tem restrições de idade activadas (18+)',
				},
				tags: {
					label: 'Etiquetas',
					placeholder: 'Seleccionar etiqueta',
				},
			},
		},
		targetingAudience: {
			title: 'Direcionamento pelo público',
		},
		labels: {
			title: 'Selo de patrocínio<br/>(apenas mercado CIS)',
			fields: {
				chatbot: {
					label: 'Chatbot erid ID',
				},
				creative: {
					label: 'Creative erid ID',
				},
			},
		},
		chatBot: {
			title: 'Configurações do chatbot',
			form: {
				productUrl: {
					label: 'URL do produto',
					placeholder: 'Introduzir link',
				},
				mobileProductUrl: {
					label: 'URL do produto móvel (Deeplink)',
					placeholder: 'Introduzir link',
				},
				productUrlShort: {
					label: 'URL curto',
					placeholder: '',
				},
				chatBotText: {
					label: 'Texto para chatbot',
					placeholder: 'Digite o texto',
				},
			},
		},
		creative: {
			title: 'Dados criativos',
			form: {
				productUrl: {
					label: 'URL do produto',
					placeholder: 'Introduzir link',
				},
				mobileProductUrl: {
					label: 'URL do produto móvel (Deeplink)',
					placeholder: 'Introduzir link',
				},
				videoDescriptionText: {
					label: 'Descripción Texto',
					placeholder: 'Digite o texto',
				},
			},
		},
		preview: {
			title: 'Dados criativos',
			advice: {
				title: 'Requisitos',
				requirements: 'Resolução: 1920 x 1080 pixels.<br/>Formato: MP4<br/>Tamanho: até {size} MB',
			},
			errors: {
				unknown: 'Erro desconhecido',
			},
		},
		messages: {
			groupUpdatedSuccesfully: 'Grupo atualizado com sucesso',
		},
		analytics: {
			title: 'Pixels',
			pixelClicks: {
				label: 'IMG Pixel de conversão',
				placeholder: 'Digite o link',
				addLabel: 'Adicionar mais um rastreador',
			},
			pixelClicksScripts: {
				label: 'JavaScript Conversão Pixel',
				placeholder: 'Digite o código',
			},
			erid: {
				title: 'ERID (apenas mercado CIS)',
				label: 'erid ID',
				placeholder: '',
			},
		},
	},
}

export default dict
