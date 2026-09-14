import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creators: {
		header: {
			title: 'Creadores',
		},
		tabs: {
			overview: 'Descripción general',
			history: 'Historial de transacciones',
			campaignsActive: 'Campañas',
			campaignsClosed: 'Completado',
			creators: 'Creadores',
			billing: 'Facturación',
		},
		invite: {
			title: 'Invitar creadores',
			invited: 'Creadores invitados',
			amount: 'Cantidad a ser pagada',
			link: 'Enlace de invitación',
			advice: {
				title: 'Obtén una parte de los ingresos',
				description: 'Genera una participación de los ingresos de los creadores que refieras mientras estén activos en Uplify.',
				link: {
					url: '/',
					label: 'Cómo funciona',
				},
			},
		},
		creatorsList: 'Lista de creadores',
		billing: {
			companyInformation: {
				title: 'Datos de la empresa',
				name: {
					label: 'Nombre',
					placeholder: 'Nombre de la empresa',
				},
				email: {
					label: 'Correo electrónico',
					placeholder: 'email@email.com',
				},
				address: {
					label: 'Dirección',
					placeholder: 'Dirección de la empresa',
				},
				phone: {
					label: 'Teléfono',
					placeholder: '+1 (123) 456 789',
				},
			},
			paymentDetails: {
				title: 'Datos de pago',
				bankName: {
					label: 'Nombre del banco',
					placeholder: '',
				},
				bankAccountName: {
					label: 'Nombre de la cuenta bancaria',
					placeholder: '',
				},
				bankAccountHolderAddress: {
					label: 'Dirección del titular de la cuenta bancaria',
					placeholder: '',
				},
				bankAddress: {
					label: 'Dirección del banco',
					placeholder: '',
				},
				bankAccountNumber: {
					label: 'Número de cuenta bancaria',
					placeholder: '',
				},
				BIC: {
					label: 'Código BIC / SWIFT',
					placeholder: '',
				},
				routingNumber: {
					label: 'Número de ruta',
					placeholder: '',
				},
			},
			invoices: {
				title: 'Facturas',
				date: 'Fecha',
				amount: 'Importe',
				invoice: 'Factura',
			},
		},
		history: {
			title: 'Historial de transacciones',
			payments: 'Transacciones de todos los tiempos',
			none: 'No hay transacciones',
			columns: {
				date: 'Fecha',
				payment: 'Pago por día',
				details: 'Detalles',
			},
			detailed: {
				title: 'Detalles de transacciones',
				description: 'Creadores que trajeron dinero ese día.',
			},
		},
		list: {
			title: 'Lista de creadores',
			description: 'Lista de creadores que invitaste. Pagos por todo el tiempo ',
			none: 'No hay creadores',
			columns: {
				creator: 'Creador',
				lastActivity: 'Último día de actividad',
				earnings: 'Ganancias',
			},
		},
		creatorsPayout: {
			title: 'Pago de los creadores',
			description: 'Ingrese la cantidad que sus creadores deberían recibir cuando patrocinen su campaña. Especifique el coste por cada mil vistas (CPM).',
			link: {
				text: 'Más sobre formatos creativos',
				href: 'https://help.uplify.app/en/articles/5640856-in-stream-campaign-formats',
			},
			thirdParty: {
				checkbox: 'Permitir que socios externos realicen patrocinios',
				popover: {
					label: 'Consejo',
					text: 'Ingrese el monto básico que incluye su comisión y el pago de los creadores. Especifique el coste por cada mil vistas (CPM).',
				},
			},
			comission: {
				label: 'Comisión',
				popover: {
					label: 'Consejo',
					text: 'Se utiliza para campañas con acuerdos individuales con patrocinadores o si los pagos a los creadores no están configurados.',
				},
			},
			darkMarket: {
				checkbox: 'Habilitar una tarifa más alta para los clientes del mercado oscuro',
				popover: {
					label: 'Consejo',
					text: 'Ingrese un monto base para clientes de la categoría del mercado oscuro (juegos de apuestas, casino, criptomonedas, etc.). Especifique el costo por cada mil vistas (CPM).',
				},
			},
			cpaLabel: 'Pago de los creadores',
			darkMarketLabel: 'Precios de terceros (incl. tarifa)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip_video: 'Overlay 15%',
				interactive: 'Interactivo',
				preroll: 'Pre-Roll',
				cpa: 'CPA cost',
				cpc: 'CPC cost',
			},
		},
		creatorsTable: {
			columns: {
				creators: 'Creador',
				lastActivity: 'Última actividad',
				balance: 'Saldo',
				campaign: 'Campañas',
			},
			status: {
				checkList: {
					label: 'Incorporación en progreso',
					text: 'El streamer aún no ha completado el proceso de incorporación.',
				},
				payable: {
					label: 'Verifique la configuración de pago',
					text: 'El streamer aún no ha configurado el pago.',
				},
				lowCtr: {
					label: 'CTR bajo',
					text: 'Problemas con el CTR en todas las campañas.',
				},
			},
			none: 'Sin datos',
		},
		settings: {
			title: 'Configuraciones',
			custom: {
				headline: 'Pago personalizado',
				descr: 'Ingrese el monto personalizado que {streamer} debe recibir al realizar el patrocinio. Especifique el coste por cada mil vistas (CPM)',
			},
			darkMarket: {
				headline: 'Tarifa para clientes del mercado oscuro',
			},
			cpaLabel: 'Pago de los creador',
			darkMarketLabel: 'Precios de terceros (incl. tarifa)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip: 'Overlay 15%',
				interactive: 'Interactivo',
			},
		},
		stats: {
			columns: {
				creator: 'Creador',
				campaign: 'Campaña',
				income: 'Ingreso',
				views: 'Vistas',
				avgCtr: 'Prom. CTR',
				ctr: 'CTR',
				status: 'Estado',
			},
			none: 'Sin datos',
		},
		campaignCreators: {
			title: 'Informe de campaña: {title}',
		},
		creatorCampaigns: {
			title: '{streamer} campañas',
		},
		categoriesStopList: {
			title: 'Lista de parada de categorías',
			description: 'Las campañas de las categorías seleccionadas se desactivarán automáticamente para su visualización en la sección de anuncios In-stream para sus creadores.',
		},
		campaigns: {
			active: {
				title: 'Campañas activas',
				description: 'Lista de campaña disponible para sus creadores',
			},
			closed: {
				title: 'Campañas cerradas',
				description: 'Lista de campañas cerradas',
			},
			reportBtn: {
				full: 'Informe de campaña',
				short: 'Informe',
			},
			none: 'Las campañas están llegando pronto',
		},
		campaignRow: {
			of: 'de',
			dailyActions: 'Acciones diarias',
			dailyLimit: 'Vistas restantes',
			dailyActionsLimit: 'Acciones diarias restantes',
			dailyActionsLimitLabel: 'Se muestra el número total de acciones disponibles para toda la comunidad.',
			dailyImpressions: 'Vistas diarias',
			potentialIncome: 'Ingresos potenciales',
			yourIncome: 'Tus ingresos',
			yourCTR: 'Tu CTR',
			averageCTR: 'CTR Promedio',
			dateStart: 'Fecha de inicio',
			dateEnd: 'Fecha final',
			enable: 'Habilitar',
			disable: 'Deshabilitar',
			attended: 'Atendido',
			toggling: 'Pendiente..',
			tags: {
				undefinedFormat: 'Formato desconocido',
				dailyLimitDepleted: 'El límite de hoy se agotó',
				totalLimitDepleted: 'El límite de hoy se agotó',
				setupExtension: 'Configurar extensión',
				checkExtension: 'Verificar el estado de la extensión',
				extension: 'Extensión',
				actionBonus: 'Bono de acción',
				dailyActionsLimitDepleted: 'Límite de acción alcanzado',
				performanceDailyDepleted: 'El límite de hoy se agotó',
			},
			disabledUntil: 'Deshabilitado hasta: {date}',
			reasons: {
				lowCTR: '🔥 Razón: CTR bajo',
				lowCTRLink: {
					text: '¿Cómo mejorar mi CTR?',
					href: 'https://help.uplify.app/en/articles/5640847-uplify-basics',
				},
				moderator: 'Decisión del moderador',
			},
			format: {
				fullscreen: 'Overlay 50%',
				pip: 'Overlay 15%',
			},
			totalImpressions: 'Vistas disponibles',
		},
		campaignSidebar: {
			potentialRevenue: 'Ingresos potenciales',
			totalRevenue: 'Tus ingresos totales',
			revenue: 'Sus ingresos',
			estimatedRevenue: 'Ingresos estimados',
			ctr: 'Su CTR',
			target_ctr: 'Objetivo CTR',
			evr: 'Tu calidad de conversiones',
			clicks: 'Clics',
			date: 'Los días restantes',
			dateStart: 'Fecha de inicio',
			dateEnd: 'Fecha final',
			paymentType: 'Tipo de pago',
			pricePerViews: 'Precio por 1000 vistas',
			pricePerAction: 'Precio por 1 acción',
			pricePerClick: 'Precio por 1 clic',
			frequency: 'Frecuencia',
			adFormat: 'Formato',
			advertiserCategory: 'Categoría de anunciantes',
			description: 'Descripción de la campaña',
			creativePreview: 'Vista previa creativa',
			messageInDescription: 'Mensaje en la descripción',
			chatMessage: 'Mensaje en chatbot',
			campaignOn: 'Campaña activada',
			campaignOff: 'Campaña desactivada',
			productLink: 'Enlace de producto',
			copyProductLink: 'Copiar enlace de producto personal',
			deliveredAtions: 'Acciones entregadas',
			deliveredImpressions: 'Vistas entregadas',
			deliveredDailyActions: 'Acciones entregadas',
			deliveredClicks: 'Clics entregados',
			downloadCreative: 'Descargar creativa',
			copyDescription: 'Descripción de la copia',
			videos: 'Enlace de video',
			addNewVideo: 'Agregar otro video',
			howToIncreaseCtr: '¿Cómo aumentar el CTR?',
			howToIncreaseEvr: '¿Cómo aumentar el EVR?',
			evrList: 'Eventos EVR',
			scale: {
				poor: 'Pobre',
				fair: 'Justa',
				good: 'Buena',
				veryGood: 'Muy buena',
				excellent: 'Excelente',
			},
		},
	},
}

export default dict
