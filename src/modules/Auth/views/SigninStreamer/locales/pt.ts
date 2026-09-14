import { default as baseDict } from './en'

const dict: typeof baseDict = {
	signinStreamer: {
		title: 'Olá! 👋',
		subtitle: 'Entre na sua conta utilizando uma das suas contas da plataforma de streaming..',
		startWithTwitch: 'Comece com Twitch',
		startWithYoutube: 'Comece pelo YouTube',
		startWithTrovo: 'Comece pelo Trovo',
		partnerLogin: 'Parceiros iniciam sessão',
		termsAndPolicy: 'Ao fazer login, você aceita os <a href="https://www.uplify.app/legal/terms" target="_blank">Termos</a> e <a href="https://www.uplify.app/legal/privacy-policy" target="_blank">Privacidade</a>.',
		tryDemo: 'Try demo account',
		info: {
			block1: {
				title: 'Uplify ajuda a&nbsp;rentabilizar o&nbsp;conte&uacute;do da&nbsp;transmiss&atilde;o ao&nbsp;vivo de&nbsp;uma forma moderna.',
				linkText: 'Saiba mais sobre nós',
				linkHref: 'https://www.uplify.app/pt/para-criadores',
				videoHref: 'https://youtu.be/JKWaUjlIML0?si=vVppKgzscrBYX-6S',
			},
			block2: {
				title: 'Temos a&nbsp;confian&ccedil;a de&nbsp;<strong>35&nbsp;000 criadores</strong> e&nbsp;j&aacute;&nbsp;pagamos mais de&nbsp;<strong>$3&nbsp;000&nbsp;000</strong>.',
				linkText: 'Junte-se à nossa comunidade Discord',
				linkHref: 'https://discord.gg/EntbmDUxaZ',
			},
			block3: {
				title: '<strong>Formatos n&atilde;o disruptivos</strong> de&nbsp;marcas de&nbsp;renome mundial.',
				linkText: 'Confira nossos estudos de caso',
				linkHref: 'https://www.uplify.app/pt/casos',
			},
		},
		errors: {
			demoSignin: 'Erro ao tentar fazer login como demonstração',
		},
	},
}

export default dict
