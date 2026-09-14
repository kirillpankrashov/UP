import { default as baseDict } from './en'

const dict: typeof baseDict = {
	widget: {
		adForSupport: 'A promoção por',
		willStartIn: 'começará em',
		poweredBy: 'Powered by Uplify',
		of: 'of',
		reloginMessage: {
			title: 'Atenção, {platform} atualizado!',
			description: 'Sua versão do widget está desatualizada. Por favor, saia e faça o login na conta.',
			streamer: {
				label: 'Atenção',
				title: '{platform} atualizado!',
				description: 'Sua versão do widget está desatualizada. Por favor, saia e faça o login na conta.',
				button: 'Entrar novamente',
			},
		},
		chatbotErrorMessage: {
			title: 'Chatbot não funciona',
			description: 'Por favor, reconecte o&nbsp;bot em&nbsp;sua conta pessoal. Instru&ccedil;&otilde;es passo a&nbsp;passo: i.uplify.tech/chatbot&rsquo;',
		},
		resolutionErrorMessage: {
			title: 'Widget configurado incorretamente',
			description: 'Configure o&nbsp;widget seguindo as&nbsp;instru&ccedil;&otilde;es passo a&nbsp;passo: <span>i.uplify.tech/widget</span>',
		},
		tooManySubscribers: {
			title: 'O widget foi bloqueado',
			description: 'Exclua todas as cópias do widget e atualize a camada.',
		},
		platformDisclaimer: 'não patrocina ou endossa esta promoção e não é responsável por ela.',
		platformDisclaimerYoutube: 'Esta promoção é feita pela streamer, independentemente do YouTube.',
		freemium: {
			timeLeft: '{time} minutos restantes',
			votesLeft: 'Votos - {num} restantes',
			pollWinner: 'Escolha',
			goalQrTitle: 'Apoie-me em',
			goalTopSuppoerters: {
				day: 'Top apoiadores: hoje',
				week: 'Top apoiadores: 7 dias',
				quarter: 'Top apoiadores: o tempo todo',
				alltime: 'Top apoiadores: o tempo todo',
			},
			supporterWatcherSponsorVideo: 'assisti vídeo de patrocínio',
			anonymous: 'Alguém',
			supportedYou: 'te apoiou',
			chatbotMsgs: [
				'Apoie-me assistindo aos anúncios {link}',
				'As doações sem dinheiro foram inventadas aqui {link}',
				'Agora é fácil suportar meu fluxo: Vá para o link e veja os anúncios {link}',
				'Doações, gorjetas e mamas são aceitas aqui. Não é necessário cartão {link}',
				'Apoie-me novamente, mesmo que você já tenha clicado no link {link}',
				'Você não precisa de um cartão bancário quando as doações são gratuitas {link}',
				'Cada clique neste link é seu apoio ao meu fluxo {link}',
				'Doações sem SMS e registro - {link}',
			],
		},
	},
}

export default dict
