import { default as baseDict } from './en'

const dict: typeof baseDict = {
	deactivated: {
		title: 'Sua conta está desativada',
		headline: 'Seu perfil e&nbsp;detalhes de&nbsp;conta ser&atilde;o ocultados at&eacute; <strong>{date}</strong> e&nbsp;exclu&iacute;dos nessa data.',
		textBlock1: 'Sua conta Uplify est&aacute; desativada, o&nbsp;que isso significa?',
		textBlock2: [
			'O&nbsp;perfil, p&aacute;gina p&uacute;blica, widget est&atilde;o escondidos da&nbsp;plataforma, e&nbsp;n&atilde;o ser&atilde;o mais vis&iacute;veis para outros usu&aacute;rios.',
			'Qualquer tipo de&nbsp;campanha n&atilde;o estar&aacute; dispon&iacute;vel',
			'O&nbsp;saldo estar&aacute; dispon&iacute;vel at&eacute; que a&nbsp;conta seja exclu&iacute;da e&nbsp;s&oacute;&nbsp;ser&aacute; pago quando o&nbsp;limite m&iacute;nimo for atingido.',
			'Uplify manter&aacute; os&nbsp;dados da&nbsp;conta enquanto ela estiver desativada. O&nbsp;propriet&aacute;rio da&nbsp;conta pode reativar a&nbsp;conta a&nbsp;qualquer momento durante este per&iacute;odo.',
			'Se&nbsp;a&nbsp;conta n&atilde;o for reativada dentro de&nbsp;um&nbsp;determinado per&iacute;odo de&nbsp;tempo, Uplify pode apagar os&nbsp;dados da&nbsp;conta permanentemente. O&nbsp;Uplify afirma que este processo pode demorar at&eacute; 40&nbsp;dias.',
			'Uplify tamb&eacute;m declara que eles podem reter certas informa&ccedil;&otilde;es de&nbsp;contas desativadas se&nbsp;for necess&aacute;rio cumprir com obriga&ccedil;&otilde;es legais, resolver disputas, prevenir fraudes ou&nbsp;aplicar suas pol&iacute;ticas.',
		],
		revokeBtn: 'Revoke',
	},
}

export default dict
