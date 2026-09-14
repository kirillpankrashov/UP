import { default as baseDict } from './en'

const dict: typeof baseDict = {
	panel: {
		tabs: {
			widget: 'Configurações',
			campaigns: 'Campanhas',
		},
		states: {
			title: 'Statures',
		},
		statuses: {
			chatbot: 'Chatbot',
			extension: 'Widget',
			stream: 'Livestream',
		},
		params: {
			title: 'Opções de exibição de anúncios',
			previewCaption: 'Visualização de patrocínio na transmissão',
			locationCaption: 'Localização na transmissão',
		},
		campaigns: {
			title: 'Campanhas disponíveis',
			none: 'Não há campanhas disponíveis',
			comeBack: 'Todas as campanhas terminaram hoje.<br>Venha de volta amanhã!',
		},
		error: {
			title: 'A ligação está desactualizada',
			text: 'Vá ao seu escritório pessoal para o novo link',
		},
		statusesMustBeOn: 'Para veicular anúncios, todos os estados devem estar em',
		logger: {
			copy: 'Diário de cópias',
			copied: 'O log é copiado!',
		},
		settings: {
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
		},
	},
}

export default dict
