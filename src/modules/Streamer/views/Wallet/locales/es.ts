import { default as baseDict } from './en'

const dict: typeof baseDict = {
	wallet: {
		header: {
			title: 'Billetera',
		},
		tabs: {
			overview: 'Visión general',
			history: 'Historial de pagos',
		},
		balance: {
			heading: 'Sus ingresos',
			title: 'Saldo',
			currentBalance: {
				label: 'Saldo',
				popover: 'Monto de ingresos verificado',
			},
			minimumPayout: 'Cantidad mínima de pago',
			payoutAmount: 'Cantidad a pagar',
			nearestDatePayout: 'Próxima fecha de pago',
			howPayoutsWork: '¿Cómo funcionan los pagos?',
			referralInfo: '¡Felicidades! Has ganado un bono de referido de {sum}. <br/><br/>Tenga en cuenta que para mantener este bono, los términos del programa requieren que alcance un determinado número de vistas para {date}. <br/><br/>Vistas: {imps} / {impsTotal}.',
			estimatedEarnings: {
				label: 'Ingresos estimados para&nbsp;{month}',
				popover: 'Los ingresos se&nbsp;ajustar&aacute;n tras comprobar posibles fraudes',
			},
			auditedEarnings: {
				label: 'Monto de U.Link en revisión',
				popover: 'Monto a verificar',
			},
			cpaOnReview: {
				label: 'Pagos CPA pendientes',
			},
			nextPayout: 'Importe a pagar el {date}',
		},
		paymentServices: {
			all: {
				title: 'Servicios de pago',
				loading: 'cargando',
				active: 'Activo para pagos',
				activate: 'Método predeterminado',
				learnMore: 'Aprende más sobre las comisiones',
				paypal: 'PayPal',
				wireTransfer: 'Transferencia bancaria',
				paypalData: 'Datos de facturación',
				billingsData: 'Datos de facturación',
				whyDoWeNeedThisData: '¿Por qué necesitamos estos datos?',
				setUp: 'Configurar el pago',
			},
			razorPay: {
				title: 'Incorporación de pagos',
				loading: 'Cargando',
				learnMore: 'Aprende más acerca de las comisiones',
				setUp: 'Configurar pago',
				statuses: {
					yourStatus: 'Tu estado',
					paymentMethod: 'Método de pago',
					payable: 'Pagadero',
					notPayable: 'No pagadero',
					notAdd: 'No agregar',
				},
				form: {
					title: 'Datos de facturación',
					whyDoWeNeedThisData: '¿Por qué necesitamos estos datos?',
				},
			},
			tochkaBank: {
				title: 'Servicios de pago',
				loading: 'Cargando',
				learnMore: 'Aprende más sobre comisiones',
				setUp: 'Configurar pago',
				employment: {
					type: 'Tipo de empleo',
					physical: 'Individual',
					physicalShort: 'Individual',
					selfEmployed: 'Autónomo',
					taxHintSelf: 'Los autónomos están obligados a pagar impuestos sobre la renta en la cantidad del 6% de la cantidad de la remuneración. El autónomo paga el impuesto por sí mismo sobre un recibo de la oficina de impuestos.',
					taxHintPhysical: 'Los individuos están obligados a pagar impuestos sobre la renta en la cantidad del 13% de la cantidad de la remuneración. Nosotros transferiremos esta cantidad al impuesto por nosotros mismos.',
					selfRegisterHint: 'Para comenzar, regístrese en el servicio "WinWork". De esta manera, haremos automáticamente los pagos y emitiremos las facturas necesarias.',
					status: 'Estado',
					registered: 'Registrado',
					notRegistered: 'No registrado',
					register: 'Registrarse',
					formHint: '',
				},
				statuses: {
					yourStatus: 'Su estado',
					paymentMethod: 'Método de pago',
					payable: 'Pagable',
					notPayable: 'No pagable',
					notAdd: 'No agregar',
				},
				form: {
					title: 'Vinculación de cuentas',
					whyDoWeNeedThisData: '¿Por qué necesitamos estos datos?',
				},
				paymentStatus: {
					lastTransaction: 'Ultimo pago',
					status: {
						inProgress: 'En curso',
						error: 'Error',
						success: 'Éxito',
					},
					fields: {
						amount: 'Cantidad',
						date: 'Fecha',
						status: 'Estado',
						methods: 'Métodos de pago',
					},
				},
			},
		},
		analytics: {
			heading: 'Análisis de ingresos',
			categories: {
				awareness: 'Formatos de patrocinio',
				performance: 'Formatos interactivos',
				actions: 'Bono de acción',
				freemium: 'Uplify Link',
				referrals: 'Referencias',
				youtube_text: 'Youtube Text',
				extension: 'Extensión',
			},
			source: {
				title: 'Fuente de ingresos',
			},
		},
		payoutHistory: {
			title: 'Historial de pagos',
			columns: {
				date: 'Fecha',
				amount: 'Cantidad',
				service: 'Método de pago',
				invoice: 'Factura',
			},
			loading: 'cargando',
			noData: 'Aún no se han realizado pagos.',
		},
		tipaltiAdvice: {
			title: 'Gana primero {amount} para desbloquear los retiros',
			description: 'La configuración de pago solo está disponible para los creadores que hayan ganado el 80% del mínimo de pago.',
		},
		tochkaAdvice: {
			title: 'Conecte uno de los servicios de pago',
			description: 'No tienes ningún servicio de pago conectado. Conecta una forma preferida de recibir pagos.',
		},
	},
}

export default dict
