import { default as baseDict } from './en'

const dict: typeof baseDict = {
	adset: {
		defaultName: 'Nombre del Grupo',
		defaultNameNew: 'Nuevo Grupo',
		loading: 'Cargando Grupo ..',
		fetchError: {
			title: 'No se pudo cargar el grupo',
			description: 'Se produjo un error al cargar el grupo o los datos de la campaña. Por favor, inténtelo más tarde.',
			retry: 'Reintentar',
		},
		settings: {
			title: 'Configuraciones de grupo',
			description: 'Agrupe sus campañas por parámetros y establezca objetivos para rastrear cada una de ellas eficientemente',
			form: {
				name: {
					title: 'Nombre del grupo',
					label: 'El nombre solo es visible para ti',
					placeholder: 'Grupo',
				},
				description: {
					title: 'Descripción del grupo',
					label: 'Descripción del grupo',
					placeholder: 'Describe el grupo para el autor',
				},
				externalId: {
					title: 'ID externo',
					placeholder: 'Por ejemplo, PF-CMP-1661693993',
				},
				altName: {
					addBtn: 'Agregar nombre alternativo para streamers',
					label: 'Nombre del grupo para streamers',
					placeholder: 'Por ejemplo, Promoción de Primavera',
				},
				platform: {
					title: 'Plataforma',
				},
				format: {
					title: 'Formato',
					moreAbout: 'Aprende más sobre formatos creativos',
					formats: {
						fullscreen: {
							label: 'Vídeo a pantalla completa',
							description: 'Anuncio de media duración colocado en un stream en vivo a pantalla completa',
						},
						smallVideo: {
							label: 'Vídeo en una ventana separada',
							description: 'Anuncio de media duración colocado en un stream en vivo en 1/4 de pantalla',
						},
						custom: {
							label: 'Solución personalizada',
							description: 'Creativo multi-formato en un stream en vivo en cualquier área visible de la pantalla',
						},
					},
				},
				formatSettings: {
					duration: {
						label: 'Duración, seg',
						tooltip: 'Tiempo que el creativo se muestra en pantalla. Para creativos de vídeo se usa la duración del vídeo y este campo se ignora — relevante solo para imágenes.',
					},
					frequency: {
						label: 'Frecuencia, seg',
						tooltip: 'Intervalo tras el cual el creativo se mostrará de nuevo al mismo espectador. Dejar en blanco para mostrar constantemente',
					},
				},
				schedule: {
					title: 'Horario',
					startedAtLabel: 'Fecha de inicio',
					endedAtLabel: 'Fecha de finalización',
				},
				viewTime: {
					label: 'Tiempo de visualización',
					from: 'Desde',
					to: 'Hasta',
				},
				payType: {
					payPerImpression: 'Paga por impresión',
					payPerAction: 'Paga por acción',
				},
				budget: {
					title: 'Presupuesto',
					costPerUnitLabel: 'Costo de publicidad por unidad',
					impressionsLabel: 'Número de vistas',
					totalBudget: 'Presupuesto total',
					costPerActionLabel: 'Costo por acción',
					budgetLabel: 'Presupuesto',
					totalActions: 'Cantidad esperada de acciones:',
					bidCap: 'Coste por milla, CPM',
					impressions: 'Impresiones',
					cpc: 'Coste por clic',
					clicks: 'Número de clics',
					cpa: 'Coste de conversión',
					conversions: 'Número de conversiones',
					margin: 'Margen de mejora',
					agencyCommission: 'Comisión de agencia',
					cpmPercent: 'Reparto del presupuesto, CPM',
					creatorsPayout: 'Pago a los creadores',
					conversion: 'Número de conversiones',
					infoMessage: 'Sólo para uso interno',
					dailyClickCap: 'Límite diario de clics',
					dailyConversionCap: 'Límite de conversión diaria',
					creatorsCPM: 'Pagar a los creadores por CPM',
					creatorsCPA: 'Pagar a los creadores por conversión',
				},
				targets: {
					title: 'Objetivos',
					ctrLabel: 'CTR objetivo',
					evrLabel: 'EVR objetivo',
					cpaLabel: 'CPA objetivo',
				},
				frequency: {
					title: 'Frecuencia',
					standard: {
						label: 'Estándar',
						description: 'Estándar - Frecuencia recomendada de vistas con alcance óptimo: Adecuado para campañas a largo plazo',
					},
					accelerated: {
						label: 'Acelerado',
						description: 'Acelerado - Frecuencia de vistas con alcance máximo: adecuado para campañas a corto plazo',
					},
					customizable: {
						label: 'Personalizable',
						description: 'Personalizable - Frecuencia de vistas basada en parámetros de alcance específicos: adecuado para campañas no estándar',
					},
					impressionsCount: 'Número de inserciones',
					period: 'Período',
				},
				streamerDayLimit: {
					label: 'Límite diario de inserciones por creador',
					placeholder: '100',
				},
				status: {
					label: 'Estado',
				},
				timezone: {
					label: 'Zona horaria',
					placeholder: 'Zona horaria',
				},
				formSendStatus: {
					updated: 'El grupo fue actualizado',
				},
			},
		},
		alerts: {
			title: 'Alertas',
			description: {
				label: 'Descripción alerta',
				placeholder: 'Installs {{current_actions}} / {{target_actions}}.\nInstall Opera GX and win iPhone\n',
			},
		},
		targeting: {
			title: 'Apuntar por la creadoras',
			addition: {
				onlySelected: 'solo seleccionado',
				exceptSelected: 'todos, excepto seleccionado',
				excludeSelected: 'Excluir categorías seleccionadas de objetivos',
			},
			evaluation: {
				label: 'Evaluación de la audiencia',
				description: 'Seleccione un idioma de stream para obtener una estimación preliminar de la audiencia',
				size: 'Tamaño',
				reach: 'Alcance',
				streamersNumber: 'Número de transmisiones',
				howCalculated: '¿Cómo se calculan los indicadores?',
			},
			form: {
				agencies: {
					label: 'Selección de red',
					placeholder: 'Seleccionar agencia',
					warning: {
						title: 'Su valor para CPM es más bajo que el precio de la red',
						text: 'El&nbsp;valor ingresado para CPM es&nbsp;menor que el&nbsp;costo que requiere la&nbsp;red de&nbsp;socios.Podr&aacute; guardar la&nbsp;campa&ntilde;a, pero no&nbsp;funcionar&aacute; hasta que se&nbsp;corrija el&nbsp;valor.',
					},
				},
				streamers: {
					label: 'Selección de creadores',
					placeholder: 'Seleccionar creadores',
					pricePlaceholder: 'Precio',
					addBtn: 'Agregar',
					nameColumn: 'Creador',
					priceColumn: 'Precio',
				},
				language: {
					label: 'Idioma de traducción',
					placeholder: 'Seleccione idioma',
				},
				countries: {
					label: 'Países',
					placeholder: 'Seleccione país',
				},
				devices: {
					label: 'Dispositivos',
					placeholder: 'Seleccionado dispositivo',
				},
				gender: {
					label: 'Género',
					placeholder: 'Seleccione género',
				},
				age: {
					label: 'Edad de los Creadores',
					fromPlaceholder: 'desde',
					toPlaceholder: 'hasta',
				},
				ageRestrictions: {
					label: 'Creador tiene restricciones de edad habilitadas (18+)',
				},
				tags: {
					label: 'Etiquetas',
					placeholder: 'Seleccione etiqueta',
				},
			},
		},
		targetingAudience: {
			title: 'Apuntar por la audiencia',
		},
		labels: {
			title: 'Etiqueta de patrocinio<br/>(solo mercado CEI)',
			fields: {
				chatbot: {
					label: 'Chatbot erid ID',
				},
				creative: {
					label: 'Creative erid ID',
				},
			},
		},
		chatBot: {
			title: 'Configuración del Chatbot',
			form: {
				productUrl: {
					label: 'URL del producto',
					placeholder: 'Introducir enlace',
				},
				mobileProductUrl: {
					label: 'URL de productos móviles (DeepLink)',
					placeholder: 'Introducir enlace',
				},
				productUrlShort: {
					label: 'URL corta',
					placeholder: '',
				},
				chatBotText: {
					label: 'Texto del Chatbot',
					placeholder: 'Ingresar texto',
				},
			},
		},
		creative: {
			title: 'Creativa de datos',
			form: {
				productUrl: {
					label: 'URL del producto',
					placeholder: 'Introducir enlace',
				},
				mobileProductUrl: {
					label: 'URL de productos móviles (DeepLink)',
					placeholder: 'Introducir enlace',
				},
				videoDescriptionText: {
					label: 'Descripción Texto',
					placeholder: 'Ingresar texto',
				},
			},
		},
		preview: {
			title: 'Creativa de datos',
			advice: {
				title: 'Requisitos',
				requirements: 'Resolución: 1920 x 1080 píxeles.<br/>Formato: MP4<br/>Tamaño: hasta {size} MB',
			},
			errors: {
				unknown: 'Error desconocido',
			},
		},
		messages: {
			groupUpdatedSuccesfully: 'Grupo actualizado exitosamente',
		},
		analytics: {
			title: 'Píxeles',
			pixelClicks: {
				label: 'Píxel de conversión img',
				placeholder: 'Ingrese el enlace',
				addLabel: 'Agrega otro rastreador',
			},
			pixelClicksScripts: {
				label: 'JavaScript Conversion Pixel',
				placeholder: 'Ingrese el código',
			},
			erid: {
				title: 'ERID (solo mercado CEI)',
				label: 'erid ID',
				placeholder: '',
			},
		},
	},
}

export default dict
