import { default as baseDict } from './en'

const dict: typeof baseDict = {
	creative: {
		defaultName: 'Nombre creativo',
		defaultNameNew: 'Nuevo creativo',
		loading: 'Creativo cargando ..',
		fetchError: {
			title: 'No se pudo cargar el creativo',
			description: 'Se produjo un error al cargar el creativo, el grupo o los datos de la campaña. Por favor, inténtelo más tarde.',
			retry: 'Reintentar',
		},
		form: {
			status: {
				label: 'Estado',
			},
			name: {
				title: 'Nombre creativo',
				label: 'El nombre es visible solo para ti',
				placeholder: 'Ingrese texto',
			},
			altName: {
				addBtn: 'Agregar nombre alternativo para streamers',
				label: 'Nombre del creativo para streamers',
				placeholder: 'Por ejemplo, Promoción de Primavera',
			},
			adtag: {
				title: 'Google Ad Tag',
				label: '',
				placeholder: '',
			},
			files: {
				title: 'Subir archivos',
				preview: 'Subir el archivo de vista previa',
				uploadBtn: 'Subir archivo',
				formats: {
					video: 'Vídeo',
					videoOrImage: 'Vídeo o imagen',
					html5: 'HTML5',
					banner: 'Banner',
				},
				requirements: {
					title: 'Requisitos',
					fullscreen: 'Duración: 15s<br/>Resolución: 1920x1080<br/>Formato: H.264 (MP4, webm)<br/>Sonido: -9dB<br/>Tasa de bits: 2000 - 5500 kbps<br/>Velocidad de fotogramas: 24 - 30<br/>Tamaño: hasta {size} MB',
					leaderboard: 'Duración: 15s<br/>Resolución: 1920x270<br/>Formato: H.264 (MP4, webm)<br/>Sonido: Deshabilitado<br/>Tasa de bits: 2000 - 5500 kbps<br/>Velocidad de fotogramas: 24 - 30<br/>Tamaño: hasta {size} MB',
					pip_video: 'Duración: 15s<br/>Resolución: desde 550 x 310<br/>hasta 1920 x 1080 píxeles.<br/>Formato: H.264 (MP4, webm)<br/>Sonido: Deshabilitado<br/>Tasa de bits: 2000 - 5500 kbps<br/>Velocidad de fotogramas: 24 - 30<br/>Tamaño: hasta {size} MB',
					custom: 'Duración: 15s<br/>Resolución: 1920x1080<br/>Formato: PNG, JPG o GIF<br/>HTML de terceros: archivo zip HTML5<br/>Sonido: Deshabilitado<br/>Velocidad de fotogramas: 24 - 30<br/>Tamaño: hasta {size} MB',
					extension: '<strong>Primer archivo:</strong><br/>Resolución: 728 x 90<br/>Formato: PNG, JPG, GIF, MP4, WEBM<br/>Audio: Deshabilitado<br>Tamaño: hasta {bannerSize} MB<br/><br/><strong>Segundo archivo:</strong><br/>Resolución: 550 x 310<br>Formato: PNG, JPG, GIF, MP4, WEBM<br>Audio: Deshabilitado<br>Tamaño: hasta {unitSize} MB',
					gallery: '<strong>Imagen:</strong><br/>Resolución: 230 x 350<br/>Formato: PNG, JPG<br/>Tamaño: hasta {imageSize} MB',
				},
				errors: {
					general: 'Proporcione archivo creativo válido',
				},
				instructions: {
					dragImage: 'Arrastra la imagen aquí',
					dragVideo: 'Arrastra una imagen o video aquí',
					dragImageOrVideo: 'Arrastra el vídeo aquí',
					dragZip: 'Arrastre el archivo con archivos aquí',
				},
			},
			creativeManager: {
				messages: {
					deleted: 'Se eliminó el archivo adjunto',
				},
				errors: {
					unknown: 'Error desconocido',
				},
			},
			advice: {
				title: 'Vista previa creativa',
				description: 'Estime cómo se verá su anuncio',
				button: 'Mostrar vista previa',
			},
			stylesEditor: {
				button: 'Editor de estilos',
			},
			data: {
				title: 'Creativo de datos',
				fields: {
					erid: {
						title: 'ERID (solo mercado CEI)',
						label: 'erid ID',
						placeholder: '',
					},
					productUrl: {
						label: 'URL del producto',
						placeholder: 'Introducir enlace',
					},
					mobileProductUrl: {
						label: 'URL de productos móviles (DeepLink)',
						placeholder: 'Introducir enlace',
					},
					chatbotText: {
						label: 'Texto del chatbot',
						placeholder: 'Introducir texto',
					},
					companionHeading: {
						label: 'Título de la bandera de compañero',
						placeholder: 'Introducir título',
					},
					companionText: {
						label: 'Texto de la bandera de compañero',
						placeholder: 'Introducir texto',
					},
					companionCta: {
						label: 'Llamada a la acción',
						placeholder: 'Introducir texto',
					},
					qrCode: {
						label: 'Generar el código QR en la transmisión en vivo',
					},
					pixelClicks: {
						label: 'Píxel de conversión img',
						placeholder: 'Ingrese el enlace',
					},
					pixelClicksScripts: {
						label: 'JavaScript Conversion Pixel',
						placeholder: 'Ingrese el código',
					},
					pixelImpressions: {
						label: 'Etiqueta de impresión',
						placeholder: 'Ingrese el enlace',
						addLabel: 'Agregar otro píxel',
						alert: 'Etiquetas de impresiones compatibles: Adriver, WeBorama <br/>Parámetros: {{viewers}}, {{random}}',
					},
					pixelInspections: {
						label: 'Píxel para inspección',
						placeholder: 'Ingrese el enlace',
						addLabel: 'Agregar otro píxel',
					},
				},
			},
			pixels: {
				title: 'Píxeles',
			},
			labels: {
				title: '<strong>Etiqueta de patrocinio</strong><br/>(solo mercado CEI)',
				fields: {
					chatbot: {
						label: 'Chatbot erid ID',
					},
					creative: {
						label: 'Creative erid ID',
					},
				},
			},
			formSendStatus: {
				updated: 'La creatividad fue actualizada',
			},
			preview: {
				label: 'Vista previa',
			},
			quiz: {
				size: {
					limit: {
						exceeded: 'El tamaño del cuestionario excede el límite de 5KB. Por favor, reduzca el número de preguntas o respuestas o refactorize sus estilos.',
					},
				},
				settings: {
					title: 'Configuración',
					quizStatus: 'Estado del cuestionario',
					correctAnswersVisible: 'Respuestas correctas visibles',
					paginationEnabled: 'Paginación habilitada',
					resultsVisible: 'Resultados visibles',
				},
				welcome: {
					title: 'Bienvenido',
					text: 'Texto de bienvenida',
					color: 'Color de bienvenida',
				},
				questions: {
					title: 'Preguntas',
					question: 'Pregunta {index}',
					deleteQuestion: 'Eliminar pregunta',
					questionText: 'Texto de la pregunta',
					questionPlaceholder: 'Ingrese la pregunta',
					explain: 'Explicar',
					explainPlaceholder: 'Explicación de la respuesta correcta',
					answer: 'Respuesta {index}',
					deleteAnswer: 'Eliminar respuesta',
					answerPlaceholder: 'Ingrese el texto de la respuesta {index}',
					correctAnswer: 'Esta es la respuesta correcta',
					addAnswer: 'Agregar otra respuesta',
					questionBackground: 'Fondo de la pregunta',
					questionColor: 'Color de la pregunta',
					addQuestion: 'Agregar otra pregunta',
				},
				result: {
					title: 'Resultado',
					text: 'Texto del resultado',
					placeholder: 'Gracias por participar!',
					background: 'Fondo del resultado',
					color: 'Color del resultado',
				},
				preview: {
					title: 'Vista previa',
				},
			},
			gallery: {
				title: 'Galería',
			},
			panel: {
				banner1: {
					label: 'Banner 1',
				},
				banner2: {
					label: 'Banner 2',
				},
			},
		},
	},
}

export default dict
