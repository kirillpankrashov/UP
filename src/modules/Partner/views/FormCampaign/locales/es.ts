import { default as baseDict } from './en'

const dict: typeof baseDict = {
	campaign: {
		defaultName: 'Nombre de la campaña',
		defaultNameNew: 'Nueva campaña',
		group: 'Grupo',
		loading: 'Cargando campaña ..',
		fetchError: {
			title: 'No se pudo cargar la campaña',
			description: 'Se produjo un error al cargar la campaña. Por favor, inténtelo más tarde.',
			retry: 'Reintentar',
		},
		type: {
			title: 'Tipo de campaña',
			description: 'Elige el tipo de campaña que mejor se adapte a tus objetivos de marketing.',
			comingSoon: 'Próximamente',
		},
		types: {
			awareness: {
				title: 'Awareness de marca',
				description: 'Coste fijo de anuncios basado en el modelo CPM',
			},
			brandLift: {
				title: 'Brand Lift',
				description: 'Investigación que mide el nivel de percepción de marca o producto',
			},
			task: {
				title: 'Tarea',
				description: 'Asignación con un coste individual y participación directa del streamer',
			},
			performance: {
				title: 'Rendimiento',
				description: 'Costo de publicidad flexible basado en el modelo CPA',
			},
		},
		settings: {
			title: 'Ajustes de la campaña',
			advice: {
				title: '¿Qué es esta información?',
				name: {
					title: 'Nombre de la campaña',
					description: 'que aparecerá de forma diferente durante la transmisión a los transmisores.',
				},
				currency: {
					title: 'La moneda',
					description: 'en la que se cobrará la colocación de su campaña.',
				},
			},
			form: {
				name: {
					label: 'Nombre de la campaña',
					placeholder: 'Por ejemplo, promoción de primavera',
				},
				externalId: {
					label: 'ID externo',
					placeholder: 'Por ejemplo, PF-CMP-1661693993',
				},
				description: {
					label: 'Descripción de la campaña',
					placeholder: 'Describa la campaña',
				},
				category: {
					label: 'Categoría de la campaña',
					placeholder: 'Seleccione la categoría',
					noData: 'Sin categorías',
				},
				currency: {
					label: 'Moneda',
					placeholder: 'Seleccione la moneda',
				},
				schedule: {
					startedAtLabel: 'Fecha de inicio',
					endedAtLabel: 'Fecha de finalización',
				},
				holding: {
					label: 'Anunciante holding',
					placeholder: 'Seleccione holding',
				},
				advertiser: {
					label: 'Anunciante',
					placeholder: 'Seleccione anunciante',
					noData: 'Sin datos',
				},
				mediaAgency: {
					label: 'Agencia de medios',
					placeholder: 'Seleccione agencia de medios',
					noData: 'Sin datos',
				},
				ordMarkup: {
					label: 'ORD markup',
					placeholder: '',
				},
				status: {
					label: 'Estado',
				},
				awareness: {
					description: {
						label: 'Conciencia',
						placeholder: 'Describa la campaña para los streamers',
					},
				},
				brandlift: {
					description: {
						label: 'Impulso de marca',
						placeholder: 'Describa la campaña para los streamers',
					},
				},
				timezone: {
					label: 'Zona horaria',
					placeholder: 'Zona horaria',
				},
				formSendStatus: {
					updated: 'La campaña fue actualizada',
				},
			},
		},
		affiliateNetworks: {
			title: 'Redes de afiliación',
			description: 'Integración y configuración con redes de afiliados externas.',
			field: {
				label: 'Red',
				notSelected: 'Sin integraciones',
			},
		},
		urlParams: {
			title: 'GET parámetros constructora',
			description: 'Parámetros adicionales para la URL que le permiten realizar un seguimiento del rendimiento de sus campañas.',
			field: {
				paramBlock: 'Parámetro',
				param: 'Parámetro',
				name: 'Valor',
				addParam: 'Añadir otro parámetro',
				deleteParam: 'Eliminar parámetro',
			},
		},
		pixel: {
			title: 'Uplify Pixel',
			description: 'Uplify Pixel lo ayuda a rastrear la actividad del usuario en el sitio del anunciante para publicar anuncios de manera efectiva.',
			field: {
				label: 'Uplify Pixel',
				btn: 'Copiar enlace de píxel',
			},
		},
	},
}

export default dict
