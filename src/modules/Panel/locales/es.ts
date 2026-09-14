import { default as baseDict } from './en'

const dict: typeof baseDict = {
	panel: {
		tabs: {
			widget: 'Configuración',
			campaigns: 'Campañas',
		},
		states: {
			title: 'Estado de los módulos',
		},
		statuses: {
			chatbot: 'Chatbot',
			extension: 'Widget',
			stream: 'Livestream',
		},
		params: {
			title: 'Opciones de visualización de la campaña',
			previewCaption: 'Previsualización de patrocinio en el programa',
			locationCaption: 'Posición en el programa',
		},
		campaigns: {
			title: 'Campañas disponibles',
			none: 'No hay campañas disponibles',
			comeBack: 'Todas las campañas han terminado hoy.<br>¡Vuelve mañana!',
		},
		error: {
			title: 'Enlace caducado',
			text: 'Visita tu panel personal para obtener un nuevo enlace',
		},
		statusesMustBeOn: 'Para ejecutar campañas, todos los módulos deben estar activados',
		logger: {
			copy: 'Copiar registro',
			copied: '¡Registro Copiado!',
		},
		settings: {
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
		},
	},
}

export default dict
