export default {
	creative: {
		defaultName: 'Creative Name',
		defaultNameNew: 'New Creative',
		loading: 'Creative loading ..',
		fetchError: {
			title: 'Failed to load creative',
			description: 'An error occurred while loading the creative, group, or campaign data. Please try again later.',
			retry: 'Retry',
		},
		form: {
			name: {
				title: 'Creative name',
				label: 'The name is visible only to you',
				placeholder: 'Enter text',
			},
			altName: {
				addBtn: 'Add alternative name for streamers',
				label: 'Creative name for streamers',
				placeholder: 'For example, Spring Promo',
			},
			adtag: {
				title: 'Google Ad Tag',
				label: '',
				placeholder: '',
			},
			status: {
				label: 'Status',
			},
			files: {
				title: 'Upload files',
				preview: 'Upload preview file',
				uploadBtn: 'Upload file',
				formats: {
					video: 'Video',
					videoOrImage: 'Video or image',
					html5: 'HTML5',
					banner: 'Banner',
				},
				requirements: {
					title: 'Requirements',
					fullscreen: 'Duration: 15s<br/>Resolution: 1920 x 1080<br/>Format: H.264 (MP4, webm)<br/>Audio: -9dB<br/>Bitrate: 2000 - 5500 kbps<br/>Frame rate: 24 - 30<br/>Size: up to {size} MB',
					leaderboard: 'Duration: 15s<br/>Resolution: 1920 x 270<br/>Format: H.264 (MP4, webm)<br/>Audio: Disabled<br/>Bitrate: 2000 - 5500 kbps<br/>Frame rate: 24 - 30<br/>Size: up to {size} MB',
					pip_video: 'Duration: 15s<br/>Resolution: from 550 x 310<br/>up to 1920 x 1080 pix.<br/>Format: H.264 (MP4, webm)<br/>Audio: Disabled<br/>Bitrate: 2000 - 5500 kbps<br/>Frame rate: 24 - 30<br/>Size: up to {size} MB',
					custom: 'Duration: 15s<br/>Resolution: 1920 x 1080<br/>Format: PNG, JPG or GIF<br/>Third party HTML: HTML5 zip file<br/>Audio: Disabled<br/>Frame rate: 24 - 30<br/>Size: up to {size} MB',
					extension: '<strong>First file:</strong><br/>Resolution: 728 x 90<br/>Format: PNG, JPG, GIF, MP4, WEBM<br/>Audio: Disabled<br>Size: up to {bannerSize} MB<br/><br/><strong>Second file:</strong><br/>Resolution: 550 x 310<br>Format: PNG, JPG, GIF, MP4, WEBM<br>Audio: Disabled<br>Size: up to {unitSize} MB',
					gallery: '<strong>Image:</strong><br/>Resolution: 230 x 350<br/>Format: PNG, JPG<br/>Size: up to {imageSize} MB',
				},
				instructions: {
					dragImage: 'Drag picture here',
					dragImageOrVideo: 'Drag an image or video here',
					dragVideo: 'Drag video here',
					dragZip: 'Drag the archive with files here',
				},
				errors: {
					general: 'Provide valid creative file',
				},
			},
			creativeManager: {
				messages: {
					deleted: 'Attachment was deleted',
				},
				errors: {
					unknown: 'Unknown error',
				},
			},
			advice: {
				title: 'Creative preview',
				description: 'Estimate how your ad will look',
				button: 'Show preview',
			},
			stylesEditor: {
				button: 'Styles editor',
			},
			data: {
				title: 'Data creative',
				fields: {
					erid: {
						title: 'ERID (CIS market only)',
						label: 'erid ID',
						placeholder: '',
					},
					productUrl: {
						label: 'Product URL',
						placeholder: 'Enter link',
					},
					mobileProductUrl: {
						label: 'Mobile product URL (Deeplink)',
						placeholder: 'Enter link',
					},
					chatbotText: {
						label: 'Chat bot text',
						placeholder: 'Enter text',
					},
					companionHeading: {
						label: 'Companion banner title',
						placeholder: 'Enter title',
					},
					companionText: {
						label: 'Companion banner text',
						placeholder: 'Enter text',
					},
					companionCta: {
						label: 'Call to action',
						placeholder: 'Enter text',
					},
					qrCode: {
						label: 'Generate QR-code on livestream',
					},
					pixelClicks: {
						label: 'IMG conversion pixel',
						placeholder: 'Enter link',
					},
					pixelClicksScripts: {
						label: 'Javascript conversion pixel',
						placeholder: 'Enter code',
					},
					pixelImpressions: {
						label: 'Impression tag',
						placeholder: 'Enter link',
						addLabel: 'Add another pixel',
						alert: 'Supported impressions tags: Adriver, Weborama <br/>Parameters: {{viewers}}, {{random}}',
					},
					pixelInspections: {
						label: 'Pixel for inspection',
						placeholder: 'Enter link',
						addLabel: 'Add another pixel',
					},
				},
			},
			pixels: {
				title: 'Pixels',
			},
			labels: {
				title: '<strong>Sponsorship label</strong><br/>(CIS market only)',
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
				updated: 'Creative was updated',
			},
			preview: {
				label: 'Preview',
			},
			quiz: {
				size: {
					limit: {
						exceeded: 'Quiz size exceeds the 5KB limit. Please reduce the number of questions or answers or refactor your styles.',
					},
				},
				settings: {
					title: 'Settings',
					quizStatus: 'Quiz status',
					correctAnswersVisible: 'Correct answers visible',
					paginationEnabled: 'Pagination enabled',
					resultsVisible: 'Results visible',
				},
				welcome: {
					title: 'Welcome',
					text: 'Welcome text',
					color: 'Welcome color',
				},
				questions: {
					title: 'Questions',
					question: 'Question {index}',
					deleteQuestion: 'Delete question',
					questionText: 'Question text',
					questionPlaceholder: 'Enter question',
					explain: 'Explain',
					explainPlaceholder: 'Explanation of the correct answer',
					answer: 'Answer {index}',
					deleteAnswer: 'Delete answer',
					answerPlaceholder: 'Enter answer text {index}',
					correctAnswer: 'This is the correct answer',
					addAnswer: 'Add another answer',
					questionBackground: 'Question background',
					questionColor: 'Question color',
					addQuestion: 'Add another question',
				},
				result: {
					title: 'Result',
					text: 'Result text',
					placeholder: 'Thank you for participating!',
					background: 'Result background',
					color: 'Result color',
				},
				preview: {
					title: 'Preview',
				},
			},
			gallery: {
				title: 'Gallery',
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
