import { default as baseDict } from './en'

const dict: typeof baseDict = {

	profile: {
		header: {
			title: 'Configurações de conta',
		},
		tier: {
			whatIsTier: 'O que é um escalão?',
		},
		agency: {
			title: 'Agência',
		},
		form: {
			howToChangeLanguage: 'Para mudar o idioma de transmissão ou o país, por favor nos escreva no chat ou no Discord.',
		},
		advice: {
			title: 'Verificação por email requerida',
			info: 'Informamo-lo apenas sobre as notícias e actualizações mais importantes.',
			noSpam: 'Sem spam.',
			clickLink: 'Por favor, clique no link no e-mail de confirmação que lhe enviámos.',
			link: 'Enviar novamente',
			linkClicked: 'Correio enviado',
		},
		platforms: {
			title: 'Conectar plataformas',
			writeUsToDetach: 'Nos escreva para desconectar',
		},
		discord: {
			title: 'Junte-se ao nosso servidor Discord para se manter atualizado, obter suporte e nivelar.',
			status: {
				caption: 'Seu status',
				connected: 'Conectado',
				notConnected: 'Não conectado',
			},
		},
		deactivation: {
			title: 'Desativa&ccedil;&atilde;o de&nbsp;conta',
			textBlock1: 'Se&nbsp;voc&ecirc; quiser uma pausa de&nbsp;Uplify, voc&ecirc; pode desativar temporariamente sua conta ao&nbsp;inv&eacute;s de&nbsp;apag&aacute;-la. Seu perfil n&atilde;o aparecer&aacute; no&nbsp;Uplify enquanto voc&ecirc; estiver fora.',
			textBlock2: 'Se&nbsp;voc&ecirc; continuar, seu perfil e&nbsp;detalhes da&nbsp;conta ser&atilde;o exclu&iacute;dos&nbsp;em <strong>{date}</strong>. Voc&ecirc; n&atilde;o ser&aacute; vis&iacute;vel em&nbsp;Uplify entre agora e&nbsp;ent&atilde;o. Se&nbsp;voc&ecirc; mudar de&nbsp;id&eacute;ia, voc&ecirc; pode voltar a&nbsp;entrar antes da&nbsp;data de&nbsp;exclus&atilde;o e&nbsp;optar por manter sua conta.',
			deactivateBtn: 'Desativar',
			drawer: {
				title: 'Desativar conta',
				subtitle: 'Voc&ecirc; tem certeza de&nbsp;que deseja desativar sua conta?',
				textBlock1: 'Quando uma conta Uplify &eacute;&nbsp;desativada, as&nbsp;seguintes a&ccedil;&otilde;es acontecem com os&nbsp;dados da&nbsp;conta:',
				textBlock2: [
					'O&nbsp;perfil, p&aacute;gina p&uacute;blica, widget est&atilde;o escondidos da&nbsp;plataforma, e&nbsp;n&atilde;o ser&atilde;o mais vis&iacute;veis para outros usu&aacute;rios.',
					'Qualquer tipo de&nbsp;campanha n&atilde;o estar&aacute; dispon&iacute;vel',
					'O&nbsp;saldo estar&aacute; dispon&iacute;vel at&eacute; que a&nbsp;conta seja exclu&iacute;da e&nbsp;s&oacute;&nbsp;ser&aacute; pago quando o&nbsp;limite m&iacute;nimo for atingido.',
					'Uplify manter&aacute; os&nbsp;dados da&nbsp;conta enquanto ela estiver desativada. O&nbsp;propriet&aacute;rio da&nbsp;conta pode reativar a&nbsp;conta a&nbsp;qualquer momento durante este per&iacute;odo.',
					'Se&nbsp;a&nbsp;conta n&atilde;o for reativada dentro de&nbsp;um&nbsp;determinado per&iacute;odo de&nbsp;tempo, Uplify pode apagar os&nbsp;dados da&nbsp;conta permanentemente. O&nbsp;Uplify afirma que este processo pode demorar at&eacute; 40&nbsp;dias.',
					'Uplify tamb&eacute;m declara que eles podem reter certas informa&ccedil;&otilde;es de&nbsp;contas desativadas se&nbsp;for necess&aacute;rio cumprir com obriga&ccedil;&otilde;es legais, resolver disputas, prevenir fraudes ou&nbsp;aplicar suas pol&iacute;ticas.',
				],
				textBlock3: '&Eacute;&nbsp;importante observar que desativar uma conta n&atilde;o &eacute;&nbsp;o&nbsp;mesmo que apagar uma conta, e&nbsp;&eacute;&nbsp;um&nbsp;processo revers&iacute;vel, onde a&nbsp;conta e&nbsp;seus dados podem ser restaurados.',
				confirmBtn: 'Confirme',
				cancelBtn: 'Cancelar',
			},
		},
	},
}

export default dict
