import { default as baseDict } from './en'

const dict: typeof baseDict = {
	referrals: {
		header: {
			title: 'Programa "Indique um amigo',
		},
		unavailable: 'Infelizmente, o Programa de Indicação não está disponível para você ou na sua região. <br>Caso tenha alguma dúvida, fale conosco no <a href="https://discord.gg/EntbmDUxaZ" target="_blank">Discord</a> ou Intercom.',
		invite: {
			title: 'Convidar amigos',
			description: 'Receba {referrer} por cada amigo que convidar, e o seu amigo receberá {referral} depois de completar a inscrição e mostrar os primeiros anúncios.',
			invited: 'Convidado',
			reward: 'Recebido dos convites',
			link: 'Link de convite',
			advice: {
				title: 'Como é que sou pago?',
				description: 'Receberá um pagamento quando um amigo se inscrever para Uplify, confirmar o e-mail, e mostrar anúncios para 5.000 vistas.',
				link: {
					label: 'Termos do programa Recomendar a um amigo',
					url: '/',
				},
			},
		},
		promotion: {
			title: 'Promover na sua livestream',
			switchLabel: 'Promova Uplify na sua livestream.',
			advice: {
				title: 'Como funciona:',
				description: 'Pode promover o nosso serviço na sua livestream. Receberá {referrer} e as suas referências receberão {referral} após completar todos os termos. <br/><br/>A cada duas horas, a Uplify envia um banner personalizado durante a transmissão ao vivo, pedindo ingressar em nosso serviço.',
			},
			link: {
				label: 'Leia mais sobre promoção',
				url: '/',
			},
			demo: {
				title: 'Clique para ver a pré-visualização de um banner no software de difusão.',
			},
		},
		panels: {
			title: 'Painéis de contração',
			description: 'Coloque um banner debaixo do seu player para convidar mais usuários.',
		},
		history: {
			title: 'História do convite',
			none: 'Ainda não convidou ninguém :(',
			columns: {
				creator: 'Referência',
				date: 'Data de adesão',
				status: 'Estado',
				impressions: 'Vistas publicitárias',
			},
			paid: 'Paga',
			waiting: 'Espera',
		},
		updated: {
			invite: {
				title: 'Convidar amigos',
				description: 'Receba {referrer} por cada amigo que convidar, e o seu amigo receberá {referral} depois de completar a inscrição e mostrar os primeiros anúncios.',
				invited: 'Convidado',
				reward: 'Recebido dos convites',
				link: 'Link de convite',
				advice: {
					title: 'Como é que sou pago?',
					description: 'Você pode promover o Uplify na sua transmissão ao vivo.Você ganhará 5% da renda de todos os cretores que você se referir. <br/><br/>A cada duas horas, a Uplify envia um banner personalizado durante a transmissão ao vivo, pedindo ingressar em nosso serviço.',
					link: {
						label: 'Termos do programa Recomendar a um amigo',
						url: '/',
					},
				},
			},
			promotion: {
				title: 'Promover na sua livestream',
				switchLabel: 'Promova Uplify na sua livestream.',
				advice: {
					title: 'Como funciona:',
					description: 'Pode promover o nosso serviço na sua livestream. Receberá {referrer} e as suas referências receberão {referral} após completar todos os termos.',
				},
				link: {
					label: 'Leia mais sobre promoção',
					url: '/',
				},
				demo: {
					title: 'Clique para ver a pré-visualização de um banner no software de difusão.',
				},
			},
			history: {
				advice: {
					title: 'É importante saber',
					description: '<strong>Convidado</strong>: o&nbsp;usu&aacute;rio se&nbsp;registrou, mas n&atilde;o concluiu a&nbsp;integra&ccedil;&atilde;o. <br/><br/><strong>Integrado</strong>: o&nbsp;usu&aacute;rio concluiu a&nbsp;integra&ccedil;&atilde;o e&nbsp;est&aacute; pronto para exibir campanhas patrocinadas.',
				},
				invited: 'Convidado',
				hasImpressions: 'Integrado',
			},
		},
	},
}

export default dict
