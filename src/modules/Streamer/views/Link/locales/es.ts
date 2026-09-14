import { default as baseDict } from './en'

const dict: typeof baseDict = {
	link: {
		title: 'Uplify Link',
		tabs: {
			setup: 'Configuración de widget',
			profile: 'Perfil',
			alerts: 'Alertas de transmisión',
			supporters: 'Analítica',
			posts: 'Publicaciónes',
		},
		posts: {
			addNewBtn: 'Agregar nueva publicación',
			post: {
				createdAt: 'Publicado en',
				edit: 'Editar',
				remove: 'Eliminar',
			},
			sidebar: {
				title: {
					add: 'Agregar nueva publicación',
					edit: 'Publicación de edición',
				},
				markdown: {
					label: 'Texto de markdown',
					hint: 'Por ejemplo:<br><br>Me encanta **<b>texto en negrita</b>**.<br>También *<i>texto en cursiva</i>* es genial.<br><br>Mi enlace favorito es [Uplify.link](https://uplify.link).',
				},
				embed: {
					label: 'Enlace de incrustación',
					hint: 'Some text',
				},
				btns: {
					post: 'Publicar',
					submit: 'Ahorrar',
				},
			},
		},
		setup: {
			link: {
				title: 'Tu página de enlace Uplify',
				description: 'Agrega este enlace a tus biografías de redes sociales y compártelo con tu comunidad. Gana más compartiendo tu enlace con regularidad.',
				errors: {
					unique: 'El creador con este nombre ya existe',
					general: 'Nombre inválido',
				},
			},
			goal: {
				title: 'Establecer una meta',
				description: 'Las metas tienden a atraer más partidarios. Agrega una meta y déjalos ser parte de tu viaje creativo.',
				addGoal: 'Agregar meta',
				reachedOf: '100 de 2 000 alcanzados!',
			},
			goalForm: {
				title: 'Crea un nuevo objetivo',
				editTitle: 'Editar objetivo',
				fields: {
					title: {
						caption: 'Título del objetivo',
						placeholder: 'p.ej. Nueva webcam',
					},
					description: {
						caption: 'Descripción del objetivo',
						placeholder: 'Cuando alcance los 200 puntos, compraré una nueva webcam para darle un nuevo nivel a mis transmisiones en vivo.',
						hint: 'Proporciona una breve descripción de las razones por las que necesitas alcanzar tu objetivo.',
					},
					amount: {
						caption: 'Cantidad objetivo',
						hint: 'Establezca una cantidad sin el signo de moneda, por ejemplo, 100. El progreso de la meta se mostrará como un porcentaje. ',
					},
					progress: {
						caption: 'Progreso hasta ahora',
						hint: 'Ingrese la cantidad que ya ha recaudado para esta meta. Ingrese 0 si está comenzando desde cero.',
					},
					publicAmount: {
						caption: 'Mostrar cantidad objetivo públicamente',
						hint: 'Mostrar la cantidad objetiva total en su página personal',
					},
				},
				statusMessage: {
					success: 'Meta fue actualizada',
					fail: 'Error al actualizar la meta',
				},
			},
			poll: {
				title: 'Establecer una nueva encuesta',
				description: 'Las encuestas ayudan a mejorar la participación de su audiencia, lo que aumentará simultáneamente su tasa de participación y sus ganancias. Los espectadores deben ver los anuncios antes de votar y obtendrá ingresos de los anuncios que muestre.',
				addPoll: 'Añadir encuesta',
				duration: 'Duración',
				votes: 'Votos - {num} restantes',
			},
			pollForm: {
				title: 'Crear una nueva encuesta',
				editTitle: 'Editar encuesta',
				responsesTitle: 'Respuestas',
				responsesTitleMin: '(mínimo 2)',
				fields: {
					question: {
						caption: 'Pregunta',
						placeholder: 'ej. ¿Qué juego debería jugar a continuación?',
					},
					answer: {
						caption: 'Respuesta',
					},
					condition: {
						caption: 'Modo de encuesta',
						hint: 'Condición de terminación: por tiempo o número de votos',
						duration: 'Minutos',
						maxVotes: 'Votos',
					},
					duration: {
						caption: 'Duración en minutos',
						hint: 'El tiempo de validez de su encuesta.',
					},
					maxVotes: {
						caption: 'Objetivo de votos',
						hint: 'La encuesta finalizará cuando alcance este número de votos',
					},
				},
				statusMessage: {
					success: 'La encuesta fue actualizada',
					fail: 'Error al actualizar la encuesta',
				},
			},
		},
		profile: {
			telegram: {
				title: 'Repositorio automático',
				description: 'Conecta tu&nbsp;red social y&nbsp;las publicaciones aparecer&aacute;n autom&aacute;ticamente en&nbsp;tu&nbsp;p&aacute;gina de&nbsp;Uplify Link.',
				input: {
					title: 'Telegram channel',
					description: '{\'A&ntilde;ade un&nbsp;enlace a&nbsp;tu&nbsp;canal con @ y&nbsp;asigna a&nbsp;nuestro bot @UplifyBot como administrador.\'}',
					label: 'Link',
					placeholder: '{\'@my_channel\'}',
				},
				errors: {
					channelExists: 'No hay canal con este nombre',
					invalidName: 'El nombre del canal incorrecto',
				},
			},
			about: {
				title: 'Tu biografía',
				description: 'Añade datos para tu perfil',
				placeholder: 'Solo unas palabras',
				preview: 'Avance:',
				advice: {
					label: 'Sugerencia',
					title: 'Puedes usar Markdown',
					description: 'Por ejemplo:<br><br>Me encanta **<b>texto en negrita</b>**.<br>También *<i>texto en cursiva</i>* es genial.<br><br>Mi enlace favorito es [Uplify.link](https://uplify.link).',
				},
				ai: {
					label: 'Texto generado por IA para tu perfil',
					delete: 'Borrar',
					edit: 'Editar',
					like: 'Como',
					suggestionFull: 'Esto es lo que piensa nuestra IA sobre {name}',
					suggestionEmptyMale: '{name} no escribió nada sobre sí mismo, pero esto es lo que nuestra IA puede decir',
					suggestionEmptyFemale: '{name} no escribió nada sobre sí misma, pero esto es lo que nuestra IA puede decir',
				},
			},
			gear: {
				title: 'Engranajes y configuración',
				description: 'Dile a tu audiencia qué tipo de equipo de transmisión usas',
				form: {
					addBlock: 'Añadir bloque',
					deleteBlock: 'Eliminar bloque',
					block: {
						title: 'Equipo',
						category: {
							label: 'Categoría',
							placeholder: 'Especifica una categoría',
						},
						description: {
							label: 'Descripción',
							placeholder: 'Describe el equipo',
						},
						link: {
							label: 'Enlace',
							placeholder: 'Proporcionar un enlace',
						},
						sku: {
							label: 'SKU',
							placeholder: '',
						},
					},
				},
				advice: {
					label: 'Sugerencia',
					title: 'Widget de Yandex.Market',
					text: 'Consulte la&nbsp;disponibilidad de&nbsp;productos en&nbsp;Yandex.Market. Si&nbsp;falta al&nbsp;menos uno, se&nbsp;mostrar&aacute; un&nbsp;widget con ofertas similares en&nbsp;lugar de&nbsp;tus productos.',
				},
			},
			social: {
				title: 'Enlaces a redes sociales',
				description: 'Comparte enlaces de redes sociales con tu audiencia',
				form: {
					addBlock: 'Añadir bloque',
					deleteBlock: 'Eliminar bloque',
					block: {
						title: 'Enlace',
						category: {
							label: 'Red social',
							placeholder: 'Seleccionar red social',
						},
						description: {
							label: 'URL',
							placeholder: 'Pegue el enlace',
						},
					},
				},
			},
			theme: {
				title: 'Tema de color',
				description: 'Elija un tema de color para su página Uplify Link',
				select: {
					label: 'Tema de color',
					options: {
						light: 'Luz',
						dark: 'Oscuro',
					},
				},
			},
			banner: {
				title: 'Banner de perfil',
				description: 'Personaliza el banner de tu perfil en la página personal',
				label: 'Sube un PNG, JPG de menos de 5 MB. El tamaño de la imagen debe ser de al menos 1376x300 px.',
			},
		},
		alerts: {
			supportAlert: 'Alerta de soporte',
			goalAlert: 'Alerta de objetivo',
			pollAlert: 'Alerta de encuesta',
			chatAlert: 'Alerta de chat',
			preview: 'Vista previa',
			alertPreview: {
				title: 'Vista previa de alerta',
				description: 'Configure su widget en su software OBS (OBS Studio, Twitch Studio o Xsplit) y pruebe alertas antes de transmisión en vivo.',
				sendTest: 'Enviar vista previa',
			},
			chatBotReminder: 'Requiere configurar un bot de chat',
			fields: {
				messageDuration: {
					caption: 'Tiempo de visualización de alerta',
					hint: 'Cuánto tiempo se mostrará una alerta en la transmisión en vivo.',
				},
				supportAlertPosition: {
					caption: 'Posición de alerta de apoyo',
					hint: 'Especifica dónde en la pantalla se mostrará la alerta.',
				},
				goalAlertPosition: {
					caption: 'Posición de alerta de objetivo',
					hint: 'Especifica dónde en la pantalla se mostrará la alerta.',
				},
				pollAlertPosition: {
					caption: 'Posición de alerta de encuesta',
					hint: 'Especifica dónde en la pantalla se mostrará la alerta.',
				},
				chatAlert: {
					caption: 'Habilitar alertas de chat',
					hint: 'Especifica si se muestran o no notificaciones interactivas durante una transmisión en vivo.',
				},
			},
			statusMessage: {
				success: 'Configuraciones actualizadas',
				fail: 'Error al actualizar configuraciones',
			},
		},
		supporters: {
			stats: {
				supporters: 'Ingresos estimados hoy',
				revenueDay: 'Ingresos estimados hoy',
				cpm: 'Precio medio por 1.000 visitas (CPM)',
				points: 'Puntos mensuales',
				revenueMonth: 'Ingresos estimados mensuales',
				impressions: 'Impresiones entregadas',
			},
			history: {
				supporters: 'Soportadores',
				supportedYou: '¡te han apoyado!',
				noSupportersTitle: 'Todavía no tienes soportadores',
				noSupportersMessage: 'Anima a tus oyentes a visitar tu página para obtener sus primeros soportes',
				impressions: '{imps} vistas de anuncios',
				targets: {
					today: 'Hoy',
					yesterday: 'Ayer',
					week: 'Esta semana',
					month: 'Este mes',
					allTime: 'Todo el tiempo',
					startDate: 'Fecha de inicio',
					endDate: 'Fecha de fin',
				},
				columns: {
					id: '#',
					name: 'Nombre',
					contribution: 'Puntos',
				},
				cacheTimeLeft: 'Esta calificación se actualizará en {min} min.',
			},
		},
		widgetPosition: {
			leftTop: 'Esquina superior izquierda',
			rightTop: 'Esquina superior derecha',
			leftBottom: 'Esquina inferior izquierda',
			rightBottom: 'Esquina inferior derecha',
			disabled: 'OFF',
		},
		chatbotMsgInterval: {
			every15mins: 'Cada 15 minutos',
			every30mins: 'Cada 30 minutos',
			everyHour: 'Cada 1 hora',
			disabled: 'OFF',
		},
	},
}

export default dict
