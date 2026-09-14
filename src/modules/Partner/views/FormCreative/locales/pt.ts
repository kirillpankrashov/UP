import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creative: {
		defaultName: 'Nome Craetivo',
		defaultNameNew: 'Novo Criativo',
		loading: 'Creative loading ..',
		fetchError: {
			title: 'Falha ao carregar o criativo',
			description: 'Ocorreu um erro ao carregar o criativo, o grupo ou os dados da campanha. Por favor, tente novamente mais tarde.',
			retry: 'Tentar novamente',
		},
		form: {
			status: {
				label: 'Status',
			},
			name: {
				title: 'Nome criativo',
				label: 'O nome é visível apenas para si',
				placeholder: 'Introduzir texto',
			},
			altName: {
				addBtn: 'Adicionar nome alternativo para streamers',
				label: 'Nome do criativo para streamers',
				placeholder: 'Por exemplo, Spring Promo',
			},
			adtag: {
				title: 'Google Ad Tag',
				label: '',
				placeholder: '',
			},
			files: {
				title: 'Carregar ficheiros',
				preview: 'Carregar o arquivo de visualização',
				uploadBtn: 'Carregar arquivo',
				formats: {
					video: 'Vídeo',
					videoOrImage: 'Vídeo ou imagem',
					html5: 'HTML5',
					banner: 'Banner',
				},
				requirements: {
					title: 'Requisitos',
					fullscreen: 'Duração: 15s<br/>Resolução: 1920 x 1080<br/>Formato: H.264 (MP4, webm)<br/>Áudio: -9dB<br/>Taxa de bits: 2000 - 5500 kbps<br/>Taxa de quadros: 24 - 30<br/>Tamanho: até {size} MB',
					leaderboard: 'Duração: 15s<br/>Resolução: 1920 x 270<br/>Formato: H.264 (MP4, webm)<br/>Áudio: Desativado<br/>Taxa de bits: 2000 - 5500 kbps<br/>Taxa de quadros: 24 - 30<br/>Tamanho: até {size} MB',
					pip_video: 'Duração: 15s<br/>Resolução: de 550 x 310<br/>até 1920 x 1080 pixels.<br/>Formato: H.264 (MP4, webm)<br/>Áudio: Desativado<br/>Taxa de bits: 2000 - 5500 kbps<br/>Taxa de quadros: 24 - 30<br/>Tamanho: até {size} MB',
					custom: 'Duração: 15s<br/>Resolução: 1920 x 1080<br/>Formato: PNG, JPG ou GIF<br/>HTML de terceiros: arquivo zip HTML5<br/>Áudio: Desativado<br/>Taxa de quadros: 24 - 30<br/>Tamanho: até {size} MB',
					extension: '<strong>Primeiro arquivo:</strong><br/>Resolução: 728 x 90<br/>Formato: PNG, JPG, GIF, MP4, WEBM<br/>Audio: Desativado<br>Tamanho: até {bannerSize} MB<br/><br/><strong>Segundo arquivo:</strong><br/>Resolução: 550 x 310<br>Formato: PNG, JPG, GIF, MP4, WEBM<br>Audio: Desativado<br>Tamanho: até {unitSize} MB',
					gallery: '<strong>Imagem:</strong><br/>Resolução: 230 x 350<br/>Formato: PNG, JPG<br/>Tamanho: até {imageSize} MB',
				},
				errors: {
					general: 'Forneça um arquivo criativo válido',
				},
				instructions: {
					dragImage: 'Arraste a foto aqui',
					dragImageOrVideo: 'Arraste uma imagem ou vídeo aqui',
					dragVideo: 'Arraste o vídeo aqui',
					dragZip: 'Arraste o arquivo com arquivos aqui',
				},
			},
			creativeManager: {
				messages: {
					deleted: 'O anexo foi excluído',
				},
				errors: {
					unknown: 'Erro desconhecido',
				},
			},
			advice: {
				title: 'Creative preview',
				description: 'Estimate how your ad will look',
				button: 'Show preview',
			},
			stylesEditor: {
				button: 'Editor de estilos',
			},
			data: {
				title: 'Dados criativos',
				fields: {
					erid: {
						title: 'ERID (apenas mercado CIS)',
						label: 'erid ID',
						placeholder: '',
					},
					productUrl: {
						label: 'URL do produto',
						placeholder: 'Introduzir link',
					},
					mobileProductUrl: {
						label: 'URL do produto móvel (Deeplink)',
						placeholder: 'Introduzir link',
					},
					chatbotText: {
						label: 'Texto do bot do Chat',
						placeholder: 'Introduzir texto',
					},
					companionHeading: {
						label: 'Companion banner title',
						placeholder: 'Enter title',
					},
					companionText: {
						label: 'Texto da faixa de acompanhamento',
						placeholder: 'Introduzir texto',
					},
					companionCta: {
						label: 'Chamada à acção',
						placeholder: 'Introduzir texto',
					},
					qrCode: {
						label: 'Gerar código QR na transmissão ao vivo',
					},
					pixelClicks: {
						label: 'IMG Pixel de conversão',
						placeholder: 'Digite o link',
					},
					pixelClicksScripts: {
						label: 'JavaScript Conversão Pixel',
						placeholder: 'Digite o código',
					},
					pixelImpressions: {
						label: 'Tag de impressionamento',
						placeholder: 'Digite o link',
						addLabel: 'Adicione outro pixel',
						alert: 'Tags de impressões suportadas: Adriver, Weborama <br/>Parâmetros: {{viewers}}, {{random}}',
					},
					pixelInspections: {
						label: 'Pixel para inspeção',
						placeholder: 'Digite o link',
						addLabel: 'Adicione outro pixel',
					},
				},
			},
			pixels: {
				title: 'Pixels',
			},
			labels: {
				title: '<strong>Selo de patrocínio</strong><br/>(apenas mercado CIS)',
				fields: {
					chatbot: {
						label: 'Chatbot erid ID',
					},
					creative: {
						label: 'Creative erid ID',
					},
				},
			},
			formSendStatus: {
				updated: 'Сriativo foi atualizado',
			},
			preview: {
				label: 'Pré-visualização',
			},
			quiz: {
				size: {
					limit: {
						exceeded: 'O tamanho do questionário excede o limite de 5KB. Por favor, reduza o número de perguntas ou respostas ou refatore seus estilos.',
					},
				},
				settings: {
					title: 'Configuração',
					quizStatus: 'Status do quiz',
					correctAnswersVisible: 'Respostas corretas visíveis',
					paginationEnabled: 'Paginação habilitada',
					resultsVisible: 'Resultados visíveis',
				},
				welcome: {
					title: 'Bem-vindo',
					text: 'Texto de bem-vindo',
					color: 'Cor de bem-vindo',
				},
				questions: {
					title: 'Perguntas',
					question: 'Pergunta {index}',
					deleteQuestion: 'Excluir pergunta',
					questionText: 'Texto da pergunta',
					questionPlaceholder: 'Introduzir texto',
					explain: 'Explicar',
					explainPlaceholder: 'Explicação da resposta correta',
					answer: 'Resposta {index}',
					deleteAnswer: 'Excluir resposta',
					answerPlaceholder: 'Introduzir texto da resposta {index}',
					correctAnswer: 'Esta é a resposta correta',
					addAnswer: 'Adicionar outra resposta',
					questionBackground: 'Fundo da pergunta',
					questionColor: 'Cor da pergunta',
					addQuestion: 'Adicionar outra pergunta',
				},
				result: {
					title: 'Resultado',
					text: 'Texto do resultado',
					placeholder: 'Obrigado por participar!',
					background: 'Fundo do resultado',
					color: 'Cor do resultado',
				},
				preview: {
					title: 'Pré-visualização',
				},
			},
			gallery: {
				title: 'Galeria',
			},
			panel: {
				banner1: {
					label: 'Banner 1',
				},
				banner2: {
					label: 'Banner 2',
				},
			},
		},
	},
}

export default dict
