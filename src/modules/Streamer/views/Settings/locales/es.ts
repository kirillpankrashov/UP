import { default as baseDict } from './en'

const dict: typeof baseDict = {
	settings: {
		header: {
			title: 'Configuraciones',
			widget: 'Widget',
			chatbot: 'Chatbot',
			extension: 'Extensión',
			stream: 'Transmisión en vivo',
			disabled: 'OFF',
			enabled: 'ON',
		},
		widgetPlatform: {
			title: 'Plataforma de monetización',
			description: 'Elija la plataforma donde trabajará con patrocinadores, recopilará estadísticas y monetizará. La elección de una plataforma afectará a las campañas y módulos de widget disponibles.',
		},
		widgetLink: {
			title: 'Enlace de widget',
			description: 'Enlace para OBS u otros programas de transmisión.',
			optionDrag: {
				label: 'Opción 1: arrastrar y soltar en OBS',
				helpWithSetup: 'Guía paso a paso',
				warn: 'Arrastrar y soltar en OBS no funcionará si OBS se ejecuta como administrador.',
				btn: 'Arrastrar y soltar en OBS',
			},
			optionLink: {
				label: 'Opción 2: configurar el widget desde cero',
				helpWithSetup: 'Guía paso a paso',
				warn: 'Asegúrese de que el widget esté configurado en toda el área visible en su software de transmisión y en la capa superior, y que esté seleccionada la configuración correcta. Consulta la guía.',
			},
			optionWithSocket: {
				label: 'Opción 3: Configuración automática mediante WebSocket OBS',
				helpWithSetup: 'Guía paso a paso',
				obsSocketPassPlaceholder: 'Contraseña de WebSocket de OBS',
				obsSocketPortPlaceholder: 'Puerto de WebSocket de OBS',
				warn: 'Asegúrese de que su versión de OBS es 28.0.0 o superior. Para un funcionamiento correcto, la versión de WebSocket debe ser 5.0.0 o superior.',
			},
			preview: 'Mostrar animación de prueba en software de transmisión.',
		},
		widgetDelay: {
			title: 'Retraso de transmisión',
			new: 'nuevo',
			description: 'Establecer el tiempo de retraso de transmisión para el correcto funcionamiento del servicio y las notificaciones del chatbot.',
			howItWorks: 'Cómo funciona',
			fieldLabel: 'Tiempo de retraso (0 a 1800 s)',
		},
		chatbot: {
			title: 'Configuración del chatbot',
			description: 'El chatbot se utiliza para enviar mensajes y encuestas.',
			surveyDescription: '¿No puedes configurar Nightbot o estás trabajando con otro bot?',
			wantAnotherChatbot: 'Quiero otro chatbot',
			shareChatbotSetup: 'Comparte con nosotros tu experiencia sobre la configuración del chatbot',
			goThroughTheSurvey: 'Realiza la encuesta',
			helpWithSetup: 'Guía paso a paso',
			connectNightbot: 'Conectar Nightbot',
			disconnectNightbot: 'Desactivar Nightbot',
			checkChatbot: 'Revisar Nightbot',
			sendMessage: 'Vista previa del mensaje',
			messageSent: 'Mensaje enviado',
			error: 'Antes de conectar el bot, visite el sitio web de nightbot <a href="https://nightbot.tv/dashboard" target="_blank">y finalice la sesión de juego.</a>',
		},
		advertSettings: {
			title: 'Administrador de campañas',
			description: 'Seleccione la frecuencia y el modo de colocación.',
			moreAboutFormats: 'Aprenda más sobre formatos',
			bannerTimeout: 'Frecuencia',
			adPlaybackMode: 'Modo de colocación',
			playbackModeManual: 'Manual',
			playbackModeAuto: 'Automático',
			manualPlaybackTitle: 'Lanzamiento de campaña',
			pictureInPicturePosition: 'Ubicación de Picture-in-Picture',
			leaderboardPosition: 'Ubicación de banner ancho',
			adsBlocksCountTitle: 'Número de colocación',
			adsBlocksCountDuration: 'Duración: {seconds} segundos',
			advice: {
				title: 'Lanzamiento de campañas manuales',
				firstString: 'Puedes ejecutar campañas manualmente cuando el widget, la extensión y el chatbot estén activos.',
				secondString: 'Tan pronto como la campaña esté disponible, el botón se desbloqueará.',
			},
		},
		panel: {
			title: 'Administrador de campañas remotas',
			mobileVersion: {
				title: 'Administrador de campañas móviles',
				description: 'Escanee el código QR para abrir el Administrador de campañas en su teléfono. No muestre este código a nadie.',
			},
			obsVersion: {
				title: 'Administrador de campañas para OBS',
				description: 'El Administrador de campañas se puede agregar a OBS. Copie el enlace y péguelo debajo de Ver → Docks → Docks de navegador personalizado. No muestre este enlace a nadie.',
			},
		},
		ignoreCategories: {
			title: 'Categorías para ignorar',
			description: 'Las campañas de las categorías seleccionadas se desactivarán automáticamente para su visualización en la sección de campañas.',
		},
		attention: {
			title: 'Configuración de Widgets y Chatbot',
			widgetDisabled: {
				title: 'Widget deshabilitado',
				reasons: {
					title: 'Las siguientes razones son posibles:',
					broadcast: 'El programa de difusión está deshabilitado',
					notSetUp: 'El widget no está configurado en el programa de transmisión.',
				},
			},
			chatbotDisabled: {
				title: 'Chatbot deshabilitado',
				reasons: {
					toBeConnected: 'El chatbot debe conectarse para el canal',
					addChatbotAsModerator: 'Necesita agregar a Nightbot como moderador',
				},
			},
		},
		twitchExtension: {
			title: 'Extensión de Twitch',
			description: 'Configure una extensión para Twitch para obtener campañas de patrocinio especiales en formato de extensión.',
			status: 'Estado de extensión',
			btns: {
				setup: 'Configurar extensión',
				check: 'Verificar la extensión',
			},
		},
		ssp: {
			title: 'Campañas de socios',
			description: 'Gestionar campañas de patrocinio externas de Uplify Partners.',
			moreAbout: {
				text: 'Obtenga más información sobre las campañas de socios',
				link: '',
			},
			instream: {
				title: 'InStream patrocinios',
				label: 'Permitir patrocinios en transmisión',
				hint: 'Incluya la integración con una red de socios externos, el sistema solicitará automáticamente integraciones externas y se esforzará por llenar todas las ranuras disponibles en el widget.',
			},
			text: {
				title: 'Mensajes patrocinados en el chat',
				label: 'Permitir mensajes patrocinados con botas',
				hint: 'Incluya integración con una red de socios externos, el sistema enviará automáticamente un mensaje de patrocinio al chat cada 10 minutos.',
				frequency: {
					label: 'Mensajes patrocinados cada 15 minutos',
					options: {
						every15min: 'Una vez por 15 min',
						every30min: 'Una vez por 30 min',
					},
				},
			},
			advice: {
				title: 'Integración de redes de socios externas',
				lines: 'Nuestro servicio proporciona acceso a&nbsp;las campa&ntilde;as de&nbsp;patrocinio de&nbsp;Uplify. Adem&aacute;s, puede aumentar sus ingresos permitiendo que otras redes de&nbsp;socios coloquen suCampa&ntilde;as con Uplify en&nbsp;su&nbsp;contenido y&nbsp;chatea a&nbsp;trav&eacute;s de&nbsp;mensajes de&nbsp;patrocinio.',
			},
		},
		adultOnly: {
			title: 'Restricciones de edad',
			description: 'Permita la integración de campañas publicitarias que tengan restricciones de edad dentro de las leyes locales.Por ejemplo, trailers de películas de acción, bebidas energéticas y otros tipos de productos destinados solo a adultos.',
			label: 'Permitir campañas de adultos',
			hint: 'Permitir patrocinios en transmisión',
		},
		youtubeText: {
			title: 'YouTube Text',
			description: 'Manage YouTube text sponsored messages.',
			link: {
				text: 'Learn more about YouTube text campaigns',
				href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
			allow: {
				label: 'Allow YouTube description ads',
			},
			blacklist: {
				label: 'Videos to ignore',
				hint: 'Videos to ignore',
				errors: {
					invalidLink: 'Uno o más enlace no es válido',
					notYoutube: 'Uno o más enlace no es un enlace de YouTube',
				},
			},
		},
	},
}

export default dict
