import { default as baseDict } from './en'

const dict: typeof baseDict = {
	settings: {
		header: {
			title: 'Configurações',
			widget: 'Widget',
			chatbot: 'Chatbot',
			extension: 'Extensões',
			stream: 'Em Stream',
			disabled: 'OFF',
			enabled: 'ON',
		},
		widgetPlatform: {
			title: 'Plataforma de monetização',
			description: 'Escolha a plataforma onde Uplify irá exibir anúncios, coletar estatísticas e te pagar por impressões de anúncios. A escolha de uma plataforma irá afetar as campanhas publicitárias disponíveis e os módulos widget.',
		},
		widgetLink: {
			title: 'Link do Widget',
			description: 'Link para OBS ou outros programas de transmissão.',
			optionDrag: {
				label: 'Opção 1: arrastar e soltar no OBS',
				helpWithSetup: 'Guia passo-a-passo',
				warn: 'Arrastar e soltar no OBS não funcionará se o OBS estiver sendo executado como Administrador.',
				btn: 'Arraste e solte no OBS',
			},
			optionLink: {
				label: 'Option 2: Setup widget from scratch',
				helpWithSetup: 'Guia passo-a-passo',
				warn: 'Certifique-se de que o widget esteja definido para toda a área visível em seu software de transmissão e na camada superior. Verifique o guia.',
			},
			optionWithSocket: {
				label: 'Opção 3: Configuração automática via WebSocket OBS',
				helpWithSetup: 'Guia passo-a-passo',
				obsSocketPassPlaceholder: 'Senha de WebSocket do OBS',
				obsSocketPortPlaceholder: 'Porta de WebSocket do OBS',
				warn: 'Certifique-se de que sua versão do OBS é 28.0.0 ou superior. Para um funcionamento correto, a versão do WebSocket deve ser 5.0.0 ou superior.',
			},
			preview: 'Exibir animação de teste em software de transmissão.',
		},
		widgetDelay: {
			title: 'Atraso da transmissão',
			new: 'Novo',
			description: 'Defoma o delay correto da sua transmissão para o melhor funcionamento do chatbot e do serviço.',
			howItWorks: 'Como funciona',
			fieldLabel: 'Tempo de atraso (0 to 1800 s)',
		},
		chatbot: {
			title: 'Configuração de Chatbot',
			description: 'O chatbot é utilizado para enviar mensagens publicitárias e pesquisas.',
			surveyDescription: 'Um problema com o ambiente Nightbot ou um conflito com outro chatbot?',
			wantAnotherChatbot: 'Eu quero usar outro chatbot',
			shareChatbotSetup: 'Por favor, compartilhe conosco sua experiência sobre a configuração de chatbot.',
			goThroughTheSurvey: 'Faça a pesquisa',
			helpWithSetup: 'Guia passo-a-passo',
			connectNightbot: 'Ligar o Nightbot',
			disconnectNightbot: 'Desativar o nightbot',
			checkChatbot: 'Verifica Nightbot',
			sendMessage: 'Pré-visualização da mensagem',
			messageSent: 'Mensagem enviada',
			error: 'Antes de&nbsp;conectar o&nbsp;bot, <a href="https://nightbot.tv/dashboard" target="_blank">visite o&nbsp;site do&nbsp;nightbot</a> e&nbsp;encerre a&nbsp;sess&atilde;o de&nbsp;jogo.',
		},
		advertSettings: {
			title: 'Gerenciador de anúncios',
			description: 'Seleccionar a frequência e o modo de visualização dos anúncios.',
			moreAboutFormats: 'Saiba mais sobre formatos de anúncios',
			bannerTimeout: 'Frequência',
			adPlaybackMode: 'Modo de exibição',
			playbackModeManual: 'Manual',
			playbackModeAuto: 'Auto',
			manualPlaybackTitle: 'Lançamento de anúncio',
			pictureInPicturePosition: 'Local da imagem na fotografia',
			leaderboardPosition: 'Localização do banner amplo',
			adsBlocksCountTitle: 'Número de anúncios',
			adsBlocksCountDuration: 'Duração: {segundos} seg',
			advice: {
				title: 'Lançamento de anúncio manual',
				firstString: 'Pode executar anúncios manualmente quando o widget, extensão e chatbot estão activos.',
				secondString: 'Assim que o anúncio estiver disponível, o botão é desbloqueado.',
			},
		},
		panel: {
			title: 'Gerenciador de anúncios remotos',
			mobileVersion: {
				title: 'Gerenciador de anúncios móveis',
				description: 'Digitalize o código QR para abrir o Gerenciador de Anúncios no seu telefone. Não mostre este código a ninguém.',
			},
			obsVersion: {
				title: 'Gerenciador de anúncios para OBS',
				description: 'O Gestor de Anúncios pode ser adicionado ao OBS. Copie e cole o link em View → Docks → Custom Browser Docks. Não mostrar este hiperlink à ninguém.',
			},
		},
		ignoreCategories: {
			title: 'Categorias a ignorar',
			description: 'As campanhas de anúncios das categorias selecionadas serão automaticamente desativadas para exibição na seção de campanhas.',
		},
		attention: {
			title: 'Configuração de Widget e chatbot',
			widgetDisabled: {
				title: 'Widget desactivado',
				reasons: {
					title: 'As seguintes razões são possíveis:',
					broadcast: 'Programa de radiodifusão está desactivado',
					notSetUp: 'O widget não está configurado no programa de difusão.',
				},
			},
			chatbotDisabled: {
				title: 'Chatbot desactivado',
				reasons: {
					toBeConnected: 'O Chatbot tem de estar ligado para o canal',
					addChatbotAsModerator: 'Necessidade de adicionar o Nightbot como moderador',
				},
			},
		},
		twitchExtension: {
			title: 'Extensão do Twitch',
			description: 'Configure uma extensão para o Twitch para obter campanhas especiais de patrocínio no formato de extensão.',
			status: 'Estado da extensão',
			btns: {
				setup: 'Extensão de instalação',
				check: 'Verifique a extensão',
			},
		},
		ssp: {
			title: 'Campanhas de parceiros',
			description: 'Gerencie campanhas de patrocínio externo dos parceiros uplify.',
			moreAbout: {
				text: 'Saiba mais sobre campanhas de parceiros',
				link: '',
			},
			instream: {
				title: 'InStream patrocínios',
				label: 'Permitir patrocínios no fluxo',
				hint: 'Inclua integração com uma rede de parceiros externos, o sistema solicitará automaticamente integrações externas e se esforçará para preencher todos os slots disponíveis no widget.',
			},
			text: {
				title: 'Mensagens patrocinadas no chat',
				label: 'Permitir mensagens patrocinadas por сhat-bot',
				hint: 'Inclua integração com uma rede de parceiros externos, o sistema enviará automaticamente uma mensagem de patrocínio para o bate -papo a cada 10 minutos.',
				frequency: {
					label: 'Mensagens patrocinadas a cada 15 minutos',
					options: {
						every15min: 'Uma vez por 15 min',
						every30min: 'Uma vez por 30 min',
					},
				},
			},
			advice: {
				title: 'Integração de redes de parceiros externos',
				lines: 'Nosso servi&ccedil;o fornece acesso &agrave;s&nbsp;campanhas de&nbsp;patroc&iacute;nio do&nbsp;uplify.in add, voc&ecirc; pode aumentar sua renda ao&nbsp;permitir que outras redes de&nbsp;parceiros coloquem seuCampanhas com o&nbsp;Uplify em&nbsp;seu conte&uacute;do e&nbsp;conversem atrav&eacute;s de&nbsp;mensagens de&nbsp;patroc&iacute;nio.',
			},
		},
		adultOnly: {
			title: 'Restrições de idade',
			description: 'Permita a integração de campanhas publicitárias com restrições de idade nas leis locais.Por exemplo, trailers de filmes de ação, bebidas energéticas e outros tipos de produtos destinados apenas a adultos.',
			label: 'Permitir campanhas de adultos',
			hint: 'Permitir patrocínios no fluxo',
		},
		youtubeText: {
			title: 'YouTube Text',
			description: 'Manage YouTube text sponsored messages.',
			link: {
				text: 'Learn more about YouTube text campaigns',
				href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
			allow: {
				label: 'Allow YouTube description ads',
			},
			blacklist: {
				label: 'Videos to ignore',
				hint: 'Videos to ignore',
				errors: {
					invalidLink: 'Um ou mais links são inválidos',
					notYoutube: 'Um ou mais link não é um link do YouTube',
				},
			},
		},
	},
}

export default dict
