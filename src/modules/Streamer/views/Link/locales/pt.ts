import { default as baseDict } from './en'

const dict: typeof baseDict = {
	link: {
		title: 'Uplify Link',
		tabs: {
			setup: 'Configuração de widget',
			profile: 'Perfil',
			alerts: 'Alertas de Livestream',
			supporters: 'Análise',
			posts: 'Postagens',
		},
		posts: {
			addNewBtn: 'Adicione nova postagem',
			post: {
				createdAt: 'Postado em',
				edit: 'Editar',
				remove: 'Remove',
			},
			sidebar: {
				title: {
					add: 'Adicione nova postagem',
					edit: 'Post de edição',
				},
				markdown: {
					label: 'Texto de marcação',
					hint: 'Por exemplo:<br><br>Eu simplesmente amo **<b>texto em negrito</b>**.<br>Também *<i>texto em itálico</i>* é muito legal.<br><br>Meu link favorito é [Uplify.link](https://uplify.link).',
				},
				embed: {
					label: 'Link de incorporação',
					hint: 'Some text',
				},
				btns: {
					post: 'Publicar',
					submit: 'Salvar',
				},
			},
		},
		setup: {
			link: {
				title: 'Sua página Uplify Link',
				description: 'Adicione este link à sua mídia social e compartilhe com sua comunidade. Ganhe mais compartilhando seu link regularmente.',
				errors: {
					unique: 'Criador com este nome já existe',
					general: 'Nome inválido',
				},
			},
			goal: {
				title: 'Definir um objetivo',
				description: 'Os objetivos geralmente captam a atenção e motivam seus telespectadores. Adicione um objetivo e deixe que sua comunidade o ajude a alcançá-lo.',
				addGoal: 'Adicionar objetivo',
				reachedOf: '100 de 2.000 alcançados!',
			},
			goalForm: {
				title: 'Criar um novo objetivo',
				editTitle: 'Edição de objetivo',
				fields: {
					title: {
						caption: 'Título do objetivo',
						placeholder: 'por exemplo, nova webcam',
					},
					description: {
						caption: 'Descrição do objetivo',
						placeholder: 'Quando eu chegar a 200 pontos, comprarei uma nova webcam para mover meus vivestreams para um novo nível.',
						hint: 'Faça uma breve descrição das razões pelas quais você precisa atingir seu objetivo.',
					},
					amount: {
						caption: 'Valor do objetivo',
						hint: 'Defina uma quantia sem o sinal de moeda, por exemplo, 100. O progresso da meta será mostrado como uma porcentagem.',
					},
					progress: {
						caption: 'Progresso até o momento',
						hint: 'Insira a quantia que você já levantou para este objetivo. Digite 0 se você estiver começando do zero.',
					},
					publicAmount: {
						caption: 'Mostrar publicamente a quantidade alvo',
						hint: 'Mostrar o valor total da meta em sua página pessoal.',
					},
				},
				statusMessage: {
					success: 'O objetivo foi atualizado',
					fail: 'Erro de atualização do objetivo',
				},
			},
			poll: {
				title: 'Definir uma nova pesquisa',
				description: 'As pesquisas ajudam a envolver melhor seu público, o que simultaneamente aumentará sua taxa de engajamento e seus ganhos. Os telespectadores devem assistir aos anúncios antes de votar, e você obterá receita com os anúncios que mostrar.',
				addPoll: 'Adicionar pesquisa',
				duration: 'Duração',
				votes: 'Votos - {num} restantes',
			},
			pollForm: {
				title: 'Criar uma nova pesquisa',
				editTitle: 'Edição de pesquisa',
				responsesTitle: 'Respostas',
				responsesTitleMin: '(mínimo 2)',
				fields: {
					question: {
						caption: 'Pergunta',
						placeholder: 'por exemplo, que jogo devo jogar a seguir?',
					},
					answer: {
						caption: 'Resposta',
					},
					condition: {
						caption: 'Modo de votação',
						hint: 'Condição de rescisão: por tempo ou número de votos',
						duration: 'Atas',
						maxVotes: 'Votos',
					},
					duration: {
						caption: 'Duração em minutos',
						hint: 'O tempo de validade da sua pesquisa.',
					},
					maxVotes: {
						caption: 'Meta de votos',
						hint: 'A votação terminará quando atingir este número de votos',
					},
				},
				statusMessage: {
					success: 'Pesquisa foi atualizado',
					fail: 'Erro de atualização do pesquisa',
				},
			},
		},
		profile: {
			telegram: {
				title: 'Repositório automático',
				description: 'Conecte sua rede social e&nbsp;as&nbsp;postagens aparecer&atilde;o automaticamente em&nbsp;sua p&aacute;gina Uplify Link.',
				input: {
					title: 'Telegram channel',
					description: '{\'Adicione um&nbsp;link para seu canal com @ e&nbsp;atribua nosso bot @UplifyBot como administrador.\'}',
					label: 'Link',
					placeholder: '{\'@my_channel\'}',
				},
				errors: {
					channelExists: 'Não há canal com este nome',
					invalidName: 'O nome de canal errado',
				},
			},
			about: {
				title: 'Sua biografia',
				description: 'Adicione detalhes para o seu perfil',
				placeholder: 'Apenas algumas palavras',
				preview: 'Visualização:',
				advice: {
					label: 'DICA',
					title: 'Você pode usar Markdown',
					description: 'Por exemplo:<br><br>Eu simplesmente amo **<b>texto em negrito</b>**.<br>Também *<i>texto em itálico</i>* é muito legal.<br><br>Meu link favorito é [Uplify.link](https://uplify.link).',
				},
				ai: {
					label: 'Texto gerado por IA para o seu perfil',
					delete: 'Excluir',
					edit: 'Editar',
					like: 'Como',
					suggestionFull: 'Aqui está o que nossa IA pensa sobre {name}',
					suggestionEmptyMale: '{name} no escribió nada sobre sí mismo, pero esto es lo que nuestra IA puede decir',
					suggestionEmptyFemale: '{name} no escribió nada sobre sí misma, pero esto es lo que nuestra IA puede decir',
				},
			},
			gear: {
				title: 'Engrenagens e Configuração',
				description: 'Diga ao&nbsp;seu p&uacute;blico que tipo de&nbsp;equipamento de&nbsp;streaming voc&ecirc; usa',
				form: {
					addBlock: 'Adicionar mais um bloco',
					deleteBlock: 'Excluir bloco',
					block: {
						title: 'Equipamento',
						category: {
							label: 'Categoria',
							placeholder: 'Especifique uma categoria',
						},
						description: {
							label: 'Descrição',
							placeholder: 'Descreva o equipamento',
						},
						link: {
							label: 'Link',
							placeholder: 'Fornecer um link',
						},
						sku: {
							label: 'SKU',
							placeholder: '',
						},
					},
				},
				advice: {
					label: 'Dica',
					title: 'Widget Yandex.Market',
					text: 'Verifique a&nbsp;disponibilidade dos produtos no&nbsp;Yandex.Market. Se&nbsp;pelo menos um&nbsp;estiver faltando, um&nbsp;widget com ofertas semelhantes ser&aacute; mostrado no&nbsp;lugar dos seus produtos.',
				},
			},
			social: {
				title: 'Links sociais',
				description: 'Compartilhe links de redes sociais com seu público',
				form: {
					addBlock: 'Adicionar mais um bloco',
					deleteBlock: 'Excluir bloco',
					block: {
						title: 'Ligação',
						category: {
							label: 'Rede social',
							placeholder: 'Selecione a rede social',
						},
						description: {
							label: 'URL',
							placeholder: 'Colar link',
						},
					},
				},
			},
			theme: {
				title: 'Tema de cores',
				description: 'Escolha um tema de cores para sua página Uplify Link',
				select: {
					label: 'Tema de cores',
					options: {
						light: 'Luz',
						dark: 'Escuro',
					},
				},
			},
			banner: {
				title: 'Banner de perfil',
				description: 'Personalize o banner do seu perfil na página pessoal',
				label: 'Carregue um PNG, JPG com menos de 5 MB. O tamanho da imagem deve ser de pelo menos 1376 x 300 px.',
			},
		},
		alerts: {
			supportAlert: 'Alerta de apoio',
			goalAlert: 'Alerta de objetivost',
			pollAlert: 'Alerta de votação',
			chatAlert: 'Alerta de chat',
			preview: 'Pré-visualização',
			alertPreview: {
				title: 'Visualização de alerta',
				description: 'Configure seu widget em seu software OBS (OBS Studio, Twitch Studio ou Xsplit) e teste os alertas antes da transmissão ao vivo.',
				sendTest: 'Enviar visualização',
			},
			chatBotReminder: 'Requer a criação de um chat bot',
			fields: {
				messageDuration: {
					caption: 'Tempo de exibição dos alertas',
					hint: 'Por quanto tempo um alerta será exibido na transmissão ao vivo.',
				},
				supportAlertPosition: {
					caption: 'Posição de alerta de apoio',
					hint: 'Especifica onde na tela será exibido o alerta.',
				},
				goalAlertPosition: {
					caption: 'Posição de alerta de metas',
					hint: 'Especifica onde na tela será exibido o alerta.',
				},
				pollAlertPosition: {
					caption: 'Posição de alerta de pesquisa',
					hint: 'Especifica onde na tela será exibido o alerta.',
				},
				chatAlert: {
					caption: 'Habilitar alertas de bate-papo',
					hint: 'Especifica se devem ou não ser mostradas notificações interativas durante uma transmissão ao vivo.',
				},
			},
			statusMessage: {
				success: 'Pesquisa foi atualizado',
				fail: 'Erro de atualização do pesquisa',
			},
		},
		supporters: {
			stats: {
				supporters: 'Apoiadores mensais',
				revenueDay: 'Receita estimada hoje',
				cpm: 'Preço médio por 1.000 visualizações (CPM)',
				points: 'Pontos mensais',
				revenueMonth: 'Receita mensal estimada',
				impressions: 'Impressões entregues',
			},
			history: {
				supporters: 'Apoiadores',
				supportedYou: 'o apoiaram!',
				noSupportersTitle: 'Você ainda não tem nenhum apoiador',
				noSupportersMessage: 'Incentive seus telespectadores a visitar sua página para obter os primeiros apoios',
				impressions: '{imps} vistas de anúncios',
				targets: {
					today: 'Hoje',
					yesterday: 'Ontem',
					week: 'Essa semana',
					month: 'Este mês',
					allTime: 'O tempo todo',
					startDate: 'Data de início',
					endDate: 'Data de fim',
				},
				columns: {
					id: '#',
					name: 'Nome',
					contribution: 'Pontos',
				},
				cacheTimeLeft: 'Esta classificação será atualizada em {min} min.',
			},
		},
		widgetPosition: {
			leftTop: 'Canto superior esquerdo',
			rightTop: 'Canto superior direito',
			leftBottom: 'Canto inferior esquerdo',
			rightBottom: 'Canto inferior direito',
			disabled: 'OFF',
		},
		chatbotMsgInterval: {
			every15mins: 'A cada 15 minutos',
			every30mins: 'A cada 30 minutos',
			everyHour: 'Toda hora',
			disabled: 'OFF',
		},
	},
}

export default dict
