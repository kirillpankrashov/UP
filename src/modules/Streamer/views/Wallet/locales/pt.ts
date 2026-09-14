import { default as baseDict } from './en'

const dict: typeof baseDict = {
	wallet: {
		header: {
			title: 'Carteira',
		},
		tabs: {
			overview: 'Visão geral',
			history: 'Histórico de pagamentos',
		},
		balance: {
			heading: 'Sua receita',
			title: 'Saldo',
			currentBalance: {
				label: 'Saldo',
				popover: 'Valor da receita confirmada',
			},
			minimumPayout: 'Valor mínimo de pagamento',
			payoutAmount: 'Montante a pagar',
			nearestDatePayout: 'Data de pagamento mais próxima',
			howPayoutsWork: 'Como é que os pagamentos funcionam?',
			referralInfo: 'Parabéns! Você ganhou um bônus de referência de {sum}. <br/><br/>Por favor, esteja ciente de que, para manter este bônus, os termos do programa exigem que você alcance um certo número de vistas até {date}. <br/><br/>Vistas: {imps} / {impsTotal}.',
			estimatedEarnings: {
				label: 'Rendimento estimado para&nbsp;{month}',
				popover: 'O&nbsp;rendimento ser&aacute; ajustado ap&oacute;s verifica&ccedil;&atilde;o de&nbsp;poss&iacute;veis fraudes',
			},
			auditedEarnings: {
				label: 'Valor do U.Link em análise',
				popover: 'Valor a ser verificado',
			},
			cpaOnReview: {
				label: 'Pagamentos CPA pendentes',
			},
			nextPayout: 'Valor a ser pago em {date}',
		},
		paymentServices: {
			all: {
				title: 'Serviços de pagamento',
				loading: 'carregamento',
				active: 'Activo para pagamentos',
				activate: 'Método por defeito',
				learnMore: 'Saiba mais sobre as taxas',
				paypal: 'PayPal',
				wireTransfer: 'Wire transfer',
				paypalData: 'Dados da facturação',
				billingsData: 'Dados da facturação',
				whyDoWeNeedThisData: 'Porque é que precisamos destes dados?',
				setUp: 'Configurar',
			},
			razorPay: {
				title: 'Integração de pagamentos',
				loading: 'carregando',
				learnMore: 'Saiba mais sobre as taxas',
				setUp: 'Configurar',
				statuses: {
					yourStatus: 'Seu status',
					paymentMethod: 'Forma de pagamento',
					payable: 'A pagar',
					notPayable: 'Não pagável',
					notAdd: 'Não adicionar',
				},
				form: {
					title: 'Dados de faturamento',
					whyDoWeNeedThisData: 'Por que precisamos desses dados?',
				},
			},
			tochkaBank: {
				title: 'Integração de pagamentos',
				loading: 'carregando',
				learnMore: 'Saiba mais sobre as taxas',
				setUp: 'Configurar',
				employment: {
					type: 'Employment type',
					physical: 'Individual',
					physicalShort: 'Individual',
					selfEmployed: 'Self-employed',
					taxHintSelf: 'The self-employed are required to pay taxes on income in the amount of 6% of the amount of remuneration. The self-employed person pays the tax himself on a receipt from the tax office.',
					taxHintPhysical: 'Individuals are required to pay taxes on income in the amount of 13% of the amount of remuneration. We will transfer this amount to the tax ourselves.',
					selfRegisterHint: 'Para começar, conecte o parceiro de serviço “WinWork” e certifique-se de dar permissão ao Uplify para interagir com o serviço. \n \n A integração com “WinWork” permite efetuar pagamentos automaticamente, gerar cheques, calcular e pagar impostos sobre a renda.',
					formHint: 'Certifique-se de ter dado permissão ao Uplify para interagir com “WinWork” antes de preencher os detalhes abaixo. \n \n Por favor, duplique os dados nos campos abaixo para verificar a integração com o parceiro de serviço.',
					status: 'Status',
					registered: 'Registered',
					notRegistered: 'Not registered',
					register: 'Conectar',
				},
				statuses: {
					yourStatus: 'Seu status',
					paymentMethod: 'Forma de pagamento',
					payable: 'A pagar',
					notPayable: 'Não pagável',
					notAdd: 'Não adicionar',
				},
				form: {
					title: 'Account linking',
					whyDoWeNeedThisData: 'Why do we need this data?',
				},
				paymentStatus: {
					lastTransaction: 'Ultimo pagamento',
					status: {
						inProgress: 'Em andamento',
						error: 'Erro',
						success: 'Sucesso',
					},
					fields: {
						amount: 'Quantia',
						date: 'Data',
						status: 'Status',
						methods: 'Métodos de Pagamento',
					},
				},
			},
		},
		analytics: {
			heading: 'Análise de receita',
			categories: {
				awareness: 'Formatos de patrocínio',
				performance: 'Formatos interativos',
				actions: 'Bônus de ação',
				freemium: 'Uplify Link',
				referrals: 'Referências',
				youtube_text: 'Youtube Text',
				extension: 'Extensão',
			},
			source: {
				title: 'Fonte de receita',
			},
		},
		payoutHistory: {
			title: 'Histórico de pagamentos',
			columns: {
				date: 'Data',
				amount: 'Montante',
				service: 'Forma de pagamento',
				invoice: 'Fatura',
			},
			loading: 'carregamento',
			noData: 'Ainda não foi efetuado nenhum pagamento.',
		},
		tipaltiAdvice: {
			title: 'Ganhe {amount} para liberar a configuração dos saques',
			description: 'A configuração de pagamento só está disponível para criadores que conseguirem 80% do pagamento mínimo',
		},
		tochkaAdvice: {
			title: 'Connect one of the payout services',
			description: 'You don\'t have any connected payout services. Connect a prefer way to receive payouts.',
		},
	},
}

export default dict
